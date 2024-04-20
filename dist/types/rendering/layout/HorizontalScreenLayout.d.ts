import { MasterBar } from '@src/model/MasterBar';
import { ScoreLayout } from '@src/rendering/layout/ScoreLayout';
import { ScoreRenderer } from '@src/rendering/ScoreRenderer';
export declare class HorizontalScreenLayoutPartialInfo {
    x: number;
    width: number;
    masterBars: MasterBar[];
}
/**
 * This layout arranges the bars all horizontally
 */
export declare class HorizontalScreenLayout extends ScoreLayout {
    static PagePadding: number[];
    static readonly GroupSpacing: number;
    private _group;
    private _pagePadding;
    get name(): string;
    constructor(renderer: ScoreRenderer);
    get supportsResize(): boolean;
    get firstBarX(): number;
    doResize(): void;
    protected doLayoutAndRender(): void;
    private finalizeGroup;
}
