#!/usr/bin/env node
/**
 * @file cli工具入口
 * @author malingyang@foxmail.com
 */
// 检测全局fecs是否安装
try {
    require('fecs');
}
catch (err) {
    console.log('请首先全局安装fecs，否则无法进行代码规范校验!');
    process.exit(1);
}

let config = process.argv[2];

if (config === '-p' || config === '--progressive') {
    require('./src/progressive');
}
else {
    let path = config || './';
    let f = require('./src/normal');
    f(path);
}