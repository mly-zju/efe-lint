#!/usr/bin/env node
/**
 * @file cli工具入口
 * @author malingyang@foxmail.com
 */
let config = process.argv[2];

if (config === '-p' || config === '--progressive') {
    require('./src/progressive');
}
else {
    let path = config || './';
    let f = require('./src/normal');
    f(path);
}