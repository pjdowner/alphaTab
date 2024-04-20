import { Beat } from '@src/model/Beat';
/**
 * Represents the information related to the beats actively being played now.
 */
export declare class ActiveBeatsChangedEventArgs {
    /**
     * The currently active beats across all tracks and voices.
     */
    activeBeats: Beat[];
    constructor(activeBeats: Beat[]);
}
