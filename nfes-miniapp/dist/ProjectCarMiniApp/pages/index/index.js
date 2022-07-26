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
  default: () => index_default
});
var import_chunk_2QMLDERJ = __toModule(require("../../chunk-2QMLDERJ.js"));
var import_chunk_IGGLYGIN = __toModule(require("../../chunk-IGGLYGIN.js"));
var require_index = (0, import_chunk_IGGLYGIN.__commonJS)({
  "../nfes-miniapp/src/pages/index/index.css"(exports, module2) {
    module2.exports = "\n.userinfo {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\n.userinfo-avatar {\n  width: 128rpx;\n  height: 128rpx;\n  margin: 20rpx;\n  border-radius: 50%;\n}\n\n.userinfo-nickname {\n  color: #aaa;\n}\n\n.usermotto {\n  margin-top: 200px;\n}";
  }
});
(0, import_chunk_IGGLYGIN.init_cwx)();
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
var app = Taro.getApp();
(0, import_chunk_IGGLYGIN.import_cpage.default)({
  data: {
    motto: "Hello World"
  },
  onLoad: function() {
    this.ubtTrace("e_m_m", "1111");
  },
  goToAPI: function() {
    wx.navigateTo({
      url: "/pages/api/api?testKey=testValue"
    });
  }
});
var _C = class extends PageTmpl {
  render() {
    const { motto } = this.data;
    return /* @__PURE__ */ React.createElement(Block, null, /* @__PURE__ */ React.createElement(CustomStyle, {
      css: require_index(),
      appcss: (0, import_chunk_2QMLDERJ.require_app)()
    }), /* @__PURE__ */ React.createElement(ComponentRoot, {
      componentId: runInSafeBox(() => this.componentRootId),
      componentPath: "pages/index/index"
    }, /* @__PURE__ */ React.createElement(View, {
      className: "container"
    }, /* @__PURE__ */ React.createElement(View, {
      className: "userinfo"
    }, /* @__PURE__ */ React.createElement(Button, {
      onClick: runInSafeBox(() => this._handlerEvents("goToAPI", false))
    }, "API")), /* @__PURE__ */ React.createElement(View, {
      className: "usermotto"
    }, /* @__PURE__ */ React.createElement(Text, {
      className: "user-motto"
    }, motto)))));
  }
};
var index_default = _C;
