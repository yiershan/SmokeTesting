define(["require", "exports", "./smoke-config", "jquery", "./smoke-config"], function (require, exports, smoke_config_1, $, smoke_config_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(smoke_config_2);
    var SmokeTest = /** @class */ (function () {
        function SmokeTest() {
            this.now = 0;
            this.index = 0;
            this.c = 0;
            this.s = 0;
            this.e = 0;
            this.config = new smoke_config_1.SmokeConfig();
        }
        Object.defineProperty(SmokeTest.prototype, "len", {
            get: function () {
                return this.config.url.length;
            },
            enumerable: true,
            configurable: true
        });
        SmokeTest.prototype.start = function () {
            var _this = this;
            if (!this.config.url)
                return;
            this.index = 0;
            var max = this.config.max || 5;
            console.log('任务开始，一共' + this.len + '个地址');
            console.log('最大同时访问数量' + max);
            var timer = setInterval(function () {
                if (_this.now < max) {
                    _this.httpGet(_this.config.url[_this.index++]);
                    _this.now++;
                    if (_this.index === _this.len) {
                        window.clearInterval(timer);
                    }
                }
            }, this.config.timeSpan || 100);
        };
        SmokeTest.prototype.init = function (config) {
            this.config = config;
        };
        SmokeTest.prototype.httpGet = function (url) {
            var _this = this;
            console.log('开始访问' + (url.name || url.url));
            var starTime = new Date().getTime();
            $.get(url.url).then(function (result) {
                var endTime = new Date().getTime();
                var span = (endTime - starTime) / 1000;
                _this.test(url, result, span);
                _this.now--;
                _this.isEnd();
            }).fail(function (e) {
                _this.e++;
                _this.isEnd();
                _this.notFind(url, e);
            });
        };
        SmokeTest.prototype.isEnd = function () {
            if (this.s + this.e === this.len) {
                console.log('执行完毕。');
                console.log('链接成功数量：' + this.c);
                console.log('页面正确数量：' + this.s);
                console.log('页面可能不正确数量：' + this.e);
                this.c = this.s = this.e = 0;
            }
        };
        SmokeTest.prototype.ok = function (url, span, query) {
            var msg = new Date().toLocaleTimeString() + ':   "';
            msg += url.name || url.url;
            msg += '"页面访问完毕，页面Ok。';
            if (span) {
                msg += '耗时:' + span + '秒。';
            }
            if (query) {
                msg += '关键字：' + query;
            }
            console.log(msg);
        };
        SmokeTest.prototype.notFind = function (url, data) {
            var msg = new Date().toLocaleTimeString() + ':   ';
            msg += '"' + url.name || url.url;
            msg += '"没有找到关键元素，可能页面有错误！页面地址为：' + url.url;
            if (this.config.error) {
                msg += '页面信息为：';
                console.group(msg);
                console.error(msg);
                console.dirxml(data);
                console.groupEnd();
            }
            else {
                console.log(msg);
            }
        };
        SmokeTest.prototype.test = function (url, data, span) {
            this.c++;
            var selector = url.selector;
            if (selector && selector.query && selector.attr) {
                var dom = selector.attr.toLocaleLowerCase() === 'html' ? $(data).find(selector.query).text() :
                    $(data).find(selector.query).attr(selector.attr);
                if (dom) {
                    this.s++;
                    this.ok(url, span, $.trim(dom));
                }
                else {
                    this.e++;
                    this.notFind(url, data);
                }
            }
            else {
                this.ok(url, span);
            }
        };
        return SmokeTest;
    }());
    exports.SmokeTest = SmokeTest;
});
