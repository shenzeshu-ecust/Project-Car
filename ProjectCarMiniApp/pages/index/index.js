import cwx, {CPage,nwx} from "../../cwx/cwx"


const app = getApp()

CPage({
  data: {
    motto: 'Hello World',
  },
  onLoad: function () {
    this.ubtTrace('e_m_m', '1111') // 埋点
    
    // 使用 nwx api 会触发 socket 调试
    // nwx.openURL({ 
    //   url:'/office/index/index?miniapp=1',
    //   data:{},
    //   complete:function(  ){
    //   },
    // })
  },
  goToAPI:function(){
    wx.navigateTo({
      url: '/pages/api/api?testKey=testValue',
    })
  }
})
