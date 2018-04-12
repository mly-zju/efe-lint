/**
 * @file 中介者，用于订阅和引发检测完成的信息
 * @author malingyang@foxmail.com
 */
let events = require('events');

module.exports = new events.EventEmitter();