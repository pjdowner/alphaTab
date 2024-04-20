import { AlphaSynthWebAudioOutputBase } from '@src/platform/javascript/AlphaSynthWebAudioOutputBase';
/**
 * This class implements a HTML5 Web Audio API based audio output device
 * for alphaSynth using the legacy ScriptProcessor node.
 * @target web
 */
export declare class AlphaSynthScriptProcessorOutput extends AlphaSynthWebAudioOutputBase {
    private _audioNode;
    private _circularBuffer;
    private _bufferCount;
    private _requestedBufferCount;
    open(bufferTimeInMilliseconds: number): void;
    play(): void;
    pause(): void;
    addSamples(f: Float32Array): void;
    resetSamples(): void;
    private requestBuffers;
    private _outputBuffer;
    private generateSound;
}
