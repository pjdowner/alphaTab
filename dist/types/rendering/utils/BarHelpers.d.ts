import { Beat } from '@src/model/Beat';
import { BeamingHelper } from '@src/rendering/utils/BeamingHelper';
import { BarRendererBase } from '@src/rendering/BarRendererBase';
import { BarCollisionHelper } from '@src/rendering/utils/BarCollisionHelper';
export declare class BarHelpers {
    private _renderer;
    beamHelpers: BeamingHelper[][];
    beamHelperLookup: Map<number, BeamingHelper>[];
    collisionHelper: BarCollisionHelper;
    constructor(renderer: BarRendererBase);
    initialize(): void;
    getBeamingHelperForBeat(beat: Beat): BeamingHelper;
}
