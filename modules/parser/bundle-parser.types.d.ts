export type BundleFileInfo = {
    path: string;
    extension: string;
    size: number;
};
export type BundleFilesInfo = Record<string, BundleFileInfo>;
