(function() {
    if (window._SdkGlueInit) {
        let e = 8.5;
        let t = 8.5;
        if (navigator && navigator.hardwareConcurrency <= 4) {
            if (navigator && navigator.deviceMemory <= 2) {
                t = 10;
                e = 10;
            }
        }
        let c = {
            self: {
                aid: 6383,
                pageId: 6241
            },
            bdms: {
                aid: 6383,
                pageId: 6241,
                paths: [
                    "^/webcast/",
                    "^/aweme/v1/",
                    "^/aweme/v2/",
                    "/douplus/",
                    "^/api/ad/v1/inspire",
                    "/v1/message/send",
                    "^/live/",
                    "^/captcha/",
                    "^/ecom/",
                    "^/luna/pc"
                ],
                boe: false,
                ddrt: e,
                ic: t
            },
            verifyCenter: {
                interceptPathList: {
                    include: [
                        "^/webcast/",
                        "^/aweme/v1/",
                        "^/aweme/v2/",
                        "/douplus/",
                        "/v1/message/send",
                        "^/live/",
                        "^/captcha/",
                        "^/ecom/",
                        "^/api/ad/v1/inspire"
                    ],
                    exclude: [
                        "^/aweme/v1/play/",
                        "douyinvod\\.com"
                    ]
                },
                commonOptions: {
                    aid: 6383,
                    pageId: 6241
                },
                nocaptchaOptions: {
                    enabled: true
                },
                captchaOptions: {
                    ele: "captcha_container",
                    showMode: "mask"
                }
            }
        };
        let a = {
            verifyCenter: {
                srcList: [
                    "https://lf-rc1.yhgfb-cn-static.com/obj/rc-verifycenter/sec_sdk_build/4.0.28/captcha/index.js",
                    "https://lf-rc2.yhgfb-cn-static.com/obj/rc-verifycenter/sec_sdk_build/4.0.28/captcha/index.js"
                ]
            },
            bdms: {
                srcList: [
                    "https://p-pc-weboff.byteimg.com/tos-cn-i-9r5gewecjs/bdms_1.0.1.19_fix.js",
                    "https://lf-c-flwb.bytetos.com/obj/rc-client-security/web/stable/1.0.1.19-fix.01/bdms.js",
                    "https://lf-headquarters-speed.yhgfb-cn-static.com/obj/rc-client-security/web/stable/1.0.1.19-fix.01/bdms.js"
                ]
            }
        };
        window._SdkGlueInit(c, a);
    }
})();
