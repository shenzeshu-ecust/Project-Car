import __global from "./ext/global";
import nwx from './nwx/nwx'
import createWXMockApi from "./nwx/wx";
import CPage from "./cpage/cpage"

const cwx = (__global.cwx = (function () {

    const cwx = Object.create(wx, {
        /**
         * @member
         * @see module:cwx\config
         */
        config: {
            get: function () {
                return require('./cpage/config.js').default
            },
            enumerable: true
        },
        /**
         * @member
         * @see module:cwx\util
         */
        util: {
            value: require('./ext/util.js').default,
            enumerable: true
        },
        /**
         * @member
         * @see module:cwx\request~request
         */
        request: {
            get: function () {
                return require('./ext/cwx.request.js').request
            },
            enumerable: true
        },
        /**
         * @member
         */
        appId: {
            enumerable: true,
            value: __global.appId
        },
        events: {
            get: function () {
                return require('./ext/cwx.events.js').default
            },
            enumerable: true
        }
    })
    /**
     * @member
     * @name getCurrentPage
     * @return {page}
     */
    cwx.getCurrentPage = function () {
        var pages, page
        try {
            pages = getCurrentPages()
            page = pages && pages.length ? pages[pages.length - 1] : null
        } catch (e) {
            page = getApp().getCurrentPage()
        }
        return page
    }


    cwx.systemCode = '30'

    createWXMockApi(cwx);
    return cwx
})())

__global.CPage = CPage


global.cwx = {
    __global,
    cwx,
    CPage,
    nwx
}

cwx.config.init();

export default cwx
export {__global}
export {cwx}
export {CPage}
export {nwx}

