import { IBundleParser } from '../bundle-parser.interface';
import { BundleFilesInfo } from '../bundle-parser.types';
export declare class BundleParser implements IBundleParser {
    parse(filePaths: string[]): BundleFilesInfo;
}
