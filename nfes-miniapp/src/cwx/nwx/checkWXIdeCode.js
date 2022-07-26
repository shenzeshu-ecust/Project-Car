import {socketDomain} from "./util";

const checkWXIdeCode = function (wxIdeCode) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: "http://" + socketDomain + "/socket/checkSocketByCode?wxidecode=" + wxIdeCode,
            method: "GET",
            success: function (res) {
                console.log(res)
                if (res.data === "none") {
                    reject(res);
                } else {
                    resolve(res.data)
                }
            },
            fail: function (err) {
                reject(err);
            }
        })
    });
}

export default checkWXIdeCode