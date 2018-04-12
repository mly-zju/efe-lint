/*eslint-disable*/

let commonCheck = require('../src/check/commonCheck');
let SanChecker = require('../src/check/sanCheck');
let broker = require('../src/broker');
let getDiff = require('../src/utils/getDiff');
let logColor = require('../src/utils/logColor');

let path = './example/demo.san';

// broker.on('single_finish', function(success, info) {
//     console.log(success);
//     // console.log(info);
//     logColor.green(info[0]);
// });

// commonCheck(path);
// let sanChecker = new SanChecker(path);
// sanChecker.run(); 
getDiff()
.then((arr) => {
    console.log(arr);
});

