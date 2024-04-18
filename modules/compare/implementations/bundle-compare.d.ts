import { BundleFilesInfo } from '../../parser/bundle-parser.types';
import { IBundleCompare } from '../bundle-compare.interface';
import { BundleCompareFinishResult } from '../bundle-compare.types';
export declare class BundleCompare implements IBundleCompare {
    compare(previousInfo: BundleFilesInfo, currentInfo: BundleFilesInfo): BundleCompareFinishResult;
}
