/**@target web */
import webpack from 'webpack';
import { Hash, ObjectDeserializerContext, ObjectSerializerContext } from './Utils';
/**
 * This module dependency injects the relevant code into a worklet bootstrap script
 * to install chunks which have been added to the worklet via addModule before the bootstrap script starts.
 */
export declare class AlphaTabWorkletDependency extends webpack.dependencies.ModuleDependency {
    publicPath: string | undefined;
    private _hashUpdate;
    constructor(url: string, range: [number, number], publicPath: string | undefined);
    get type(): string;
    get category(): string;
    updateHash(hash: Hash): void;
    serialize(context: ObjectSerializerContext): void;
    deserialize(context: ObjectDeserializerContext): void;
}
