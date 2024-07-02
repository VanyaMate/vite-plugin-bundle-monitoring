import { BundleCompareFinishResult } from '../../compare/bundle-compare.types';
import { IBundleCompareView } from '../bundle-comape-view.interface';
export type ConsoleBundleCompareViewOptions = {
    headerLength?: number;
    headerFiller?: string;
    headerSpace?: number;
    itemWidth?: number;
    itemSpace?: number;
};
export declare class ConsoleBundleCompareView implements IBundleCompareView {
    private readonly _headerLength;
    private readonly _headerFiller;
    private readonly _headerSpace;
    private readonly _itemWidth;
    private readonly _itemSpace;
    constructor(options?: ConsoleBundleCompareViewOptions);
    render(result: BundleCompareFinishResult): void;
    private _renderCompare;
    private _renderNew;
    private _renderDeleted;
    private _renderComparedHeader;
    private _renderChangedHeader;
    private _renderChangedItem;
    private _renderNewItem;
    private _header;
    private _finish;
    private _item;
}
