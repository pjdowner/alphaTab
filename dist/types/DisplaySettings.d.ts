import { RenderingResources } from '@src/RenderingResources';
import { LayoutMode } from '@src/LayoutMode';
import { StaveProfile } from '@src/StaveProfile';
/**
 * Lists the different modes in which the staves and systems are arranged.
 */
export declare enum SystemsLayoutMode {
    /**
     * Use the automatic alignment system provided by alphaTab (default)
     */
    Automatic = 0,
    /**
     * Use the systems layout and sizing information stored from the score model.
     */
    UseModelLayout = 1
}
/**
 * The display settings control how the general layout and display of alphaTab is done.
 * @json
 */
export declare class DisplaySettings {
    /**
     * Sets the zoom level of the rendered notation
     */
    scale: number;
    /**
     * The default stretch force to use for layouting.
     */
    stretchForce: number;
    /**
     * The layouting mode used to arrange the the notation.
     */
    layoutMode: LayoutMode;
    /**
     * The stave profile to use.
     */
    staveProfile: StaveProfile;
    /**
     * Limit the displayed bars per row.
     */
    barsPerRow: number;
    /**
     * The bar start number to start layouting with. Note that this is the bar number and not an index!
     */
    startBar: number;
    /**
     * The amount of bars to render overall.
     */
    barCount: number;
    /**
     * The number of bars that should be rendered per partial. This setting is not used by all layouts.
     */
    barCountPerPartial: number;
    /**
     * Whether the last system (row) should be also justified to the whole width of the music sheet.
     * (applies only for page layout).
     */
    justifyLastSystem: boolean;
    /**
     * Gets or sets the resources used during rendering. This defines all fonts and colors used.
     * @json_partial_names
     */
    resources: RenderingResources;
    /**
     * Gets or sets the padding between the music notation and the border.
     */
    padding: number[] | null;
    /**
     * Gets how the systems should be layed out.
     */
    systemsLayoutMode: SystemsLayoutMode;
}
