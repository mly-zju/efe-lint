/**
 * @file 入口函数
 * @author malingyang@foxmail.com
 */

let getDiff = require('./utils/getDiff');
let getAll = require('./utils/getAll');
let logColor = require('./utils/logColor');
let commonCheck = require('../src/check/commonCheck');
let SanCheck = require('../src/check/sanCheck');
let broker = require('../src/broker');
let path = require('path');
let os = require('os');

getDiff()
.then(arr => {
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
            console.log(errArr);
        }
        else {
            step();
        }
    });

    step();

});