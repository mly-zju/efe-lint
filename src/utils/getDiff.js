/**
 * @file 获取每次git时修改的文件路径
 * @author malingyang@foxmail.com
 */

let exec = require('child_process').exec;
let os = require('os');
let fs = require('fs');
let path = require('path');
let getAll = require('./getAll');

/**
 * 从path数组筛选出合法的路径
 *
 * @param {Array} fileArr 文件路径数组
 * @return {Array}
 */
function filterPath(fileArr) {
    return fileArr.filter(ele => {
        return fs.existsSync(ele) && ['.js', '.css', '.html', '.san'].indexOf(path.extname(ele)) !== -1;
    }).map(ele => {
        return './' + ele;
    });
}

module.exports = function getDiff() {
    return new Promise((resolve, reject) => {
        exec('git diff HEAD --name-only', function (err, stdout, stderr) {
            let jsArr = [];

            if (err) {
                // 如果diff发生错误，则扫描当前文件夹所有文件
                jsArr = filterPath(getAll('./'));
            }

            else if (stdout.length) {
                jsArr = filterPath(stdout.trim().split(os.EOL));
                // jsArr = stdout.trim().split(os.EOL).map(ele => {
                //     return './' + ele;
                // }).filter(ele => {
                //     let result = fs.existsSync(ele) && ['.js', '.css', '.html', '.san'].indexOf(path.extname(ele)) !== -1;
                //     console.log(result);
                //     return result;
                // });
            }

            resolve(jsArr);
        });
    });
};