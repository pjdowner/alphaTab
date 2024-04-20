import { IEventEmitterOfT } from '@src/EventEmitter';
/**
 * This small utility helps to detect whether a particular font is already loaded.
 * @target web
 */
export declare class FontLoadingChecker {
    private _originalFamilies;
    private _families;
    private _isStarted;
    isFontLoaded: boolean;
    fontLoaded: IEventEmitterOfT<string>;
    constructor(families: string[]);
    checkForFontAvailability(): void;
    private isFontAvailable;
}
