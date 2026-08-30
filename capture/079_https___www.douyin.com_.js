
          if (typeof window !== 'undefined' && window.TTE_ENV) {
            try {
              if (window.TTE_ENV.windowName === "MAIN_WINDOW") {
                if (!location.search.includes('lazyChildren=1')) {
                  window.TTE_ENV.bridge.send('custom-ready-to-show');
                  console.log('send custom-ready-to-show2', Date.now());
                }
              }
            } catch (e) {
              console.error('window.TTE_ENV.bridge.send failed to init!!!', e);
            }
          }
        