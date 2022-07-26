import __global from "../ext/global";

const cwx = __global.cwx || {};

const UZip = (function () {
    const r = 16384;
    const n = 3;
    const e = 127 + n;
    const t = 16383;
    const o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    const f = [];
    for (let i = 0; i < 64; i++) {
        f[o.charCodeAt(i)] = i;
    }

    function a(r, n) {
        return Math.min(r, n);
    }

    return {
        compress: function (f) {
            const s = [];
            let g = [];
            let m = [];
            let b = [];
            let U = -1;
            let C = 0;
            let w = 0;
            let A = 0;
            let y = 0;
            f = unescape(encodeURIComponent(f));
            for (let i = 0; i < f.length; i++) {
                s.push(f.charCodeAt(i));
            }

            function u() {
                for (var r = 0, e = w; e < w + n; e++)
                    r *= 16777619, r ^= s[e];
                return r & t;
            }

            function c(r) {
                let n;
                let t;
                const o = a(r + e, w);
                for (n = r, t = w; n < o && t < s.length && s[n] == s[t]; n++, t++)
                    ;
                return n - r;
            }

            function h() {
                for (var r = U; r < w; r += 127) {
                    var n = a(127, w - r);
                    v(255 & -n);
                    for (var e = r; e < w && e < r + n; e++)
                        v(s[e]);
                }
            }

            function v(r) {
                var n = A << 6 - y;
                p(63 & (n |= (A = 255 & r) >> (y += 2))),
                y >= 6 && p(63 & (n = A >> (y -= 6)));
            }

            function l() {
                if (2 == y)
                    p(r = A << 4 & 63);
                else if (4 == y) {
                    var r = A << 2 & 63;
                    p(r);
                }
                return b.join("");
            }

            function p(r) {
                b.push(o.charAt(r));
            }

            v(19);
            for (let I = 0; I < s.length && w < s.length; I += r) {
                if (I > 0) {
                    m = m.slice(r);
                }
                (function () {
                    for (let t = a(I + 2 * r, s.length), o = a(t, s.length - n + 1); w < t; w++) {
                        let f = 0;
                        let i = 0;
                        if (w < o) {
                            let l = u();
                            if (w >= C) {
                                for (let p = g[l] - 1; f != e && p >= 0 && p >= w - r;) {
                                    let d = c(p);
                                    d >= n && d > f && (i = w - p - (f = d));
                                    p = m[p - I];
                                }
                            }
                            m[w - I] = g[l] - 1;
                            g[l] = w + 1;
                        }
                        if (f >= n) {
                            for (C = w + f, -1 != U && (h(), U = -1), v(f - n); i > 127;) {
                                v(255 & (127 & i | 128)), i >>= 7;
                            }
                            v(i);
                        } else {
                            w >= C && -1 == U && (U = w);
                        }
                    }
                }());
            }
            if (-1 != U) {
                h();
            }
            return l();
        }
    };
})();

const NOOP = () => {
};
const VERSION = 'VERSION';
const FP = 'FP';
const CLIENTID = 'CLIENTID';
const TID = 'TID'; //
const AGENT = 'AGENT';
/**
 * NativeApp/Hybrid/H5/PC/Unknown
 */
const ENV = 'ENV';
const LANG = 'LANG';
const NETWORK = 'NETWORK';
const PLATFORM = 'PLATFORM';
const APPID = 'APPID';
const MID = 'MID'; //=offline module ID
const CALLID = 'CALLID';
const CTRIPCITY = 'CTRIPCITY';
const BUDATA = 'BUDATA';
// app
const APP_NAME = 'APP_NAME';
const APP_VERSION = 'APP_VERSION'; //=外部版本
const APP_VER = 'APP_VER'; //=内部版本
// DeviceID
const IMEI = "IMEI";
const MAC = "MAC";
// Screen
const SCREENX = 'SCREENX';
const SCREENY = 'SCREENY';
const IDC = 'IDC';
const ADS_ZDATA = 'ADS_ZDATA'; //ADS
const ADS_BID = 'ADS_BID'; //ADS
const SEARCH_ENGINE = 'SEARCH_ENGINE';
const SEARCH_KEYWORD = 'SEARCH_KEYWORD';
// zdata: string;
// bid: string;
const ABTEST = 'ABTEST';
const SOURCEID = 'SOURCEID';
//OTHER
const USER_TOKEN = 'USER_TOKEN';
const USER_NAME = 'USER_NAME'; //Login Name,
const USER_GRADE = 'USER_GRADE'; // User Grade
const USER_CORP = 'USER_CORP';
// Markting
const MKT_ID = 'MKT_ID';
const MKT_SID = 'MKT_SID';
const MKT_OUID = 'MKT_OUID';
const MKT_CREATETIME = 'MKT_CREATETIME';
// export enum PRODUCT
const PRODUCT_ID = 'PRODUCT.ID';
const PRODUCT_STARTCITY = 'PRODUCT.STARTCITY';

