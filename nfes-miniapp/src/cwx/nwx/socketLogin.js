import {setWXSocketTask} from "./wx";
import {setNWXSocketTask} from "./nwx";
import __global from "../ext/global";
import {socketDomain, createGuid, getWXIdeCodeFromCache, saveWXIdeCodeToCache} from "./util";
import {handleWXAPICallback} from "./handlerCallbacks";
import getQrcode from "./getQrcode";
import checkWXIdeCode from "./checkWXIdeCode"

let isSocketReady = false;
let isInitSocket = false;
let socketTask;
const socketUrl = "ws://" + socketDomain + "/websocket";

function healthCheck() {
    setTimeout(function () {
        socketTask.send({
            data: JSON.stringify({
                type: "health"
            })
        });
        if (isSocketReady) {
            healthCheck();
        }
    }, 10 * 1000)
}

function socketLogin() {
    if (isInitSocket) {
        return;
    }
    isInitSocket = true
    let {wxIdeCode, socketCode} = getWXIdeCodeFromCache();
    if (socketCode) { //如果有socketCode，先链接一次看看是否可用
        connectSocket(socketCode).then(function () {
            //todo? 暂无业务处理
        }).catch(function (err) {
            reLogin();
        })
    } else {
        reLogin();
    }

    function reLogin() {
        if (wxIdeCode) {
            //检测guid是否可用
            checkWXIdeCode(wxIdeCode).then(function (socketCode) {
                //如果可用直接链接socket
                connectSocket(socketCode, wxIdeCode);
            }).catch(function () {
                getQrcode(wxIdeCode).then(function (socketCode) {
                    //如果可用直接链接socket
                    connectSocket(socketCode, wxIdeCode);
                });
            })
        } else {
            wxIdeCode = createGuid();

            getQrcode(wxIdeCode).then(function (socketCode) {
                //如果可用直接链接socket
                connectSocket(socketCode, wxIdeCode);
            })
        }
    }
}


function connectSocket(socketCode, wxIdeCode) {
    return new Promise(function (resolve, reject) {
        socketTask = wx.connectSocket({
            url: socketUrl,
            protocols: [socketCode],
            success: function () {
                console.log("socket connect Ready");
            },
            fail: function (err) {
                console.log("socket connect Fail", err);
            }
        })
        console.log(socketTask)
        socketTask.onOpen(function () {
            console.log("socket Open")
            isSocketReady = true;
            saveWXIdeCodeToCache({wxIdeCode, socketCode});
            //此处需要触发调用api的queue
            setWXSocketTask(socketTask);
            setNWXSocketTask(socketTask);
            healthCheck();
            resolve();
        });
        socketTask.onClose(function () {
            isSocketReady = false;
            console.log("socket Connect Close")
        });
        socketTask.onError(function (err) {
            reject(err)
            console.log("socket Connect Error", err)
        });
        socketTask.onMessage(function (e) {
            if (typeof e.data === 'string') {
                try {
                    const {type, callbackName, res, cwxVersion} = JSON.parse(e.data);
                    if (type === "ready") {
                        console.log("Trippal Connect Success");
                    } else if (type === "response" && callbackName) {
                        handleWXAPICallback(callbackName, res);
                    } else if (type === "health") {
                        console.log("health!");
                    } else if (type === "error" || type === "closed") {
                        //此时标示trippal断开，需要将api的设置为空，提示重连
                        console.error("Trippal Connected Closed,Please Reconnected!");
                        setWXSocketTask(null);
                        setNWXSocketTask(null);
                        isInitSocket = false;
                        socketTask.close();
                    } else if (type === 'cwxVersion') {
                        if (cwxVersion !== __global.cwxVersion) {
                            console.error("当前CWX不是最新版本，请更新CWX！");
                        }
                    }
                } catch (e) {
                    alert(e.message);
                }
            }
            console.log("socket Message", e)
        });
    });
}

export default socketLogin;
