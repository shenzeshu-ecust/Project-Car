var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  __commonJS: () => __commonJS,
  import_cpage: () => import_cpage,
  init_cwx: () => init_cwx,
  init_resources_mapping: () => init_resources_mapping,
  resources_mapping_exports: () => resources_mapping_exports
});
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule2 = (target) => __defProp2(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export2 = (target, all) => {
  __markAsModule2(target);
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp2(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule2(__defProp2(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var global_exports = {};
__export2(global_exports, {
  default: () => global_default
});
var env, __global, global_default;
var init_global = __esm({
  "../nfes-miniapp/src/cwx/ext/global.js"() {
    env = "prd";
    try {
      let _env = wx.getStorageSync("globalEnvSetting");
      if (_env != null && _env.length) {
        env = _env;
      }
    } catch (e) {
    }
    __global = {
      appId: "5077",
      env,
      host: "m.ctrip.com",
      uat: "gateway.m.uat.qa.nt.ctripcorp.com",
      fat: "gateway.m.fws.qa.nt.ctripcorp.com",
      isInTrippal: typeof global.nwx !== "undefined",
      cwxVersion: "1.0.0"
    };
    Object.defineProperty(__global, "env", {
      get: function() {
        var _env = wx.getStorageSync("globalEnvSetting");
        if (_env != null && _env.length) {
        } else {
          _env = "prd";
        }
        return _env;
      }
    });
    global_default = __global;
  }
});
var handlerCallbacks_exports = {};
__export2(handlerCallbacks_exports, {
  createCallbackOptions: () => createCallbackOptions,
  handleWXAPICallback: () => handleWXAPICallback
});
function createWrapperId(apiName = "") {
  return prefix + apiName + "__" + n++;
}
var n, prefix, wxCallbacks, createCallbackOptions, handleWXAPICallback;
var init_handlerCallbacks = __esm({
  "../nfes-miniapp/src/cwx/nwx/handlerCallbacks.js"() {
    n = 0;
    prefix = "__wx__";
    wxCallbacks = {};
    createCallbackOptions = function(options, apiName) {
      const calbackFnName = createWrapperId(apiName);
      wxCallbacks[calbackFnName] = { apiName };
      for (const pro in options) {
        const tmp = options[pro];
        if (typeof tmp === "function") {
          const actionName = `${calbackFnName}.${pro}`;
          wxCallbacks[calbackFnName][pro] = tmp;
          options[pro] = actionName;
        }
      }
      return options;
    };
    handleWXAPICallback = function(evtType, res) {
      const evtArr = evtType.split(".");
      const [cbName, action] = evtArr;
      if (wxCallbacks[cbName] && wxCallbacks[cbName][action]) {
        try {
          if (typeof res === "string") {
            res = JSON.parse(res);
          }
        } catch (e) {
        }
        const isNotRemoveCallback = wxCallbacks[cbName][action](res);
        if (!isNotRemoveCallback) {
          if (wxCallbacks[cbName] && wxCallbacks[cbName].complete && action !== "complete") {
            delete wxCallbacks[cbName][action];
          } else {
            delete wxCallbacks[cbName];
          }
        }
      }
    };
  }
});
var util_exports = {};
__export2(util_exports, {
  createGuid: () => createGuid,
  getWXIdeCodeFromCache: () => getWXIdeCodeFromCache,
  saveWXIdeCodeToCache: () => saveWXIdeCodeToCache,
  sendApiToRemote: () => sendApiToRemote,
  socketDomain: () => socketDomain
});
function getWXIdeCodeFromCache() {
  return wx.getStorageSync(cacheKey) || {};
}
function saveWXIdeCodeToCache(opts) {
  const lastCache = getWXIdeCodeFromCache();
  return wx.setStorageSync(cacheKey, { ...lastCache, ...opts });
}
var cacheKey, socketDomain, createGuid, sendApiToRemote;
var init_util = __esm({
  "../nfes-miniapp/src/cwx/nwx/util.js"() {
    init_handlerCallbacks();
    cacheKey = "socket_debug_guid";
    socketDomain = "debugsocketserver.nfes.ctripcorp.com";
    createGuid = function() {
      let guid = parseInt(Math.random(1) * 1e8).toString();
      if (guid.length < 8) {
        guid += "0";
      }
      return guid;
    };
    sendApiToRemote = function({ socketTask: socketTask4, apiType, action, options }) {
      const args = createCallbackOptions(options);
      socketTask4.send({
        data: JSON.stringify({
          type: "call",
          apiType,
          action,
          args
        }),
        success: function(res) {
          console.log(`Call remote API ${apiType}.${action} Success.`);
        },
        fail: function(err) {
          console.log(`Call remote API ${apiType}.${action} Fail.`);
        }
      });
    };
  }
});
var wx_exports = {};
__export2(wx_exports, {
  default: () => wx_default,
  setWXSocketTask: () => setWXSocketTask
});
function createWXMockApi(target) {
  mockApiList.forEach(function(action) {
    if (global_default.isInTrippal) {
      if (wx[action]) {
        target["_" + action] = wx[action];
      }
      console.log("Can not find " + action + "in wx.");
    } else {
      target["_" + action] = function(options) {
        socketLogin_default();
        if (!socketTask) {
          ApiCallQueue.push({
            action,
            options
          });
        } else {
          sendApiToRemote({
            socketTask,
            apiType: "wx",
            action,
            options
          });
        }
      };
    }
  });
}
var socketTask, ApiCallQueue, mockApiList, wx_default, setWXSocketTask;
var init_wx = __esm({
  "../nfes-miniapp/src/cwx/nwx/wx.js"() {
    init_util();
    init_global();
    init_socketLogin();
    socketTask = null;
    ApiCallQueue = [];
    mockApiList = ["getSystemInfo", "getUserInfo"];
    wx_default = createWXMockApi;
    setWXSocketTask = function(_socketTask) {
      socketTask = _socketTask;
      if (ApiCallQueue.length) {
        let call = null;
        while (call = ApiCallQueue.shift()) {
          const {
            action,
            options
          } = call;
          sendApiToRemote({
            socketTask,
            apiType: "wx",
            action,
            options
          });
        }
      }
    };
  }
});
var checkWXIdeCode_exports = {};
__export2(checkWXIdeCode_exports, {
  default: () => checkWXIdeCode_default
});
var checkWXIdeCode, checkWXIdeCode_default;
var init_checkWXIdeCode = __esm({
  "../nfes-miniapp/src/cwx/nwx/checkWXIdeCode.js"() {
    init_util();
    checkWXIdeCode = function(wxIdeCode) {
      return new Promise(function(resolve, reject) {
        wx.request({
          url: "http://" + socketDomain + "/socket/checkSocketByCode?wxidecode=" + wxIdeCode,
          method: "GET",
          success: function(res) {
            console.log(res);
            if (res.data === "none") {
              reject(res);
            } else {
              resolve(res.data);
            }
          },
          fail: function(err) {
            reject(err);
          }
        });
      });
    };
    checkWXIdeCode_default = checkWXIdeCode;
  }
});
var getQrcode_exports = {};
__export2(getQrcode_exports, {
  default: () => getQrcode_default
});
function checkoutCodeInterVal(wxIdeCode, callback) {
  let begin = new Date().getTime();
  checkWXIdeCode_default(wxIdeCode).then(function(socketCode) {
    callback(socketCode);
  }).catch(function() {
    if (new Date().getTime() - begin > 3 * 60 * 1e3) {
      console.error("No Trippal Connected With Ide.");
    } else {
      console.log("Please scan the qrcode with TripPal.");
      setTimeout(function() {
        checkoutCodeInterVal(wxIdeCode, callback);
      }, 300);
    }
  });
}
var qrSrc, getQrcode, getQrcode_default;
var init_getQrcode = __esm({
  "../nfes-miniapp/src/cwx/nwx/getQrcode.js"() {
    init_util();
    init_checkWXIdeCode();
    qrSrc = "http://" + socketDomain + "/socket/createQrCode?wxidecode=";
    getQrcode = function(wxIdeCode) {
      console.log("wxIdeCode:", wxIdeCode);
      return new Promise(function(resolve, reject) {
        wx.previewImage({
          urls: [qrSrc + wxIdeCode],
          success: function() {
            checkoutCodeInterVal(wxIdeCode, function(socketCode) {
              console.log("wxIdeCode:", socketCode);
              console.log(6666, "\u6210\u529F");
              resolve(socketCode);
            });
          },
          fail: function(err) {
            console.error("Get Socket QRCode Failed.");
            reject(err);
          }
        });
      });
    };
    getQrcode_default = getQrcode;
  }
});
var socketLogin_exports = {};
__export2(socketLogin_exports, {
  default: () => socketLogin_default
});
function healthCheck() {
  setTimeout(function() {
    socketTask2.send({
      data: JSON.stringify({
        type: "health"
      })
    });
    if (isSocketReady) {
      healthCheck();
    }
  }, 10 * 1e3);
}
function socketLogin() {
  if (isInitSocket) {
    return;
  }
  isInitSocket = true;
  let { wxIdeCode, socketCode } = getWXIdeCodeFromCache();
  if (socketCode) {
    connectSocket(socketCode).then(function() {
    }).catch(function(err) {
      reLogin();
    });
  } else {
    reLogin();
  }
  function reLogin() {
    if (wxIdeCode) {
      checkWXIdeCode_default(wxIdeCode).then(function(socketCode2) {
        connectSocket(socketCode2, wxIdeCode);
      }).catch(function() {
        getQrcode_default(wxIdeCode).then(function(socketCode2) {
          connectSocket(socketCode2, wxIdeCode);
        });
      });
    } else {
      wxIdeCode = createGuid();
      getQrcode_default(wxIdeCode).then(function(socketCode2) {
        connectSocket(socketCode2, wxIdeCode);
      });
    }
  }
}
function connectSocket(socketCode, wxIdeCode) {
  return new Promise(function(resolve, reject) {
    socketTask2 = wx.connectSocket({
      url: socketUrl,
      protocols: [socketCode],
      success: function() {
        console.log("socket connect Ready");
      },
      fail: function(err) {
        console.log("socket connect Fail", err);
      }
    });
    console.log(socketTask2);
    socketTask2.onOpen(function() {
      console.log("socket Open");
      isSocketReady = true;
      saveWXIdeCodeToCache({ wxIdeCode, socketCode });
      setWXSocketTask(socketTask2);
      setNWXSocketTask(socketTask2);
      healthCheck();
      resolve();
    });
    socketTask2.onClose(function() {
      isSocketReady = false;
      console.log("socket Connect Close");
    });
    socketTask2.onError(function(err) {
      reject(err);
      console.log("socket Connect Error", err);
    });
    socketTask2.onMessage(function(e) {
      if (typeof e.data === "string") {
        try {
          const { type, callbackName, res, cwxVersion } = JSON.parse(e.data);
          if (type === "ready") {
            console.log("Trippal Connect Success");
          } else if (type === "response" && callbackName) {
            handleWXAPICallback(callbackName, res);
          } else if (type === "health") {
            console.log("health!");
          } else if (type === "error" || type === "closed") {
            console.error("Trippal Connected Closed,Please Reconnected!");
            setWXSocketTask(null);
            setNWXSocketTask(null);
            isInitSocket = false;
            socketTask2.close();
          } else if (type === "cwxVersion") {
            if (cwxVersion !== global_default.cwxVersion) {
              console.error("\u5F53\u524DCWX\u4E0D\u662F\u6700\u65B0\u7248\u672C\uFF0C\u8BF7\u66F4\u65B0CWX\uFF01");
            }
          }
        } catch (e2) {
          alert(e2.message);
        }
      }
      console.log("socket Message", e);
    });
  });
}
var isSocketReady, isInitSocket, socketTask2, socketUrl, socketLogin_default;
var init_socketLogin = __esm({
  "../nfes-miniapp/src/cwx/nwx/socketLogin.js"() {
    init_wx();
    init_nwx();
    init_global();
    init_util();
    init_handlerCallbacks();
    init_getQrcode();
    init_checkWXIdeCode();
    isSocketReady = false;
    isInitSocket = false;
    socketUrl = "ws://" + socketDomain + "/websocket";
    socketLogin_default = socketLogin;
  }
});
var nwx_exports = {};
__export2(nwx_exports, {
  default: () => nwx_default,
  setNWXSocketTask: () => setNWXSocketTask
});
var socketTask3, ApiCallQueue2, nwx_default, setNWXSocketTask;
var init_nwx = __esm({
  "../nfes-miniapp/src/cwx/nwx/nwx.js"() {
    init_socketLogin();
    init_util();
    init_global();
    ApiCallQueue2 = [];
    if (typeof global_default.isInTrippal === "undefined") {
      console.error("Can not find isInTrippal in ext/global.js!");
    }
    if (!global_default.isInTrippal || typeof window !== "undefined") {
      global.nwx = new Proxy({}, {
        get: function(_, action) {
          if (["blockBack", "blockDismiss", "sendUBT"].indexOf(action) > -1) {
            return;
          }
          return function(options = {}) {
            socketLogin_default();
            if (!socketTask3) {
              ApiCallQueue2.push({
                action,
                options
              });
            } else {
              sendApiToRemote({
                socketTask: socketTask3,
                apiType: "nwx",
                action,
                options
              });
            }
          };
        }
      });
    }
    nwx_default = global.nwx;
    setNWXSocketTask = function(_socketTask) {
      socketTask3 = _socketTask;
      if (ApiCallQueue2.length) {
        let call = null;
        while (call = ApiCallQueue2.shift()) {
          const {
            action,
            options
          } = call;
          sendApiToRemote({
            socketTask: socketTask3,
            apiType: "nwx",
            action,
            options
          });
        }
      }
    };
  }
});
var base_exports = {};
__export2(base_exports, {
  default: () => CPage_Module_Base
});
function wrapLifeCycle(cpage, type, isOnce) {
  let __type = "__" + type;
  let fn = cpage[type];
  let invoked = false;
  cpage[type] = function() {
    let args = Array.prototype.slice.call(arguments, 0);
    if (!isOnce || isOnce && !invoked) {
      invoked = true;
      if (type == "onLoad") {
        cpage.__page = this;
        this.__cpage = cpage;
      }
      fn && fn.apply(cpage, args);
    }
    cpage[__type] && cpage[__type].apply(this, args);
  };
}
var CPage_Module_Base;
var init_base = __esm({
  "../nfes-miniapp/src/cwx/cpage/base.js"() {
    init_global();
    CPage_Module_Base = class {
      constructor(options) {
        for (let key in options) {
          if (options.hasOwnProperty(key)) {
            switch (key) {
              case "onLoad":
              case "onReady":
              case "onShow":
              case "onHide":
              case "onUnload":
                this["__" + key] = options[key];
                break;
              default:
                this[key] = options[key];
                break;
            }
          }
        }
        let CPage3 = global_default.CPage;
        this.__isComponent = !!CPage3.__isComponent;
        wrapLifeCycle(this, "onLoad", true);
        wrapLifeCycle(this, "onReady", false);
        wrapLifeCycle(this, "onShow", false);
        wrapLifeCycle(this, "onHide", false);
        wrapLifeCycle(this, "onUnload", true);
      }
    };
  }
});
var util_exports2 = {};
__export2(util_exports2, {
  default: () => util_default
});
var util, util_default;
var init_util2 = __esm({
  "../nfes-miniapp/src/cwx/ext/util.js"() {
    init_global();
    if (typeof Object.assign != "function") {
      Object.assign = function(target) {
        "use strict";
        if (target == null) {
          throw new TypeError("Cannot convert undefined or null to object");
        }
        target = Object(target);
        for (let index = 1; index < arguments.length; index++) {
          let source = arguments[index];
          if (source != null) {
            for (let key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
        }
        return target;
      };
    }
    util = {};
    util.type = function(obj) {
      let ret = "";
      if (obj === null) {
        ret = "null";
      } else if (obj === void 0) {
        ret = "undefined";
      } else {
        let t = Object.prototype.toString.call(obj);
        let arr = t.match(/^\[object (\w+?)\]$/);
        if (arr) {
          ret = arr[1].toLowerCase();
        } else {
          ret = t;
        }
      }
      return ret;
    };
    util.compare = function(obj1, obj2) {
      return JSON.stringify(obj1) == JSON.stringify(obj2);
    };
    util.copy = function(obj) {
      let ret;
      switch (util.type(obj)) {
        case "array":
          ret = obj.map(util.copy);
          break;
        case "object":
          ret = {};
          for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
              ret[key] = util.copy(obj[key]);
            }
          }
          break;
        case "date":
          ret = new Date(+obj);
          break;
        default:
          ret = obj;
          break;
      }
      return ret;
    };
    util.isDevice = function() {
      return !global_default.navigator;
    };
    util.cc2str = function(input) {
      let output = "";
      for (let i = 0; i < input.length; i++) {
        output += String.fromCharCode(input[i]);
      }
      return output;
    };
    util.newBase64 = {
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      encode: function(input) {
        let output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
        input = util.newBase64._utf8_encode(input);
        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = (chr1 & 3) << 4 | chr2 >> 4;
          enc3 = (chr2 & 15) << 2 | chr3 >> 6;
          enc4 = chr3 & 63;
          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }
          output = output + util.newBase64._keyStr.charAt(enc1) + util.newBase64._keyStr.charAt(enc2) + util.newBase64._keyStr.charAt(enc3) + util.newBase64._keyStr.charAt(enc4);
        }
        return output;
      },
      decode: function(input) {
        let output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
          enc1 = util.newBase64._keyStr.indexOf(input.charAt(i++));
          enc2 = util.newBase64._keyStr.indexOf(input.charAt(i++));
          enc3 = util.newBase64._keyStr.indexOf(input.charAt(i++));
          enc4 = util.newBase64._keyStr.indexOf(input.charAt(i++));
          chr1 = enc1 << 2 | enc2 >> 4;
          chr2 = (enc2 & 15) << 4 | enc3 >> 2;
          chr3 = (enc3 & 3) << 6 | enc4;
          output = output + String.fromCharCode(chr1);
          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }
        }
        output = util.newBase64._utf8_decode(output);
        return output;
      },
      _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";
        for (let n2 = 0; n2 < string.length; n2++) {
          let c = string.charCodeAt(n2);
          if (c < 128) {
            utftext += String.fromCharCode(c);
          } else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode(c >> 6 | 192);
            utftext += String.fromCharCode(c & 63 | 128);
          } else {
            utftext += String.fromCharCode(c >> 12 | 224);
            utftext += String.fromCharCode(c >> 6 & 63 | 128);
            utftext += String.fromCharCode(c & 63 | 128);
          }
        }
        return utftext;
      },
      _utf8_decode: function(utftext) {
        let string = "", i = 0, c = 0, c1 = 0, c2 = 0, c3 = 0;
        while (i < utftext.length) {
          c = utftext.charCodeAt(i);
          if (c < 128) {
            string += String.fromCharCode(c);
            i++;
          } else if (c > 191 && c < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode((c & 31) << 6 | c2 & 63);
            i += 2;
          } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            i += 3;
          }
        }
        return string;
      }
    };
    util.base64 = {
      key: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      btoa: function(input, opts) {
        opts = opts || {};
        let key = opts.key || util.base64.key;
        let output = "";
        let i = 0;
        let fn = opts.charCodeArray ? function(i2) {
          return input[i2];
        } : function(i2) {
          return input.charCodeAt(i2);
        };
        while (i < input.length) {
          let chr1 = fn(i++);
          let chr2 = fn(i++);
          let chr3 = fn(i++);
          output += key[chr1 >> 2] + key[(chr1 & 3) << 4 | chr2 >> 4] + key[isNaN(chr2) ? 64 : (chr2 & 15) << 2 | chr3 >> 6] + key[isNaN(chr3) ? 64 : chr3 & 63];
        }
        return output;
      },
      atob: function(input, opts) {
        opts = opts || {};
        let key = opts.key || util.base64.key;
        let h = {};
        for (let i2 = 0; i2 < key.length; i2++) {
          h[key[i2]] = i2;
        }
        let arr = [];
        let i = 0;
        while (i < input.length) {
          let enc1 = h[input[i++]];
          let enc2 = h[input[i++]];
          let enc3 = h[input[i++]];
          let enc4 = h[input[i++]];
          arr.push(enc1 << 2 | enc2 >> 4);
          enc3 != 64 && arr.push((enc2 & 15) << 4 | enc3 >> 2);
          enc4 != 64 && arr.push((enc3 & 3) << 6 | enc4);
        }
        let output = opts.charCodeArray ? arr : util.cc2str(arr);
        return output;
      },
      encode: function(str) {
        return util.base64.btoa(unescape(encodeURIComponent(str)));
      },
      decode: function(str) {
        return decodeURIComponent(escape(util.base64.atob(str)));
      }
    };
    util.base64Encode = function(str) {
      return util.base64.encode(str);
    };
    util.base64Decode = function(base64str) {
      return util.base64.decode(base64str);
    };
    util.mktBase64Encode = function(str) {
      let baseStr = util.base64Encode(str);
      let chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      let length = Math.min(baseStr.length, chars.length);
      let begin = 0;
      let end = 0;
      do {
        begin = Math.floor(Math.random() * length);
        end = Math.floor(Math.random() * (length - begin)) + begin;
      } while (!(begin > 0 && end < length - 1 && end > begin + 1));
      let trim = baseStr.substr(begin, end - begin);
      let trans2 = trim.split("").reverse().join("");
      let result = baseStr.substr(0, begin) + trans2 + baseStr.substr(end, baseStr.length - end) + chars[begin] + chars[end];
      return result;
    };
    util.mktBase64Decode = function(str) {
      let chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      let length = str.length;
      let base = str.substr(0, str.length - 2);
      let begin = chars.indexOf(str.substr(length - 2, 1));
      let end = chars.indexOf(str.substr(length - 1, 1));
      let sub = base.substr(begin, end - begin);
      let trans2 = sub.split("").reverse().join("");
      let baseStr = base.substr(0, begin) + trans2 + base.substr(end, base.length - end);
      let result = util.base64Decode(baseStr);
      return result;
    };
    wx.getSystemInfo({
      success: function(res) {
        util.systemInfo = res;
      }
    });
    util_default = util;
  }
});
var ubt_wx_exports = {};
__export2(ubt_wx_exports, {
  default: () => ubt_wx_default
});
function getTimestamp() {
  return new Date().getTime();
}
function isNumeric(o) {
  const t = typeof o;
  return (t === "number" || t === "string") && !isNaN(o - parseFloat(o));
}
function isNumOrStr(o) {
  const t = typeof o;
  return t === "string" || t === "number";
}
function isSimpleType(o) {
  return !!SIMPLE_TYPE[typeof o];
}
function validName(name) {
  let t = typeof name;
  return name && (t == "string" && name.length < 100 || t == "number");
}
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
  if (typeof tag === "object") {
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
      } else if (type === "number")
        ;
      else {
        return 110;
      }
    }
  }
  return 1;
}
function random() {
  return parseInt(("" + Math.random()).slice(-8));
}
function uniqueID() {
  return random() ^ getTimestamp() & 2147483647;
}
var cwx, UZip, NOOP, VERSION, FP, CLIENTID, TID, AGENT, ENV, LANG, NETWORK, PLATFORM, APPID, MID, CALLID, CTRIPCITY, BUDATA, APP_NAME, APP_VERSION, APP_VER, IMEI, MAC, SCREENX, SCREENY, IDC, ADS_ZDATA, ADS_BID, SEARCH_ENGINE, SEARCH_KEYWORD, ABTEST, SOURCEID, USER_TOKEN, USER_NAME, USER_GRADE, USER_CORP, MKT_ID, MKT_SID, MKT_OUID, MKT_CREATETIME, PRODUCT_ID, PRODUCT_STARTCITY, CoHash, co, SIMPLE_TYPE, noop, Topic, PVTopic, TraceTopic, MetricTopic, ErrorTopic, ActionTopic, STORAGE_KEY, SESSION_MAX_LIEFTIME, Meta, Pageview, Transport, Store, version, pvs, store, trans, log, meta, Collection, cuid, API, ubt_wx_default;
var init_ubt_wx = __esm({
  "../nfes-miniapp/src/cwx/cpage/ubt_wx.js"() {
    init_global();
    cwx = global_default.cwx || {};
    UZip = function() {
      const r = 16384;
      const n2 = 3;
      const e = 127 + n2;
      const t = 16383;
      const o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
      const f = [];
      for (let i = 0; i < 64; i++) {
        f[o.charCodeAt(i)] = i;
      }
      function a(r2, n3) {
        return Math.min(r2, n3);
      }
      return {
        compress: function(f2) {
          const s = [];
          let g = [];
          let m = [];
          let b = [];
          let U = -1;
          let C = 0;
          let w = 0;
          let A = 0;
          let y = 0;
          f2 = unescape(encodeURIComponent(f2));
          for (let i = 0; i < f2.length; i++) {
            s.push(f2.charCodeAt(i));
          }
          function u() {
            for (var r2 = 0, e2 = w; e2 < w + n2; e2++)
              r2 *= 16777619, r2 ^= s[e2];
            return r2 & t;
          }
          function c(r2) {
            let n3;
            let t2;
            const o2 = a(r2 + e, w);
            for (n3 = r2, t2 = w; n3 < o2 && t2 < s.length && s[n3] == s[t2]; n3++, t2++)
              ;
            return n3 - r2;
          }
          function h() {
            for (var r2 = U; r2 < w; r2 += 127) {
              var n3 = a(127, w - r2);
              v(255 & -n3);
              for (var e2 = r2; e2 < w && e2 < r2 + n3; e2++)
                v(s[e2]);
            }
          }
          function v(r2) {
            var n3 = A << 6 - y;
            p(63 & (n3 |= (A = 255 & r2) >> (y += 2))), y >= 6 && p(63 & (n3 = A >> (y -= 6)));
          }
          function l() {
            if (y == 2)
              p(r2 = A << 4 & 63);
            else if (y == 4) {
              var r2 = A << 2 & 63;
              p(r2);
            }
            return b.join("");
          }
          function p(r2) {
            b.push(o.charAt(r2));
          }
          v(19);
          for (let I = 0; I < s.length && w < s.length; I += r) {
            if (I > 0) {
              m = m.slice(r);
            }
            (function() {
              for (let t2 = a(I + 2 * r, s.length), o2 = a(t2, s.length - n2 + 1); w < t2; w++) {
                let f3 = 0;
                let i = 0;
                if (w < o2) {
                  let l2 = u();
                  if (w >= C) {
                    for (let p2 = g[l2] - 1; f3 != e && p2 >= 0 && p2 >= w - r; ) {
                      let d = c(p2);
                      d >= n2 && d > f3 && (i = w - p2 - (f3 = d));
                      p2 = m[p2 - I];
                    }
                  }
                  m[w - I] = g[l2] - 1;
                  g[l2] = w + 1;
                }
                if (f3 >= n2) {
                  for (C = w + f3, U != -1 && (h(), U = -1), v(f3 - n2); i > 127; ) {
                    v(255 & (127 & i | 128)), i >>= 7;
                  }
                  v(i);
                } else {
                  w >= C && U == -1 && (U = w);
                }
              }
            })();
          }
          if (U != -1) {
            h();
          }
          return l();
        }
      };
    }();
    NOOP = () => {
    };
    VERSION = "VERSION";
    FP = "FP";
    CLIENTID = "CLIENTID";
    TID = "TID";
    AGENT = "AGENT";
    ENV = "ENV";
    LANG = "LANG";
    NETWORK = "NETWORK";
    PLATFORM = "PLATFORM";
    APPID = "APPID";
    MID = "MID";
    CALLID = "CALLID";
    CTRIPCITY = "CTRIPCITY";
    BUDATA = "BUDATA";
    APP_NAME = "APP_NAME";
    APP_VERSION = "APP_VERSION";
    APP_VER = "APP_VER";
    IMEI = "IMEI";
    MAC = "MAC";
    SCREENX = "SCREENX";
    SCREENY = "SCREENY";
    IDC = "IDC";
    ADS_ZDATA = "ADS_ZDATA";
    ADS_BID = "ADS_BID";
    SEARCH_ENGINE = "SEARCH_ENGINE";
    SEARCH_KEYWORD = "SEARCH_KEYWORD";
    ABTEST = "ABTEST";
    SOURCEID = "SOURCEID";
    USER_TOKEN = "USER_TOKEN";
    USER_NAME = "USER_NAME";
    USER_GRADE = "USER_GRADE";
    USER_CORP = "USER_CORP";
    MKT_ID = "MKT_ID";
    MKT_SID = "MKT_SID";
    MKT_OUID = "MKT_OUID";
    MKT_CREATETIME = "MKT_CREATETIME";
    PRODUCT_ID = "PRODUCT.ID";
    PRODUCT_STARTCITY = "PRODUCT.STARTCITY";
    CoHash = class {
      constructor() {
        this.memo = {};
      }
      get(name, val) {
        const v = this.memo[name];
        return typeof v != "undefined" ? v : val;
      }
      set(name, val) {
        this.memo[name] = val;
      }
    };
    co = new CoHash();
    SIMPLE_TYPE = { "string": true, "number": true, "boolean": true };
    noop = function() {
    };
    Topic = class {
      constructor(type) {
        this.type = type;
        this.version = co.get(VERSION, "");
        this.ts = new Date().getTime();
        this.priority = 6;
        this.fn = () => {
        };
      }
      setFn(fn) {
        if (typeof fn === "function") {
          this.fn = fn;
        }
      }
      forHttp() {
        const dataType = this.type;
        const c = this.c;
        const d = this.data;
        let obj = {};
        let params = "";
        switch (dataType) {
          case "useraction":
          case "matrix":
            obj = [
              [2, dataType],
              c,
              [d]
            ];
            params = "ac=a&d=";
            break;
          case "tiled_tl":
            obj = {
              type: dataType,
              common: c,
              data: [d]
            };
            params = "ac=ntl&d=";
            break;
          case "uinfo":
          case "error":
            obj = {
              c,
              d: {
                [dataType]: d
              }
            };
            params = "ac=g&d=";
            break;
        }
        params += UZip.compress(JSON.stringify(obj)) + "&c=1&v=" + this.version;
        return params;
      }
      forTcp(category = "") {
        this.c[9] = co.get(AGENT, "");
        return {
          dataType: this.type,
          c: this.c,
          d: this.type == "tiled_tl" || this.type == "matrix" ? [this.data] : this.data,
          category,
          priority: this.priority
        };
      }
    };
    PVTopic = class extends Topic {
      constructor(data) {
        super("uinfo");
        this.data = data;
      }
    };
    TraceTopic = class extends Topic {
      constructor(data) {
        super("tiled_tl");
        this.v = 0;
        data.v = data.v || this.v;
        this.data = data;
      }
    };
    MetricTopic = class extends Topic {
      constructor(options) {
        super("matrix");
        this.data = options;
      }
    };
    ErrorTopic = class extends Topic {
      constructor(data) {
        super("error");
        this.data = [7, "", 0, "", "", "", 0, 1, 1, "", 0, ""];
        this.data[1] = data.message;
        this.data[2] = data.line || 0;
        this.data[3] = data.file || "";
        this.data[4] = data.category || "";
        this.data[5] = data.framework || "";
        this.data[6] = data.time || 0;
        this.data[7] = 1;
        this.data[8] = data.isLogin ? 1 : 0;
        this.data[9] = data.name || "";
        this.data[10] = data.column || 0;
        this.data[11] = data.stack || "";
      }
    };
    ActionTopic = class extends Topic {
      constructor(data) {
        super("useraction");
        if (!data.ts) {
          data.ts = getTimestamp();
        }
        this.data = data;
      }
    };
    STORAGE_KEY = "CTRIP_UBT_M";
    SESSION_MAX_LIEFTIME = 18e5;
    Meta = class {
      constructor(store2, log2) {
        this.store = store2;
        this.log = log2;
        this.fns = [];
        this.pid = "";
        this.vid = getTimestamp() + "." + uniqueID().toString(36);
        this.sid = 1;
        this.pvid = 0;
        this.ts = getTimestamp();
        this._isInit = false;
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
          this.fns.forEach((fn) => fn());
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
          ts: this.ts
        };
      }
      init(fn) {
        this.store.get(STORAGE_KEY).then((ret) => {
          if (ret) {
            fn(JSON.parse(ret));
          }
          fn(null);
        }).catch((e) => {
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
        this.store.set(STORAGE_KEY, JSON.stringify(d)).catch((e) => {
          this.log.error(e);
        });
      }
    };
    Pageview = class {
      constructor(collection, trans2, log2, meta2) {
        this.collection = collection;
        this.trans = trans2;
        this.log = log2;
        this.meta = meta2;
        this.pid = "wait";
        this.id = 0;
        this.ppi = "0";
        this.ppv = 0;
        this.isNewSess = 0;
        this.url = "";
        this.refer = "";
        this.orderid = "";
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
          this.fns.forEach((f) => f());
          this.fns = [];
        });
      }
      static config(cfg) {
        co.set(ENV, cfg.env);
        co.set(VERSION, cfg.version);
      }
      static set(name, value) {
        switch (name) {
          case "abtest":
            co.set(ABTEST, value);
            break;
          case "version":
            co.set(VERSION, value);
            break;
        }
      }
      isDone() {
        return this._done;
      }
      setOptions(options, fn) {
        if (typeof fn === "function")
          this._fn = fn;
        if (typeof options === "object") {
          if (options.pageId) {
            this.pid = options.pageId + "";
          }
          if (options.page_id) {
            this.pid = options.page_id + "";
          }
          if (typeof options["url"] === "string") {
            this.url = options["url"];
          }
          if (typeof options["refer"] === "string") {
            this.refer = options["refer"];
          }
          if (isNumOrStr(options["orderid"])) {
            this.orderid = options["orderid"] + "";
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
      setStr(name, value, max = 200) {
        if (typeof value === "string") {
          co.set(name, value.substring(0, max));
        }
      }
      setNum(name, value) {
        if (typeof value === "number") {
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
        if (h.user) {
          const user = h.user();
          this.setStr(USER_TOKEN, user.id);
          this.setStr(USER_NAME, user.loginName);
        }
        if (h.screen) {
          const screen2 = h.screen();
          this.setNum(SCREENX, screen2.width);
          this.setNum(SCREENY, screen2.height);
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
        if (this.pid && this.pid != "0" && this.pid != "ignore_page_pv" && this.pid != "wait" && this._isReady && !this._done) {
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
          co.get(TID, ""),
          co.get(ABTEST, ""),
          co.get(MID, ""),
          co.get(VERSION, ""),
          co.get(FP, ""),
          "",
          co.get(APPID, ""),
          co.get(IMEI, ""),
          co.get(MAC, ""),
          co.get(USER_TOKEN, "Unknown"),
          co.get(ENV, ""),
          co.get(IDC, "")
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
          clientcode: co.get(CLIENTID, "")
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
        info[6] = "";
        info[7] = co.get(LANG, "");
        info[8] = co.get(SEARCH_ENGINE, "");
        info[9] = co.get(SEARCH_KEYWORD, "");
        info[10] = this.refer;
        info[11] = co.get(ABTEST, "");
        info[12] = this.meta.isNewVisitor;
        info[13] = co.get(USER_TOKEN, "") != "" ? 1 : 0;
        info[14] = co.get(USER_NAME, "");
        info[15] = co.get(USER_GRADE, "");
        info[16] = co.get(USER_CORP, "");
        info[17] = co.get(PRODUCT_STARTCITY, "");
        info[18] = co.get(MKT_ID, "");
        info[19] = co.get(MKT_SID, "");
        info[20] = co.get(MKT_OUID, "");
        info[21] = this.orderid;
        info[22] = co.get(USER_TOKEN, "");
        info[23] = co.get(ADS_ZDATA, "");
        info[24] = co.get(CALLID, "");
        info[25] = co.get(ADS_BID, "");
        info[26] = co.get(CLIENTID, "");
        info[27] = co.get(SOURCEID, "");
        info[28] = JSON.stringify({
          app: co.get(APP_NAME, ""),
          version: co.get(APP_VERSION, ""),
          ver: co.get(APP_VER, ""),
          net: co.get(NETWORK, "None"),
          platform: co.get(PLATFORM, "")
        });
        info[29] = co.get(ENV, "");
        info[30] = 1;
        info[31] = this.isNewSess;
        info[32] = JSON.stringify({
          city: co.get(CTRIPCITY, "")
        });
        info[33] = co.get(PRODUCT_ID, "");
        info[34] = "";
        info[35] = "";
        info[36] = co.get(BUDATA, "");
        info[37] = co.get(MKT_CREATETIME, "");
        return info;
      }
      transport(t, f) {
        if (f)
          t.setFn(f);
        if (this._done || t.type == "error" || t.type == "uinfo") {
          this.log.info("send " + t.type);
          t.c = this.getCommon();
          if (t.type === "tiled_tl") {
            t.data.clientid = co.get(CLIENTID, "");
            t.data.duid = co.get(USER_TOKEN, "");
          }
          this.trans.send(t).then(t.fn).catch((e) => {
            t.fn(false, e);
          });
        } else {
          this.topics.push(t);
        }
      }
      trace(name, data, f = NOOP) {
        if (validName(name)) {
          if (typeof data === "string") {
            this.transport(new TraceTopic({
              key: name,
              val: { data },
              applet_scene: (cwx.scene || "") + "",
              v: 0
            }), f);
          } else if (validMap(data)) {
            this.transport(new TraceTopic({
              key: name,
              val: data,
              applet_scene: (cwx.scene || "") + "",
              v: 0
            }), f);
          } else {
            f(false, "invalid data");
          }
        } else {
          f(false, "invalid id");
        }
      }
      devTrace(name, data, f = NOOP) {
        if (validName(name)) {
          if (typeof data === "string") {
            this.transport(new TraceTopic({
              key: name,
              val: { data },
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
              v: 0
            }), f);
          } else {
            f(false, "invalid data");
          }
        } else {
          f(false, "invalid id");
        }
      }
      trackMetric(options) {
        if (typeof options === "object") {
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
            f(false, "invalid id");
          }
        }
      }
      trackError(options, fn) {
        if (options.message) {
          this.transport(new ErrorTopic(options), fn);
        } else if (fn) {
          fn(false, "invalid data");
        }
      }
      trackEvent(data, fn) {
        if (data.type && data.xpath) {
          this.transport(new ActionTopic(data), fn);
        } else if (fn) {
          fn(false, "invalid data");
        }
      }
    };
    Transport = class {
      send(d) {
        return new Promise((resolve) => {
          if (typeof nwx != "undefined" && nwx.sendUBT) {
            nwx.sendUBT(d.forTcp());
            return resolve(true);
          } else {
            if (wx.request) {
              wx.request({
                url: "https://s.c-ctrip.com/bf.gif?" + d.forHttp(),
                method: "GET",
                success: function() {
                  resolve(true);
                },
                fail: function() {
                  resolve(false);
                }
              });
            }
          }
        });
      }
    };
    Store = class {
      constructor() {
        this.memo = {};
      }
      get(name) {
        return new Promise((resolve) => {
          return resolve(this.memo[name] || "");
        });
      }
      set(name, value) {
        this.memo[name] = value;
        return Promise.resolve(true);
      }
    };
    version = "0.1.2";
    pvs = [];
    store = new Store();
    trans = new Transport();
    log = {
      info(data) {
        console.log(data);
      },
      error(e) {
        console.log(e);
      }
    };
    meta = new Meta(store, log);
    Collection = class {
      constructor() {
        this._screen = { width: 0, height: 0 };
        this._user = {};
        this._app = {};
        if (wx.getUserInfo) {
          wx.getUserInfo({
            success: (o) => {
              const userInfo = o.userInfo || {};
              this._user.id = userInfo.user_EmpCode || userInfo.user_EMail || "";
              this._user.loginName = userInfo.nickName || userInfo.user_ADAccount || "";
              this._app.imei = userInfo.ph_imei || "";
            }
          });
        }
        if (typeof screen === "object") {
          this._screen = { width: screen.width, height: screen.height };
        }
      }
      app() {
        if (cwx) {
          this._app.clientid = cwx.clientID || "";
          this._app.id = cwx.appId || "";
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
    };
    cuid = 0;
    Pageview.config({
      env: "trippal",
      version
    });
    API = class {
      constructor(_id = cuid) {
        this._id = _id;
        pvs[this._id] = new Pageview(new Collection(), trans, log, meta);
      }
      id() {
        return this._id === 0 ? cuid : this._id;
      }
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
      ubtTrace(name, value, f) {
        const pv = pvs[this.id()];
        pv.trace(name, value, f);
      }
      ubtDevTrace(name, value, f) {
        const pv = pvs[this.id()];
        pv.devTrace(name, value, f);
      }
      set(name, value) {
        Pageview.set(name, value + "");
      }
      getState() {
        const bfa = meta.getBfa();
        return {
          pid: bfa.pid,
          vid: bfa.vid,
          sid: bfa.sid,
          pvid: bfa.pvid,
          cid: cwx.clientID || ""
        };
      }
      send(atype, options) {
        if (!atype)
          return this;
        const pv = pvs[this.id()];
        switch (atype) {
          case "pv":
            return this.createPV(options);
          case "trace":
            return this.trace(options.name, options.value);
          case "tracelog":
            return this.ubtTrace(options.name, options.value);
          case "metric":
            this.ubtMetric(options);
            break;
          case "error":
            pv.trackError(options);
            break;
          case "useraction":
            pv.trackEvent(options);
            break;
        }
        return this;
      }
    };
    ubt_wx_default = new API();
  }
});
var ubt_exports = {};
__export2(ubt_exports, {
  default: () => ubt_default
});
function serializeQueryObj(obj) {
  let ret = [];
  for (let k in obj) {
    if (obj.hasOwnProperty(k) && k != "__navigator") {
      let t = typeof obj[k];
      if (t == "string" || t == "number" || t == "boolean") {
        ret.push(encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]));
      }
    }
  }
  return ret.length > 0 ? "?" + ret.join("&") : "";
}
var cwx2, CPage, CPage_Module_UBT, UBT, ubt_default;
var init_ubt = __esm({
  "../nfes-miniapp/src/cwx/cpage/ubt.js"() {
    init_global();
    init_ubt_wx();
    cwx2 = global_default.cwx;
    CPage = global_default.CPage;
    CPage_Module_UBT = class extends CPage.baseClass {
      constructor(options) {
        let newOptions = {};
        let _this;
        for (let key in options) {
          if (options.hasOwnProperty(key)) {
            switch (key) {
              case "ubtTrack":
              case "ubtMetric":
              case "ubtTrace":
                break;
              case "onLoad":
              case "onReady":
              case "onShow":
              case "onHide":
              case "onUnload":
                newOptions[key] = eventWrapper(key, options[key], false);
                break;
              default:
                if (!CPage.__isComponent && cwx2.util.type(options[key]) == "function") {
                  newOptions[key] = eventWrapper(key, options[key], true);
                } else {
                  newOptions[key] = options[key];
                }
                break;
            }
          }
        }
        newOptions.ubtTrack = eventWrapper("ubtTrack", null, true);
        super(newOptions);
        _this = this;
        this.__ubt_instance = ubt_wx_default.createPV();
        this.__ubt_events = {};
        function eventWrapper(name, fn, isLogEvent) {
          return function(evt) {
            if (isLogEvent && _this.__ubt_isEvent(arguments)) {
              _this.__ubt_logTap(evt, name);
            }
            let args = Array.prototype.slice.call(arguments, 0);
            let ret;
            if (fn) {
              try {
                ret = fn.apply(_this.__page, args);
              } catch (e) {
                try {
                  if (typeof e == "string") {
                    e = new Error(e);
                  }
                  let obj = {
                    message: e && e.message,
                    file: 0,
                    category: "inner-error",
                    framework: "normal",
                    time: 0,
                    line: 0,
                    column: 0,
                    stack: e && e.stack && e.stack.split("\n"),
                    repeat: 1
                  };
                  _this.__ubt_instance.send("error", obj);
                } catch (e2) {
                }
                ;
                if (cwx2.util.isDevice()) {
                  setTimeout(function() {
                    throw e;
                  }, 0);
                } else {
                  throw e;
                }
              }
            }
            return ret;
          };
        }
      }
      onLoad(options) {
        console.log("UBT onLoad");
        super.onLoad && super.onLoad(options);
        this.__ubt_totalActiveTime = 0;
        this.__ubt_querystring = serializeQueryObj(options);
        this.__ubt_onLoadTime = +new Date();
        this.__ubt_isBack = false;
        this.__ubt_isBackFlag = false;
      }
      onReady() {
        super.onReady && super.onReady();
        if (!this.__ubt_isBack) {
          this.__ubt_onActiveTime = +new Date();
        }
        let ubtPs = this.__ubt_getPageInfo();
        ubtPs.readyTime = +new Date() - this.__ubt_onLoadTime;
        if (!this.__isComponent) {
          if (cwx2.config.ubtDebug) {
            console.log("UBT Page Performance", ubtPs);
          }
          this.__ubt_instance.send("metric", {
            name: 100359,
            value: ubtPs.readyTime
          });
        }
      }
      onShow() {
        super.onShow && super.onShow();
        if (this.hasOwnProperty("__ubt_isBackFlag")) {
          delete this.__ubt_isBackFlag;
        } else {
          this.__ubt_isBack = true;
        }
        if (this.__ubt_isBack) {
          this.__ubt_onActiveTime = +new Date();
        }
        let ubtPv = this.__ubt_getPageInfo();
        ubtPv.isBack = this.__ubt_isBack;
        ubtPv.url = "" + this.__page.__route__ + this.__ubt_querystring;
        console.log("UBT onShow", ubtPv.pageId);
        if (!this.__isComponent) {
          if (cwx2.config.ubtDebug) {
            console.log("UBT Pageview", ubtPv);
          }
          if (ubtPv.pageId != "ignore_page_pv") {
            this.__ubt_instance = this.__ubt_instance.send("pv", ubtPv);
          }
        }
      }
      onHide() {
        super.onHide && super.onHide();
        this.__ubt_totalActiveTime += +new Date() - this.__ubt_onActiveTime;
      }
      onUnload() {
        super.onUnload && super.onUnload();
        this.__ubt_totalActiveTime += +new Date() - this.__ubt_onActiveTime;
        if (!this.__isComponent) {
          this.__ubt_instance.send("metric", {
            name: 100370,
            value: this.__ubt_totalActiveTime
          });
        }
      }
      __ubt_isEvent(args) {
        let evt = args[0];
        let ret = args.length == 1 && evt && evt.timeStamp && (evt.type == "tap" || evt.type == "longtap") && !this.__ubt_events.hasOwnProperty(evt.type + "_" + evt.timeStamp) && evt.touches && evt.touches[0] && evt.target && evt.currentTarget;
        return !!ret;
      }
      __ubt_getPageInfo() {
        let ret = {};
        if (this.__isComponent) {
          let ins = this.__page;
          while (!ins.__isComponent) {
            ins = ins.__page;
          }
          ret.pageId = "" + (ins.pageId || ins.pageid || "0");
        } else {
          ret.pageId = "" + (this.pageId || this.pageid || "0");
        }
        return ret;
      }
      __ubt_logTap(evt, fn) {
        let _this = this;
        let key = evt.type + "_" + evt.timeStamp;
        this.__ubt_events[key] = true;
        setTimeout(function() {
          delete _this.__ubt_events[key];
        }, 1e3);
        let ubtEvt = this.__ubt_getPageInfo();
        ubtEvt.type = evt.type;
        ubtEvt.xpath = "//Page";
        if (!cwx2.util.compare(evt.currentTarget, evt.target)) {
          ubtEvt.xpath += "/CurrentTarget";
          let currentTargetId = evt.currentTarget.id;
          if (currentTargetId) {
            ubtEvt.xpath += "[@id=" + currentTargetId + "]";
          }
          let currentTargetCid = evt.currentTarget.dataset["ubtKey"];
          if (currentTargetCid) {
            ubtEvt.xpath += "[@cid=" + currentTargetCid + "]";
          }
        }
        ubtEvt.xpath += "/Target";
        let targetId = evt.target.id;
        if (typeof fn === "string") {
          ubtEvt.xpath += "[@fn=" + fn + "]";
        }
        ;
        if (targetId) {
          ubtEvt.xpath += "[@id=" + targetId + "]";
        }
        let targetCid = evt.target.dataset["ubtKey"];
        if (targetCid) {
          ubtEvt.xpath += "[@cid=" + targetCid + "]";
        }
        ubtEvt.xpath += "[@x=" + evt.touches[0].pageX + "]";
        ubtEvt.xpath += "[@y=" + evt.touches[0].pageY + "]";
        if (cwx2.config.ubtDebug) {
          console.log("UBT Page Event", ubtEvt);
        }
        this.__ubt_instance.send("useraction", {
          action: "click",
          ts: +new Date(),
          xpath: ubtEvt.xpath
        });
      }
      trace(name, value) {
        this.__ubt_instance.send("trace", {
          name,
          value
        });
      }
      ubtTrace(name, value) {
        this.__ubt_instance.send("tracelog", {
          name,
          value
        });
      }
      ubtMetric(option) {
        this.__ubt_instance.send("metric", option || {});
      }
      ubtDevTrace(name, value) {
        ubt_wx_default.ubtDevTrace(name, value);
      }
      ubtSet(name, value) {
        ubt_wx_default.set(name, value);
      }
      ubtSendPV(option) {
        this.__ubt_instance = this.__ubt_instance.send("pv", option || {});
      }
    };
    UBT = {};
    global_default.UBT = UBT;
    ubt_default = CPage_Module_UBT;
  }
});
var require_cpage = __commonJS({
  "../nfes-miniapp/src/cwx/cpage/cpage.js"(exports, module2) {
    init_global();
    init_base();
    init_util2();
    var instanceId = 0;
    var findAPIs = function(obj) {
      let res = ["onShow", "onReady", "onHide", "onUnload"];
      for (let pro in obj) {
        if (typeof obj[pro] === "function" && !["onLoad"].includes(pro)) {
          res.push(pro);
        }
      }
      return res;
    };
    var CPage3 = function(options) {
      if (CPage3.__isComponent) {
        let copyOptions = util_default.copy(options);
        CPage3.createInstance(copyOptions);
      } else {
        const apis = findAPIs(options);
        let pageData = {
          onPageScroll: function() {
          },
          onLoad: function() {
            let _this = this;
            let args = Array.prototype.slice.call(arguments, 0);
            let copyOptions = util_default.copy(options);
            let ins = CPage3.createInstance(copyOptions);
            for (let k in ins) {
              if (ins.hasOwnProperty(k)) {
                if (k == "data") {
                  this.data = ins[k];
                  this.setData(ins[k]);
                } else if (k == "__cpage" || k.indexOf("__") != 0 || copyOptions.hasOwnProperty(k)) {
                  _this[k] = ins[k];
                }
              }
            }
            apis.forEach(function(f) {
              if (ins[f]) {
                _this["_m_" + f] = ins[f].bind(ins);
              }
            });
            let t = ins.__proto__;
            while (t && t != Object.prototype) {
              Object.getOwnPropertyNames(t).forEach(function(k) {
                if (k != "constructor" && k != "__proto__") {
                  if (k.indexOf("__") != 0) {
                    if (util_default.type(t[k]) == "function") {
                      if (ins[k] === t[k]) {
                        _this[k] = t[k].bind(ins);
                      }
                    } else {
                      _this[k] = t[k];
                    }
                  }
                }
              });
              t = t.__proto__;
            }
            this.onLoad.apply(this, args);
            if (this.onShareAppMessage) {
            }
          }
        };
        if (options.data) {
          pageData.data = util_default.copy(options.data);
          delete options.data;
        }
        if (options.onShareAppMessage) {
          try {
            let onShareAppMessage = options.onShareAppMessage;
            let wrapOnShareAppMessage = function(res) {
              let shareData = onShareAppMessage.call(this, res);
              if (this.ubtTrace) {
                let ubtData = util_default.copy(shareData);
                this.ubtTrace("wxshare", ubtData);
              }
              let originSuccess = shareData.success;
              shareData.success = function(res2) {
                if (res2 && res2.shareTickets) {
                  global_default.cwx.shareTicket = res2.shareTickets[0];
                }
                if (originSuccess) {
                  originSuccess.call(this, res2);
                }
              };
              return shareData;
            };
            pageData.onShareAppMessage = wrapOnShareAppMessage;
            delete options.onShareAppMessage;
          } catch (e) {
            console.log("wrapOnShareAppMessage error");
          }
        }
        if (options.onPageScroll) {
          pageData.onPageScroll = function() {
          };
        }
        apis.forEach(function(f) {
          if (typeof pageData[f] === "undefined") {
            pageData[f] = function(...args) {
              this["_m_" + f] && this["_m_" + f].call(this, ...args);
            };
          }
        });
        if (!pageData.pageId) {
          pageData.pageId = 8888999;
        }
        Page(pageData);
      }
    };
    CPage3.__isComponent = 0;
    CPage3.__cache = [];
    CPage3.createInstance = function(options) {
      let a = CPage3.__isComponent;
      let ins = new CPage3.baseClass(options);
      ins.__instanceId = instanceId++;
      let b = CPage3.__isComponent;
      if (CPage3.__isComponent) {
        CPage3.__cache[CPage3.__isComponent] = {
          id: ins.__instanceId,
          options,
          instance: ins
        };
      }
      console.log("\u521B\u5EFApage\u5B9E\u4F8B");
      return ins;
    };
    CPage3.baseClass = CPage_Module_Base;
    CPage3.modules = {
      "UBT": function() {
        return (init_ubt(), ubt_exports).default;
      }
    };
    CPage3.use = function(subClass) {
      console.log("\u5F00\u59CB\u6CE8\u518C\u63D2\u4EF6", subClass);
      if (util_default.type(subClass) == "string") {
        let fn = CPage3.modules[subClass];
        if (util_default.type(fn) == "function") {
          subClass = fn();
        } else {
          throw "Unknow CPage module " + subClass;
        }
      }
      if (util_default.type(subClass) == "function") {
        CPage3.baseClass = subClass;
      } else {
        throw "CPage module only support class";
      }
      console.log("\u5F00\u59CB\u6CE8\u518C\u63D2\u4EF6 CPage.baseClass");
    };
    module2.exports = CPage3;
  }
});
var config_exports = {};
__export2(config_exports, {
  default: () => config_default
});
var config, config_default;
var init_config = __esm({
  "../nfes-miniapp/src/cwx/cpage/config.js"() {
    init_global();
    config = {
      hasInit: false,
      init: function() {
        if (!this.hasInit) {
          global_default.CPage.use("UBT");
          this.hasInit = true;
        }
      },
      ubtDebug: false
    };
    config_default = config;
  }
});
var require_cwx_request = __commonJS({
  "../nfes-miniapp/src/cwx/ext/cwx.request.js"(exports, module2) {
    var __global2 = (init_global(), global_exports);
    var requestd = {};
    module2.exports = requestd;
  }
});
var cwx_events_exports = {};
__export2(cwx_events_exports, {
  default: () => cwx_events_default
});
var Events, cwx_events_default;
var init_cwx_events = __esm({
  "../nfes-miniapp/src/cwx/ext/cwx.events.js"() {
    Events = class {
      constructor() {
        this.events = {};
        this.datas = {};
      }
      subscribe(event, callback) {
        if (this.datas[event]) {
          callback && callback(...this.datas[event]);
          return;
        }
        if (this.events[event]) {
          this.events[event].push(callback);
        } else {
          this.events[event] = [callback];
        }
      }
      publish(event) {
        let args = Array.prototype.slice.call(arguments, 1);
        this.datas[event] = args;
        const subscribedEvents = this.events[event];
        if (subscribedEvents && subscribedEvents.length) {
          subscribedEvents.forEach((callback) => {
            callback.call(this, ...args);
          });
        }
      }
      unsubscribe(event, callback) {
        if (!callback) {
          delete this.events[event];
          delete this.datas[event];
        }
        const subscribedEvents = this.events[event];
        if (subscribedEvents && subscribedEvents.length) {
          this.events[event] = this.events[event].filter((cb) => cb !== callback);
        }
      }
    };
    cwx_events_default = new Events();
  }
});
var cwx_exports = {};
__export2(cwx_exports, {
  CPage: () => import_cpage.default,
  __global: () => global_default,
  cwx: () => cwx3,
  default: () => cwx_default,
  nwx: () => nwx_default
});
var import_cpage, cwx3, cwx_default;
var init_cwx = __esm({
  "../nfes-miniapp/src/cwx/cwx.js"() {
    init_global();
    init_nwx();
    init_wx();
    import_cpage = __toModule(require_cpage());
    cwx3 = global_default.cwx = function() {
      const cwx4 = Object.create(wx, {
        config: {
          get: function() {
            return (init_config(), config_exports).default;
          },
          enumerable: true
        },
        util: {
          value: (init_util2(), util_exports2).default,
          enumerable: true
        },
        request: {
          get: function() {
            return require_cwx_request().request;
          },
          enumerable: true
        },
        appId: {
          enumerable: true,
          value: global_default.appId
        },
        events: {
          get: function() {
            return (init_cwx_events(), cwx_events_exports).default;
          },
          enumerable: true
        }
      });
      cwx4.getCurrentPage = function() {
        var pages, page;
        try {
          pages = getCurrentPages();
          page = pages && pages.length ? pages[pages.length - 1] : null;
        } catch (e) {
          page = getApp().getCurrentPage();
        }
        return page;
      };
      cwx4.systemCode = "30";
      wx_default(cwx4);
      return cwx4;
    }();
    global_default.CPage = import_cpage.default;
    global.cwx = {
      __global: global_default,
      cwx: cwx3,
      CPage: import_cpage.default,
      nwx: nwx_default
    };
    cwx3.config.init();
    cwx_default = cwx3;
  }
});
var require_util = __commonJS({
  "../nfes-miniapp/src/utils/util.js"(exports, module2) {
    var formatTime = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      return [year, month, day].map(formatNumber).join("/") + " " + [hour, minute, second].map(formatNumber).join(":");
    };
    var formatNumber = (n2) => {
      n2 = n2.toString();
      return n2[1] ? n2 : "0" + n2;
    };
    module2.exports = {
      formatTime
    };
  }
});
var cwx_setup_exports = {};
__export2(cwx_setup_exports, {
  default: () => cwx_setup_default
});
function cwx_setup_default() {
}
var init_cwx_setup = __esm({
  "../nfes-miniapp/src/cwx/ext/cwx.setup.js"() {
    init_global();
  }
});
var resources_mapping_exports = {};
__export2(resources_mapping_exports, {
  default: () => resources_mapping_default
});
var resourceMapping, resources_mapping_default;
var init_resources_mapping = __esm({
  "../nfes-miniapp/src/resources_mapping.js"() {
    resourceMapping = {
      get "cwx/cwx.js"() {
        return init_cwx(), cwx_exports;
      },
      get "utils/util.js"() {
        return require_util();
      },
      get "cwx/cpage/base.js"() {
        return init_base(), base_exports;
      },
      get "cwx/cpage/config.js"() {
        return init_config(), config_exports;
      },
      get "cwx/cpage/cpage.js"() {
        return require_cpage();
      },
      get "cwx/cpage/ubt.js"() {
        return init_ubt(), ubt_exports;
      },
      get "cwx/cpage/ubt_wx.js"() {
        return init_ubt_wx(), ubt_wx_exports;
      },
      get "cwx/ext/cwx.events.js"() {
        return init_cwx_events(), cwx_events_exports;
      },
      get "cwx/ext/cwx.request.js"() {
        return require_cwx_request();
      },
      get "cwx/ext/cwx.setup.js"() {
        return init_cwx_setup(), cwx_setup_exports;
      },
      get "cwx/ext/global.js"() {
        return init_global(), global_exports;
      },
      get "cwx/ext/util.js"() {
        return init_util2(), util_exports2;
      },
      get "cwx/nwx/checkWXIdeCode.js"() {
        return init_checkWXIdeCode(), checkWXIdeCode_exports;
      },
      get "cwx/nwx/getQrcode.js"() {
        return init_getQrcode(), getQrcode_exports;
      },
      get "cwx/nwx/handlerCallbacks.js"() {
        return init_handlerCallbacks(), handlerCallbacks_exports;
      },
      get "cwx/nwx/nwx.js"() {
        return init_nwx(), nwx_exports;
      },
      get "cwx/nwx/socketLogin.js"() {
        return init_socketLogin(), socketLogin_exports;
      },
      get "cwx/nwx/util.js"() {
        return init_util(), util_exports;
      },
      get "cwx/nwx/wx.js"() {
        return init_wx(), wx_exports;
      }
    };
    resourceMapping.dynamicRequire = function(basePath, relativePath) {
      let targetPath = relativePath.slice(0, 1) == "/" ? relativePath.slice(1) : basePath ? `${basePath}/${relativePath}` : relativePath;
      const pathArr = targetPath.split("/");
      for (let i = 0; i < pathArr.length; i++) {
        if (pathArr[i] == ".") {
          pathArr.splice(i, 1);
          i--;
        } else if (pathArr[i] == "..") {
          if (i == 0) {
            pathArr.splice(i, 1);
            i--;
          } else {
            pathArr.splice(i - 1, 2);
            i -= 2;
          }
        }
      }
      targetPath = pathArr.join("/");
      if (targetPath && resourceMapping.hasOwnProperty(targetPath)) {
        return resourceMapping[targetPath];
      } else {
        throw new Error(`Missing Module: ${relativePath} (${basePath})`);
      }
    };
    resources_mapping_default = resourceMapping;
  }
});
