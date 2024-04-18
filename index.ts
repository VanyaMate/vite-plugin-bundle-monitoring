import type { Plugin } from 'vite';
import * as path from 'path';
import { BundleFs } from './modules/fs/implementations/bundle-fs';
import { BundleParser } from './modules/parser/implementations/bundle-parser';
import { BundleCompare } from './modules/compare/implementations/bundle-compare';
import {
    ConsoleBundleCompareView,
} from './modules/view/implementations/console-bundle-compare-view';


export type VitePluginBundleMonitoringOptions = {
    compareFileDir?: string;
    compareFileName?: string;
}

export default function (options: VitePluginBundleMonitoringOptions): Plugin {
    const {
              compareFileDir  = __dirname,
              compareFileName = 'vite-bundle-monitoring.compare.json',
          }                    = options;
    const filesPaths: string[] = [];

    return {
        name          : 'vite-plugin-bundle-monitoring',
        apply         : 'build',
        generateBundle: (_, bundle) => {
            if (_.dir) {
                Object.keys(bundle).forEach((bundleFilePath) => {
                    filesPaths.push(path.join(_.dir!, bundleFilePath));
                });
            }
        },
        closeBundle   : () => {
            const bundleFs      = new BundleFs(compareFileDir, compareFileName);
            const bundleParser  = new BundleParser();
            const bundleCompare = new BundleCompare();
            const bundleView    = new ConsoleBundleCompareView();

            const previousBundleInfo = bundleFs.read();
            const currentBundleInfo  = bundleParser.parse(filesPaths);
            const previousValueExist = previousBundleInfo !== null;
            if (!previousValueExist) {
                bundleFs.write(currentBundleInfo);
            }
            const compareResult = bundleCompare.compare(previousBundleInfo ?? {}, currentBundleInfo);
            bundleView.render(compareResult);
        },
    };
};