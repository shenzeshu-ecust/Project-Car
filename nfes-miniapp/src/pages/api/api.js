const resourceMapping = require('../../resources_mapping.js').default

const {
  Block,
  CustomStyle,
  ComponentRoot,
  View,
  Button,
  Text
} = global.CWX_Components
const Taro = global.CWX_Taro
const withWeapp = global.CWX_Withweapp
// pages/api/api.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    res: '这里是响应数据'
  },

  onLoad: function(option) {
    console.log('onLoad : ', option)
  },
  getUserInfo: function() {
    wx.getUserInfo({
      complete: res => {
        this.setData({
          res: JSON.stringify(res)
        })
      }
    })
  },
  showActionSheet: function() {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  showToast: function() {
    wx.showToast({
      title: 'toastTitle!!',
      duration: 2000,
      success: () => {
        console.log('success')
      },
      fail: () => {
        console.log('fail')
      },
      complete: () => {
        console.log('complete')
      }
    })
  },
  hideToast: function() {
    wx.hideToast({
      success: () => {
        console.log('success')
      },
      fail: () => {
        console.log('fail')
      },
      complete: () => {
        console.log('complete')
      }
    })
  },
  showLoading: function() {
    wx.showLoading({
      title: 'loadingTitle!!',
      success: () => {
        console.log('success')
      },
      fail: () => {
        console.log('fail')
      },
      complete: () => {
        console.log('complete')
        setTimeout(() => {
          wx.hideLoading({
            complete: res => {}
          })
        }, 5000)
      }
    })
  },
  setStorage: function() {
    wx.setStorage({
      data: {
        value: 'StorageTestString'
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
  setStorageSync: function() {
    wx.setStorageSync('StorageTestKey', 'StorageTestSyncString')
  },
  getStorageSync: function() {
    let value = wx.getStorageSync('StorageTestKey')
    this.setData({
      res: JSON.stringify(value)
    })
  },
  getStorage: function() {
    wx.getStorage({
      key: 'StorageTestKey',
      fail: res => {
        console.log('fail,', res)
      },
      success: res => {
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
  removeStorageSync: function() {
    wx.removeStorageSync('StorageTestKey')
  },
  removeStorage: function() {
    wx.removeStorage({
      key: 'StorageTestKey',
      fail: res => {
        console.log('fail,', res)
      },
      success: res => {
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
  clearStorageSync: function() {
    wx.clearStorageSync()
  },
  clearStorage: function() {
    wx.clearStorage({
      fail: res => {
        console.log('fail,', res)
      },
      success: res => {
        console.log('success')
      },
      complete: res => {
        console.log('complete , ', res)
      }
    })
  },
  redirectTo: function() {
    wx.redirectTo({
      url: '/pages/api/api?from=api'
    })
  },
  navigateBack: function() {
    wx.navigateBack({
      delta: 1,
      fail: res => {
        console.log('fail,', res)
      },
      success: res => {
        console.log('success')
      },
      complete: res => {
        console.log('complete , ', res)
      }
    })
  },
  setNavigationBarTitle: function() {
    wx.setNavigationBarTitle({
      title: new Date().toString()
    })
  }
})

class _C extends PageTmpl {
  render() {
    const { res } = this.data
    return (
      <Block>
        <CustomStyle
          css={require('./api.css')}
          appcss={require('../../app.css')}
        />
        <ComponentRoot
          componentId={runInSafeBox(() => this.componentRootId)}
          componentPath="pages/api/api"
        >
          <View className="container">
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('getUserInfo', false)
              )}
            >
              getUserInfo
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('showActionSheet', false)
              )}
            >
              showActionSheet
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('showToast', false)
              )}
            >
              showToast
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('hideToast', false)
              )}
            >
              hideToast
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('showLoading', false)
              )}
            >
              showLoading
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('setStorage', false)
              )}
            >
              setStorage
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('setStorageSync', false)
              )}
            >
              setStorageSync
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('getStorage', false)
              )}
            >
              getStorage
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('getStorageSync', false)
              )}
            >
              getStorageSync
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('removeStorage', false)
              )}
            >
              removeStorage
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('removeStorageSync', false)
              )}
            >
              removeStorageSync
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('clearStorage', false)
              )}
            >
              clearStorage
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('clearStorageSync', false)
              )}
            >
              clearStorageSync
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('redirectTo', false)
              )}
            >
              redirectTo
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('navigateBack', false)
              )}
            >
              navigateBack
            </Button>
            <Button
              onClick={runInSafeBox(() =>
                this._handlerEvents('setNavigationBarTitle', false)
              )}
            >
              setNavigationBarTitle
            </Button>
            <Text className="res">{res}</Text>
          </View>
        </ComponentRoot>
      </Block>
    )
  }
}

export default _C
