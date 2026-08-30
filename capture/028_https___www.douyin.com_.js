(function() {
    try {
        setTimeout(()=>{
            if (window.__pace_load_deferred_scripts) window.__pace_load_deferred_scripts();
        }, 5e3);
    } catch (e) {
        console.error("[deferred]error", e);
    }
})();
