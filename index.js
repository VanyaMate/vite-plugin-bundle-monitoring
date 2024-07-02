"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var path = require("path");
var bundle_fs_1 = require("./modules/fs/implementations/bundle-fs");
var bundle_parser_1 = require("./modules/parser/implementations/bundle-parser");
var bundle_compare_1 = require("./modules/compare/implementations/bundle-compare");
var console_bundle_compare_view_1 = require("./modules/view/implementations/console-bundle-compare-view");

function default_1(options) {
    var _a = options.compareFileDir, compareFileDir = _a === void 0 ? __dirname : _a, _b = options.compareFileName,
        compareFileName = _b === void 0 ? 'vite-bundle-monitoring.compare.json' : _b;
    var filesPaths = [];
    return {
        name: 'vite-plugin-bundle-monitoring',
        apply: 'build',
        generateBundle: function (_, bundle) {
            if (_.dir) {
                Object.keys(bundle).forEach(function (bundleFilePath) {
                    filesPaths.push(path.join(_.dir, bundleFilePath));
                });
            }
        },
        closeBundle: function () {
            var bundleFs = new bundle_fs_1.BundleFs(compareFileDir, compareFileName);
            var bundleParser = new bundle_parser_1.BundleParser();
            var bundleCompare = new bundle_compare_1.BundleCompare();
            var bundleView = new console_bundle_compare_view_1.ConsoleBundleCompareView();
            var previousBundleInfo = bundleFs.read();
            var currentBundleInfo = bundleParser.parse(filesPaths);
            var previousValueExist = previousBundleInfo !== null;
            if (!previousValueExist) {
                bundleFs.write(currentBundleInfo);
            }
            var compareResult = bundleCompare.compare(previousBundleInfo !== null && previousBundleInfo !== void 0 ? previousBundleInfo : {}, currentBundleInfo);
            bundleView.render(compareResult);
        },
    };
}

exports.default = default_1;
;
