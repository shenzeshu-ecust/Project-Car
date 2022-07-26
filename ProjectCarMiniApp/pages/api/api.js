// pages/api/api.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: "这里是响应数据",
  },

  onLoad: function (option) {
    console.log('onLoad : ', option)
  },
  getUserInfo: function () {

    wx.getUserInfo({
      complete: (res) => {
        this.setData({
          res: JSON.stringify(res)
        })
      },
    })
  },
  showActionSheet:function(){
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success (res) {
        console.log(res.tapIndex)
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  showToast: function () {
    wx.showToast({
      title: 'toastTitle!!',
      duration: 2000,
      success: () => {
        console.log('success')
      },
      fail: () => {
        console.log('fail');
      },
      complete: () => {
        console.log('complete');
      }
    })
  },
  hideToast:function(){
    wx.hideToast({
      success: () => {
        console.log('success')
      },
      fail: () => {
        console.log('fail');
      },
      complete: () => {
        console.log('complete');
      }
    })
  },
  showLoading: function () {
    wx.showLoading({
      title: 'loadingTitle!!',
      success: () => {
        console.log('success')
      },
      fail: () => {
        console.log('fail');
      },
      complete: () => {
        console.log('complete');
        setTimeout(() => {
          wx.hideLoading({
            complete: (res) => {},
          })
        }, 5000)
      }
    })
  },
  setStorage: function () {
    wx.setStorage({
      data: {
        value: "StorageTestString"
      },
      key: 'StorageTestKey',
      fail: () => {
        console.log('fail')
      },
      success: () => {
        console.log('success')
      },
      complete: () => {
        console.log('complete')
      }
    })
  },
  setStorageSync: function () {
    wx.setStorageSync('StorageTestKey', "StorageTestSyncString")
  },
  getStorageSync: function () {
    let value = wx.getStorageSync('StorageTestKey')
    this.setData({
      res: JSON.stringify(value)
    })
  },
  getStorage: function () {
    wx.getStorage({
      key: 'StorageTestKey',
      fail: (res) => {
        console.log('fail,', res)
      },
      success: (res) => {
        // wx: res.data 
        // Trip: res
        console.log('success')
        this.setData({
          res: JSON.stringify(res)
        })
      },
      complete: () => {
        console.log('complete')
      }
    })
  },
  removeStorageSync: function () {
    wx.removeStorageSync('StorageTestKey')
  },
  removeStorage: function () {
    wx.removeStorage({
      key: 'StorageTestKey',
      fail: (res) => {
        console.log('fail,', res)
      },
      success: (res) => {
        // wx: res.data 
        // Trip: res
        console.log('success')
        this.setData({
          res: JSON.stringify(res)
        })
      },
      complete: () => {
        console.log('complete')
      }
    })
  },
  clearStorageSync: function () {
    wx.clearStorageSync()
  },
  clearStorage: function () {
    wx.clearStorage({
      fail: (res) => {
        console.log('fail,', res)
      },
      success: (res) => {
        console.log('success')

      },
      complete: (res) => {
        console.log('complete , ', res)
      }
    })
  },
  redirectTo: function () {
    wx.redirectTo({
      url: '/pages/api/api?from=api',
    })
  },
  navigateBack: function () {
    wx.navigateBack({
      delta: 1,
      fail: (res) => {
        console.log('fail,', res)
      },
      success: (res) => {
        console.log('success')

      },
      complete: (res) => {
        console.log('complete , ', res)
      }
    })
  },
  setNavigationBarTitle:function(){
    wx.setNavigationBarTitle({
      title: (new Date()).toString(),
    })
  }
})