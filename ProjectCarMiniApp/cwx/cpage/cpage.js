import __global from "../ext/global";
import baseClass from "./base"
import util from "../ext/util"

let instanceId = 0
/**
 * 框架通用封装的Page构造器,劫持生命周期，方便业绩统计以及this挂载更多api
 * @module CPage
 * @constructor
 * @param {*} options
 */
const findAPIs = function (obj) {
    let res = ['onShow', 'onReady', 'onHide', 'onUnload']
    // let res = [];
    for (let pro in obj) {
        if (typeof obj[pro] === 'function' && !['onLoad'].includes(pro)) {
            res.push(pro)
        }
    }
    return res
}
const CPage = function (options) {

    if (CPage.__isComponent) {
        let copyOptions = util.copy(options)
        CPage.createInstance(copyOptions)
    } else {
        const apis = findAPIs(options)
        let pageData = {
            onPageScroll: function () {

            },
            onLoad: function () {
                let _this = this
                let args = Array.prototype.slice.call(arguments, 0)

                let copyOptions = util.copy(options)
                let ins = CPage.createInstance(copyOptions)

                for (let k in ins) {
                    if (ins.hasOwnProperty(k)) {
                        if (k == 'data') {
                            this.data = ins[k]
                            this.setData(ins[k])
                        } else if (
                            k == '__cpage' ||
                            k.indexOf('__') != 0 ||
                            copyOptions.hasOwnProperty(k)) {

                            _this[k] = ins[k]
                        }
                    }
                }
                apis.forEach(function (f) {
                    if (ins[f]) {
                        _this['_m_' + f] = ins[f].bind(ins)
                    }
                })
                let t = ins.__proto__;

                while (t && t != Object.prototype) {
                    Object.getOwnPropertyNames(t).forEach(function (k) {
                        if (k != 'constructor' && k != '__proto__') {
                            if (k.indexOf('__') != 0) {
                                if (util.type(t[k]) == 'function') {
                                    if (ins[k] === t[k]) {
                                        _this[k] = t[k].bind(ins)
                                    }
                                } else {
                                    _this[k] = t[k]
                                }
                            }
                        }
                    })

                    t = t.__proto__
                }

                this.onLoad.apply(this, args)
                if (this.onShareAppMessage) {

                }
            }
        }

        if (options.data) {
            pageData.data = util.copy(options.data)
            delete options.data
        }
        //wrap onShareAppMessage
        if (options.onShareAppMessage) {
            try {
                let onShareAppMessage = options.onShareAppMessage
                let wrapOnShareAppMessage = function (res) {
                    let shareData = onShareAppMessage.call(this, res)
                    //添加埋点
                    if (this.ubtTrace) {
                        let ubtData = util.copy(shareData)
                        this.ubtTrace('wxshare', ubtData)
                    }
                    // let mkt = cwx.mkt.getShareUnion()
                    // let path = shareData.path
                    // mkt = (path.indexOf('?') != -1 ? '&' : '?') + mkt
                    // shareData.path += mkt

                    //wrap success
                    let originSuccess = shareData.success
                    shareData.success = function (res) {
                        if (res && res.shareTickets) {
                            __global.cwx.shareTicket = res.shareTickets[0]
                        }
                        if (originSuccess) {
                            originSuccess.call(this, res)
                        }
                    }
                    return shareData
                }
                pageData.onShareAppMessage = wrapOnShareAppMessage
                delete options.onShareAppMessage
            } catch (e) {
                console.log('wrapOnShareAppMessage error')
            }
        }
        if (options.onPageScroll) {
            pageData.onPageScroll = function () {
            }
        }
        apis.forEach(function (f) {
            if (typeof pageData[f] === 'undefined') {
                pageData[f] = function (...args) {
                    this['_m_' + f] && this['_m_' + f].call(this, ...args)
                }
            }
        })
        // 处理缺失 pageid 的埋点问题
        if (!pageData.pageId) {
            pageData.pageId = 8888999
        }
        Page(pageData)
    }
}

CPage.__isComponent = 0
CPage.__cache = []

CPage.createInstance = function (options) {
    let a = CPage.__isComponent
    let ins = new CPage.baseClass(options)
    ins.__instanceId = instanceId++

    let b = CPage.__isComponent

    if (CPage.__isComponent) {
        CPage.__cache[CPage.__isComponent] = {
            id: ins.__instanceId,
            options: options,
            instance: ins
        }
    }

    console.log('创建page实例');

    return ins
}

CPage.baseClass = baseClass

CPage.modules = {
    'UBT': function () {
        return require('./ubt.js').default
    },
}

CPage.use = function (subClass) {
    console.log('开始注册插件', subClass);
    if (util.type(subClass) == 'string') {
        let fn = CPage.modules[subClass]
        if (util.type(fn) == 'function') {
            subClass = fn()
        } else {
            throw 'Unknow CPage module ' + subClass
        }
    }
    if (util.type(subClass) == 'function') {
        CPage.baseClass = subClass
    } else {
        throw 'CPage module only support class'
    }
    console.log('开始注册插件 CPage.baseClass');
}

module.exports = CPage
