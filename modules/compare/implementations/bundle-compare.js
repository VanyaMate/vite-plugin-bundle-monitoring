"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BundleCompare = void 0;
var BundleCompare = /** @class */ (function () {
    function BundleCompare() {
    }
    BundleCompare.prototype.compare = function (previousInfo, currentInfo) {
        var compareResults = {
            deletedFiles: {},
            newFiles: {},
            compared: {},
        };
        var previousFileNames = Object.keys(previousInfo);
        var currentFileNames = Object.keys(currentInfo);
        var fileNames = new Set(__spreadArray(__spreadArray([], previousFileNames, true), currentFileNames, true));
        fileNames.forEach(function (fileName) {
            var previousFileData = previousInfo[fileName];
            var currentFileData = currentInfo[fileName];
            if (!previousFileData) {
                compareResults.newFiles[fileName] = currentFileData.size;
                return;
            }
            if (!currentFileData) {
                compareResults.deletedFiles[fileName] = previousFileData.size;
                return;
            }
            compareResults.compared[fileName] = {
                previousSize: previousFileData.size,
                currentSize: currentFileData.size,
                delta: currentFileData.size - previousFileData.size,
                deltaPercent: Number((100 / previousFileData.size * currentFileData.size - 100).toFixed(2)),
            };
        });
        return compareResults;
    };
    return BundleCompare;
}());
exports.BundleCompare = BundleCompare;
