(function() {
    try {
        function e(e) {
            let t = new RegExp(`[?&]${e}=`);
            return t.test(window.location.search);
        }
        let t = /(awemePcClient)|(electron)/i.test(navigator.userAgent) && !/feige/i.test(navigator.userAgent);
        if (t && e("node_prefetch")) {
            let e = window.TTE_ENV.bridge.invoke("getRecommendFeed");
            window.clientNodePrefetchPromise = e;
        }
    } catch (e) {
        console.error("[nodePrefetch]error", e);
    }
})();
