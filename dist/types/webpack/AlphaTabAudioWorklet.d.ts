/**@target web */
import webpack from 'webpack';
import { AlphaTabWebPackPluginOptions } from './AlphaTabWebPackPluginOptions';
/**
 * Configures the Audio Worklet aspects within webpack.
 * The counterpart which this plugin detects sits in alphaTab.main.ts
 * @param pluginName
 * @param options
 * @param compiler
 * @param compilation
 * @param normalModuleFactory
 * @param cachedContextify
 * @returns
 */
export declare function configureAudioWorklet(pluginName: string, options: AlphaTabWebPackPluginOptions, compiler: webpack.Compiler, compilation: webpack.Compilation, normalModuleFactory: any, cachedContextify: (s: string) => string): void;
