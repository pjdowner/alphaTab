import webpack from 'webpack';
import { AlphaTabWebPackPluginOptions } from './AlphaTabWebPackPluginOptions';
export declare class AlphaTabWebPackPlugin {
    options: AlphaTabWebPackPluginOptions;
    constructor(options?: AlphaTabWebPackPluginOptions);
    apply(compiler: webpack.Compiler): void;
    configureSoundFont(compiler: webpack.Compiler): void;
    configure(compiler: webpack.Compiler): void;
    configureAssetCopy(pluginName: string, compiler: webpack.Compiler, compilation: webpack.Compilation): void;
}
