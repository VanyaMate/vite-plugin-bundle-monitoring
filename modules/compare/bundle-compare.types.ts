export type BundleCompareResult = {
    previousSize: number;
    currentSize: number;
    delta: number;
    deltaPercent: number;
}

export type BundleCompareResults = Record<string, BundleCompareResult>;
export type BundleDiff = Record<string, number>;

export type BundleCompareFinishResult = {
    compared: BundleCompareResults,
    newFiles: BundleDiff,
    deletedFiles: BundleDiff,
}