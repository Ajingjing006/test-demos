function oldLoadFn() {
    var weburl = "https://creditcardapp.bankcomm.com/mdb/download/mdbapp.html?downSource=ACT_WEEK_SWIPINGCARD_PC";
    var appurl1 = "https://paymenttest.bankcomm.com/acsweb/actDetail/detail?actId=20190424163352";
    var mdbTargetUrl = "";
    if (mdbTargetUrl) {
        appurl1 = decodeURI(mdbTargetUrl);
    }
    var appurl2 = "https://paymenttest.bankcomm.com/acsweb/actDetail/detail?actId=20190424163352";
    var ua = navigator.userAgent.toLowerCase();

    // 买单吧扫描二维码
    if (ua.indexOf("com.bankcomm.maidanba") != -1) {
        window.location.href = appurl2;
    } else {
        if (typeof MdbApp !== 'object') {
            MdbApp = {};
        }
        var locked = false,
            delayToRun;
        var domLoaded = true;

        function customClickEvent() {
            var clickEvt;
            if (window.CustomEvent) {
                clickEvt = new window.CustomEvent('click', {
                    canBubble: true,
                    cancelable: true
                });
            } else {
                clickEvt = document.createEvent('Event');
                clickEvt.initEvent('click', true, true);
            }
            return clickEvt;
        }
        if (ua.indexOf('m353') > -1 && !noIntentTest) {
            canIntent = false;
        }

        // 是否在 webview
        var inWebview = '';
        if (inWebview) {
            canIntent = false;
        }
        var noIntentTest = /aliapp|360 aphone|weibo|windvane|ucbrowser|baidubrowser/.test(ua);
        var hasIntentTest = /chrome|samsung/.test(ua);
        var specialTest = /samsung|xiaomi|oppo/.test(ua);
        var isAndroid = /android|adr/.test(ua) && !(/windows phone/.test(ua));
        var canIntent = !noIntentTest && hasIntentTest && isAndroid;
        var openInIfr = /weibo|m353/.test(ua);
        var inWeibo = ua.indexOf('weibo') > -1;
        var isWeixin = ua.match(/MicroMessenger/i) == "micromessenger";
        var isIphone = ua.match(/iphone/i);

        // 微信扫描二维码
        if (isWeixin) {
            if (isIphone) {
                var iphonehtml = '<div style="background: url(/member/mobile/resource/images/app/apple_.png) no-repeat top left; background-size: 100% 100%;"></div>';
                $("#PhoneType").html(iphonehtml);
            }
            if (isAndroid) {
                var Androidhtml = '<div style="background: url(/member/mobile/resource/images/app/android_.png) no-repeat top left; background-size: 100% 100%;"></div>';
                $("#PhoneType").html(Androidhtml);
            }
        } else {

            MdbApp.open = function(params, jumpUrl) {
                if (!domLoaded && (ua.indexOf('360 aphone') > -1 || canIntent)) {
                    var arg = arguments;
                    delayToRun = function() {
                        MdbApp.open.apply(null, arg);
                        delayToRun = null;
                    };
                    return;
                }

                // 唤起锁定，避免重复唤起
                if (locked) {
                    return;
                }
                locked = true;
                var o;

                // 参数容错
                if (typeof params === 'object') {
                    o = params;
                } else {
                    o = {
                        params: params,
                        jumpUrl: jumpUrl
                    };
                }
                // alert(o+'     110');

                // 参数容错
                if (typeof o.params !== 'string') {
                    o.params = '';
                }
                // if (typeof o.openAppStore !== 'boolean') {
                //     o.openAppStore = true;
                // }
                o.params = o.params || 'appId=20000001';
                o.params = o.params + '';
                o.params = o.params + '&_t=' + (new Date() - 0);

                // 是否为RC环境
                var isRc = '';

                // 是否唤起re包
                var isRe = '';
                if (typeof o.isRe === 'undefined') {
                    o.isRe = !!isRe;
                }

                // 通过alipays协议唤起钱包
                var schemePrefix;
                if (ua.indexOf('mac os') > -1 &&
                    ua.indexOf('mobile') > -1) {
                    schemePrefix = 'mdb';
                }
                if (!schemePrefix && o.isRe) {
                    schemePrefix = 'mdb';
                }
                schemePrefix = schemePrefix || 'mdb';

                // 延迟移除用来激活的IFRAME并跳转到下载页
                setTimeout(
                    function() {
                        // alert('o.jumpUrl' + o.jumpUrl);
                        //https://creditcardapp.bankcomm.com/mdb/download/mdbapp.html?downSource=LIFE_ACTIVATION_LANDINGPAGE
                        if (typeof o.jumpUrl !== 'string') {
                            o.jumpUrl = 'https://creditcardapp.bankcomm.com/content/dam/phone/images/dxin/load/mob_duanxin.html';
                        }
                        // 默认跳转地址
                        if (o.jumpUrl === 'default') {
                            o.jumpUrl = 'https://creditcardapp.bankcomm.com/content/dam/phone/images/dxin/load/mob_duanxin.html';
                        }
                        if (o.jumpUrl === '') {
                            o.jumpUrl = 'https://creditcardapp.bankcomm.com/content/dam/phone/images/dxin/load/mob_duanxin.html';
                        }
                        if (o.jumpUrl && typeof o.jumpUrl === 'string') {
                            location.href = o.jumpUrl;
                        }
                        //location.href = 'https://paymenttest.bankcomm.com/mdb/download/public.html?downSource=ECB_TOP_APPBANNER';
                    }, 3500)

                // 唤起加锁，避免短时间内被重复唤起
                setTimeout(function() {
                    locked = false;
                }, 2500)

                //被动唤醒
                if (!canIntent || specialTest) {
                    var mdbUrl = schemePrefix + '://com.bankcomm.maidanba/access?code=0&url=' + appurl1;
                    if (ua.indexOf('qq/') > -1 || (ua.indexOf('safari') > -1 && ua.indexOf('os 9_') > -1) || (ua.indexOf('safari') > -1 && ua.indexOf('os 10_') > -1) || (ua.indexOf('safari') > -1 && ua.indexOf('os 11_') > -1) || (ua.indexOf('safari') > -1 && ua.indexOf('os 12_') > -1)) {
                        var openSchemeLink = document.getElementById('openSchemeLink');
                        if (!openSchemeLink) {
                            openSchemeLink = document.createElement('a');
                            openSchemeLink.id = 'openSchemeLink';
                            openSchemeLink.style.display = 'none';
                            document.body.appendChild(openSchemeLink);
                        }
                        openSchemeLink.href = mdbUrl;
                        // 执行click
                        openSchemeLink.dispatchEvent(customClickEvent());
                    } else {
                        //var mdbUrl = 'mdb://com.bankcomm.maidanba/access?code=0'+'#Intent;scheme='+ schemePrefix +';package=com.bankcomm.maidanba;end';
                        var ifr = document.createElement('iframe');
                        ifr.src = mdbUrl;
                        ifr.style.display = 'none';
                        document.body.appendChild(ifr);
                        //location.href = 'mdb://com.bankcomm.maidanba/access?code=0&url=http://creditcard.bankcomm.com/content/dam/phone/zx/vip/app/index_app.html'
                    }
                } else {
                    setTimeout(
                        function() {
                            // android 下 chrome 浏览器通过 intent 协议唤起
                            //var intentUrl = schemePrefix + '://com.bankcomm.maidanba/access?code=0&url=';
                            //var intentUrl  =  '#Intent;mdb://com.bankcomm.maidanba/accesscom.bankcomm.maidanba;end';
                            //var intentUrl ='#Intent;scheme='+ schemePrefix + '://com.bankcomm.maidanba/access'+';package=com.bankcomm.maidanba;end' ;
                            var intentUrl = 'intent://com.bankcomm.maidanba/access?code=0&url=' + appurl1 + '#Intent;scheme=mdb;package=com.bankcomm.maidanba;end'; // right
                            //var intentUrl = 'intent://platformapi/startapp?'+o.params+'#Intent;scheme='+ schemePrefix +';package=com.eg.android.'+ packageKey +';end';
                            //alert(intentUrl);
                            var openIntentLink = document.getElementById('openIntentLink');
                            if (!openIntentLink) {
                                openIntentLink = document.createElement('a');
                                openIntentLink.id = 'openIntentLink';
                                openIntentLink.style.display = 'none';
                                document.body.appendChild(openIntentLink);
                            }
                            openIntentLink.href = intentUrl;
                            // 执行click
                            openIntentLink.dispatchEvent(customClickEvent());
                        }, 300) //location.href = 'mdb://com.bankcomm.maidanba/access?code=0&url=http://creditcard.bankcomm.com/content/dam/phone/zx/vip/app/index_app.html'
                }
                //执行被动唤醒
            };
        }

        if (!domLoaded) {
            document.addEventListener('DOMContentLoaded',
                function() {
                    domLoaded = true;
                    if (typeof delayToRun === 'function') {
                        delayToRun();
                    }
                }, false);
        }

        var schemeParam = '';
        if (!location.hash) {
            MdbApp.open({
                params: schemeParam,
                jumpUrl: weburl,
                openAppStore: false
            });
        }
    }