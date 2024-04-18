import { BundleFilesInfo } from '../../parser/bundle-parser.types';
import { IBundleFs } from '../bundle-fs.interface';
export declare class BundleFs implements IBundleFs {
    private readonly _fileDir;
    private readonly _fileName;
    constructor(_fileDir: string, _fileName: string);
    read(): BundleFilesInfo;
    write(data: BundleFilesInfo): void;
}
