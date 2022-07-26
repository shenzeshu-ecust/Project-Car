let env = 'prd';
try {
    let _env = wx.getStorageSync('globalEnvSetting');
    if (_env != null && _env.length) {
        env = _env;
    }
} catch (e) {

}
/**
 * 全局对象global文件，修改fat/uat环境改这里
 * @module global
 */
const __global = {
    /**
     * @memberof module:global
     */
    appId: '5077',//独立小程序的APPID (必须修改)
    /**
     * @memberof module:global
     */
    env: env, //'fat',//prd uat fat 网络环境 ， 发布前一定要设置为prd
    /**
     * @memberof module:global
     */
    host: 'm.ctrip.com', //默认都是用这个域名，建议不要修改 (禁止修改)
    /**
     * @memberof module:global
     */
    uat: 'gateway.m.uat.qa.nt.ctripcorp.com',//uat域名
    /**
     * @memberof module:global
     */
    fat: 'gateway.m.fws.qa.nt.ctripcorp.com',
    isInTrippal: typeof global.nwx !== "undefined",
    cwxVersion: "1.0.0"
};
Object.defineProperty(__global, "env",
    /**
     * @name env
     * @memberof module:global
     */
    {
        get: function () {
            var _env = wx.getStorageSync('globalEnvSetting');
            if (_env != null && _env.length) {
                //
            } else {
                _env = 'prd'
            }
            return _env;//看这里。如果你要强制设置环境变量的话，直接修改这里
        }
    })

export default __global