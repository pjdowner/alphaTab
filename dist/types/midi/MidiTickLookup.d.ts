import { BeatTickLookup } from '@src/midi/BeatTickLookup';
import { MasterBarTickLookup } from '@src/midi/MasterBarTickLookup';
import { Beat } from '@src/model/Beat';
import { MasterBar } from '@src/model/MasterBar';
/**
 * Represents the results of searching the currently played beat.
 * @see MidiTickLookup.FindBeat
 */
export declare class MidiTickLookupFindBeatResult {
    /**
     * Gets or sets the beat that is currently played and used for the start
     * position of the cursor animation.
     */
    beat: Beat;
    /**
     * Gets or sets the parent MasterBarTickLookup to which this beat lookup belongs to.
     */
    masterBar: MasterBarTickLookup;
    /**
     * Gets or sets the related beat tick lookup.
     */
    beatLookup: BeatTickLookup;
    /**
     * Gets or sets the beat that will be played next.
     */
    nextBeat: MidiTickLookupFindBeatResult | null;
    /**
     * Gets or sets the duration in midi ticks how long this lookup is valid.
     */
    tickDuration: number;
    /**
     * Gets or sets the duration in milliseconds how long this lookup is valid.
     */
    duration: number;
    get start(): number;
    get end(): number;
    constructor(masterBar: MasterBarTickLookup);
}
/**
 * This class holds all information about when {@link MasterBar}s and {@link Beat}s are played.
 *
 * On top level it is organized into {@link MasterBarTickLookup} objects indicating the
 * master bar start and end times. This information is used to highlight the currently played bars
 * and it gives access to the played beats in this masterbar and their times.
 *
 * The {@link BeatTickLookup} are then the slices into which the masterbar is separated by the voices and beats
 * of all tracks. An example how things are organized:
 *
 * Time (eighths):  | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | 10 | 11 | 12 | 13 | 14 | 15 | 16 |
 *
 * Track 1:         |        B1         |        B2         |    B3   |    B4   |    B5   |    B6   |
 * Track 2:         |                  B7                   |         B7        | B9 | B10| B11| B12|
 * Track 3:         |                                      B13                                      |
 *
 * Lookup:          |        L1         |        L2         |    L3    |   L4   | L5 | L6 | L7 | L8 |
 * Active Beats:
 * - L1             B1,B7,B13
 * - L2                                 B2,B7,B13
 * - L3                                                      B3,B7,B13
 * - L4                                                                 B4,B7,B13
 * - L5                                                                          B5,B9,B13
 * - L6                                                                               B5,B10,B13
 * - L7                                                                                    B6,B11,B13
 * - L8                                                                                         B6,B12,B13
 *
 * Then during playback we build out of this list {@link MidiTickLookupFindBeatResult} objects which are sepcific
 * to the visible tracks displayed. This is required because if only Track 2 is displayed we cannot use the the
 * Lookup L1 alone to determine the start and end of the beat cursor. In this case we will derive a
 * MidiTickLookupFindBeatResult which holds for Time 01 the lookup L1 as start and L3 as end. This will be used
 * both for the cursor and beat highlighting.
 */
export declare class MidiTickLookup {
    private _currentMasterBar;
    /**
     * Gets a dictionary of all master bars played. The index is the index equals to {@link MasterBar.index}.
     * This lookup only contains the first time a MasterBar is played. For a whole sequence of the song refer to {@link MasterBars}.
     * @internal
     */
    readonly masterBarLookup: Map<number, MasterBarTickLookup>;
    /**
     * Gets a list of all {@link MasterBarTickLookup} sorted by time.
     * @internal
     */
    readonly masterBars: MasterBarTickLookup[];
    /**
     * Finds the currently played beat given a list of tracks and the current time.
     * @param trackLookup The tracks indices in which to search the played beat for.
     * @param tick The current time in midi ticks.
     * @returns The information about the current beat or null if no beat could be found.
     */
    findBeat(trackLookup: Set<number>, tick: number, currentBeatHint?: MidiTickLookupFindBeatResult | null): MidiTickLookupFindBeatResult | null;
    private findBeatFast;
    private fillNextBeat;
    private findBeatSlow;
    /**
     * Finds the beat at a given tick position within the known master bar.
     * @param masterBar
     * @param currentStartLookup
     * @param tick
     * @param visibleTracks
     * @param fillNext
     * @returns
     */
    private findBeatInMasterBar;
    private createResult;
    private findMasterBar;
    /**
     * Gets the {@link MasterBarTickLookup} for a given masterbar at which the masterbar is played the first time.
     * @param bar The masterbar to find the time period for.
     * @returns A {@link MasterBarTickLookup} containing the details about the first time the {@link MasterBar} is played.
     */
    getMasterBar(bar: MasterBar): MasterBarTickLookup;
    /**
     * Gets the start time in midi ticks for a given masterbar at which the masterbar is played the first time.
     * @param bar The masterbar to find the time period for.
     * @returns The time in midi ticks at which the masterbar is played the first time or 0 if the masterbar is not contained
     */
    getMasterBarStart(bar: MasterBar): number;
    /**
     * Gets the start time in midi ticks for a given beat at which the masterbar is played the first time.
     * @param beat The beat to find the time period for.
     * @returns The time in midi ticks at which the beat is played the first time or 0 if the beat is not contained
     */
    getBeatStart(beat: Beat): number;
    /**
     * Adds a new {@link MasterBarTickLookup} to the lookup table.
     * @param masterBar The item to add.
     */
    addMasterBar(masterBar: MasterBarTickLookup): void;
    addBeat(beat: Beat, start: number, duration: number): void;
}
