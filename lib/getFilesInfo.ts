import * as fs from 'fs';
import * as path from 'path';


export type FilesInfo = Record<string, FileInfo>;

export type FileInfo = {
    path: string;
    extension: string;
    size: number;
}

export const getFilesInfo = function (filesPaths: string[]): FilesInfo {
    const sizes: FilesInfo = {};

    filesPaths.forEach((filePath: string) => {
        const fileInfo: fs.Stats = fs.statSync(filePath);
        const fileBundleName     = path.basename(filePath);
        const fileName           = fileBundleName.split('-')[0];
        const fileExt            = filePath.split('.').at(-1);

        sizes[fileName] = {
            size     : fileInfo.size,
            extension: fileExt,
            path     : filePath,
        };
    });

    return sizes;
};