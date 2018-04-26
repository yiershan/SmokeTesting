var SmokeTest = (function ($) {
    var _config = {
        url: [{
            name: '',
            url: '',
            selector: {
                query:'',
                attr:''
            }
        }],
        max: 5,
        timeSpan: 100,
        ok: '',
        test: ''
    }, now = 0;
    var start = function () {
            if (!_config.url) return;
            var len = _config.url.length, index = 0, max = _config.max || 5;
            var timer = setInterval(function () {
                if (now < max) {
                    httpGet(_config.url[index++]);
                    now ++;
                    if (index === len) {
                        console.log('执行完毕。');
                        window.clearInterval(timer);
                    }
                }
            }, _config.timeSpan || 100);
        },
        httpGet = function (url) {
            var starTime = new Date().getTime();
            $.get(url.url, function (result) {
                var endTime = new Date().getTime();
                var span = (endTime - starTime) / 1000;
                test(url, result, span);
                now--;
            })
        },
        ok = function (url, span, query) {
            var msg = new Date().toLocaleTimeString() + ':   ';
            msg += '"' + url.name || url.url;
            msg += '"页面访问完毕，页面Ok。';
            if (span) {
                msg += '耗时:' + span + '秒。';
            }
            if (query) {
                msg += '关键字：' + query;
            }
            console.log(msg);
        },
        test = function (url, data, span) {
            var selector = url.selector;
            if(selector&&selector.query&&selector.attr)
            {
                var dom = selector.attr.toLocaleLowerCase()==='html'?$(data).find(selector.query).text():
                    $(data).find(selector.query).attr(selector.attr);
                ok(url, span, $.trim(dom));
            }else {
                ok(url,span);
            }
        },
        init = function (config) {
            now = 0;
            _config = config;
            if (config.ok) {
                ok = config.ok;
            }
            if (config.test) {
                test = config.test;
            }
        };
    return {
        Init: init,
        Start: start
    }
})($);