import { BundleFilesInfo } from '../parser/bundle-parser.types';
import { BundleCompareFinishResult } from './bundle-compare.types';


export interface IBundleCompare {
    compare (previousInfo: BundleFilesInfo, currentInfo: BundleFilesInfo): BundleCompareFinishResult;
}