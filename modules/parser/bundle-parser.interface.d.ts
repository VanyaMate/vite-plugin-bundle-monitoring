import { BundleFilesInfo } from './bundle-parser.types';
export interface IBundleParser {
    parse(filePaths: string[]): BundleFilesInfo;
}
