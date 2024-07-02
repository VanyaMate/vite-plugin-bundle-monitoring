import { BundleFilesInfo } from '../../parser/bundle-parser.types';
import { IBundleCompare } from '../bundle-compare.interface';
import { BundleCompareFinishResult } from '../bundle-compare.types';


export class BundleCompare implements IBundleCompare {
    compare (previousInfo: BundleFilesInfo, currentInfo: BundleFilesInfo): BundleCompareFinishResult {
        const compareResults: BundleCompareFinishResult = {
            deletedFiles: {},
            newFiles    : {},
            compared    : {},
        };

        const previousFileNames = Object.keys(previousInfo);
        const currentFileNames  = Object.keys(currentInfo);
        const fileNames         = new Set([ ...previousFileNames, ...currentFileNames ]);

        fileNames.forEach((fileName) => {
            const previousFileData = previousInfo[fileName];
            const currentFileData  = currentInfo[fileName];

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
                currentSize : currentFileData.size,
                delta       : currentFileData.size - previousFileData.size,
                deltaPercent: Number((100 - 100 / previousFileData.size * currentFileData.size).toFixed(2)),
            };
        });

        return compareResults;
    }
}