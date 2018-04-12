/**
 * @file 筛选合法文件类型
 * @author malingyang@foxmail.com
 */

let fs = require('fs');
let path = require('path');

 /**
 * 从path数组筛选出合法的路径
 *
 * @param {Array} fileArr 文件路径数组
 * @return {Array}
 */
function filterPath(fileArr) {
    return fileArr.filter(ele => {
        return fs.existsSync(ele) && ['.js', '.css', '.html', '.san'].indexOf(path.extname(ele)) !== -1;
    });
}

module.exports = filterPath;