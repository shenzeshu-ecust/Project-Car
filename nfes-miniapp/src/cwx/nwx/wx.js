import {sendApiToRemote} from "./util";
import __global from "../ext/global";
import socketLogin from "./socketLogin"

let socketTask = null;
let ApiCallQueue = [];
//todo? 此处需要替换需要转换的微信api
let mockApiList = ["getSystemInfo", "getUserInfo"]

function createWXMockApi(target) {
    mockApiList.forEach(function (action) {
        if (__global.isInTrippal) {
            if (wx[action]) {
                target["_" + action] = wx[action];
            }
            console.log("Can not find " + action + "in wx.");
        } else {
            target["_" + action] = function (options) {
                socketLogin();
                if (!socketTask) {
                    ApiCallQueue.push({
                        action,
                        options
                    });
                } else {
                    sendApiToRemote({
                        socketTask,
                        apiType: "wx",
                        action,
                        options
                    });
                }
            }
        }
    })
}


export default createWXMockApi;

export const setWXSocketTask = function (_socketTask) {
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
                apiType: "wx",
                action,
                options
            });
        }
    }
}
