/**
 * @file 对普通的html/css/js文件，给定一个文件路径进行代码规范检测
 * @author malingyang@foxmail.com
 */

let fecs = require('fecs');
let fs = require('fs');
let path = require('path');
let log = require('../utils/logProxy');
let broker = require('../broker');

let typeMap = {
    '.js': 'js',
    '.css': 'css',
    '.html': 'html',
    '.less': 'less'
};

/**
 * 检测代码
 *
 * @param {string} filePath 文件路径
 */
function commonCheck(filePath) {
    let fileType = path.extname(filePath);
    if (!typeMap[fileType]) {
        throw new Error('file type not supported');
    }

    if (!fs.existsSync(filePath)) {
        broker.emit('single_finish', true, []);
        return;
    }

    log.init();
    let buf = fs.readFileSync(filePath);
    let options = {
        reporter: 'baidu',
        string: buf,
        type: typeMap[fileType]
    };
    fecs.check(options, (success, error) => {
        let info = log.getCache();
        if (info.length) {
            info[0] = info[0].replace('current-file' + fileType, filePath);
        }
        log.recover();
        broker.emit('single_finish', success, info);
    });
}

module.exports = commonCheck;

