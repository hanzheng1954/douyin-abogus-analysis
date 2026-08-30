(function() {
    window.addEventListener("DOMContentLoaded", function(e) {
        let t = [
            "/LynxLogin",
            "/LynxRiskControl",
            "/LynxImEntry",
            "/LynxPostDropdown",
            "/LynxUserMenuPanel",
            "/LynxWallpaper",
            "/LynxNoticeEntry",
            "/LynxRecharge",
            "/LynxLoading",
            "/LynxSettingsPanel",
            "/LynxReport"
        ];
        if (t.includes(location.pathname)) return;
        let n = setTimeout(function(e) {
            var t;
            let o = document.getElementById("douyin-sidebar");
            let i = document.getElementById("douyin-sidebar-new");
            let d = document.documentElement.getAttribute("is-mobile");
            if (o || i || d || /\/downloadpage|\/creatorvideo|\/light|\/gameactivitydetail/.test(location.pathname)) {
                clearTimeout(n);
                return;
            }
            let r = document.createElement("img");
            r.id = "douyin-temp-sidebar";
            r.src = "https://lf3-static.bytednsdoc.com/obj/eden-cn/medeh7bmupenuhd/report.png";
            r.style = "position: absolute; z-index: 500; right: 16px; bottom: 12px; pointer: cursor";
            r.onclick = function() {
                if (confirm("点击确定按钮，向我们反馈页面异常")) (window.slardar || window.Slardar).sendEvent({
                    type: "event",
                    name: "feedback_backup",
                    metrics: {
                        count: 1
                    },
                    categories: {
                        verion: window.version,
                        ua: window.navigator.userAgent,
                        referrer: document.referrer,
                        href: window.location.href,
                        cookie: document.cookie,
                        MONITOR_WEB_ID: (document.cookie.match(/MONITOR_WEB_ID=(.+?);/) || [])[1],
                        MONITOR_DEVICE_ID: (document.cookie.match(/MONITOR_DEVICE_ID=(.+?);/) || [])[1],
                        isClient: Boolean((window.TTE_ENV || {}).initPageStore),
                        screenWidth: document.body.clientWidth,
                        screenHeight: document.body.clientHeight,
                        feedVideoCount: document.querySelectorAll('[data-e2e="feed-video"]').length,
                        feedActiveVideoCount: document.querySelectorAll('[data-e2e="feed-active-video"]').length,
                        isVideoError: Array.prototype.slice.call(document.querySelectorAll(".xgplayer-error")).map(function(e) {
                            return null !== (e || {}).offsetParent;
                        }),
                        isHeadShow: Boolean(document.querySelector("#douyin-header"))
                    }
                });
            };
            let c = document.createElement("img");
            c.id = "douyin-refresh-btn";
            c.src = "https://lf-douyin-pc-web.douyinstatic.com/obj/douyin-pc-web/refresh_btn.png";
            c.style = "position: absolute; z-index: 500; right: 16px; bottom: 52px; cursor: pointer;";
            c.onclick = function() {
                window.location.reload();
            };
            let l = /(awemePcClient)|(electron)/i.test(null === (t = navigator) || void 0 === t ? void 0 : t.userAgent);
            let a = document.getElementById("douyin-right-container");
            if (a) {
                a.appendChild(r);
                l && a.appendChild(c);
            } else {
                document.body.appendChild(r);
                l && document.body.appendChild(c);
            }
        }, 9e3);
    });
})();
