(function(e, l, i, o, n, d, t) {
    try {
        let r = null;
        let _;
        if (1 === t) window.__JX_DEFERRED_PROMISE = new Promise((e)=>{
            _ = e;
        });
        let a = ()=>{
            if (1 === t && _) setTimeout(()=>{
                _(true);
            }, 0);
        };
        window.__pc_pace_load_deferred_scripts = ()=>{
            try {
                var e, l;
                null === (e = (l = window).__pace_load_deferred_scripts) || void 0 === e || e.call(l);
            } catch (e) {
                console.error(e);
            }
            a();
        };
        if (1 === t) {
            let e = (e)=>function l() {
                    try {
                        null == e || e();
                    } catch (e) {
                        console.error(e);
                    }
                    a();
                };
            try {
                if (Object.getOwnPropertyDescriptor(window, "__pace_load_deferred_scripts")) {
                    let l = window.__pace_load_deferred_scripts;
                    window.__pace_load_deferred_scripts = e(l);
                } else {
                    let l;
                    Object.defineProperty(window, "__pace_load_deferred_scripts", {
                        configurable: true,
                        enumerable: true,
                        get () {
                            return e(l);
                        },
                        set (e) {
                            l = e;
                        }
                    });
                }
            } catch (i) {
                let l = window.__pace_load_deferred_scripts;
                window.__pace_load_deferred_scripts = e(l);
            }
        }
        window.pageDirectRender = {
            imagePreloaded: [],
            imageLoadedTime: 0
        };
        let u = ()=>{
            var e, l;
            null === (e = (l = window).__pc_pace_load_deferred_scripts) || void 0 === e || e.call(l);
            r && clearTimeout(r);
            r = null;
        };
        let c = async (e, l)=>new Promise((i, o)=>{
                if (!e) o(e);
                let n = document.createElement("script");
                n.src = e;
                n.nonce = l;
                n.onload = function() {
                    i(e);
                };
                n.onerror = function() {
                    o(e);
                };
                document.head.appendChild(n);
            });
        let v = function _() {
            var _, a, v, w, s, p, E, R, C, A, m;
            let f = document.querySelector(".discover-tab-container");
            let y = (null == f ? void 0 : null === (_ = f.querySelectorAll) || void 0 === _ ? void 0 : _.call(f, "img.discover-video-card-img")) || [];
            if (0 === y.length) {
                u();
                return;
            }
            let I = 1536;
            let P = ()=>{
                var e;
                return Boolean(d) && (null === (e = window) || void 0 === e ? void 0 : e.innerWidth) >= I;
            };
            let g = P();
            let h = (null === (v = window) || void 0 === v ? void 0 : null === (a = v.location) || void 0 === a ? void 0 : a.pathname) === "/" ? "/jingxuan" : null === (s = window) || void 0 === s ? void 0 : null === (w = s.location) || void 0 === w ? void 0 : w.pathname;
            window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_PATH = h;
            window.__JX_BIG_CARD_QUICK_PLAYER_CURRENT_PATH = h;
            let L = ()=>{
                g = P();
                if (!g) {
                    var e, l;
                    null === (e = (l = window).disabledBigCardQuickPlayer) || void 0 === e || e.call(l, "destroy");
                }
            };
            if (g) window.addEventListener("resize", L);
            let B = (e)=>{
                var l, i, o;
                if (!e) return null;
                let n = null == e ? void 0 : e.cloneNode(true);
                let d = `_${Math.random().toString(36).slice(2)}`;
                null == n || null === (i = n.classList) || void 0 === i || null === (l = i.add) || void 0 === l || l.call(i, d);
                let t = document.createElement("style");
                document.head.appendChild(t);
                let r = ()=>{
                    let l = e.getBoundingClientRect();
                    if (0 === l.width || 0 === l.height) return;
                    t.innerHTML = `
          .${d} {
            width: ${l.width}px !important;
            height: ${l.height}px !important;
            left: ${l.left}px !important;
            top: ${l.top}px !important;
            position: fixed !important;
            z-index: 99 !important;
            background-color: var(--color-bg-b0);
          }
        `;
                };
                r();
                let _;
                if ("undefined" != typeof ResizeObserver) _ = new ResizeObserver(r);
                null == _ || null === (o = _.observe) || void 0 === o || o.call(_, e);
                if (e) e.style.opacity = "0";
                document.body.appendChild(n);
                window.jxHydrateReadyCb = (l)=>{
                    var i, o, d, r, a;
                    null == _ || null === (i = _.disconnect) || void 0 === i || i.call(_);
                    null == t || null === (o = t.remove) || void 0 === o || o.call(t);
                    null === (r = window) || void 0 === r || null === (d = r.removeEventListener) || void 0 === d || d.call(r, "resize", L);
                    if (e) e.style.opacity = "1";
                    try {
                        var u, c, v, w, s;
                        if (l && (null === (c = window) || void 0 === c ? void 0 : null === (u = c.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === u ? void 0 : u.player) && (null === (v = window.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === v ? void 0 : v.mountEle) && (null === (s = window) || void 0 === s ? void 0 : null === (w = s.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === w ? void 0 : w.mountType) === "preview") {
                            var p, E;
                            null == l || null === (E = l.appendChild) || void 0 === E || E.call(l, null === (p = window.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === p ? void 0 : p.mountEle);
                        }
                    } catch (e) {
                        console.error("[hydratedPlayerMountedEle]error", e);
                    }
                    null == n || null === (a = n.remove) || void 0 === a || a.call(n);
                    delete window.jxHydrateReadyCb;
                };
                return n;
            };
            let D = 1 === n && "undefined" != typeof ResizeObserver;
            let Q = 1 === t;
            let T = null;
            if (D && !Q) T = B(f);
            let Y = D && !Q && T ? T : f;
            let U = null;
            if (Q) {
                U = document.getElementById("jx-temp-player-container");
                if (!U && g) {
                    var K, J;
                    U = document.createElement("div");
                    U.id = "jx-temp-player-container";
                    U.style.position = "absolute";
                    U.style.zIndex = "1";
                    U.style.pointerEvents = "none";
                    let e = document.createElement("style");
                    e.innerHTML = `
             #jx-temp-player-container > * {
               pointer-events: auto;
             }
             .discover-tab-bar, .semi-tabs-bar {
               z-index: 10 !important;
             }
             #root, #app {
               z-index: auto !important;
               isolation: auto !important;
               transform: none !important;
               contain: none !important;
               perspective: none !important;
               filter: none !important;
             }
           `;
                    document.head.appendChild(e);
                    document.body.appendChild(U);
                    let l = document.createElement("div");
                    l.id = "jx-temp-nav-mask";
                    l.style.cssText = `
            position: absolute;
            z-index: 5; /* 介于 Player(1) 和 Nav(10) 之间 */
            background-color: var(--color-bg-b0);
            pointer-events: none; /* 不阻挡点击 */
            display: none; /* 初始隐藏 */
          `;
                    document.body.appendChild(l);
                    let i = 0;
                    let o = (e)=>{
                        i = e.touches[0].clientY;
                    };
                    let n = Y.querySelector(".jingxuan-scroll-element");
                    let d = null == Y ? void 0 : null === (K = Y.querySelector) || void 0 === K ? void 0 : K.call(Y, ".bigCardQuickPlayerContainer");
                    let t = null == Y ? void 0 : null === (J = Y.querySelector) || void 0 === J ? void 0 : J.call(Y, ".discover-tab-bar");
                    let r = (e)=>{
                        if (Y) {
                            if (n) {
                                let l = e.touches[0].clientY;
                                let o = i - l;
                                n.scrollTop += o;
                                i = l;
                                if (e.cancelable) e.preventDefault();
                            }
                        }
                    };
                    let _ = (e)=>{
                        var l;
                        if (null == U ? void 0 : null === (l = U.contains) || void 0 === l ? void 0 : l.call(U, e.target)) {
                            if (Y) {
                                if (n) {
                                    n.scrollTop += e.deltaY;
                                    e.preventDefault();
                                    e.stopPropagation();
                                }
                            }
                        }
                    };
                    if (U) {
                        U.addEventListener("touchstart", o, {
                            passive: true
                        });
                        U.addEventListener("touchmove", r, {
                            passive: false
                        });
                    }
                    window.addEventListener("wheel", _, {
                        capture: true,
                        passive: false
                    });
                    if (d) {
                        let e = ()=>{
                            var e;
                            if (!P()) {
                                var i, o, n;
                                null === (o = window) || void 0 === o || null === (i = o.__JX_TEMP_CONTAINER_CLEANUP) || void 0 === i || i.call(o);
                                null == U || null === (n = U.remove) || void 0 === n || n.call(U);
                                return;
                            }
                            let r = null == d ? void 0 : null === (e = d.getBoundingClientRect) || void 0 === e ? void 0 : e.call(d);
                            if (t && l) {
                                let e = t.getBoundingClientRect();
                                if (e.width > 0 && e.height > 0) {
                                    l.style.display = "block";
                                    l.style.top = `${e.top + window.scrollY - 2}px`;
                                    l.style.left = `${e.left + window.scrollX}px`;
                                    l.style.width = `${e.width}px`;
                                    l.style.height = `${e.height + 2}px`;
                                } else l.style.display = "none";
                            }
                            if (r && (0 === r.width || 0 === r.height)) {
                                var _, a;
                                let e = (null == d ? void 0 : null === (_ = d.closest) || void 0 === _ ? void 0 : _.call(d, ".videoImage")) || (null == d ? void 0 : null === (a = d.closest) || void 0 === a ? void 0 : a.call(d, ".discover-video-card-item"));
                                if (e) {
                                    let l = e.getBoundingClientRect();
                                    if (U) {
                                        U.style.top = `${l.top + window.scrollY}px`;
                                        U.style.left = `${l.left + window.scrollX}px`;
                                        U.style.width = `${l.width}px`;
                                        U.style.height = `${l.height}px`;
                                    }
                                    return;
                                }
                            }
                            if (r && r.width > 0 && r.height > 0) {
                                if (U) {
                                    U.style.top = `${r.top + window.scrollY}px`;
                                    U.style.left = `${r.left + window.scrollX}px`;
                                    U.style.width = `${r.width}px`;
                                    U.style.height = `${r.height}px`;
                                }
                            }
                        };
                        e();
                        let i;
                        let a = ()=>{
                            e();
                            if ("function" == typeof requestAnimationFrame) i = requestAnimationFrame(a);
                            else i = window.setTimeout(a, 16);
                        };
                        window.__JX_TEMP_CONTAINER_CLEANUP = ()=>{
                            if ("function" == typeof cancelAnimationFrame) cancelAnimationFrame(i);
                            else clearTimeout(i);
                            null == l || l.remove();
                            window.removeEventListener("wheel", _, {
                                capture: true
                            });
                            null == U || U.removeEventListener("touchstart", o);
                            null == U || U.removeEventListener("touchmove", r);
                            n = null;
                            d = null;
                            t = null;
                        };
                        a();
                    }
                }
            } else {
                var X;
                U = null == Y ? void 0 : null === (X = Y.querySelector) || void 0 === X ? void 0 : X.call(Y, ".bigCardQuickPlayerContainer");
            }
            let x = (null == y ? void 0 : null === (R = y[0]) || void 0 === R ? void 0 : null === (E = R.classList) || void 0 === E ? void 0 : null === (p = E.contains) || void 0 === p ? void 0 : p.call(E, "jingxuan-top-card-img")) ? null == y ? void 0 : y[0] : null;
            let b = null == x ? void 0 : null === (C = x.closest) || void 0 === C ? void 0 : C.call(x, ".discover-video-card-item");
            let G = (null == b ? void 0 : null === (A = b.dataset) || void 0 === A ? void 0 : A.awemeId) || (null == b ? void 0 : null === (m = b.getAttribute) || void 0 === m ? void 0 : m.call(b, "data-aweme-id"));
            let k = async (l)=>{
                if (window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_PERMANENT_ABORTED) throw new Error("Big card quick player creation was permanently rejected");
                if (!window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_PROMISE) {
                    let n = null;
                    window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_PROMISE = new Promise(async (d, t)=>{
                        n = t;
                        try {
                            var r, _, a, u, v, w, s, p, E, R, C, A, m, f;
                            if (window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_ABORTED) {
                                t(new Error("Big card quick player creation was manually rejected"));
                                return;
                            }
                            await Promise.all([
                                (null === (_ = window) || void 0 === _ ? void 0 : null === (r = _.jingxuan_pre_build_util) || void 0 === r ? void 0 : r.fetchAwemeInfo) ? Promise.resolve(true) : c(e, o),
                                (null === (u = window) || void 0 === u ? void 0 : null === (a = u.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === a ? void 0 : a.createQuickPlayer) ? Promise.resolve(true) : c(i, o)
                            ]);
                            if (window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_ABORTED) {
                                t(new Error("Big card quick player creation was manually rejected"));
                                return;
                            }
                            if (!(null === (w = window) || void 0 === w ? void 0 : null === (v = w.jingxuan_pre_build_util) || void 0 === v ? void 0 : v.fetchAwemeInfo) || !(null === (p = window) || void 0 === p ? void 0 : null === (s = p.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === s ? void 0 : s.createQuickPlayer)) throw new Error("jingxuan_pre_build_util?.fetchAwemeInfo or __JX_BIG_CARD_QUICK_PLAYER?.createQuickPlayer is required");
                            if (window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_ABORTED) {
                                t(new Error("Big card quick player creation was manually rejected"));
                                return;
                            }
                            let n = await (null === (C = window) || void 0 === C ? void 0 : null === (R = C.jingxuan_pre_build_util) || void 0 === R ? void 0 : null === (E = R.fetchAwemeInfo) || void 0 === E ? void 0 : E.call(R, {
                                awemeId: G,
                                originType: "quick_player"
                            }));
                            if (window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_ABORTED) {
                                t(new Error("Big card quick player creation was manually rejected"));
                                return;
                            }
                            let y = null == n ? void 0 : n.detail;
                            if (!y) throw new Error("fetchAwemeInfo failed");
                            if (window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_ABORTED) {
                                t(new Error("Big card quick player creation was manually rejected"));
                                return;
                            }
                            let I = await (null === (f = window) || void 0 === f ? void 0 : null === (m = f.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === m ? void 0 : null === (A = m.createQuickPlayer) || void 0 === A ? void 0 : A.call(m, {
                                el: U,
                                awemeInfo: y,
                                mountType: l
                            }));
                            if (window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_ABORTED) {
                                t(new Error("Big card quick player creation was manually rejected"));
                                return;
                            }
                            d(I);
                        } catch (e) {
                            t(e);
                        }
                    });
                    window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_REJECT = n;
                }
                try {
                    var n, d;
                    let e = await window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_PROMISE;
                    if (window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_ABORTED) throw new Error("Big card quick player creation was manually rejected");
                    if (null === (d = window) || void 0 === d ? void 0 : null === (n = d.__QUICK_PLAYER) || void 0 === n ? void 0 : n.player) {
                        var t, r, _, a, u;
                        null === (r = window.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === r || null === (t = r.modalToPreviewPlayer) || void 0 === t || t.call(r);
                        null === (u = window.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === u || null === (a = u.player) || void 0 === a || null === (_ = a.pause) || void 0 === _ || _.call(a);
                    } else {
                        var v;
                        if ("modal" === l) {
                            var w, s;
                            null === (s = window.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === s || null === (w = s.previewToModalPlayer) || void 0 === w || w.call(s);
                        } else if ("preview" === l) {
                            var p, E;
                            null === (E = window.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === E || null === (p = E.modalToPreviewPlayer) || void 0 === p || p.call(E);
                        }
                        null == e || null === (v = e.play) || void 0 === v || v.call(e);
                    }
                    return e;
                } catch (e) {
                    delete window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_PROMISE;
                    delete window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_REJECT;
                    delete window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_ABORTED;
                    throw e;
                }
            };
            let j = ()=>{
                window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_PERMANENT_ABORTED = true;
                if (window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_PROMISE) {
                    window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_ABORTED = true;
                    if (window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_REJECT) window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_REJECT(new Error("Big card quick player creation was manually rejected"));
                    delete window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_PROMISE;
                    delete window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_REJECT;
                    delete window.__JX_BIG_CARD_QUICK_PLAYER_CREATE_ABORTED;
                }
            };
            window.disabledBigCardQuickPlayer = (e)=>{
                var l, i;
                if (null === (i = window) || void 0 === i ? void 0 : null === (l = i.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === l ? void 0 : l.player) {
                    var o, n, d;
                    null === (d = window) || void 0 === d || null === (n = d.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === n || null === (o = n.destroyQuickPlayerDom) || void 0 === o || o.call(n);
                    if ("pause" === e) {
                        var t, r, _;
                        null === (_ = window.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === _ || null === (r = _.player) || void 0 === r || null === (t = r.pause) || void 0 === t || t.call(r);
                    } else if ("destroy" === e) {
                        var a, u, c, v, w, s, p, E;
                        null === (c = window.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === c || null === (u = c.player) || void 0 === u || null === (a = u.destroy) || void 0 === a || a.call(u);
                        null === (s = window.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === s || null === (w = s.mountEle) || void 0 === w || null === (v = w.remove) || void 0 === v || v.call(w);
                        null === (p = (E = window).removeBigCardQuickPlayerCrossVolume) || void 0 === p || p.call(E);
                        delete window.__JX_BIG_CARD_QUICK_PLAYER;
                    }
                } else j();
            };
            let O = ()=>{
                if (x) {
                    if (x.complete) {
                        performance.mark("jingxuan_cache_top_card_img_loaded");
                        if (g) k("preview");
                    } else x.addEventListener("load", ()=>{
                        performance.mark("jingxuan_cache_top_card_img_loaded");
                        if (g) k("preview");
                    }, {
                        once: true
                    });
                }
                for(let e = 0; e < y.length; e++){
                    let l = (l)=>{
                        try {
                            var i, o, n;
                            if (!window.pageDirectRender) return;
                            let _ = null === (i = y[e]) || void 0 === i ? void 0 : i.src;
                            let a = null === (o = y[e]) || void 0 === o ? void 0 : o.currentSrc;
                            if (_) {
                                var d;
                                window.pageDirectRender.imagePreloaded = (null !== (d = window.pageDirectRender.imagePreloaded) && void 0 !== d ? d : []).concat(a);
                            }
                            if (!r) return;
                            performance.mark("img-loaded");
                            let c = performance.getEntriesByName("img-loaded")[0].startTime;
                            var t;
                            let v = null !== (t = null === (n = performance.getEntriesByType("resource").find((e)=>"img" === e.initiatorType && e.name === a)) || void 0 === n ? void 0 : n.responseEnd) && void 0 !== t ? t : -1;
                            window.pageDirectRender.imageLoadedTime = !l && v > 0 ? v : c;
                            u();
                        } catch (e) {}
                    };
                    let i = y[e];
                    if (i.complete) l();
                    else i.addEventListener("load", l, {
                        once: true
                    });
                }
            };
            O();
            let q = (i)=>{
                var n;
                if (!window.__QUICK_PLAYER) window.__QUICK_PLAYER = {
                    pageName: "jingxuan"
                };
                if (!i) return;
                let d = (null == i ? void 0 : null === (n = i.querySelectorAll) || void 0 === n ? void 0 : n.call(i, "img.discover-video-card-img")) || [];
                for(let i = 0; i < d.length; i++){
                    var t, r, _, a;
                    let n = d[i];
                    let v = null == n ? void 0 : null === (t = n.closest) || void 0 === t ? void 0 : t.call(n, ".discover-video-card-item");
                    let w = 0 === i && (null == n ? void 0 : null === (_ = n.classList) || void 0 === _ ? void 0 : null === (r = _.contains) || void 0 === r ? void 0 : r.call(_, "jingxuan-top-card-img"));
                    let s = async ()=>{
                        var i, n, d, t, r, _, a, u, s, p, E, R, C, A, m;
                        if (!(null === (i = window) || void 0 === i ? void 0 : i.__QUICK_PLAYER)) return;
                        if (w && g) {
                            k("modal");
                            return;
                        }
                        let f = (null == v ? void 0 : null === (n = v.dataset) || void 0 === n ? void 0 : n.awemeId) || (null == v ? void 0 : null === (d = v.getAttribute) || void 0 === d ? void 0 : d.call(v, "data-aweme-id"));
                        let y = Date.now();
                        var I;
                        if ((null === (t = window.__QUICK_PLAYER.latestClickPointer) || void 0 === t ? void 0 : t.id) === f && y - (null !== (I = null === (_ = window.__QUICK_PLAYER) || void 0 === _ ? void 0 : null === (r = _.latestClickPointer) || void 0 === r ? void 0 : r.timeStamp) && void 0 !== I ? I : 0) <= 600) return;
                        window.__QUICK_PLAYER.latestClickPointer = {
                            id: f,
                            timeStamp: y
                        };
                        try {
                            var P, h;
                            null === (P = (h = window).collectEvent) || void 0 === P || P.call(h, "dehydrated_video_cover_click", {
                                group_id: f,
                                is_first_screen: 1,
                                page_mode: "dehydrated",
                                enter_from: "discover",
                                x_timestamp: Date.now(),
                                x_event_tirgger_duration: -1
                            });
                        } catch (e) {}
                        try {
                            var L, B, D, Q;
                            await Promise.all([
                                (null === (B = window) || void 0 === B ? void 0 : null === (L = B.jingxuan_pre_build_util) || void 0 === L ? void 0 : L.fetchAwemeInfo) ? Promise.resolve(true) : c(e, o),
                                (null === (Q = window) || void 0 === Q ? void 0 : null === (D = Q.__QUICK_PLAYER) || void 0 === D ? void 0 : D.createModalPlayer) ? Promise.resolve(true) : c(l, o)
                            ]);
                        } catch (e) {
                            return;
                        }
                        if (!(null === (u = window) || void 0 === u ? void 0 : null === (a = u.jingxuan_pre_build_util) || void 0 === a ? void 0 : a.fetchAwemeInfo) || !(null === (p = window) || void 0 === p ? void 0 : null === (s = p.__QUICK_PLAYER) || void 0 === s ? void 0 : s.createModalPlayer)) return;
                        null === (m = window) || void 0 === m || null === (A = m.jingxuan_pre_build_util) || void 0 === A || null === (C = A.fetchAwemeInfo) || void 0 === C || null === (R = C.call(A, {
                            awemeId: f,
                            originType: "quick_player"
                        })) || void 0 === R || null === (E = R.then) || void 0 === E || E.call(R, (e)=>{
                            var l, i, o;
                            if (!(null === (l = window) || void 0 === l ? void 0 : l.__QUICK_PLAYER)) return;
                            if ((null === (i = window.__QUICK_PLAYER.latestClickPointer) || void 0 === i ? void 0 : i.id) !== f || (null === (o = window.__QUICK_PLAYER.latestClickPointer) || void 0 === o ? void 0 : o.timeStamp) !== y) return;
                            let n = null == e ? void 0 : e.detail;
                            if (n) {
                                var d, t, r, _;
                                if (null === (d = window.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === d ? void 0 : d.player) {
                                    var a, u;
                                    null === (u = window.__JX_BIG_CARD_QUICK_PLAYER) || void 0 === u || null === (a = u.hiddenQuickPlayerDom) || void 0 === a || a.call(u);
                                } else j();
                                null === (_ = window) || void 0 === _ || null === (r = _.__QUICK_PLAYER) || void 0 === r || null === (t = r.createModalPlayer) || void 0 === t || t.call(r, {
                                    awemeInfo: n
                                });
                            }
                        });
                    };
                    null == v || null === (a = v.addEventListener) || void 0 === a || a.call(v, "click", s);
                    var u;
                    let p = null !== (u = window.__QUICK_PLAYER.removeCardHandlers) && void 0 !== u ? u : [];
                    p.push(()=>{
                        var e;
                        null == v || null === (e = v.removeEventListener) || void 0 === e || e.call(v, "click", s);
                    });
                    window.__QUICK_PLAYER.removeCardHandlers = p;
                }
            };
            q(Y);
        };
        document.addEventListener("DOMContentLoaded", v, {
            once: true
        });
        r = setTimeout(()=>{
            u();
        }, 5e3);
    } catch (e) {
        var r, _;
        console.error("[scriptsDeferred]error", e);
        null === (r = (_ = window).__pc_pace_load_deferred_scripts) || void 0 === r || r.call(_);
    }
})('https://lf-douyin-pc-web.douyinstatic.com/obj/douyin-pc-web/ies/douyin_web/libs/jingxuan-pre-build-util.264d844b.js', 'https://lf-douyin-pc-web.douyinstatic.com/obj/douyin-pc-web/ies/douyin_web/libs/jingxuan-quick-player.e8b7d2f6.js', 'https://lf-douyin-pc-web.douyinstatic.com/obj/douyin-pc-web/ies/douyin_web/libs/jingxuan-big-card-quick-player.b68b5fa5.js', 'd8Nl8yi93sJK-9AhaXO4s', 1, 1, 0);
