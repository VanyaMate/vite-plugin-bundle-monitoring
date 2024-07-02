import {
    BundleDiff,
    BundleCompareResults, BundleCompareResult,
    BundleCompareFinishResult,
} from '../../compare/bundle-compare.types';
import { IBundleCompareView } from '../bundle-comape-view.interface';


export type ConsoleBundleCompareViewOptions = {
    headerLength?: number;
    headerFiller?: string;
    headerSpace?: number;
    itemWidth?: number;
    itemSpace?: number;
}

export class ConsoleBundleCompareView implements IBundleCompareView {
    private readonly _headerLength: number;
    private readonly _headerFiller: string;
    private readonly _headerSpace: number;
    private readonly _itemWidth: number;
    private readonly _itemSpace: number;

    constructor (options?: ConsoleBundleCompareViewOptions) {
        this._headerLength = options?.headerLength ?? 109;
        this._headerFiller = options?.headerFiller ?? '-';
        this._headerSpace  = options?.headerSpace ?? 2;
        this._itemWidth    = options?.itemWidth ?? 24;
        this._itemSpace    = options?.itemSpace ?? 4;
    }

    render (result: BundleCompareFinishResult): void {
        this._header('Compared files');
        this._renderComparedHeader();
        this._renderCompare(result.compared);

        this._header('Deleted files');
        this._renderChangedHeader();
        this._renderDeleted(result.deletedFiles);

        this._header('New files');
        this._renderChangedHeader();
        this._renderNew(result.newFiles);

        this._finish();
    }

    private _renderCompare (compared: BundleCompareResults): void {
        Object.entries(compared).forEach(([ fileName, comparedData ]) => this._renderChangedItem(fileName, comparedData));
    }

    private _renderNew (data: BundleDiff): void {
        Object.entries(data).forEach(([ fileName, comparedData ]) => this._renderNewItem(fileName, comparedData));
    }

    private _renderDeleted (data: BundleDiff): void {
        Object.entries(data).forEach(([ fileName, comparedData ]) => this._renderNewItem(fileName, comparedData));
    }

    private _renderComparedHeader () {
        console.log(
            `\x1b[0m%s\x1b[0m%s\x1b[0m%s\x1b[0m%s\x1b[0m%s`,
            `${ this._item('FILE_NAME') }`,
            `${ this._item('PREVIOUS_SIZE') }`,
            `${ this._item('CURRENT_SIZE') }`,
            `${ this._item('DELTA') }`,
            `${ this._item('DELTA_PERCENT') }`,
        );
    }

    private _renderChangedHeader () {
        console.log(
            `\x1b[0m%s\x1b[0m%s`,
            `${ this._item('FILE_NAME') }`,
            `${ this._item('FILE_SIZE') }`,
        );
    }

    private _renderChangedItem (name: string, item: BundleCompareResult): void {
        console.log(
            `\x1b[0m%s\x1b[36m%s\x1b[34m%s\x1b[${ item.previousSize >= item.currentSize
                                                  ? '32'
                                                  : '31' }m%s\x1b[${ item.deltaPercent > 0
                                                                     ? '32'
                                                                     : '31' }m%s`,
            `${ this._item(name) }`,
            `${ this._item(`${ item.previousSize } kb`) }`,
            `${ this._item(`${ item.currentSize } kb`) }`,
            `${ this._item(`${ item.delta } kb`) }`,
            `${ this._item(`${ item.deltaPercent } %`) }`,
        );
    }

    private _renderNewItem (name: string, size: number) {
        console.log(
            `\x1b[36m%s\x1b[36m%s`,
            `${ this._item(name) }`,
            `${ this._item(`${ size } kb`) }`,
        );
    }


    private _header (title: string): void {
        const titleLength: number = title.length + this._headerSpace;
        const leftSide: number    = Math.floor((this._headerLength - titleLength) / 2);
        const rightSide: number   = this._headerLength - titleLength - leftSide;
        const leftSpace: number   = Math.floor(this._headerSpace / 2);
        const rightSpace: number  = this._headerSpace - leftSpace;

        console.log(
            `\x1b[0m%s`,
            `${ this._headerFiller.repeat(leftSide) }${ ' '.repeat(leftSpace) }${ title }${ ' '.repeat(rightSpace) }${ this._headerFiller.repeat(rightSide) }`,
        );
    }

    private _finish (): void {
        console.log(`\x1b[0m%s`, this._headerFiller.repeat(this._headerSpace));
    }

    private _item (data: any): string {
        return data.toString().slice(0, this._itemWidth - this._itemSpace).padEnd(this._itemWidth);
    }
}