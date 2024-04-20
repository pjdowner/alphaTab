import { Color } from '@src/model/Color';
import { Font } from '@src/model/Font';
import { MusicFontSymbol } from '@src/model/MusicFontSymbol';
import { ICanvas, TextAlign, TextBaseline } from '@src/platform/ICanvas';
import { Settings } from '@src/Settings';
import type * as alphaSkia from '@coderline/alphaskia';
import type { AlphaSkiaTypeface } from '@coderline/alphaskia';
/**
 * Describes the members of the alphaSkia module.
 * @target web
 */
export interface AlphaSkiaModule {
    AlphaSkiaCanvas: typeof alphaSkia.AlphaSkiaCanvas;
    AlphaSkiaImage: typeof alphaSkia.AlphaSkiaImage;
    AlphaSkiaTextAlign: typeof alphaSkia.AlphaSkiaTextAlign;
    AlphaSkiaTextBaseline: typeof alphaSkia.AlphaSkiaTextBaseline;
    AlphaSkiaTypeface: typeof alphaSkia.AlphaSkiaTypeface;
}
/**
 * A canvas implementation using alphaSkia as rendering backend
 * @partial
 */
export declare class SkiaCanvas implements ICanvas {
    /**
     * @target web
     * @delegated csharp
     * @delegated kotlin
     */
    private static alphaSkia;
    private static musicFont;
    private static readonly customTypeFaces;
    /**
     * @target web
     * @partial
     */
    static enable(musicFontData: ArrayBuffer, alphaSkia: unknown): void;
    static initializeMusicFont(musicFont: AlphaSkiaTypeface): void;
    static registerFont(fontData: Uint8Array, fontInfo?: Font | undefined): Font;
    private static customTypefaceKey;
    private _canvas;
    private _color;
    private _lineWidth;
    private _typeFaceCache;
    private _typeFaceIsSystem;
    private _typeFace;
    settings: Settings;
    private getTypeFace;
    constructor();
    destroy(): void;
    onRenderFinished(): unknown;
    beginRender(width: number, height: number): void;
    endRender(): unknown;
    get color(): Color;
    set color(value: Color);
    get lineWidth(): number;
    set lineWidth(value: number);
    fillRect(x: number, y: number, w: number, h: number): void;
    strokeRect(x: number, y: number, w: number, h: number): void;
    beginPath(): void;
    closePath(): void;
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    bezierCurveTo(cp1X: number, cp1Y: number, cp2X: number, cp2Y: number, x: number, y: number): void;
    fillCircle(x: number, y: number, radius: number): void;
    strokeCircle(x: number, y: number, radius: number): void;
    fill(): void;
    stroke(): void;
    font: Font;
    textAlign: TextAlign;
    textBaseline: TextBaseline;
    beginGroup(_identifier: string): void;
    endGroup(): void;
    fillText(text: string, x: number, y: number): void;
    measureText(text: string): number;
    fillMusicFontSymbol(x: number, y: number, scale: number, symbol: MusicFontSymbol, centerAtPosition?: boolean): void;
    fillMusicFontSymbols(x: number, y: number, scale: number, symbols: MusicFontSymbol[], centerAtPosition?: boolean): void;
    private fillMusicFontSymbolText;
    beginRotate(centerX: number, centerY: number, angle: number): void;
    endRotate(): void;
}
