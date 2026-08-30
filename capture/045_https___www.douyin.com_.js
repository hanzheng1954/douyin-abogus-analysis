
            function _define_property(e, t, i) {
    if (t in e) Object.defineProperty(e, t, {
        value: i,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else e[t] = i;
    return e;
}
function _object_spread(e) {
    for(var t = 1; t < arguments.length; t++){
        var i = null != arguments[t] ? arguments[t] : {};
        var o = Object.keys(i);
        if ("function" == typeof Object.getOwnPropertySymbols) o = o.concat(Object.getOwnPropertySymbols(i).filter(function(e) {
            return Object.getOwnPropertyDescriptor(i, e).enumerable;
        }));
        o.forEach(function(t) {
            _define_property(e, t, i[t]);
        });
    }
    return e;
}
function ownKeys(e, t) {
    var i = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        if (t) o = o.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
        });
        i.push.apply(i, o);
    }
    return i;
}
function _object_spread_props(e, t) {
    t = null != t ? t : {};
    if (Object.getOwnPropertyDescriptors) Object.defineProperties(e, Object.getOwnPropertyDescriptors(t));
    else ownKeys(Object(t)).forEach(function(i) {
        Object.defineProperty(e, i, Object.getOwnPropertyDescriptor(t, i));
    });
    return e;
}
let cookieStore = {};
let pageNameMap = {
    "/search/.*": "search_result",
    "/live/.*": "live_detail",
    "^/channel/.*|^/live$": "main_page",
    "^/activity/.*": "special_subject",
    "^/jingxuan.*$": "discover",
    "^/hot$": "hot",
    "^/$": "recommend",
    "^/follow/?$": "follow",
    "^/video/.*|^/collection/.*": "video_detail",
    "^/category/.*": "main_category_page",
    "^/hot_live/?$": "hot_live_page",
    "^/movie/.*": "movie",
    "^/vs/?$": "vs",
    "^/vsdetail/.*": "replay_detail",
    "^/lvdetail/.*": "vs_detail",
    "^/htmlmap/*": "sitemap",
    "^/hashtag/*": "tag_detail",
    "^/music/*": "music_detail",
    "^/downloadpage(/.*)?": "download",
    "^/friend": "friend",
    "^/vschannel/.*": "vschannel",
    "^/light/.*": "lark",
    "^/musicplaylist/*": "musicplaylist",
    "^/topic/?$": "keywords_list_new",
    "^/topic/[0-9]+": "keywords_expansion_new",
    "^/zhuanti/?$": "keywords_list",
    "^/zhuanti/[0-9]+": "keywords_expansion",
    "^/mall/item/.*": "product_detail",
    "^/help": "help",
    "^/note/.*": "note_detail",
    "^/user/self": "personal_homepage",
    "^/wallpaper": "wallpaper_setting",
    "^/shipin/?$": "shipin_home",
    "^/shipin/[0-9]+": "shipin_detail",
    "^/shipin/fenlei/.*": "shipin_list",
    "^/asiangames$": "dyhuodong_main_page",
    "^/series/?$": "playlet",
    "^/olympics/?$": "olympic"
};
let defaultParams = {
    url: "",
    url_path: "",
    enter_from: "",
    link_from: "",
    tab_name: "",
    enter_method: "",
    aweme_type: 0,
    theme: "light",
    is_topknot: 0,
    abtest: "",
    ischange: "",
    old_ttwid: "",
    enter_by_tab: 0,
    browser_height: 0,
    browser_width: 0,
    browser_ratio: 0,
    redirect_from: "",
    from_push: 0,
    seo_vids: "",
    url_source: "",
    url_source_method: "",
    word_strategy: "",
    physical_screen_num: 0,
    physical_screen_info: "",
    match_id: "",
    enter_from_merge: "",
    is_small_window: 0,
    is_mobile: 0,
    is_ipad: 0,
    is_apad: 0,
    if_from_widget: 0,
    theme_raw_value: "",
    reason: "",
    open_from_page: "",
    multi_window_order: "",
    multi_window_open_from: "",
    is_child_route: false,
    is_support_wasm: false
};
let isInSearchChildRoute = (e)=>e.includes("/search/") && !e.startsWith("/search/");
let isInLiveChildRoute = (e)=>e.includes("/live/") && !e.startsWith("/live/");
let isInChildRoute = (e)=>isInSearchChildRoute(e) || isInLiveChildRoute(e);
function getLogPageName() {
    var e;
    let t = null === (e = location) || void 0 === e ? void 0 : e.pathname;
    if (t) try {
        let e;
        for (let i of Object.keys(pageNameMap))if (t.match(new RegExp(i))) {
            e = pageNameMap[i];
            return e;
        }
    } catch (e) {}
}
function getUrlQuery(e) {
    var t, i;
    var o;
    let n = null !== (o = null === (t = null != e ? e : null === (i = location) || void 0 === i ? void 0 : i.href) || void 0 === t ? void 0 : t.split("?")[1]) && void 0 !== o ? o : "";
    let l = n.split("&").filter(Boolean);
    let r = {};
    l.forEach((e)=>{
        if (e.includes("=")) {
            let t = e.split("=");
            r[t[0]] = t[1];
        }
    });
    return r;
}
function getSessionStorage(e) {
    var t, i, o;
    let n = null === (o = window) || void 0 === o ? void 0 : null === (i = o.sessionStorage) || void 0 === i ? void 0 : null === (t = i.getItem) || void 0 === t ? void 0 : t.call(i, e);
    if (!n) return null;
    try {
        let e = JSON.parse(n);
        return e;
    } catch (e) {
        return null;
    }
}
let getSSRRenderDataVal = (e)=>{
    var t, i;
    let o = (null === (t = window) || void 0 === t ? void 0 : t.SSR_RENDER_DATA) || (null === (i = window) || void 0 === i ? void 0 : i.SSR_RENDER_DATA_DOC);
    if (!o) return null;
    let n = null;
    Object.keys(o).forEach((t)=>{
        let i = o[t];
        if (i[e] && isObject(i)) n = i[e];
        else if (t === e) n = i;
    });
    return n;
};
function parseQueryString(e) {
    let t = {};
    if (!e) return t;
    let i = e.split("&");
    for (let e of i){
        let [i, o] = e.split("=");
        if (i) t[i] = decodeURIComponent(o || "");
    }
    return t;
}
let getRouteParams = (e)=>{
    var t, i, o, n, l;
    let [r] = location.href.split("?");
    let a = getSessionStorage("URL_PARAMS_INFO");
    let s = null === (t = window.__INVISIBLE_QUERY__) || void 0 === t ? void 0 : t[e];
    var d, c;
    return null !== (c = null !== (d = null == a ? void 0 : null === (o = a[r]) || void 0 === o ? void 0 : null === (i = o.query) || void 0 === i ? void 0 : i[e]) && void 0 !== d ? d : s) && void 0 !== c ? c : parseQueryString(null === (l = location) || void 0 === l ? void 0 : null === (n = l.search) || void 0 === n ? void 0 : n.slice(1))[e];
};
var ThemeMode;
let getReportThmeValue = function() {
    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 ? arguments[1] : void 0;
    if (e) return e;
    if (void 0 === t) {
        var i, o;
        t = (null === (o = window) || void 0 === o ? void 0 : null === (i = o.abTestData) || void 0 === i ? void 0 : i.multiSceneLightMode) || 0;
    }
    if (!t) return "dark";
    return "classic";
};
let cookies = {
    originGetItem (e) {
        return decodeURIComponent(document.cookie.replace(new RegExp(`(?:(?:^|.*;)\\s*${encodeURIComponent(e).replace(/[-.+*]/g, "\\$&")}\\s*\\=\\s*([^;]*).*$)|^.*$`), "$1"));
    },
    getItem (e) {
        let { sKey: t, ctx: i, refresh: o = true } = e;
        var n, l, r;
        {
            if (!o && cookieStore[t]) return cookieStore[t];
            let e = decodeURIComponent(document.cookie.replace(new RegExp(`(?:(?:^|.*;)\\s*${encodeURIComponent(t).replace(/[-.+*]/g, "\\$&")}\\s*\\=\\s*([^;]*).*$)|^.*$`), "$1"));
            let i = e;
            try {
                i = JSON.parse(e);
            } catch (e) {}
            cookieStore[t] = i;
            return i;
        }
    },
    setItem (e, t) {
        let i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 604800, o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "/", n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "douyin.com", l = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "", r = arguments.length > 6 ? arguments[6] : void 0;
        if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return false;
        let a = "";
        if (i) switch(i.constructor){
            case Number:
                a = i === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : `; max-age=${i}`;
                break;
            case String:
                a = `; expires=${i}`;
                break;
            case Date:
                a = `; expires=${i.toUTCString()}`;
                break;
            default:
                break;
        }
        let s = t;
        try {
            s = JSON.stringify(t);
        } catch (e) {}
        document.cookie = `${encodeURIComponent(e)}=${encodeURIComponent(s)}${a}${n ? `; domain=${n}` : ""}${o ? `; path=${o}` : ""}${l ? "; secure" : ""}${r ? "; SameSite=None; Secure=true" : ""}`;
        if (cookieStore[e]) cookieStore[e] = t;
        return true;
    },
    removeItem (e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/", i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "douyin.com";
        if (!e || !this.hasItem(e)) return false;
        document.cookie = `${encodeURIComponent(e)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${i ? `; domain=${i}` : ""}${t ? `; path=${t}` : ""}`;
        return true;
    },
    hasItem (e) {
        return new RegExp(`(?:^|;\\s*)${encodeURIComponent(e).replace(/[-.+*]/g, "\\$&")}\\s*\\=`).test(document.cookie);
    },
    keys () {
        let e = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for(let t = 0; t < e.length; t++)e[t] = decodeURIComponent(e[t]);
        return e;
    }
};
var MultiWindowLogInfoEnum;
(function(e) {
    e["PAGE_VIEW"] = "PAGE_VIEW";
    e["PLAY_START"] = "PLAY_START";
})(MultiWindowLogInfoEnum || (MultiWindowLogInfoEnum = {}));
let isInSSR = ()=>false;
function isInPWA() {
    var e, t, i, o, n, l, r;
    if (isInClient()) return false;
    return (null === (e = navigator) || void 0 === e ? void 0 : e.standalone) || (null === (i = (o = window).matchMedia) || void 0 === i ? void 0 : null === (t = i.call(o, "(display-mode: standalone), (display-mode: minimal-ui)")) || void 0 === t ? void 0 : t.matches) || (null === (l = (r = window).matchMedia) || void 0 === l ? void 0 : null === (n = l.call(r, "(display-mode: window-controls-overlay)")) || void 0 === n ? void 0 : n.matches);
}
function isInClient() {
    let e = navigator.userAgent;
    return /(awemePcClient)|(electron)/i.test(e) && !/feige/i.test(e);
}
function isMobile(e) {
    let t = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t) || isiPad(e);
}
let isAPad = (e)=>{
    var t, i;
    if ((null == e ? void 0 : null === (t = e.userAgent) || void 0 === t ? void 0 : t.isMobile) && (null == e ? void 0 : null === (i = e.userAgent) || void 0 === i ? void 0 : i.isAndroid)) {
        let t = Number(e.cookies.get("dy_swidth")) || 0;
        let i = Number(e.cookies.get("dy_sheight")) || 0;
        console.log("###redirect width", t, i);
        if (t > 500 && i > 500) return true;
    }
    {
        let e = navigator.userAgent;
        return /android/i.test(e) && window.screen.height > 500 && window.screen.width > 500;
    }
};
function isiPad(e) {
    let t = navigator.userAgent;
    let i = 0;
    let o = 0;
    i = window.screen.height;
    o = window.screen.width;
    if (/\(iPad.*os (\d+)[._](\d+)/i.test(t) || /ipad/i.test(t)) return true;
    if (/macintosh|(mac os x)/i.test(t) && !/awemePcClient/i.test(t) && i > o && !t.match(/(iPhone\sOS)\s([\d_]+)/)) return true;
    return false;
}
function getObjectType(e) {
    let t = Object.prototype.toString.call(e);
    return t.slice(8, t.length - 1);
}
let isObject = (e)=>"Object" === getObjectType(e);
let getRedirectFrom = (e)=>{
    var t;
    let i = window.location.search;
    let o = parseQueryString((null == i ? void 0 : i.slice(1)) || "") || {};
    if ("iesdouyin" === o.redirect_from) return "iesdouyin";
    if ("awemv" === o.redirect_from) return "awemv";
};
let getMonitorInfo = async ()=>{
    try {
        var e, t;
        let i = await window.TTE_ENV.bridge.invoke("getMonitorInfo");
        if (!(null == i ? void 0 : null === (e = i.screen_info) || void 0 === e ? void 0 : e.length)) return {};
        let o = (null == i ? void 0 : null === (t = i.screen_info) || void 0 === t ? void 0 : t.map((e)=>({
                inch: null == e ? void 0 : e.screen_size,
                width: null == e ? void 0 : e.width,
                heigth: null == e ? void 0 : e.length
            }))) || [];
        return {
            physical_screen_num: null == o ? void 0 : o.length,
            physical_screen_info: JSON.stringify(o)
        };
    } catch (e) {
        return {};
    }
};
let getActivityId = ()=>{
    let e = location.pathname;
    let t = e.match(/\/activity\/(\d+)/);
    if (t && t[1]) return t[1];
    return "";
};
let getMultiWindowLogInfo = (e)=>{
    var t, i;
    if (!isInClient() || !isObject(null === (i = window) || void 0 === i ? void 0 : null === (t = i.TTE_ENV) || void 0 === t ? void 0 : t.multiWindowInfo)) return {};
    let { open_from_page: o, multi_window_order: n, multi_window_open_from: l } = window.TTE_ENV.multiWindowInfo;
    let r = {
        open_from_page: o,
        multi_window_order: n,
        push_id: getRouteParams("push_id")
    };
    if ("PAGE_VIEW" === e) r.multi_window_open_from = l;
    if ("PLAY_START" === e) {
        let e = new URL(window.location.href);
        let t = new URLSearchParams(e.search);
        let i = (null == t ? void 0 : t.get("is_open_detail")) === "1";
        if (i) {
            r.if_new_open_dup = "1";
            t.delete("is_open_detail");
            e.search = t.toString();
            window.history.replaceState({}, "", e.toString());
        }
    }
    return r;
};
let setPageViewLog = async (e)=>{
    let { odin: t } = e;
    try {
        var i;
        let e = null === (i = JSON.parse(t)) || void 0 === i ? void 0 : i.user_unique_id;
        let c = getRouteParams("previous_page") || "";
        let u;
        for (let e of Object.keys(pageNameMap))if (location.pathname.match(new RegExp(e))) {
            if (-1 === location.host.indexOf("live")) u = pageNameMap[e];
            else u = "/" === location.pathname ? "live" : pageNameMap[e];
            "search_result" !== u || isInChildRoute(location.pathname);
            break;
        }
        if ("live_detail" === getLogPageName()) u = "live_detail";
        let _ = {
            app_code_link: "app_code",
            web_code_link: "web_code",
            jianying_publish: "jianying_publish",
            jianying_profile: "jianying_profile",
            screen_share_to_pc: "screen_share_to_pc",
            local_player: "local_player"
        };
        let p = location.pathname.startsWith("/note") ? 68 : 0;
        if (u && e) {
            var o, n, l, r, a;
            let e = (null === (o = window.EXPOSE_DATA) || void 0 === o ? void 0 : o.landingPage) === "discover";
            let t = (null === (n = window.EXPOSE_DATA) || void 0 === n ? void 0 : n.landingPage) === "follow";
            let i = e && (null === (l = window.EXPOSE_DATA) || void 0 === l ? void 0 : l.landingMode) !== 2 && (null === (r = window.EXPOSE_DATA) || void 0 === r ? void 0 : r.landingMode) !== 3;
            let h = "/hot" === location.pathname ? "trend" : location.pathname.includes("activity") ? "专题页" : "";
            let m = e || t ? "default_landing" : void 0;
            var s, d;
            let v = null !== (d = null !== (s = getRouteParams("enter_method")) && void 0 !== s ? s : m) && void 0 !== d ? d : "other";
            if ("personal_homepage" === u) v = [
                "personal_panel",
                "left_entrance",
                "top_bar",
                "personal_homepage_like",
                "personal_homepage_collect",
                "personal_homepage_history"
            ].includes(v) ? v : "";
            let g = getRouteParams("match_id");
            let f = "special_subject" === u ? getActivityId() : "";
            let w = "playlet" === u ? u : "special_subject" === u ? `special_subject_${f}` : getRouteParams("enter_from_merge");
            let y = Boolean(null === (a = location.search) || void 0 === a ? void 0 : a.includes("open_mini_window")) && "/" === location.pathname;
            let b = cookies.getItem({
                sKey: "theme"
            });
            let S = await getMonitorInfo();
            let P = new Date;
            let I = isInChildRoute(location.pathname);
            let R = location.href;
            let O = location.pathname;
            let $ = ()=>{
                var e, t, o;
                P = new Date;
                var n, l;
                window.collectEvent("page_view_v2", _object_spread_props(_object_spread(_object_spread_props(_object_spread({}, defaultParams), {
                    enter_from: u,
                    url: R,
                    url_path: O,
                    link_from: isInPWA() ? "pwa" : _[c] || "",
                    enter_method: v,
                    is_recommend: "default_landing" === v ? Number(i) : void 0,
                    tab_name: h,
                    aweme_type: p,
                    theme_raw_value: b || "default",
                    theme: getReportThmeValue(b),
                    browser_height: window.innerHeight,
                    browser_width: window.innerWidth,
                    browser_ratio: window.innerHeight / window.innerWidth,
                    redirect_from: getRedirectFrom(),
                    from_push: cookies.getItem({
                        sKey: "from_client_push"
                    }) ? 1 : 0,
                    seo_vids: getSSRRenderDataVal("seo_vids") || "",
                    url_source: null !== (n = null === (e = getUrlQuery(location.href)) || void 0 === e ? void 0 : e.urlSource) && void 0 !== n ? n : "",
                    url_source_method: null !== (l = null === (t = getUrlQuery(location.href)) || void 0 === t ? void 0 : t.urlSourceMethod) && void 0 !== l ? l : "",
                    word_strategy: null === (o = window) || void 0 === o ? void 0 : o.word_strategy,
                    physical_screen_num: S.physical_screen_num,
                    physical_screen_info: S.physical_screen_info,
                    match_id: g,
                    enter_from_merge: w,
                    is_small_window: y ? 1 : 0,
                    is_mobile: isMobile() ? 1 : 0,
                    is_ipad: isiPad() ? 1 : 0,
                    is_apad: isAPad() ? 1 : 0
                }), getMultiWindowLogInfo("PAGE_VIEW")), {
                    is_child_route: I,
                    is_support_wasm: void 0 !== window.WebAssembly,
                    was_discarded: void 0 === document.wasDiscarded ? -1 : Number(document.wasDiscarded)
                }), false);
            };
            $();
        }
    } catch (e) {
        console.log("======>got err", e);
    }
};
let isClientLazyChildren = /(awemePcClient)|(electron)/i.test(navigator.userAgent) && !/feige/i.test(navigator.userAgent) && location.search && location.search.includes && location.search.includes("lazyChildren=1");
if (isClientLazyChildren && "visible" !== document.visibilityState) {
    let e = ()=>{
        if ("visible" === document.visibilityState) {
            setPageViewLog({"odin":"{\"user_id\":\"1923497892254935\",\"user_type\":12,\"user_is_auth\":0,\"user_unique_id\":\"7679774340301702698\",\"not_exist_login_cookie\":true}"});
            document.removeEventListener("visibilitychange", e);
        }
    };
    document.addEventListener("visibilitychange", e);
} else setPageViewLog({"odin":"{\"user_id\":\"1923497892254935\",\"user_type\":12,\"user_is_auth\":0,\"user_unique_id\":\"7679774340301702698\",\"not_exist_login_cookie\":true}"});

          