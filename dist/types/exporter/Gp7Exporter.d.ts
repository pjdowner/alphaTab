import { Score } from '@src/model/Score';
import { ScoreExporter } from '@src/exporter/ScoreExporter';
/**
 * This ScoreExporter can write Guitar Pro 7 (gp) files.
 */
export declare class Gp7Exporter extends ScoreExporter {
    get name(): string;
    constructor();
    writeScore(score: Score): void;
}
