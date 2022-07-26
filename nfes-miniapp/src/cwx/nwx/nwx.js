import socketLogin from "./socketLogin"
import { sendApiToRemote } from "./util";
import __global from "../ext/global";

let socketTask;
let ApiCallQueue = [];

if (typeof __global.isInTrippal === "undefined") {
    console.error("Can not find isInTrippal in ext/global.js!")
}

if (!__global.isInTrippal || typeof window !== 'undefined') { // 回来加上判断
    global.nwx = new Proxy({}, {
        get: function (_, action) {
            if (['blockBack', 'blockDismiss', 'sendUBT'].indexOf(action)>-1) {
                return
            }
            return function (options = {}) {
                socketLogin();
                if (!socketTask) {
                    ApiCallQueue.push({
                        action,
                        options
                    });
                } else {
                    sendApiToRemote({
                        socketTask,
                        apiType: "nwx",
                        action,
                        options
                    });
                }
            }
        }
    });
}

export default global.nwx;

export const setNWXSocketTask = function (_socketTask) {
    socketTask = _socketTask;
    if (ApiCallQueue.length) {
        let call = null;
        while (call = ApiCallQueue.shift()) {
            const {
                action,
                options
            } = call
            sendApiToRemote({
                socketTask,
                apiType: "nwx",
                action,
                options
            });
        }
    }
}





