(function(e) {
    let { env: t, release: a } = e;
    console.log("init slardar");
    Slardar("init", {
        bid: "douyin_web",
        env: t,
        release: a,
        plugins: {
            fmp: false,
            tti: false,
            blankScreen: {
                screenshot: false,
                threshold: 1.5
            },
            pageview: {
                routeMode: "history",
                extractPid () {
                    let e = [
                        "/follow",
                        "/friend",
                        "/jingxuan",
                        "/user",
                        "/video",
                        "/collection",
                        "/hot",
                        "/vsdetail",
                        "/lvdetail",
                        "/hashtag",
                        "/htmlmap",
                        "/light",
                        "/music",
                        "/note",
                        "/musicplaylist",
                        "/zhuanti",
                        "/topic",
                        "/mall/item",
                        "/wallpaper",
                        "/channel",
                        "/shipin",
                        "/creatorvideo",
                        "/series"
                    ];
                    if (-1 !== location.pathname.indexOf("/search/")) try {
                        let e = new URLSearchParams(location.search).get("type");
                        let t = [
                            "general",
                            "video",
                            "user",
                            "live"
                        ];
                        if (-1 !== t.indexOf(e)) return `/search/${e}`;
                        return "/search/general";
                    } catch (e) {
                        return "/search/general";
                    }
                    else if (-1 !== location.pathname.indexOf("/live/")) try {
                        let e = location.pathname.split("/") || [];
                        let t = e.slice(0, e.length - 1).join("/");
                        return t;
                    } catch (e) {
                        return "douyin/live";
                    }
                    for(let t = 0; t < e.length; t++)if (-1 !== location.pathname.indexOf(e[t])) return e[t];
                    return location.pathname;
                }
            },
            action: {
                types: [
                    "click"
                ]
            },
            performance: {
                longtask: true
            },
            ajax: {
                ignoreUrls: [
                    "https://mcs.zijieapi.com/list"
                ]
            }
        }
    });
    Slardar("start");
    console.log("init slardar success");
})({"env":"production","release":"1.0.9.3423"});
