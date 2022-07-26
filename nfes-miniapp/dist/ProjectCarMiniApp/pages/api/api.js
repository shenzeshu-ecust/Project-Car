var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  default: () => api_default
});
var import_chunk_2QMLDERJ = __toModule(require("../../chunk-2QMLDERJ.js"));
var import_chunk_IGGLYGIN = __toModule(require("../../chunk-IGGLYGIN.js"));
var require_api = (0, import_chunk_IGGLYGIN.__commonJS)({
  "../nfes-miniapp/src/pages/api/api.css"(exports, module2) {
    module2.exports = "\n\n.container{\n  padding: 10rpx;\n}\n.res {\n  width: 90%;\n}";
  }
});
var resourceMapping = ((0, import_chunk_IGGLYGIN.init_resources_mapping)(), import_chunk_IGGLYGIN.resources_mapping_exports).default;
var {
  Block,
  CustomStyle,
  ComponentRoot,
  View,
  Button,
  Text
} = global.CWX_Components;
var Taro = global.CWX_Taro;
var withWeapp = global.CWX_Withweapp;
Page({
  data: {
    res: "\u8FD9\u91CC\u662F\u54CD\u5E94\u6570\u636E"
  },
  onLoad: function(option) {
    console.log("onLoad : ", option);
  },
  getUserInfo: function() {
    wx.getUserInfo({
      complete: (res) => {
        this.setData({
          res: JSON.stringify(res)
        });
      }
    });
  },
  showActionSheet: function() {
    wx.showActionSheet({
      itemList: ["A", "B", "C"],
      success(res) {
        console.log(res.tapIndex);
      },
      fail(res) {
        console.log(res.errMsg);
      }
    });
  },
  showToast: function() {
    wx.showToast({
      title: "toastTitle!!",
      duration: 2e3,
      success: () => {
        console.log("success");
      },
      fail: () => {
        console.log("fail");
      },
      complete: () => {
        console.log("complete");
      }
    });
  },
  hideToast: function() {
    wx.hideToast({
      success: () => {
        console.log("success");
      },
      fail: () => {
        console.log("fail");
      },
      complete: () => {
        console.log("complete");
      }
    });
  },
  showLoading: function() {
    wx.showLoading({
      title: "loadingTitle!!",
      success: () => {
        console.log("success");
      },
      fail: () => {
        console.log("fail");
      },
      complete: () => {
        console.log("complete");
        setTimeout(() => {
          wx.hideLoading({
            complete: (res) => {
            }
          });
        }, 5e3);
      }
    });
  },
  setStorage: function() {
    wx.setStorage({
      data: {
        value: "StorageTestString"
      },
      key: "StorageTestKey",
      fail: () => {
        console.log("fail");
      },
      success: () => {
        console.log("success");
      },
      complete: () => {
        console.log("complete");
      }
    });
  },
  setStorageSync: function() {
    wx.setStorageSync("StorageTestKey", "StorageTestSyncString");
  },
  getStorageSync: function() {
    let value = wx.getStorageSync("StorageTestKey");
    this.setData({
      res: JSON.stringify(value)
    });
  },
  getStorage: function() {
    wx.getStorage({
      key: "StorageTestKey",
      fail: (res) => {
        console.log("fail,", res);
      },
      success: (res) => {
        console.log("success");
        this.setData({
          res: JSON.stringify(res)
        });
      },
      complete: () => {
        console.log("complete");
      }
    });
  },
  removeStorageSync: function() {
    wx.removeStorageSync("StorageTestKey");
  },
  removeStorage: function() {
    wx.removeStorage({
      key: "StorageTestKey",
      fail: (res) => {
        console.log("fail,", res);
      },
      success: (res) => {
        console.log("success");
        this.setData({
          res: JSON.stringify(res)
        });
      },
      complete: () => {
        console.log("complete");
      }
    });
  },
  clearStorageSync: function() {
    wx.clearStorageSync();
  },
  clearStorage: function() {
    wx.clearStorage({
      fail: (res) => {
        console.log("fail,", res);
      },
      success: (res) => {
        console.log("success");
      },
      complete: (res) => {
        console.log("complete , ", res);
      }
    });
  },
  redirectTo: function() {
    wx.redirectTo({
      url: "/pages/api/api?from=api"
    });
  },
  navigateBack: function() {
    wx.navigateBack({
      delta: 1,
      fail: (res) => {
        console.log("fail,", res);
      },
      success: (res) => {
        console.log("success");
      },
      complete: (res) => {
        console.log("complete , ", res);
      }
    });
  },
  setNavigationBarTitle: function() {
    wx.setNavigationBarTitle({
      title: new Date().toString()
    });
  }
});
var _C = class extends PageTmpl {
  render() {
    const { res } = this.data;
    return /* @__PURE__ */ React.createElement(Block, null, /* @__PURE__ */ React.createElement(CustomStyle, {
      css: require_api(),
      appcss: (0, import_chunk_2QMLDERJ.require_app)()
    }), /* @__PURE__ */ React.createElement(ComponentRoot, {
      componentId: runInSafeBox(() => this.componentRootId),
      componentPath: "pages/api/api"
    }, /* @__PURE__ */ React.createElement(View, {
      className: "container"
    }, /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("getUserInfo", false))
    }, "getUserInfo"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("showActionSheet", false))
    }, "showActionSheet"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("showToast", false))
    }, "showToast"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("hideToast", false))
    }, "hideToast"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("showLoading", false))
    }, "showLoading"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("setStorage", false))
    }, "setStorage"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("setStorageSync", false))
    }, "setStorageSync"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("getStorage", false))
    }, "getStorage"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("getStorageSync", false))
    }, "getStorageSync"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("removeStorage", false))
    }, "removeStorage"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("removeStorageSync", false))
    }, "removeStorageSync"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("clearStorage", false))
    }, "clearStorage"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("clearStorageSync", false))
    }, "clearStorageSync"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("redirectTo", false))
    }, "redirectTo"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("navigateBack", false))
    }, "navigateBack"), /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("setNavigationBarTitle", false))
    }, "setNavigationBarTitle"), /* @__PURE__ */ React.createElement(Text, {
      className: "res"
    }, res))));
  }
};
var api_default = _C;
