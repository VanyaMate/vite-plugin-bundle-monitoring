import { BundleFilesInfo } from '../../parser/bundle-parser.types';
import { IBundleFs } from '../bundle-fs.interface';
import * as fs from 'fs';
import * as path from 'path';


export class BundleFs implements IBundleFs {
    constructor (
        private readonly _fileDir: string,
        private readonly _fileName: string,
    ) {
    }

    read (): BundleFilesInfo {
        try {
            const filePath  = path.join(this._fileDir, this._fileName);
            const fileExist = fs.existsSync(filePath);
            if (fileExist) {
                const fileContent = fs.readFileSync(path.join(this._fileDir, this._fileName), { encoding: 'utf-8' });
                if (fileContent) {
                    return JSON.parse(fileContent);
                } else {
                    return {};
                }
            } else {
                return null;
            }
        } catch (e) {
            console.error('BundleFs read-error: cant get file cuz -', e);
            return {};
        }
    }

    write (data: BundleFilesInfo): void {
        try {
            fs.mkdirSync(this._fileDir, { recursive: true });
            fs.writeFileSync(path.join(this._fileDir, this._fileName), JSON.stringify(data), { encoding: 'utf-8' });
        } catch (e) {
            console.error('BundleFs write-error: cant write file cuz -', e);
        }
    }

}