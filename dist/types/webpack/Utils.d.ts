/**@target web */
/// <reference types="node" />
import webpack from 'webpack';
export type NormalModuleFactory = webpack.Compilation['params']['normalModuleFactory'];
export type Parser = any;
import type { Expression } from 'estree';
export interface Hash {
    update(data: string | Buffer, inputEncoding?: string): Hash;
}
export interface ObjectSerializerContext {
    write: (arg0?: any) => void;
}
export interface ObjectDeserializerContext {
    read: () => any;
}
export declare function makeDependencySerializable(dependency: any, key: string): void;
export declare function tapJavaScript(normalModuleFactory: NormalModuleFactory, pluginName: string, parserPlugin: (parser: any) => void): void;
export declare function parseModuleUrl(parser: any, expr: Expression): any[] | undefined;
export declare function getWorkerRuntime(parser: any, compilation: webpack.Compilation, cachedContextify: (s: string) => string, workerIndexMap: WeakMap<webpack.ParserState, number>): string;
