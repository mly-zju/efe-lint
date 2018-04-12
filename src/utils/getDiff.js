/**
 * @file 获取每次git时修改的文件路径
 * @author malingyang@foxmail.com
 */

let exec = require('child_process').exec;
let os = require('os');
let fs = require('fs');
let path = require('path');
let getAll = require('./getAll');
let typeFilter = require('./typeFilter');

module.exports = function getDiff() {
    return new Promise((resolve, reject) => {
        exec('git diff HEAD --name-only', function (err, stdout, stderr) {
            let jsArr = [];

            if (err) {
                // 如果diff发生错误，则扫描当前文件夹所有文件
                jsArr = typeFilter(getAll('./'));
            }

            else if (stdout.length) {
                jsArr = typeFilter(stdout.trim().split(os.EOL));
            }

            resolve(jsArr);
        });
    });
};