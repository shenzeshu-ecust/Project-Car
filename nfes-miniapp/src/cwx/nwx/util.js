;
import {createCallbackOptions} from "./handlerCallbacks";

const cacheKey = "socket_debug_guid";
// export const socketDomain = "10.32.27.254:8080";
export const socketDomain = "debugsocketserver.nfes.ctripcorp.com"
export const createGuid = function () {
    let guid = parseInt(Math.random(1) * 100000000).toString();
    if (guid.length < 8) {
        guid += "0";
    }
    return guid
}

export const sendApiToRemote = function ({socketTask, apiType, action, options}) {
    const args = createCallbackOptions(options);
    socketTask.send({
        data: JSON.stringify({
            type: "call",
            apiType,
            action,
            args
        }),
        success: function (res) {
            console.log(`Call remote API ${apiType}.${action} Success.`);
        },
        fail: function (err) {
            console.log(`Call remote API ${apiType}.${action} Fail.`);
        }
    })
}

export function getWXIdeCodeFromCache() {
    return wx.getStorageSync(cacheKey) || {};
}

export function saveWXIdeCodeToCache(opts) {
    const lastCache = getWXIdeCodeFromCache();
    return wx.setStorageSync(cacheKey, {...lastCache, ...opts});
}
