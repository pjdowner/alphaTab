/**
 * alphaTab v1.3.0 (develop, build 0)
 *
 * Copyright © 2024, Daniel Kuschny and Contributors, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * SoundFont loading and Audio Synthesis based on TinySoundFont (licensed under MIT)
 * Copyright (C) 2017, 2018 Bernhard Schelling (https://github.com/schellingb/TinySoundFont)
 *
 * TinySoundFont is based on SFZero (licensed under MIT)
 * Copyright (C) 2012 Steve Folta (https://github.com/stevefolta/SFZero)
 */

import * as fs from 'fs';
import * as path from 'path';
import webpack from 'webpack';
import { contextify } from 'webpack/lib/util/identifier';
import { JAVASCRIPT_MODULE_TYPE_AUTO, JAVASCRIPT_MODULE_TYPE_ESM } from 'webpack/lib/ModuleTypeConstants';
import makeSerializable from 'webpack/lib/util/makeSerializable';
import EnableChunkLoadingPlugin from 'webpack/lib/javascript/EnableChunkLoadingPlugin';
import WorkerDependency from 'webpack/lib/dependencies/WorkerDependency';

/**@target web */
class AlphaTabWorkerRuntimeModule extends webpack.RuntimeModule {
    constructor() {
        super("alphaTab audio worker chunk loading", webpack.RuntimeModule.STAGE_BASIC);
    }
    generate() {
        const compilation = this.compilation;
        const runtimeTemplate = compilation.runtimeTemplate;
        const globalObject = runtimeTemplate.globalObject;
        const chunkLoadingGlobalExpr = `${globalObject}[${JSON.stringify(compilation.outputOptions.chunkLoadingGlobal)}]`;
        const initialChunkIds = new Set(this.chunk.ids);
        for (const c of this.chunk.getAllInitialChunks()) {
            if (webpack.javascript.JavascriptModulesPlugin.chunkHasJs(c, this.chunkGraph)) {
                continue;
            }
            for (const id of c.ids) {
                initialChunkIds.add(id);
            }
        }
        return webpack.Template.asString([
            `if ( ! ('AudioWorkletGlobalScope' in ${globalObject}) ) { return; }`,
            `const installedChunks = {`,
            webpack.Template.indent(Array.from(initialChunkIds, id => `${JSON.stringify(id)}: 1`).join(",\n")),
            "};",
            "// importScripts chunk loading",
            `const installChunk = ${runtimeTemplate.basicFunction("data", [
                runtimeTemplate.destructureArray(["chunkIds", "moreModules", "runtime"], "data"),
                "for(const moduleId in moreModules) {",
                webpack.Template.indent([
                    `if(${webpack.RuntimeGlobals.hasOwnProperty}(moreModules, moduleId)) {`,
                    webpack.Template.indent(`${webpack.RuntimeGlobals.moduleFactories}[moduleId] = moreModules[moduleId];`),
                    "}"
                ]),
                "}",
                `if(runtime) runtime(${webpack.RuntimeGlobals.require});`,
                "while(chunkIds.length)",
                webpack.Template.indent("installedChunks[chunkIds.pop()] = 1;"),
                "parentChunkLoadingFunction(data);"
            ])};`,
            `const chunkLoadingGlobal = ${chunkLoadingGlobalExpr} = ${chunkLoadingGlobalExpr} || [];`,
            "const parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);",
            "chunkLoadingGlobal.forEach(installChunk);",
            "chunkLoadingGlobal.push = installChunk;"
        ]);
    }
}
AlphaTabWorkerRuntimeModule.Key = "AlphaTabWorkerRuntime";

/**@target web */
class AlphaTabWorkletStartRuntimeModule extends webpack.RuntimeModule {
    constructor() {
        super("alphaTab audio worklet chunk lookup", webpack.RuntimeModule.STAGE_BASIC);
    }
    generate() {
        const compilation = this.compilation;
        const workletChunkLookup = new Map();
        const chunkGraph = this.chunkGraph;
        const allChunks = compilation.chunks;
        for (const chunk of allChunks) {
            const isWorkletEntry = chunkGraph
                .getTreeRuntimeRequirements(chunk)
                .has(AlphaTabWorkerRuntimeModule.Key);
            if (isWorkletEntry) {
                const workletChunks = Array.from(chunk.getAllReferencedChunks()).map(c => {
                    // force content chunk to be created
                    compilation.hooks.contentHash.call(c);
                    return compilation.getPath(webpack.javascript.JavascriptModulesPlugin.getChunkFilenameTemplate(c, compilation.outputOptions), {
                        chunk: c,
                        contentHashType: "javascript"
                    });
                });
                workletChunkLookup.set(String(chunk.id), workletChunks);
            }
        }
        return webpack.Template.asString([
            `${AlphaTabWorkletStartRuntimeModule.RuntimeGlobalWorkletGetStartupChunks} = (() => {`,
            webpack.Template.indent([
                "const lookup = new Map(",
                webpack.Template.indent(JSON.stringify(Array.from(workletChunkLookup.entries()))),
                ");",
                "return (chunkId) => lookup.get(String(chunkId)) ?? [];"
            ]),
            "})();"
        ]);
    }
}
AlphaTabWorkletStartRuntimeModule.RuntimeGlobalWorkletGetStartupChunks = "__webpack_require__.wsc";

/**@target web */
function makeDependencySerializable(dependency, key) {
    makeSerializable(dependency, key);
}
function tapJavaScript(normalModuleFactory, pluginName, parserPlugin) {
    normalModuleFactory.hooks.parser
        .for(JAVASCRIPT_MODULE_TYPE_AUTO)
        .tap(pluginName, parserPlugin);
    normalModuleFactory.hooks.parser
        .for(JAVASCRIPT_MODULE_TYPE_ESM)
        .tap(pluginName, parserPlugin);
}
function parseModuleUrl(parser, expr) {
    if (expr.type !== "NewExpression" || expr.arguments.length !== 2) {
        return;
    }
    const newExpr = expr;
    const [arg1, arg2] = newExpr.arguments;
    const callee = parser.evaluateExpression(newExpr.callee);
    if (!callee.isIdentifier() || callee.identifier !== "URL") {
        return;
    }
    const arg1Value = parser.evaluateExpression(arg1);
    return [
        arg1Value,
        [
            (arg1.range)[0],
            (arg2.range)[1]
        ]
    ];
}
function getWorkerRuntime(parser, compilation, cachedContextify, workerIndexMap) {
    let i = workerIndexMap.get(parser.state) || 0;
    workerIndexMap.set(parser.state, i + 1);
    let name = `${cachedContextify(parser.state.module.identifier())}|${i}`;
    const hash = webpack.util.createHash(compilation.outputOptions.hashFunction);
    hash.update(name);
    const digest = hash.digest(compilation.outputOptions.hashDigest);
    const runtime = digest.slice(0, compilation.outputOptions.hashDigestLength);
    return runtime;
}

/**@target web */
/**
 * This module dependency injects the relevant code into a worklet bootstrap script
 * to install chunks which have been added to the worklet via addModule before the bootstrap script starts.
 */
class AlphaTabWorkletDependency extends webpack.dependencies.ModuleDependency {
    constructor(url, range, publicPath) {
        super(url);
        this.range = range;
        this.publicPath = publicPath;
    }
    get type() {
        return "alphaTabWorklet";
    }
    get category() {
        return "worker";
    }
    updateHash(hash) {
        if (this._hashUpdate === undefined) {
            this._hashUpdate = JSON.stringify(this.publicPath);
        }
        hash.update(this._hashUpdate);
    }
    serialize(context) {
        const { write } = context;
        write(this.publicPath);
        super.serialize(context);
    }
    deserialize(context) {
        const { read } = context;
        this.publicPath = read();
        super.deserialize(context);
    }
}
AlphaTabWorkletDependency.Template = class AlphaTabWorkletDependencyTemplate extends webpack.dependencies.ModuleDependency.Template {
    apply(dependency, source, templateContext) {
        const { chunkGraph, moduleGraph, runtimeRequirements } = templateContext;
        const dep = dependency;
        const block = moduleGraph.getParentBlock(dependency);
        const entrypoint = chunkGraph.getBlockChunkGroup(block);
        const workletImportBaseUrl = dep.publicPath
            ? JSON.stringify(dep.publicPath)
            : webpack.RuntimeGlobals.publicPath;
        const chunk = entrypoint.getEntrypointChunk();
        // worklet global scope has no 'self', need to inject it for compatibility with chunks
        // some plugins like the auto public path need to right location. we pass this on from the main runtime
        // some plugins rely on importScripts to be defined.
        const workletInlineBootstrap = `
			globalThis.self = globalThis.self || globalThis;
			globalThis.location = \${JSON.stringify(${webpack.RuntimeGlobals.baseURI})};
			globalThis.importScripts = (url) => { throw new Error("importScripts not available, dynamic loading of chunks not supported in this context", url) };
		`;
        chunkGraph.addChunkRuntimeRequirements(chunk, new Set([
            webpack.RuntimeGlobals.moduleFactories,
            AlphaTabWorkerRuntimeModule.Key
        ]));
        runtimeRequirements.add(AlphaTabWorkletStartRuntimeModule.RuntimeGlobalWorkletGetStartupChunks);
        source.replace(dep.range[0], dep.range[1] - 1, webpack.Template.asString([
            "(/* worklet bootstrap */ async function(__webpack_worklet__) {",
            webpack.Template.indent([
                `await __webpack_worklet__.addModule(URL.createObjectURL(new Blob([\`${workletInlineBootstrap}\`], { type: "application/javascript; charset=utf-8" })));`,
                `for (const fileName of ${AlphaTabWorkletStartRuntimeModule.RuntimeGlobalWorkletGetStartupChunks}(${chunk.id})) {`,
                webpack.Template.indent([
                    `await __webpack_worklet__.addModule(new URL(${workletImportBaseUrl} + fileName, ${webpack.RuntimeGlobals.baseURI}));`
                ]),
                "}"
            ]),
            `})(alphaTabWorklet)`
        ]));
    }
};
makeDependencySerializable(AlphaTabWorkletDependency, 'AlphaTabWorkletDependency');

/**@target web */
const AlphaTabWorkletSpecifierTag = Symbol("alphatab worklet specifier tag");
const workletIndexMap = new WeakMap();
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
function configureAudioWorklet(pluginName, options, compiler, compilation, normalModuleFactory, cachedContextify) {
    if (options.audioWorklets === false) {
        return;
    }
    compilation.dependencyFactories.set(AlphaTabWorkletDependency, normalModuleFactory);
    compilation.dependencyTemplates.set(AlphaTabWorkletDependency, new AlphaTabWorkletDependency.Template());
    const handleAlphaTabWorklet = (parser, expr) => {
        const [arg1] = expr.arguments;
        const parsedUrl = parseModuleUrl(parser, arg1);
        if (!parsedUrl) {
            return;
        }
        const [url] = parsedUrl;
        if (!url.isString()) {
            return;
        }
        const runtime = getWorkerRuntime(parser, compilation, cachedContextify, workletIndexMap);
        const block = new webpack.AsyncDependenciesBlock({
            entryOptions: {
                chunkLoading: false,
                wasmLoading: false,
                runtime: runtime
            }
        });
        block.loc = expr.loc;
        const workletBootstrap = new AlphaTabWorkletDependency(url.string, [expr.range[0], expr.range[1]], compiler.options.output.workerPublicPath);
        workletBootstrap.loc = expr.loc;
        block.addDependency(workletBootstrap);
        parser.state.module.addBlock(block);
        return true;
    };
    const parserPlugin = (parser) => {
        const pattern = "alphaTabWorklet";
        const itemMembers = "addModule";
        parser.hooks.preDeclarator.tap(pluginName, (decl) => {
            if (decl.id.type === "Identifier" && decl.id.name === pattern) {
                parser.tagVariable(decl.id.name, AlphaTabWorkletSpecifierTag);
                return true;
            }
            return;
        });
        parser.hooks.pattern.for(pattern).tap(pluginName, (pattern) => {
            parser.tagVariable(pattern.name, AlphaTabWorkletSpecifierTag);
            return true;
        });
        parser.hooks.callMemberChain
            .for(AlphaTabWorkletSpecifierTag)
            .tap(pluginName, (expression, members) => {
            if (itemMembers !== members.join(".")) {
                return;
            }
            return handleAlphaTabWorklet(parser, expression);
        });
    };
    tapJavaScript(normalModuleFactory, pluginName, parserPlugin);
}

/**@target web */
const workerIndexMap = new WeakMap();
/**
 * Configures the WebWorker aspects within webpack.
 * The counterpart which this plugin detects sits in alphaTab.main.ts
 * @param pluginName
 * @param options
 * @param compiler
 * @param compilation
 * @param normalModuleFactory
 * @param cachedContextify
 * @returns
 */
function configureWebWorker(pluginName, options, compiler, compilation, normalModuleFactory, cachedContextify) {
    if (options.audioWorklets === false) {
        return;
    }
    compilation.dependencyFactories.set(WorkerDependency, normalModuleFactory);
    compilation.dependencyTemplates.set(WorkerDependency, new WorkerDependency.Template());
    new EnableChunkLoadingPlugin('import-scripts').apply(compiler);
    const handleAlphaTabWorker = (parser, expr) => {
        const [arg1, arg2] = expr.arguments;
        const parsedUrl = parseModuleUrl(parser, arg1);
        if (!parsedUrl) {
            return;
        }
        const [url, range] = parsedUrl;
        if (!url.isString()) {
            return;
        }
        const runtime = getWorkerRuntime(parser, compilation, cachedContextify, workerIndexMap);
        const block = new webpack.AsyncDependenciesBlock({
            entryOptions: {
                chunkLoading: 'import-scripts',
                wasmLoading: false,
                runtime: runtime
            }
        });
        block.loc = expr.loc;
        const workletBootstrap = new WorkerDependency(url.string, range, compiler.options.output.workerPublicPath);
        workletBootstrap.loc = expr.loc;
        block.addDependency(workletBootstrap);
        parser.state.module.addBlock(block);
        const dep1 = new webpack.dependencies.ConstDependency(`{ type: ${compilation.options.output.module ? '"module"' : "undefined"} }`, arg2.range);
        dep1.loc = expr.loc;
        parser.state.module.addPresentationalDependency(dep1);
        parser.walkExpression(expr.callee);
        return true;
    };
    const parserPlugin = (parser) => {
        parser.hooks.new.for("alphaTab.Environment.alphaTabWorker").tap(pluginName, (expr) => handleAlphaTabWorker(parser, expr));
    };
    tapJavaScript(normalModuleFactory, pluginName, parserPlugin);
}

/**@target web */
class AlphaTabWebPackPlugin {
    constructor(options) {
        this.options = options ?? {};
    }
    apply(compiler) {
        this.configureSoundFont(compiler);
        this.configure(compiler);
    }
    configureSoundFont(compiler) {
        if (this.options.assetOutputDir === false) {
            return;
        }
        // register soundfont as resource
        compiler.options.module.rules.push({
            test: /\.sf2/,
            type: "asset/resource",
        });
    }
    configure(compiler) {
        const pluginName = this.constructor.name;
        const cachedContextify = contextify.bindContextCache(compiler.context, compiler.root);
        compiler.hooks.thisCompilation.tap(pluginName, (compilation, { normalModuleFactory }) => {
            compilation.hooks.runtimeRequirementInTree
                .for(AlphaTabWorkerRuntimeModule.Key)
                .tap(pluginName, (chunk) => {
                compilation.addRuntimeModule(chunk, new AlphaTabWorkerRuntimeModule());
            });
            compilation.hooks.runtimeRequirementInTree
                .for(AlphaTabWorkletStartRuntimeModule.RuntimeGlobalWorkletGetStartupChunks)
                .tap(pluginName, (chunk) => {
                compilation.addRuntimeModule(chunk, new AlphaTabWorkletStartRuntimeModule());
            });
            configureAudioWorklet(pluginName, this.options, compiler, compilation, normalModuleFactory, cachedContextify);
            configureWebWorker(pluginName, this.options, compiler, compilation, normalModuleFactory, cachedContextify);
            this.configureAssetCopy(pluginName, compiler, compilation);
        });
    }
    configureAssetCopy(pluginName, compiler, compilation) {
        if (this.options.assetOutputDir === false) {
            return;
        }
        const options = this.options;
        compilation.hooks.processAssets.tapAsync({
            name: pluginName,
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        }, async (_, callback) => {
            let alphaTabSourceDir = options.alphaTabSourceDir;
            if (!alphaTabSourceDir) {
                alphaTabSourceDir = compilation.getPath('node_modules/@coderline/alphatab/dist/');
            }
            if (!alphaTabSourceDir || !fs.promises.access(path.join(alphaTabSourceDir, 'alphaTab.mjs'), fs.constants.F_OK)) {
                compilation.errors.push(new webpack.WebpackError('Could not find alphaTab, please ensure it is installed into node_modules or configure alphaTabSourceDir'));
                return;
            }
            const outputPath = (options.assetOutputDir ?? compiler.options.output.path);
            if (!outputPath) {
                compilation.errors.push(new webpack.WebpackError('Need output.path configured in application to store asset files.'));
                return;
            }
            async function copyFiles(subdir) {
                const fullDir = path.join(alphaTabSourceDir, subdir);
                compilation.contextDependencies.add(path.normalize(fullDir));
                const files = await fs.promises.readdir(fullDir, { withFileTypes: true });
                await fs.promises.mkdir(path.join(outputPath, subdir), { recursive: true });
                await Promise.all(files.filter(f => f.isFile()).map(async (file) => {
                    const sourceFilename = path.join(file.path, file.name);
                    await fs.promises.copyFile(sourceFilename, path.join(outputPath, subdir, file.name));
                    const assetFileName = subdir + '/' + file.name;
                    const existingAsset = compilation.getAsset(assetFileName);
                    const data = await fs.promises.readFile(sourceFilename);
                    const source = new compiler.webpack.sources.RawSource(data);
                    if (existingAsset) {
                        compilation.updateAsset(assetFileName, source, {
                            copied: true,
                            sourceFilename
                        });
                    }
                    else {
                        compilation.emitAsset(assetFileName, source, {
                            copied: true,
                            sourceFilename
                        });
                    }
                }));
            }
            await Promise.all([
                copyFiles("font"),
                copyFiles("soundfont")
            ]);
            callback();
        });
    }
}

export { AlphaTabWebPackPlugin };
//# sourceMappingURL=alphaTab.webpack.mjs.map
