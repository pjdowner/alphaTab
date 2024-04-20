import { Bar } from '@src/model/Bar';
import { ICanvas } from '@src/platform/ICanvas';
import { BarRendererBase } from '@src/rendering/BarRendererBase';
import { ChordDiagramContainerGlyph } from '@src/rendering/glyphs/ChordDiagramContainerGlyph';
import { TextGlyph } from '@src/rendering/glyphs/TextGlyph';
import { RenderFinishedEventArgs } from '@src/rendering/RenderFinishedEventArgs';
import { ScoreRenderer } from '@src/rendering/ScoreRenderer';
import { StaveGroup } from '@src/rendering/staves/StaveGroup';
import { NotationElement } from '@src/NotationSettings';
import { TuningContainerGlyph } from '@src/rendering/glyphs/TuningContainerGlyph';
/**
 * Lists the different modes in which the staves and systems are arranged.
 */
export declare enum InternalSystemsLayoutMode {
    /**
     * Use the automatic alignment system provided by alphaTab (default)
     */
    Automatic = 0,
    /**
     * Use the relative scaling information stored in the score model.
     */
    FromModelWithScale = 1,
    /**
     * Use the absolute size information stored in the score model.
     */
    FromModelWithWidths = 2
}
/**
 * This is the base class for creating new layouting engines for the score renderer.
 */
export declare abstract class ScoreLayout {
    private _barRendererLookup;
    abstract get name(): string;
    renderer: ScoreRenderer;
    width: number;
    height: number;
    protected scoreInfoGlyphs: Map<NotationElement, TextGlyph>;
    protected chordDiagrams: ChordDiagramContainerGlyph | null;
    protected tuningGlyph: TuningContainerGlyph | null;
    systemsLayoutMode: InternalSystemsLayoutMode;
    protected constructor(renderer: ScoreRenderer);
    abstract get firstBarX(): number;
    abstract get supportsResize(): boolean;
    resize(): void;
    abstract doResize(): void;
    layoutAndRender(): void;
    private _lazyPartials;
    protected registerPartial(args: RenderFinishedEventArgs, callback: (canvas: ICanvas) => void): void;
    private internalRenderLazyPartial;
    renderLazyPartial(resultId: string): void;
    protected abstract doLayoutAndRender(): void;
    private createScoreInfoGlyphs;
    get scale(): number;
    firstBarIndex: number;
    lastBarIndex: number;
    protected createEmptyStaveGroup(): StaveGroup;
    registerBarRenderer(key: string, renderer: BarRendererBase): void;
    unregisterBarRenderer(key: string, renderer: BarRendererBase): void;
    getRendererForBar(key: string, bar: Bar): BarRendererBase | null;
    layoutAndRenderAnnotation(y: number): number;
}
