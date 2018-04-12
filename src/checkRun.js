/**
 * @file 根据一个path数组，一一进行校验并输出结果
 * @author malingyang@foxmail.com
 */

let logColor = require('./utils/logColor');
let commonCheck = require('../src/check/commonCheck');
let SanCheck = require('../src/check/sanCheck');
let broker = require('../src/broker');
let path = require('path');
let os = require('os');

module.exports = arr => {
    let len = arr.length;
    let current = 0;
    let errArr = [];

    /**
     * 取出一条结果并进行检测
     */
    function step() {
        let currentPath = arr[current];
        if (path.extname(currentPath) === '.san') {
            let sanCheck = new SanCheck(currentPath);
            sanCheck.run();
        }
        else {
            commonCheck(currentPath);
        }
    }

    broker.on('single_finish', (success, info) => {
        if (!success) {
            errArr.push(arr[current]);
        }
        info.forEach((ele, index) => {
            if (index === 0) {
                logColor.green(ele);
            }
            else if (/fecs\s+\[ERROR\]/.test(ele)) {
                logColor.red(ele);
            }
            else {
                console.log(ele);
            }
        });
        info.length && console.log(os.EOL);

        current++;
        if (current === len) {
            if (errArr.length) {
                logColor.blue('**************************************************************************************');
                logColor.red('没有通过fecs代码检测，请修改ERROR!');
                logColor.red('代码不规范的文件路径有:');
                errArr.forEach(ele => {
                    console.log(ele);
                });
                logColor.blue('**************************************************************************************');
                process.exit(1);
            }
            else {
                process.exit(0);
            }
        }
        else {
            step();
        }
    });

    if (len) {
        step();
    }
    else {
        process.exit(0);
    }
};