/**@target web */
import webpack from 'webpack';
export declare class AlphaTabWorkerRuntimeModule extends webpack.RuntimeModule {
    static Key: string;
    constructor();
    generate(): string | null;
}
