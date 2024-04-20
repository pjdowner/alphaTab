import { Score } from '@src/model/Score';
export declare class ScoreView {
    isMultiRest: boolean;
    trackViewGroups: TrackViewGroup[];
}
export declare class TrackViewGroup {
    showSlash: boolean;
    showStandardNotation: boolean;
    showTablature: boolean;
}
export declare class PartConfiguration {
    scoreViews: ScoreView[];
    apply(score: Score): void;
    constructor(partConfigurationData: Uint8Array);
    static writeForScore(score: Score): Uint8Array;
}
