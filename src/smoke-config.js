define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SmokeConfig = /** @class */ (function () {
        function SmokeConfig() {
            this.error = false;
            this.max = 5;
            this.timeSpan = 500;
            this.url = [];
        }
        return SmokeConfig;
    }());
    exports.SmokeConfig = SmokeConfig;
    var SmokeUrl = /** @class */ (function () {
        function SmokeUrl() {
            this.url = "";
        }
        return SmokeUrl;
    }());
    exports.SmokeUrl = SmokeUrl;
    var SmokeSelector = /** @class */ (function () {
        function SmokeSelector() {
            this.query = "";
            this.attr = "";
        }
        return SmokeSelector;
    }());
    exports.SmokeSelector = SmokeSelector;
});
