/**
 * @file 打印彩色
 * @author malingyang@foxmail.com
 */

/*eslint-disable*/
let styles = {
    red: '\x1B[31m%s\x1B[39m',
    green: '\x1B[32m%s\x1B[39m',
    blue: '\x1B[34m%s\x1B[39m'
};

module.exports = new Proxy({}, {
    get: function (target, property) {
        let colorCode = styles[property];
        return function(string) {
            console.log(colorCode, string);
        }
    }
});