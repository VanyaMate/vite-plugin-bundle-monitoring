"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BundleFs = void 0;
var fs = require("fs");
var path = require("path");
var BundleFs = /** @class */ (function () {
    function BundleFs(_fileDir, _fileName) {
        this._fileDir = _fileDir;
        this._fileName = _fileName;
    }
    BundleFs.prototype.read = function () {
        try {
            var filePath = path.join(this._fileDir, this._fileName);
            var fileExist = fs.existsSync(filePath);
            if (fileExist) {
                var fileContent = fs.readFileSync(path.join(this._fileDir, this._fileName), { encoding: 'utf-8' });
                if (fileContent) {
                    return JSON.parse(fileContent);
                }
                else {
                    return {};
                }
            }
            else {
                return null;
            }
        }
        catch (e) {
            console.error('BundleFs read-error: cant get file cuz -', e);
            return {};
        }
    };
    BundleFs.prototype.write = function (data) {
        try {
            fs.mkdirSync(this._fileDir, { recursive: true });
            fs.writeFileSync(path.join(this._fileDir, this._fileName), JSON.stringify(data), { encoding: 'utf-8' });
        }
        catch (e) {
            console.error('BundleFs write-error: cant write file cuz -', e);
        }
    };
    return BundleFs;
}());
exports.BundleFs = BundleFs;
