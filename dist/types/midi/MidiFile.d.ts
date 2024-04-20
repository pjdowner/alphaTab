import { MidiEvent } from '@src/midi/MidiEvent';
import { IWriteable } from '@src/io/IWriteable';
/**
 * Lists the different midi file formats which are supported for export.
 */
export declare enum MidiFileFormat {
    /**
     * A single track multi channel file (SMF Type 0)
     */
    SingleTrackMultiChannel = 0,
    /**
     * A multi track file (SMF Type 1)
     */
    MultiTrack = 1
}
export declare class MidiTrack {
    /**
     * Gets a list of midi events sorted by time.
     */
    readonly events: MidiEvent[];
    /**
     * Adds the given midi event a the correct time position into the file.
     */
    addEvent(e: MidiEvent): void;
    /**
     * Writes the midi track as binary into the given stream.
     * @returns The stream to write to.
     */
    writeTo(s: IWriteable): void;
}
/**
 * Represents a midi file with a single track that can be played via {@link AlphaSynth}
 */
export declare class MidiFile {
    /**
     * Gets or sets the midi file format to use.
     */
    format: MidiFileFormat;
    /**
     * Gets or sets the division per quarter notes.
     */
    division: number;
    /**
     * Gets a list of midi events sorted by time.
     */
    get events(): MidiEvent[];
    /**
     * Gets a list of midi tracks.
     */
    readonly tracks: MidiTrack[];
    private ensureTracks;
    /**
     * Adds the given midi event a the correct time position into the file.
     */
    addEvent(e: MidiEvent): void;
    /**
     * Writes the midi file into a binary format.
     * @returns The binary midi file.
     */
    toBinary(): Uint8Array;
    /**
     * Writes the midi file as binary into the given stream.
     * @returns The stream to write to.
     */
    writeTo(s: IWriteable): void;
    static writeVariableInt(s: IWriteable, value: number): void;
}
