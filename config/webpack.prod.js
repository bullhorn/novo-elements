const helpers = require('./helpers'); // Helper: root(), and rootDir() are defined at the bottom
const webpackMerge = require('webpack-merge'); //Used to merge webpack configs
const commonConfig = require('./webpack.common.js'); //The settings that are common to prod and dev

// Webpack Plugins
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractCSS = new ExtractTextPlugin('[name].css');

// Webpack Constants
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig.metadata, {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: false
});

module.exports = webpackMerge(commonConfig, {
    // Switch loaders to debug mode.
    // See: http://webpack.github.io/docs/configuration.html#debug
    debug: false,

    // Developer tool to enhance debugging
    // See: http://webpack.github.io/docs/configuration.html#devtool
    // See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
    devtool: 'source-map',

    // Options affecting the output of the compilation.
    // See: http://webpack.github.io/docs/configuration.html#output
    output: {
        // The output directory as absolute path (required).
        // See: http://webpack.github.io/docs/configuration.html#output-path
        path: helpers.root('dist'),

        // Specifies the name of each output file on disk.
        // IMPORTANT: You must not specify an absolute path here!
        // See: http://webpack.github.io/docs/configuration.html#output-filename
        filename: '[name].[chunkhash].bundle.js',

        // The filename of the SourceMaps for the JavaScript files.
        // They are inside the output.path directory.
        // See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
        sourceMapFilename: '[name].[chunkhash].bundle.map',

        // The filename of non-entry chunks as relative path
        // inside the output.path directory.
        // See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
        chunkFilename: '[id].[chunkhash].chunk.js'
    },

    // Options affecting the normal modules.
    // See: http://webpack.github.io/docs/configuration.html#module
    module: {
        // An array of automatically applied loaders.
        // IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
        // This means they are not resolved relative to the configuration file.
        // See: http://webpack.github.io/docs/configuration.html#module-loaders
        loaders: [
            // SCSS/Sass loader support for *.scss / .sass
            // Returns file content as string
            // See: https://github.com/jtangelder/sass-loader
            {
                test: /\.scss$/,
                loader: extractCSS.extract([
                    'raw-loader',
                    `autoprefixer?${JSON.stringify(METADATA.autoprefixer)}`,
                    'sass-loader'
                ])
            }
        ]
    },

    // Add additional plugins to the compiler.
    // See: http://webpack.github.io/docs/configuration.html#plugins
    plugins: [
        // Plugin: ExtractTextPlugin
        // Description: extracts text (scss) into css files
        // See: https://github.com/webpack/extract-text-webpack-plugin
        extractCSS,

        // Plugin: WebpackMd5Hash
        // Description: Plugin to replace a standard webpack chunkhash with md5.
        // See: https://www.npmjs.com/package/webpack-md5-hash
        new WebpackMd5Hash(),

        // Plugin: DefinePlugin
        // Description: Define free variables.
        // Useful for having development builds with debug logging or adding global constants.
        // Environment helpers
        // See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new DefinePlugin({
            'VERSION': JSON.stringify(METADATA.version),
            'ENV': JSON.stringify(METADATA.ENV),
            'HMR': METADATA.HMR,
            'process.env': {
                'ENV': JSON.stringify(METADATA.ENV),
                'NODE_ENV': JSON.stringify(METADATA.ENV)
            }
        }),

        // Plugin: NormalModuleReplacementPlugin
        // Description: Replace resources that matches resourceRegExp with newResource
        // See: http://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
        new NormalModuleReplacementPlugin(
            /angular2-hmr/,
            helpers.root('config/modules/angular2-hmr-prod.js')
        )
    ],

    // Static analysis linter for JavaScript advanced options configuration
    // Description: An extensible linter for the JavaScript language.
    // See: https://github.com/MoOx/eslint-loader
    eslint: {
        emitErrors: true,
        failOnHint: true,
        resourcePath: 'src'
    },

    // Html loader advanced options
    // See: https://github.com/webpack/html-loader#advanced-options
    // TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
    htmlLoader: {
        minimize: true,
        removeAttributeQuotes: false,
        caseSensitive: true,
        customAttrSurround: [
            [/#/, /(?:)/],
            [/\*/, /(?:)/],
            [/\[?\(?/, /(?:)/]
        ],
        customAttrAssign: [/\)?\]?=/]
    },

    // Include polyfills or mocks for various node stuff
    // Description: Node configuration
    // See: https://webpack.github.io/docs/configuration.html#node
    node: {
        global: 'window',
        crypto: 'empty',
        process: false,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
});
