import { BundleCompareFinishResult } from '../compare/bundle-compare.types';
export interface IBundleCompareView {
    render(result: BundleCompareFinishResult): void;
}
