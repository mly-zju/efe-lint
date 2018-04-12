/**
 * @file 对于.san文件，给定一个文件路径进行代码规范检测
 * @author malingyang@foxmail.com
 */
let fecs = require('fecs');
let fs = require('fs');
let path = require('path');
let os = require('os');
let log = require('../utils/logProxy');
let createWritable = require('stream').Writable;
let split = require('split');
let broker = require('../broker');

class SanChecker {

    /**
     * constructor
     *
     * @param {string} filePath 文件路径
     */
    constructor(filePath) {
        this.filePath = filePath;
        this.startLine = 0;
        this.cursor = 0;
        this.bufCache = [];
    }

    /**
     * 处理代码buffer
     */
    dealBuffer() {
        let {startLine, cursor, bufCache, filePath} = this;

        let buf = Buffer.concat(bufCache);
        let index = buf.indexOf('<script>');
        let endIndex = buf.indexOf('</script>');
        if (index === -1 || endIndex === -1) {
            throw new Error('file is wrong');
        }
        let noCheck = /\*\s+eslint-disable\s+\*/.test(buf);

        log.init();
        let options = {
            reporter: 'baidu',
            string: buf.slice(index + 8, endIndex),
            type: 'js'
        };
        fecs.check(options, function (success, err) {
            let cache = log.getCache();
            log.recover();
            let info = [];
            success = true;

            if (noCheck) {
                broker.emit('single_finish', true, []);
                return;
            }

            cache.forEach(ele => {
                // 忽略autor和file问题
                let ignoreReg = /(@author|@file)/;
                if (ignoreReg.test(ele)) {
                    return;
                }
                // 检测是否有错误
                let errReg = /fecs\s+\[ERROR\]/;
                if (errReg.test(ele)) {
                    success = false;
                }
                // 修改文件名
                if (ele.indexOf('current-file.js') !== -1) {
                    ele = ele.replace('current-file.js', filePath);
                }
                let reg = /line\s+(\d+)\,/;
                ele = ele.replace(reg, function (...args) {
                    let lineNum = +args[1] + startLine;
                    return 'line  ' + lineNum;
                });
                info.push(ele);
            });

            // 向中介者发送处理完成的消息
            broker.emit('single_finish', success, info);
        });
    }

    /**
     * 创建处理可读流的可写流
     *
     * @return {Object} dealStream 处理可读流的可写流实例
     */
    createDealStream() {
        let dealStream = createWritable({
            write: (buf, enc, next) => {
                if (buf.toString().indexOf('<script>') !== -1) {
                    this.startLine = this.cursor;
                }
                this.cursor++;
                this.bufCache.push(buf);
                this.bufCache.push(Buffer.from(os.EOL));
                next();
            }
        });

        dealStream.on('finish', this.dealBuffer.bind(this));

        return dealStream;
    }

    /**
     * 运行文件检测
     */
    run() {
        if (path.extname(this.filePath) !== '.san') {
            throw new Error('file type not supported!');
        }

        if (!fs.existsSync(this.filePath)) {
            broker.emit('single_finish', true, []);
            return;
        }
        let dealStream = this.createDealStream();

        // 流式处理文件
        fs.createReadStream(this.filePath)
        .pipe(split())
        .pipe(dealStream);
    }

}

module.exports = SanChecker;
