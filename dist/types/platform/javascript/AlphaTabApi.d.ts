import { AlphaTabApiBase } from '@src/AlphaTabApiBase';
import { MidiFileFormat } from '@src/midi/MidiFile';
import { IEventEmitterOfT } from '@src/EventEmitter';
import { Track } from '@src/model/Track';
import { ProgressEventArgs } from '@src/ProgressEventArgs';
import { Settings } from '@src/Settings';
/**
 * @target web
 */
export declare class AlphaTabApi extends AlphaTabApiBase<any | Settings> {
    constructor(element: HTMLElement, options: any | Settings);
    tex(tex: string, tracks?: number[]): void;
    print(width?: string, additionalSettings?: unknown): void;
    downloadMidi(format?: MidiFileFormat): void;
    changeTrackMute(tracks: Track[], mute: boolean): void;
    changeTrackSolo(tracks: Track[], solo: boolean): void;
    changeTrackVolume(tracks: Track[], volume: number): void;
    private trackIndexesToTracks;
    soundFontLoad: IEventEmitterOfT<ProgressEventArgs>;
    loadSoundFontFromUrl(url: string, append: boolean): void;
}
