import { IBundleParser } from '../bundle-parser.interface';
import { BundleFilesInfo } from '../bundle-parser.types';
import * as fs from 'fs';
import * as path from 'path';


export class BundleParser implements IBundleParser {
    parse (filePaths: string[]): BundleFilesInfo {
        try {
            const parsedData: BundleFilesInfo = {};

            filePaths.forEach((filePath: string) => {
                const fileInfo: fs.Stats = fs.statSync(filePath);
                const fileBundleName     = path.basename(filePath);
                const fileName           = fileBundleName.split('-')[0];
                const fileExt            = filePath.split('.').at(-1);

                parsedData[fileExt + '.' + fileName] = {
                    size     : fileInfo.size,
                    extension: fileExt,
                    path     : filePath,
                };
            });

            return parsedData;
        } catch (e) {
            console.error('BundleParserError', e);
            return {};
        }
    }
}