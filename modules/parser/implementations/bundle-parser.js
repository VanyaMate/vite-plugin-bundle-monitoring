"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BundleParser = void 0;
var fs = require("fs");
var path = require("path");
var BundleParser = /** @class */ (function () {
    function BundleParser() {
    }
    BundleParser.prototype.parse = function (filePaths) {
        try {
            var parsedData_1 = {};
            filePaths.forEach(function (filePath) {
                var fileInfo = fs.statSync(filePath);
                var fileBundleName = path.basename(filePath);
                var fileName = fileBundleName.split('-')[0];
                var fileExt = filePath.split('.').at(-1);
                parsedData_1[fileExt + '.' + fileName] = {
                    size: fileInfo.size,
                    extension: fileExt,
                    path: filePath,
                };
            });
            return parsedData_1;
        }
        catch (e) {
            console.error('BundleParserError', e);
            return {};
        }
    };
    return BundleParser;
}());
exports.BundleParser = BundleParser;
