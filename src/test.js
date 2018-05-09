define(["require", "exports", "./smoke-test"], function (require, exports, smoke_test_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var config = new smoke_test_1.SmokeConfig();
    config.url = [{
            name: '首页',
            url: 'index.html',
            selector: {
                query: 'spa',
                attr: 'href'
            }
        }, {
            url: 'index.html',
            selector: {
                query: '.footer span',
                attr: 'html'
            }
        }, {
            url: 'index.html',
            selector: {
                query: '.footer span',
                attr: 'html'
            }
        }, {
            url: 'index.html',
            selector: {
                query: '.footer span',
                attr: 'html'
            }
        }, {
            url: 'index.html',
            selector: {
                query: '.footer span',
                attr: 'html'
            }
        }, {
            url: 'index.html',
            selector: {
                query: '.footer span',
                attr: 'html'
            }
        }, {
            url: 'index.html',
            selector: {
                query: '.footer span',
                attr: 'html'
            }
        }];
    config.error = true;
    var smoke = new smoke_test_1.SmokeTest();
    smoke.init(config);
    smoke.start();
});
