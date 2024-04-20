/**@target web */
import webpack from 'webpack';
export declare class AlphaTabWorkletStartRuntimeModule extends webpack.RuntimeModule {
    static readonly RuntimeGlobalWorkletGetStartupChunks = "__webpack_require__.wsc";
    constructor();
    generate(): string | null;
}
