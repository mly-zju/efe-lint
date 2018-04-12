/**
 * @file 渐进式入口函数
 * @author malingyang@foxmail.com
 */

let getDiff = require('./utils/getDiff');
let checkRun = require('./checkRun');

getDiff()
.then(checkRun);