import { Tuning } from '@src/model/Tuning';
import { RowContainerGlyph } from '@src/rendering/glyphs/RowContainerGlyph';
export declare class TuningContainerGlyph extends RowContainerGlyph {
    constructor(x: number, y: number);
    addTuning(tuning: Tuning, trackLabel: string): void;
}
