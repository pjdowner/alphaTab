import { LayoutMode } from '@src/LayoutMode';
import { StaveProfile } from '@src/StaveProfile';
import { ScoreImporter } from '@src/importer/ScoreImporter';
import { ICanvas } from '@src/platform/ICanvas';
import { BarRendererFactory } from '@src/rendering/BarRendererFactory';
import { ScoreLayout } from '@src/rendering/layout/ScoreLayout';
import { ScoreRenderer } from '@src/rendering/ScoreRenderer';
import { FontLoadingChecker } from '@src/util/FontLoadingChecker';
import { WebPlatform } from '@src/platform/javascript/WebPlatform';
import { Font } from './model';
import { Settings } from './Settings';
export declare class LayoutEngineFactory {
    readonly vertical: boolean;
    readonly createLayout: (renderer: ScoreRenderer) => ScoreLayout;
    constructor(vertical: boolean, createLayout: (renderer: ScoreRenderer) => ScoreLayout);
}
export declare class RenderEngineFactory {
    readonly supportsWorkers: boolean;
    readonly createCanvas: () => ICanvas;
    constructor(supportsWorkers: boolean, canvas: () => ICanvas);
}
/**
 * This public class represents the global alphaTab environment where
 * alphaTab looks for information like available layout engines
 * staves etc.
 * This public class represents the global alphaTab environment where
 * alphaTab looks for information like available layout engines
 * staves etc.
 * @partial
 */
export declare class Environment {
    /**
     * The font size of the music font in pixel.
     */
    static readonly MusicFontSize = 34;
    /**
     * The scaling factor to use when rending raster graphics for sharper rendering on high-dpi displays.
     */
    static HighDpiFactor: number;
    /**
     * @target web
     */
    static createStyleElement(elementDocument: HTMLDocument, fontDirectory: string | null): void;
    /**
     * @target web
     */
    private static _globalThis;
    /**
     * @target web
     */
    static get globalThis(): any;
    /**
     * @target web
     */
    static webPlatform: WebPlatform;
    /**
     * @target web
     */
    static isWebPackBundled: boolean;
    /**
     * @target web
     */
    static scriptFile: string | null;
    /**
     * @target web
     */
    static fontDirectory: string | null;
    /**
     * @target web
     */
    static bravuraFontChecker: FontLoadingChecker;
    /**
     * @target web
     */
    static get isRunningInWorker(): boolean;
    /**
     * @target web
     */
    static get isRunningInAudioWorklet(): boolean;
    /**
     * @target web
     * @internal
     */
    static createWebWorker: (settings: Settings) => Worker;
    /**
     * @target web
     * @internal
     */
    static createAudioWorklet: (context: AudioContext, settings: Settings) => Promise<void>;
    /**
     * @target web
     * @partial
     */
    static throttle(action: () => void, delay: number): () => void;
    /**
     * @target web
     */
    private static detectScriptFile;
    /**
     * @target web
     */
    static ensureFullUrl(relativeUrl: string | null): string;
    private static appendScriptName;
    /**
     * @target web
     */
    private static detectFontDirectory;
    /**
     * @target web
     */
    private static registerJQueryPlugin;
    static renderEngines: Map<string, RenderEngineFactory>;
    static layoutEngines: Map<LayoutMode, LayoutEngineFactory>;
    static staveProfiles: Map<StaveProfile, BarRendererFactory[]>;
    static getRenderEngineFactory(engine: string): RenderEngineFactory;
    static getLayoutEngineFactory(layoutMode: LayoutMode): LayoutEngineFactory;
    /**
     * Gets all default ScoreImporters
     * @returns
     */
    static buildImporters(): ScoreImporter[];
    private static createDefaultRenderEngines;
    /**
     * Enables the usage of alphaSkia as rendering backend.
     * @param musicFontData The raw binary data of the music font.
     * @param alphaSkia The alphaSkia module.
     */
    static enableAlphaSkia(musicFontData: ArrayBuffer, alphaSkia: unknown): void;
    /**
     * Registers a new custom font for the usage in the alphaSkia rendering backend using
     * provided font information.
     * @param fontData The raw binary data of the font.
     * @param fontInfo If provided the font info provided overrules
     * @returns The font info under which the font was registered.
     */
    static registerAlphaSkiaCustomFont(fontData: Uint8Array, fontInfo?: Font | undefined): Font;
    /**
     * @target web
     * @partial
     */
    private static createPlatformSpecificRenderEngines;
    private static createDefaultStaveProfiles;
    private static createDefaultLayoutEngines;
    /**
     * @target web
     */
    static initializeMain(createWebWorker: (settings: Settings) => Worker, createAudioWorklet: (context: AudioContext, settings: Settings) => Promise<void>): void;
    /**
     * @target web
     */
    static get alphaTabWorker(): any;
    /**
     * @target web
     */
    static initializeWorker(): void;
    /**
     * @target web
     */
    static initializeAudioWorklet(): void;
    /**
     * @target web
     */
    private static detectWebPack;
    /**
     * @target web
     */
    private static detectWebPlatform;
}
