(function() {
    try {
        window.pageLog = {};
        {
            function e(e) {
                if ("hidden" === document.visibilityState) {
                    e();
                    return;
                }
                function n() {
                    if ("hidden" === document.visibilityState) {
                        e();
                        removeEventListener("visibilitychange", n, true);
                    }
                }
                addEventListener("visibilitychange", n, true);
            }
            function n(e) {
                [
                    "unload",
                    "beforeunload",
                    "pagehide"
                ].forEach(function(n) {
                    addEventListener(n, e);
                });
            }
            let i = {
                startTime: 0,
                ele: null
            };
            let o;
            let r = new PerformanceObserver(function(e, n) {
                if (e.getEntries) e.getEntries().forEach(function(e, n, t) {
                    if (e.element) i.ele = e.element;
                    o = e;
                    i.startTime = e.startTime;
                });
            });
            r.observe({
                type: "largest-contentful-paint"
            });
            function t() {
                r.disconnect();
                window.LCPTime = i.startTime;
                window.LCPEle = i.ele;
                window.LCPEntry = o;
                window.pageLog.onceHidden = true;
                if (!window.pageLog.mounted) window.pageLog.onceHiddenBeforeMounted = true;
                [
                    "keydown",
                    "click"
                ].forEach(function(e) {
                    window.removeEventListener(e, t, true);
                });
            }
            [
                "keydown",
                "click"
            ].forEach(function(e) {
                window.addEventListener(e, t, true);
            });
            window.pageLog = {};
            e(t);
            n(t);
        }
    } catch (e) {}
})();
