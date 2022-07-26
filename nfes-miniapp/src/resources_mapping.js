let resourceMapping = {
get "cwx/cwx.js" () { return require("./cwx/cwx.js"); },
get "utils/util.js" () { return require("./utils/util.js"); },
get "cwx/cpage/base.js" () { return require("./cwx/cpage/base.js"); },
get "cwx/cpage/config.js" () { return require("./cwx/cpage/config.js"); },
get "cwx/cpage/cpage.js" () { return require("./cwx/cpage/cpage.js"); },
get "cwx/cpage/ubt.js" () { return require("./cwx/cpage/ubt.js"); },
get "cwx/cpage/ubt_wx.js" () { return require("./cwx/cpage/ubt_wx.js"); },
get "cwx/ext/cwx.events.js" () { return require("./cwx/ext/cwx.events.js"); },
get "cwx/ext/cwx.request.js" () { return require("./cwx/ext/cwx.request.js"); },
get "cwx/ext/cwx.setup.js" () { return require("./cwx/ext/cwx.setup.js"); },
get "cwx/ext/global.js" () { return require("./cwx/ext/global.js"); },
get "cwx/ext/util.js" () { return require("./cwx/ext/util.js"); },
get "cwx/nwx/checkWXIdeCode.js" () { return require("./cwx/nwx/checkWXIdeCode.js"); },
get "cwx/nwx/getQrcode.js" () { return require("./cwx/nwx/getQrcode.js"); },
get "cwx/nwx/handlerCallbacks.js" () { return require("./cwx/nwx/handlerCallbacks.js"); },
get "cwx/nwx/nwx.js" () { return require("./cwx/nwx/nwx.js"); },
get "cwx/nwx/socketLogin.js" () { return require("./cwx/nwx/socketLogin.js"); },
get "cwx/nwx/util.js" () { return require("./cwx/nwx/util.js"); },
get "cwx/nwx/wx.js" () { return require("./cwx/nwx/wx.js"); },
};
resourceMapping.dynamicRequire = function (basePath, relativePath) {
  let targetPath = relativePath.slice(0, 1) == '/' ? relativePath.slice(1) : (basePath ? `${basePath}/${relativePath}` : relativePath);
  const pathArr = targetPath.split('/');
  for (let i = 0; i < pathArr.length; i++) {
    if (pathArr[i] == '.') {
      pathArr.splice(i, 1);
      i--;
    } else if (pathArr[i] == '..') {
      if (i == 0) {
        pathArr.splice(i, 1);
        i--;
      } else {
        pathArr.splice(i - 1, 2);
        i -= 2;
      }
    }
  }
  targetPath = pathArr.join('/');
  if (targetPath && resourceMapping.hasOwnProperty(targetPath)) {
    return resourceMapping[targetPath];
  } else {
    throw new Error(`Missing Module: ${relativePath} (${basePath})`);
  }
};

export default resourceMapping;