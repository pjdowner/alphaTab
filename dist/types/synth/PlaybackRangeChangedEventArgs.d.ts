import { PlaybackRange } from '@src/synth/PlaybackRange';
/**
 * Represents the info when the playback range changed.
 */
export declare class PlaybackRangeChangedEventArgs {
    /**
     * The new playback range.
     */
    readonly playbackRange: PlaybackRange | null;
    /**
     * Initializes a new instance of the {@link PlaybackRangeChangedEventArgs} class.
     * @param range The range.
     */
    constructor(playbackRange: PlaybackRange | null);
}