class CoHash {
    constructor() {
        this.memo = {};
    }

    get(name, val) {
        const v = this.memo[name];
        return typeof v != 'undefined' ? v : val;
    }

    set(name, val) {
        this.memo[name] = val;
    }
}

const co = new CoHash;

const SIMPLE_TYPE = {'string': true, 'number': true, 'boolean': true};
const noop = function () {
};

function getTimestamp() {
    return (new Date()).getTime();
}

function isNumeric(o) {
    const t = typeof o;
    return (t === 'number' || t === 'string') && !isNaN(o - parseFloat(o));
}

function isNumOrStr(o) {
    const t = typeof o;
    return t === 'string' || t === 'number';
}

function isSimpleType(o) {
    return !!SIMPLE_TYPE[typeof o];
}

function validName(name) {
    let t = typeof name;
    return name && (t == 'string' && name.length < 100 || t == 'number');
}

/***
 * Map<string, number|string|boolean
 */
function validMap(m) {
    const keys = Object.keys(m);
    const len = keys.length;
    for (let i = 0; i < len; i++) {
        const k = keys[i];
        const v = m[k];
        if (!isSimpleType(v)) {
            return false;
        }
    }
    return true;
}

function validTag(tag) {
    if (typeof tag === 'object') {
        const k = Object.keys(tag);
        const l = k.length;
        if (l > 16) {
            return 8;
        }
        for (let i = 0; i < l; i++) {
            const v = tag[k[i]];
            const type = typeof v;
            if (type === "string") {
                tag[k[i]] = v.substring(0, 300);
            } else if (type === "number") ;
            else {
                return 110;
            }
        }
    }
    return 1;
}

function random() {
    return parseInt(('' + Math.random()).slice(-8));
}

function uniqueID() {
    return random() ^ getTimestamp() & 2147483647;
}

class Topic {
    constructor(type) {
        this.type = type;
        this.version = co.get(VERSION, '');
        this.ts = (new Date()).getTime();
        this.priority = 6;
        this.fn = () => {
        };
    }

    setFn(fn) {
        if (typeof fn === 'function') {
            this.fn = fn;
        }
    }

    forHttp() {
        const dataType = this.type;
        const c = this.c;
        const d = this.data;
        let obj = {};
        let params = '';
        switch (dataType) {
            case 'useraction':
            case 'matrix':
                obj = [
                    [2, dataType],
                    c,
                    [d]
                ];
                params = 'ac=a&d=';
                break;
            case 'tiled_tl':
                obj = {
                    type: dataType,
                    common: c,
                    data: [d]
                };
                params = 'ac=ntl&d=';
                break;
            case 'uinfo':
            case 'error':
                obj = {
                    c: c,
                    d: {
                        [dataType]: d
                    }
                };
                params = 'ac=g&d=';
                break;
        }
        params += UZip.compress(JSON.stringify(obj)) + '&c=1&v=' + this.version;
        return params;
    }

    forTcp(category = '') {
        // const c = this.c;
        this.c[9] = co.get(AGENT, '');
        return {
            dataType: this.type,
            c: this.c,
            d: (this.type == 'tiled_tl' || this.type == 'matrix') ? [this.data] : this.data,
            category: category,
            priority: this.priority
        };
    }
}

class PVTopic extends Topic {
    constructor(data) {
        super('uinfo');
        this.data = data;
    }
}

class TraceTopic extends Topic {
    constructor(data) {
        super('tiled_tl');
        this.v = 0;
        data.v = data.v || this.v;
        this.data = data;
    }
}

class MetricTopic extends Topic {
    constructor(options) {
        super('matrix');
        this.data = options;
    }
}

