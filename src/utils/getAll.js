/**
 * @file 获取某个路径下全部文件
 * @author malingyang@foxmail.com
 */

let fs = require('fs');
let path = require('path');

let fileArr = [];

/**
 * 文件遍历方法
 *
 * @param {string} filePath 需要遍历的文件路径
 */
function fileScan(filePath) {
    let ignoreReg = /^(\.git|\.vscode|node_modules)/;
    if (ignoreReg.test(filePath)) {
        return;
    }
    let files = fs.readdirSync(filePath);
    files.forEach(file => {
        let inFilePath = path.join(filePath, file);
        let stats = fs.statSync(inFilePath);
        if (stats.isFile()) {
            fileArr.push(inFilePath);
        }
        else if (stats.isDirectory()) {
            fileScan(inFilePath);
        }
    });
}

module.exports = function (filePath) {
    fileArr = [];
    fileScan(filePath);
    return fileArr;
};