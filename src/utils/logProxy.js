/**
 * @file 覆盖默认console.log方法
 * @author malingyang@foxmail.com
 */
/*eslint-disable*/
module.exports = {

    _log: undefined,
    _cache: undefined,

    /**
     * 初始化，将原生log缓存，并覆写
     */
    init() {
        this._cache = this._cache || [];
        this._log = this._log || global.console.log;
        global.console.log = this.newLog.bind(this);
    },

    /**
     * 覆写的log
     *
     * @param {...string} args 参数同原生log
     */
    newLog(...args) {
        this._cache.push(...args);
    },

    /**
     * 拷贝缓存内容
     *
     * @return {Array}
     */
    getCache() {
        let result = [];
        result.push(...this._cache);
        return result;
    },

    /**
     * 恢复默认log并清空缓存
     */
    recover() {
        global.console.log = this._log;
        this._log = this._cache = undefined;
    }

};