class ErrorTopic extends Topic {
    constructor(data) {
        super('error');
        this.data = [7, "", 0, "", "", "", 0, 1, 1, "", 0, ''];
        this.data[1] = data.message;
        this.data[2] = data.line || 0;
        this.data[3] = data.file || '';
        this.data[4] = data.category || '';
        this.data[5] = data.framework || '';
        this.data[6] = data.time || 0;
        this.data[7] = 1;
        this.data[8] = data.isLogin ? 1 : 0;
        this.data[9] = data.name || '';
        this.data[10] = data.column || 0;
        this.data[11] = data.stack || '';
    }
}

class ActionTopic extends Topic {
    constructor(data) {
        super('useraction');
        if (!data.ts) {
            data.ts = getTimestamp();
        }
        this.data = data;
    }
}

const STORAGE_KEY = 'CTRIP_UBT_M';
const SESSION_MAX_LIEFTIME = 1800000;

class Meta {
    constructor(store, log) {
        this.store = store;
        this.log = log;
        this.fns = [];
        this.pid = '';
        this.vid = getTimestamp() + '.' + uniqueID().toString(36);
        this.sid = 1;
        this.pvid = 0;
        this.ts = getTimestamp();
        this._isInit = false;
        /**
         * Deside after initialization.
         */
        this.isNewVisitor = 1;
        this.init((o) => {
            this._isInit = true;
            if (o && o.vid) {
                this.isNewVisitor = 0;
                this.pid = o.pid;
                this.sid = o.sid;
                this.pvid = o.pvid;
                this.ts = o.ts;
            }
            this.fns.forEach(fn => fn());
            this.fns = [];
        });
    }

    isNewSessION() {
        const now = getTimestamp();
        return now - this.ts > SESSION_MAX_LIEFTIME;
    }

    ready(fn) {
        if (this._isInit) {
            fn();
        } else {
            this.fns.push(fn);
        }
    }

    getBfa() {
        return {
            pid: this.pid,
            vid: this.vid,
            sid: this.sid,
            pvid: this.pvid,
            ts: this.ts,
        };
    }

    init(fn) {
        this.store.get(STORAGE_KEY).then(ret => {
            if (ret) {
                fn(JSON.parse(ret));
            }
            fn(null);
        }).catch(e => {
            this.log.error(e);
            fn(null);
        });
    }

    updateBfa(pid, o) {
        this.pid = o.pid;
        this.sid = o.sid;
        this.pvid = o.pvid;
        this.ts = getTimestamp();
        const d = {
            pid: this.pid,
            vid: this.vid,
            sid: this.sid,
            pvid: this.pvid,
            ts: this.ts
        };
        this.store.set(STORAGE_KEY, JSON.stringify(d)).catch(e => {
            this.log.error(e);
        });
    }
}

class Pageview {
    constructor(collection, trans, log, meta) {
        this.collection = collection;
        this.trans = trans;
        this.log = log;
        this.meta = meta;
        this.pid = 'wait';
        this.id = 0;
        this.ppi = '0';
        this.ppv = 0;
        this.isNewSess = 0;
        this.url = '';
        this.refer = '';
        this.orderid = '';
        this._isReady = false;
        this._done = false;
        this._fn = NOOP;
        this.topics = [];
        this.fns = [];
        this.bfa = this.meta.getBfa();
        this.meta.ready(() => {
            this._isReady = true;
            const o = this.meta.getBfa();
            this.bfa = o;
            this.ppi = o.pid;
            this.ppv = o.pvid;
            if (this.meta.isNewSessION()) {
                this.bfa.sid = o.sid + 1;
                this.isNewSess = 1;
            }
            this.bfa.pvid += 1;
            this.meta.updateBfa(this.pid, this.bfa);
            this._checkSend();
            this.fns.forEach(f => f());
            this.fns = [];
        });
    }

    static config(cfg) {
        co.set(ENV, cfg.env);
        co.set(VERSION, cfg.version);
    }

    static set(name, value) {
        switch (name) {
            case 'abtest':
                co.set(ABTEST, value);
                break;
            case 'version':
                co.set(VERSION, value);
                break;
        }
    }

    isDone() {
        return this._done;
    }

