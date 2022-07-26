import {socketDomain} from "./util";
import checkWXIdeCode from "./checkWXIdeCode";

let qrSrc = "http://" + socketDomain + "/socket/createQrCode?wxidecode="
const getQrcode = function (wxIdeCode) {
    console.log("wxIdeCode:",wxIdeCode);
    return new Promise(function (resolve, reject) {
        
        wx.previewImage({
            urls: [qrSrc + wxIdeCode],
            success: function () {
                //todo? 此处去定时触发checkCode;
                checkoutCodeInterVal(wxIdeCode, function (socketCode) {
                    console.log("wxIdeCode:",socketCode)
                    console.log(6666,'成功')
                    resolve(socketCode);
                })
            },
            fail: function (err) {
                console.error("Get Socket QRCode Failed.");
                reject(err);
            }
        })
    });
}

function checkoutCodeInterVal(wxIdeCode, callback) {
    let begin = new Date().getTime();
    checkWXIdeCode(wxIdeCode).then(function (socketCode) {
        callback(socketCode);
    }).catch(function () {
        if (new Date().getTime() - begin > 3 * 60 * 1000) {
            console.error("No Trippal Connected With Ide.");
        } else {
            console.log("Please scan the qrcode with TripPal.");
            setTimeout(function () {
                checkoutCodeInterVal(wxIdeCode, callback);
            }, 300)
        }

    })
}

export default getQrcode;