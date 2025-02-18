import { LogLevel } from '@src/LogLevel';
/**
 * @json
 */
export declare class CoreSettings {
    /**
     * Gets or sets the script file url that will be used to spawn the workers.
     * @target web
     */
    scriptFile: string | null;
    /**
     * Gets or sets the url to the fonts that will be used to generate the alphaTab font style.
     * @target web
     */
    fontDirectory: string | null;
    /**
     * Gets or sets the file to load directly after initializing alphaTab.
     * @target web
     */
    file: string | null;
    /**
     * Gets or sets whether the UI element contains alphaTex code that should be
     * used to initialize alphaTab.
     * @target web
     */
    tex: boolean;
    /**
     * Gets or sets the initial tracks that should be loaded for the score.
     * @target web
     */
    tracks: unknown;
    /**
     * Gets or sets whether lazy loading for displayed elements is enabled.
     */
    enableLazyLoading: boolean;
    /**
     * The engine which should be used to render the the tablature.
     *
     * - **default**- Platform specific default engine
     * - **html5**- HTML5 Canvas
     * - **svg**- SVG
     */
    engine: string;
    /**
     * The log level to use within alphaTab
     */
    logLevel: LogLevel;
    /**
     * Gets or sets whether the rendering should be done in a worker if possible.
     */
    useWorkers: boolean;
    /**
     * Gets or sets whether in the {@link BoundsLookup} also the
     * position and area of each individual note is provided.
     */
    includeNoteBounds: boolean;
    /**
     * @target web
     */
    constructor();
}
