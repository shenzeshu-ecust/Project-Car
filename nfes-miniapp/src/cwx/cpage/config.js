import __global from "../ext/global";
const config = {
    hasInit: false,
    init: function () {
        if (!this.hasInit) {
            // CPage.use('Navigator');
            __global.CPage.use('UBT');
            this.hasInit = true;
        }

    },
    ubtDebug: false
};

export default config;
