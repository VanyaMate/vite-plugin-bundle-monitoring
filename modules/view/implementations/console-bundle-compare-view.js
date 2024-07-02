"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleBundleCompareView = void 0;
var ConsoleBundleCompareView = /** @class */ (function () {
    function ConsoleBundleCompareView(options) {
        var _a, _b, _c, _d, _e;
        this._headerLength = (_a = options === null || options === void 0 ? void 0 : options.headerLength) !== null && _a !== void 0 ? _a : 109;
        this._headerFiller = (_b = options === null || options === void 0 ? void 0 : options.headerFiller) !== null && _b !== void 0 ? _b : '-';
        this._headerSpace = (_c = options === null || options === void 0 ? void 0 : options.headerSpace) !== null && _c !== void 0 ? _c : 2;
        this._itemWidth = (_d = options === null || options === void 0 ? void 0 : options.itemWidth) !== null && _d !== void 0 ? _d : 24;
        this._itemSpace = (_e = options === null || options === void 0 ? void 0 : options.itemSpace) !== null && _e !== void 0 ? _e : 4;
    }
    ConsoleBundleCompareView.prototype.render = function (result) {
        this._header('Compared files');
        this._renderComparedHeader();
        this._renderCompare(result.compared);
        this._header('Deleted files');
        this._renderChangedHeader();
        this._renderDeleted(result.deletedFiles);
        this._header('New files');
        this._renderChangedHeader();
        this._renderNew(result.newFiles);
        this._finish();
    };
    ConsoleBundleCompareView.prototype._renderCompare = function (compared) {
        var _this = this;
        Object.entries(compared).forEach(function (_a) {
            var fileName = _a[0], comparedData = _a[1];
            return _this._renderChangedItem(fileName, comparedData);
        });
    };
    ConsoleBundleCompareView.prototype._renderNew = function (data) {
        var _this = this;
        Object.entries(data).forEach(function (_a) {
            var fileName = _a[0], comparedData = _a[1];
            return _this._renderNewItem(fileName, comparedData);
        });
    };
    ConsoleBundleCompareView.prototype._renderDeleted = function (data) {
        var _this = this;
        Object.entries(data).forEach(function (_a) {
            var fileName = _a[0], comparedData = _a[1];
            return _this._renderNewItem(fileName, comparedData);
        });
    };
    ConsoleBundleCompareView.prototype._renderComparedHeader = function () {
        console.log("\u001B[0m%s\u001B[0m%s\u001B[0m%s\u001B[0m%s\u001B[0m%s", "".concat(this._item('FILE_NAME')), "".concat(this._item('PREVIOUS_SIZE')), "".concat(this._item('CURRENT_SIZE')), "".concat(this._item('DELTA')), "".concat(this._item('DELTA_PERCENT')));
    };
    ConsoleBundleCompareView.prototype._renderChangedHeader = function () {
        console.log("\u001B[0m%s\u001B[0m%s", "".concat(this._item('FILE_NAME')), "".concat(this._item('FILE_SIZE')));
    };
    ConsoleBundleCompareView.prototype._renderChangedItem = function (name, item) {
        console.log("\u001B[0m%s\u001B[36m%s\u001B[34m%s\u001B[".concat(item.previousSize >= item.currentSize
            ? '32'
            : '31', "m%s\u001B[").concat(item.deltaPercent > 0
            ? '32'
            : '31', "m%s"), "".concat(this._item(name)), "".concat(this._item("".concat(item.previousSize, " kb"))), "".concat(this._item("".concat(item.currentSize, " kb"))), "".concat(this._item("".concat(item.delta, " kb"))), "".concat(this._item("".concat(item.deltaPercent, " %"))));
    };
    ConsoleBundleCompareView.prototype._renderNewItem = function (name, size) {
        console.log("\u001B[36m%s\u001B[36m%s", "".concat(this._item(name)), "".concat(this._item("".concat(size, " kb"))));
    };
    ConsoleBundleCompareView.prototype._header = function (title) {
        var titleLength = title.length + this._headerSpace;
        var leftSide = Math.floor((this._headerLength - titleLength) / 2);
        var rightSide = this._headerLength - titleLength - leftSide;
        var leftSpace = Math.floor(this._headerSpace / 2);
        var rightSpace = this._headerSpace - leftSpace;
        console.log("\u001B[0m%s", "".concat(this._headerFiller.repeat(leftSide)).concat(' '.repeat(leftSpace)).concat(title).concat(' '.repeat(rightSpace)).concat(this._headerFiller.repeat(rightSide)));
    };
    ConsoleBundleCompareView.prototype._finish = function () {
        console.log("\u001B[0m%s", this._headerFiller.repeat(this._headerLength));
    };
    ConsoleBundleCompareView.prototype._item = function (data) {
        return data.toString().slice(0, this._itemWidth - this._itemSpace).padEnd(this._itemWidth);
    };
    return ConsoleBundleCompareView;
}());
exports.ConsoleBundleCompareView = ConsoleBundleCompareView;
