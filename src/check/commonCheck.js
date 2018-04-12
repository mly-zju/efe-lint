/**
 * @file 对普通的html/css/js文件，给定一个文件路径进行代码规范检测
 * @author malingyang@foxmail.com
 */

let fecs = require('fecs');
let fs = require('fs');
let path = require('path');
let log = require('../utils/logProxy');
let broker = require('../broker');

/**
 * 检测代码
 *
 * @param {string} filePath 文件路径
 */
function commonCheck(filePath) {
    if (['.js', '.css', '.html'].indexOf(path.extname(filePath)) === -1) {
        throw new Error('file type not supported!');
    }

    log.init();
    let buf = fs.readFileSync(filePath);
    let options = {
        reporter: 'baidu',
        string: buf
    };
    fecs.check(options, (success, error) => {
        let info = log.getCache();
        if (info.length) {
            info[0] = info[0].replace('current-file.js', filePath.slice(2));
        }
        log.recover();
        broker.emit('single_finish', success, info);
    });
}

module.exports = commonCheck;

