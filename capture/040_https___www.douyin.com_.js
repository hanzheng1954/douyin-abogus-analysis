
              if (typeof window !== 'undefined' && window.collectEvent) {
                try {
                  if (!/(googlebot|baiduspider)/i.test(navigator.userAgent)) {
                    var isLazyChildren = /(awemePcClient)|(electron)/i.test(navigator.userAgent) && !/feige/i.test(navigator.userAgent) && location.search && location.search.includes && location.search.includes('lazyChildren=1');
                    window.collectEvent('init', {
                      app_id: 6383,
                      channel: 'cn',
                      enable_ab_test: true,
                      ab_channel_domain: 'https://www.douyin.com',
                      disable_auto_pv: isLazyChildren ? true : false,
                      need_zip: false,
                      event_param_size_limit: 1024 * 1024  // 限制大小1mb
                    });
                    window.collectEventInited = true;
                  }
                } catch (e) {
                  console.error('Tea failed to init!!!', e);
                }
              }
            