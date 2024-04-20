import { BeatTickLookup } from '@src/midi/BeatTickLookup';
import { Beat } from '@src/model/Beat';
import { MasterBar } from '@src/model/MasterBar';
/**
 * Represents the time period, for which all bars of a {@link MasterBar} are played.
 */
export declare class MasterBarTickLookup {
    /**
     * Gets or sets the start time in midi ticks at which the MasterBar is played.
     */
    start: number;
    /**
     * Gets or sets the end time in midi ticks at which the MasterBar is played.
     */
    end: number;
    /**
     * Gets or sets the current tempo when the MasterBar is played.
     */
    tempo: number;
    /**
     * Gets or sets the MasterBar which is played.
     */
    masterBar: MasterBar;
    firstBeat: BeatTickLookup | null;
    lastBeat: BeatTickLookup | null;
    /**
     * Inserts `newNextBeat` after `currentBeat` in the linked list of items and updates.
     * the `firstBeat` and `lastBeat` respectively too.
     * @param currentBeat The item in which to insert the new item afterwards
     * @param newBeat The new item to insert
     */
    private insertAfter;
    /**
       * Inserts `newNextBeat` before `currentBeat` in the linked list of items and updates.
       * the `firstBeat` and `lastBeat` respectively too.
       * @param currentBeat The item in which to insert the new item afterwards
       * @param newBeat The new item to insert
       */
    private insertBefore;
    /**
     * Gets or sets the {@link MasterBarTickLookup} of the next masterbar in the {@link Score}
     */
    nextMasterBar: MasterBarTickLookup | null;
    /**
     * Gets or sets the {@link MasterBarTickLookup} of the previous masterbar in the {@link Score}
     */
    previousMasterBar: MasterBarTickLookup | null;
    /**
     * Adds a new beat to this masterbar following the slicing logic required by the MidiTickLookup.
     * @param beat The beat to add to this masterbat
     * @param beatPlaybackStart The original start of this beat. This time is relevant for highlighting.
     * @param sliceStart The slice start to which this beat should be added. This time is relevant for creating new slices.
     * @param sliceDuration The slice duration to which this beat should be added. This time is relevant for creating new slices.
     * @returns The first item of the chain which was affected.
     */
    addBeat(beat: Beat, beatPlaybackStart: number, sliceStart: number, sliceDuration: number): void;
}
