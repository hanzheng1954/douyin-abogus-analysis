
              if (!/(awemePcClient)|(electron)/i.test(navigator.userAgent)) {
                  window.JS2NativeBridge = {
                      _invokeMethod(){}
                  }
              }
            