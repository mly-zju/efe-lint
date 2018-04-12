/**
 * @file 普通模式入口
 * @author malingyang@foxmail.com
 */

let getAll = require('./utils/getAll');
let checkRun = require('./checkRun');
let typeFilter = require('./utils/typeFilter');

module.exports = dir => {
    let fileArr = typeFilter(getAll(dir));
    checkRun(fileArr);
};
