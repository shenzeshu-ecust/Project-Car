let n = 0;
const prefix = '__wx__';
const wxCallbacks = {};

function createWrapperId(apiName = "") {
    return prefix + apiName + "__" + n++;
}

export const createCallbackOptions = function (options, apiName) {
    const calbackFnName = createWrapperId(apiName);
    wxCallbacks[calbackFnName] = {apiName};
    for (const pro in options) {
        const tmp = options[pro];
        if (typeof tmp === 'function') {
            const actionName = `${calbackFnName}.${pro}`; // 回调名称
            wxCallbacks[calbackFnName][pro] = tmp;
            options[pro] = actionName;
        }
    }
    return options;
};

export const handleWXAPICallback = function (evtType, res) {
    const evtArr = evtType.split('.');
    const [cbName, action] = evtArr;
    if (wxCallbacks[cbName] && wxCallbacks[cbName][action]) {
        try {
            if (typeof res === 'string') {
                res = JSON.parse(res);
            }
        } catch (e) {
        }

        const isNotRemoveCallback = wxCallbacks[cbName][action](res);
        if (!isNotRemoveCallback) {
            // 直接删除回调
            if (wxCallbacks[cbName] && wxCallbacks[cbName].complete && action !== 'complete') {
                delete wxCallbacks[cbName][action];
            } else {
                delete wxCallbacks[cbName];
            }
        }
    }
};