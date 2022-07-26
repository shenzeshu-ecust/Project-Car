import __global from "../ext/global";
export default class CPage_Module_Base {
    constructor(options) {
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                switch (key) {
                    case 'onLoad':
                    case 'onReady':
                    case 'onShow':
                    case 'onHide':
                    case 'onUnload':
                        this['__' + key] = options[key];
                        break;
                    default:
                        this[key] = options[key];
                        break;
                }
            }
        }

        let CPage = __global.CPage;
        this.__isComponent = !!CPage.__isComponent;

        wrapLifeCycle(this, 'onLoad', true);
        wrapLifeCycle(this, 'onReady', false);
        wrapLifeCycle(this, 'onShow', false);
        wrapLifeCycle(this, 'onHide', false);
        wrapLifeCycle(this, 'onUnload', true);
    };
};

function wrapLifeCycle(cpage, type, isOnce) {
    let __type = '__' + type;
    let fn = cpage[type];
    let invoked = false;
    cpage[type] = function () {
        let args = Array.prototype.slice.call(arguments, 0);
        if (!isOnce || isOnce && !invoked) {
            invoked = true;
            if (type == 'onLoad') {
                cpage.__page = this;
                this.__cpage = cpage;
            }
            fn && fn.apply(cpage, args);
        }
        cpage[__type] && cpage[__type].apply(this, args);
    };
}
