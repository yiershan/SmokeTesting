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
        test: '',
        error: 0
    }, now = len = index = c = e = s = n =0;
    var start = function () {
            if (!_config.url) return;
            len = _config.url.length;
            index = 0;
            var max = _config.max || 5;
            console.log('任务开始，一共'+len+'个地址');
            console.log('最大同时访问数量'+ max);
            var timer = setInterval(function () {
                if (now < max) {
                    httpGet(_config.url[index++]);
                    now ++;
                    if (index === len) {
                        window.clearInterval(timer);
                    }
                }
            }, _config.timeSpan || 100);
        },
        httpGet = function (url) {
            console.log('开始访问'+(url.name||url.url));
            var starTime = new Date().getTime();
            $.get(url.url, function (result) {
                var endTime = new Date().getTime();
                var span = (endTime - starTime) / 1000;
                test(url, result, span);
                now--;
                isend();
            })
        },
        isend = function () {
            if (index === len&&len!=0) {
                console.log('执行完毕。');
                console.log('链接成功数量：'+c);
                console.log('页面正确数量：'+s);
                console.log('页面可能不正确数量：'+n);
                now = len = index = c = e = s = n =0;
            }
        },
        ok = function (url, span, query) {
            var msg = new Date().toLocaleTimeString() + ':   "';
            msg += url.name|| url.url;
            msg += '"页面访问完毕，页面Ok。';
            if (span) {
                msg += '耗时:' + span + '秒。';
            }
            if (query) {
                msg += '关键字：' + query;
            }
            console.log(msg);
        },
        notFind = function (url,data) {
            var msg = new Date().toLocaleTimeString() + ':   ';
            msg += '"' + url.name || url.url;
            msg += '"没有找到关键元素，可能页面有错误！页面地址为：'+url.url;
            if(_config.error===1){
                msg+= '页面信息为：';
                console.group(msg);
                console.error(msg);
                console.dirxml(data);
                console.groupEnd();
            }else {
                console.log(msg);
            }
        },
        test = function (url, data, span) {
            c++;
            var selector = url.selector;
            if(selector&&selector.query&&selector.attr)
            {
                var dom = selector.attr.toLocaleLowerCase()==='html'?$(data).find(selector.query).text():
                    $(data).find(selector.query).attr(selector.attr);
                if(dom){
                    s++;
                    ok(url, span, $.trim(dom));
                }else {
                    n++;
                    notFind(url,data);
                }
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