    setOptions(options, fn) {
        if (typeof fn === 'function')
            this._fn = fn;
        if (typeof options === 'object') {
            if (options.pageId) {
                this.pid = options.pageId + '';
            }
            if (options.page_id) {
                this.pid = options.page_id + '';
            }
            if (typeof options['url'] === 'string') {
                this.url = options['url'];
            }
            if (typeof options['refer'] === 'string') {
                this.refer = options['refer'];
            }
            if (isNumOrStr(options['orderid'])) {
                this.orderid = options['orderid'] + '';
            }
        }
        this._checkSend();
    }

    ready(callback) {
        if (this._isReady) {
            callback();
        } else {
            this.fns.push(callback);
        }
    }

    //= TODO
    setStr(name, value, max = 200) {
        if (typeof value === 'string') {
            co.set(name, value.substring(0, max));
        }
    }

    setNum(name, value) {
        if (typeof value === 'number') {
            co.set(name, value);
        }
    }

    _collection() {
        const h = this.collection;
        if (h.app) {
            const app = h.app();
            this.setStr(APPID, app.id);
            this.setStr(APP_NAME, app.name);
            this.setStr(APP_VERSION, app.version);
            this.setStr(APP_VER, app.ver);
            this.setStr(NETWORK, app.nettype);
            this.setStr(PLATFORM, app.platform);
            this.setStr(CLIENTID, app.clientid);
            this.setStr(IMEI, app.imei);
            this.setStr(MAC, app.mac);
        }
        // try {
        if (h.user) {
            const user = h.user();
            this.setStr(USER_TOKEN, user.id);
            this.setStr(USER_NAME, user.loginName);
        }
        if (h.screen) {
            const screen = h.screen();
            this.setNum(SCREENX, screen.width);
            this.setNum(SCREENY, screen.height);
        }
        if (h.alliance) {
            const alliance = h.alliance();
            this.setStr(MKT_ID, alliance.id);
            this.setStr(MKT_SID, alliance.sid);
            this.setStr(MKT_OUID, alliance.ouid);
            this.setNum(MKT_CREATETIME, alliance.createtime);
        }
    }

