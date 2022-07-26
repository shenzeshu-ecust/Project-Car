const resourceMapping = require('./resources_mapping.js').default

const { Block, CustomStyle } = global.CWX_Components
const Taro = global.CWX_Taro
//app.js
App({
  onLaunch: function() {},
  globalData: {
    userInfo: null
  }
})
