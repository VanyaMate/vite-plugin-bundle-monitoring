import { BundleFilesInfo } from '../parser/bundle-parser.types';


export interface IBundleFs {
    read (): BundleFilesInfo;

    write (data: BundleFilesInfo): void;
}