    _checkSend() {
        if (this.pid
            && this.pid != '0' && this.pid != 'ignore_page_pv'
            && this.pid != 'wait'
            && this._isReady //= bfa data must load
            && !this._done //= don't repeat send
        ) {
            //=collection
            try {
                this._collection();
            } catch (e) {
                this.log.error(e);
            }
            this._done = true;
            this.transport(new PVTopic(this.makeData()), (ret, e) => {
                this.meta.updateBfa(this.pid, this.bfa);
                this._fn(ret, e);
            });
            const len = this.topics.length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    this.transport(this.topics[i]);
                }
            }
            this.topics = [];
        }
    }

    getCommon() {
        return [
            this.pid,
            this.bfa.vid,
            this.bfa.sid,
            this.bfa.pvid,
            co.get(TID, ''),
            co.get(ABTEST, ''),
            co.get(MID, ''),
            co.get(VERSION, ''),
            co.get(FP, ''),
            '',
            co.get(APPID, ''),
            co.get(IMEI, ''),
            co.get(MAC, ''),
            co.get(USER_TOKEN, 'Unknown'),
            co.get(ENV, ''),
            co.get(IDC, '') //= 15 IDC
        ];
    }

    getInfo() {
        return {
            vid: this.bfa.vid,
            page: this.pid,
            prevpage: this.ppi,
            hybrid: true,
            sid: this.bfa.sid,
            pvid: this.bfa.pvid,
            clientcode: co.get(CLIENTID, '')
        };
    }

    makeData() {
        const info = new Array(36);
        info[0] = 15;
        info[1] = this.ppi;
        info[2] = this.ppv;
        info[3] = this.url;
        info[4] = co.get(SCREENX, 0);
        info[5] = co.get(SCREENY, 0);
        info[6] = ''; //= client info
        info[7] = co.get(LANG, ''); //= language
        info[8] = co.get(SEARCH_ENGINE, '');
        info[9] = co.get(SEARCH_KEYWORD, '');
        info[10] = this.refer;
        info[11] = co.get(ABTEST, '');
        info[12] = this.meta.isNewVisitor;
        info[13] = co.get(USER_TOKEN, '') != '' ? 1 : 0; //是否登录
        info[14] = co.get(USER_NAME, ''); //loginName
        info[15] = co.get(USER_GRADE, ''); //
        info[16] = co.get(USER_CORP, ''); // corp id
        info[17] = co.get(PRODUCT_STARTCITY, '');
        info[18] = co.get(MKT_ID, ''); // 18	alliance_id
        info[19] = co.get(MKT_SID, ''); // 19	alliance_sid
        info[20] = co.get(MKT_OUID, ''); // 20	alliance_ouid
        info[21] = this.orderid;
        info[22] = co.get(USER_TOKEN, ''); //user id (DUID)
        info[23] = co.get(ADS_ZDATA, ''); // 23
        info[24] = co.get(CALLID, ''); // 24
        info[25] = co.get(ADS_BID, '');
        info[26] = co.get(CLIENTID, ''); //Clientid		USERINFO
        info[27] = co.get(SOURCEID, ''); //Sourceid		SOURCEID
        info[28] = JSON.stringify({
            app: co.get(APP_NAME, ''),
            version: co.get(APP_VERSION, ''),
            ver: co.get(APP_VER, ''),
            net: co.get(NETWORK, "None"),
            platform: co.get(PLATFORM, ''),
        }); //hybrid appinfo
        info[29] = co.get(ENV, '');
        info[30] = 1; //= getDevicePix
        info[31] = this.isNewSess;
        info[32] = JSON.stringify({
            city: co.get(CTRIPCITY, ''),
        }); //
        info[33] = co.get(PRODUCT_ID, ''); //=product id
        info[34] = ''; // scene
        info[35] = ''; //rid
        info[36] = co.get(BUDATA, '');
        info[37] = co.get(MKT_CREATETIME, '');
        return info;
    }

    transport(t, f) {
        if (f)
            t.setFn(f);
        if (this._done || t.type == 'error' || t.type == 'uinfo') {
            this.log.info('send ' + t.type);
            t.c = this.getCommon();
            if (t.type === 'tiled_tl') {
                t.data.clientid = co.get(CLIENTID, '');
                t.data.duid = co.get(USER_TOKEN, '');
            }
            this.trans.send(t).then(t.fn).catch(e => {
                t.fn(false, e);
            });
        } else {
            this.topics.push(t);
        }
    }

    trace(name, data, f = NOOP) {
        if (validName(name)) {
            if (typeof data === 'string') {
                this.transport(new TraceTopic({
                    key: name,
                    val: {data: data},
                    applet_scene: (cwx.scene || "") + "",
                    v: 0
                }), f);
            } else if (validMap(data)) {
                this.transport(new TraceTopic({
                    key: name,
                    val: data,
                    applet_scene: (cwx.scene || "") + "",
                    v: 0,
                }), f);
            } else {
                f(false, "invalid data");
            }
        } else {
            f(false, 'invalid id');
        }
    }

    devTrace(name, data, f = NOOP) {
        if (validName(name)) {
            if (typeof data === 'string') {
                this.transport(new TraceTopic({
                    key: name,
                    val: {data: data},
                    "$.ubt.hermes.topic.classifier": "DebugCustom",
                    applet_scene: (cwx.scene || "") + "",
                    v: 0
                }), f);
            } else if (validMap(data)) {
                this.transport(new TraceTopic({
                    key: name,
                    val: data,
                    "$.ubt.hermes.topic.classifier": "DebugCustom",
                    applet_scene: (cwx.scene || "") + "",
                    v: 0,
                }), f);
            } else {
                f(false, "invalid data");
            }
        } else {
            f(false, 'invalid id');
        }
    }

    trackMetric(options) {
        if (typeof options === 'object') {
            const f = options.callback || noop;
            if (validName(options.name) && isNumeric(options.value)) {
                const ct = validTag(options.tag || {});
                if (ct === 1) {
                    this.transport(new MetricTopic({
                        name: options.name,
                        tags: options.tag || {},
                        value: options.value,
                        ts: options.ts || getTimestamp()
                    }), f);
                }
            } else {
                f(false, 'invalid id');
            }
        }
    }

    trackError(options, fn) {
        if (options.message) {
            this.transport(new ErrorTopic(options), fn);
        } else if (fn) {
            fn(false, 'invalid data');
        }
    }

    /**
     *
     * @param type
     * @param xpath
     * @param ts
     */
    trackEvent(data, fn) {
        if (data.type && data.xpath) {
            this.transport(new ActionTopic(data), fn);
        } else if (fn) {
            fn(false, 'invalid data');
        }
    }
}

