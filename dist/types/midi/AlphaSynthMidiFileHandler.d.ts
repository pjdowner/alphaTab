import { IMidiFileHandler } from '@src/midi/IMidiFileHandler';
import { MidiFile } from '@src/midi/MidiFile';
import { ControllerType } from './ControllerType';
/**
 * This implementation of the {@link IMidiFileHandler}
 * generates a {@link MidiFile} object which can be used in AlphaSynth for playback.
 */
export declare class AlphaSynthMidiFileHandler implements IMidiFileHandler {
    private _midiFile;
    private _smf1Mode;
    /**
     * Initializes a new instance of the {@link AlphaSynthMidiFileHandler} class.
     * @param midiFile The midi file.
     * @param smf1Mode Whether to generate a SMF1 compatible midi file. This might break multi note bends.
     */
    constructor(midiFile: MidiFile, smf1Mode?: boolean);
    addTimeSignature(tick: number, timeSignatureNumerator: number, timeSignatureDenominator: number): void;
    addRest(track: number, tick: number, channel: number): void;
    addNote(track: number, start: number, length: number, key: number, velocity: number, channel: number): void;
    private static fixValue;
    addControlChange(track: number, tick: number, channel: number, controller: ControllerType, value: number): void;
    addProgramChange(track: number, tick: number, channel: number, program: number): void;
    addTempo(tick: number, tempo: number): void;
    addBend(track: number, tick: number, channel: number, value: number): void;
    addNoteBend(track: number, tick: number, channel: number, key: number, value: number): void;
    finishTrack(track: number, tick: number): void;
}
