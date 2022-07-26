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
import cwx, { CPage, nwx } from '../../cwx/cwx.js'

const app = Taro.getApp()

CPage({
  data: {
    motto: 'Hello World'
  },
  onLoad: function() {
    this.ubtTrace('e_m_m', '1111') // 埋点

    // 使用 nwx api 会触发 socket 调试
    // nwx.openURL({
    //   url:'/office/index/index?miniapp=1',
    //   data:{},
    //   complete:function(  ){
    //   },
    // })
  },
  goToAPI: function() {
    wx.navigateTo({
      url: '/pages/api/api?testKey=testValue'
    })
  }
})

class _C extends PageTmpl {
  render() {
    const { motto } = this.data
    return (
      <Block>
        <CustomStyle
          css={require('./index.css')}
          appcss={require('../../app.css')}
        />
        <ComponentRoot
          componentId={runInSafeBox(() => this.componentRootId)}
          componentPath="pages/index/index"
        >
          <View className="container">
            <View className="userinfo">
              <Button
                onClick={runInSafeBox(() =>
                  this._handlerEvents('goToAPI', false)
                )}
              >
                API
              </Button>
            </View>
            <View className="usermotto">
              <Text className="user-motto">{motto}</Text>
            </View>
          </View>
        </ComponentRoot>
      </Block>
    )
  }
}

export default _C
