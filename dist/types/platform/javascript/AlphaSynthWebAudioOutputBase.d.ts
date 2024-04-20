import { IEventEmitter, IEventEmitterOfT } from '@src/EventEmitter';
import { ISynthOutput } from '@src/synth/ISynthOutput';
/**
 * @target web
 */
export declare abstract class AlphaSynthWebAudioOutputBase implements ISynthOutput {
    protected static readonly BufferSize: number;
    protected static readonly PreferredSampleRate: number;
    protected _context: AudioContext | null;
    protected _buffer: AudioBuffer | null;
    protected _source: AudioBufferSourceNode | null;
    private _resumeHandler?;
    get sampleRate(): number;
    activate(resumedCallback?: () => void): void;
    private patchIosSampleRate;
    private createAudioContext;
    open(bufferTimeInMilliseconds: number): void;
    private registerResumeHandler;
    private unregisterResumeHandler;
    play(): void;
    pause(): void;
    destroy(): void;
    abstract addSamples(f: Float32Array): void;
    abstract resetSamples(): void;
    readonly ready: IEventEmitter;
    readonly samplesPlayed: IEventEmitterOfT<number>;
    readonly sampleRequest: IEventEmitter;
    protected onSamplesPlayed(numberOfSamples: number): void;
    protected onSampleRequest(): void;
    protected onReady(): void;
}