class Transport {
    send(d) {
        return new Promise((resolve) => {
            if (typeof nwx != 'undefined' && nwx.sendUBT) {
                nwx.sendUBT(d.forTcp());
                return resolve(true);
            } else {
                if (wx.request) {
                    wx.request({
                        url: 'https://s.c-ctrip.com/bf.gif?' + d.forHttp(),
                        method: "GET",
                        success: function () {
                            resolve(true);
                        },
                        fail: function () {
                            resolve(false);
                        }
                    });
                }
            }
        });
    }
}

class Store {
    constructor() {
        this.memo = {};
    }

    get(name) {
        return new Promise((resolve) => {
            return resolve(this.memo[name] || '');
        });
    }

    set(name, value) {
        this.memo[name] = value;
        return Promise.resolve(true);
    }
}

var version = "0.1.2";

// var __global = require('../ext/global.js');
// var cwx = __global.cwx || {};
const pvs = [];
// let h: Handler;
// let meta: Meta | null = null;
// let cohandle: CollectionHandle = {}
const store = new Store();
const trans = new Transport();
const log = {
    info(data) {
        console.log(data);
    },
    error(e) {
        console.log(e);
    }
};
const meta = new Meta(store, log);

class Collection {
    // private _mkt: AllianceField = {};
    constructor() {
        this._screen = {width: 0, height: 0};
        this._user = {};
        this._app = {};
        if (wx.getUserInfo) {
            wx.getUserInfo({
                success: (o) => {
                    const userInfo = o.userInfo || {};
                    this._user.id = userInfo.user_EmpCode || userInfo.user_EMail || '';
                    this._user.loginName = userInfo.nickName || userInfo.user_ADAccount || '';
                    this._app.imei = userInfo.ph_imei || '';
                }
            });
        }
        if (typeof screen === 'object') {
            this._screen = {width: screen.width, height: screen.height};
        }
    }

    app() {
        if (cwx) {
            this._app.clientid = cwx.clientID || '';
            this._app.id = cwx.appId || '';
        }
        return this._app;
    }

    user() {
        return this._user;
    }

    screen() {
        return this._screen;
    }

    alliance() {
        return {};
    }
}

let cuid = 0;
Pageview.config({
    env: 'trippal',
    version: version
});

class API {
    constructor(_id = cuid) {
        this._id = _id;
        pvs[this._id] = new Pageview(new Collection, trans, log, meta);
    }

    id() {
        return this._id === 0 ? cuid : this._id;
    }

    // createPv(options: PageviewConfig, fn?: iCallback): UBT_WX {
    createPV(options, fn) {
        let instance;
        let pv;
        if (this._id === 0 && pvs[0] && !pvs[0].isDone()) {
            pv = pvs[0];
            instance = this;
        } else {
            cuid = cuid + 1;
            instance = new API(cuid);
            pv = pvs[cuid];
        }
        pv.setOptions(options, fn);
        return instance;
    }

    ubtMetric(option) {
        const pv = pvs[this.id()];
        pv.trackMetric({
            name: option.name,
            tag: option.tag || {},
            value: option.value,
            sample: 100
        });
    }

    trace(name, data, f) {
        const pv = pvs[this.id()];
        pv.trace(name, data, f);
    }
    ;

    ubtTrace(name, value, f) {
        const pv = pvs[this.id()];
        pv.trace(name, value, f);
    }

    ubtDevTrace(name, value, f) {
        const pv = pvs[this.id()];
        pv.devTrace(name, value, f);
    }

    set(name, value) {
        Pageview.set(name, value + '');
    }

    getState() {
        const bfa = meta.getBfa();
        return {
            pid: bfa.pid,
            vid: bfa.vid,
            sid: bfa.sid,
            pvid: bfa.pvid,
            cid: cwx.clientID || '',
        };
    }

    send(atype, options) {
        if (!atype)
            return this;
        const pv = pvs[this.id()];
        switch (atype) {
            case 'pv':
                return this.createPV(options);
            case 'trace':
                return this.trace(options.name, options.value);
            case 'tracelog':
                return this.ubtTrace(options.name, options.value);
            case 'metric':
                this.ubtMetric(options);
                break;
            case 'error':
                pv.trackError(options);
                break;
            case 'useraction':
                pv.trackEvent(options);
                break;
        }
        return this;
    }
}


export default new API();



