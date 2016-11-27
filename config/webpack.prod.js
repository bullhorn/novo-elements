const helpers = require('./helpers');
const pkg = require('../package.json');
const autoprefixer = require('autoprefixer');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({ filename: '[name].[chunkhash].css', isCacheable: false });

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const VERSION = pkg.version;
const METADATA = {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: false,
    VERSION: VERSION
};

module.exports = function () {
    return webpackMerge(commonConfig({ env: ENV }), {
        devtool: 'source-map',
        output: {
            path: helpers.root('dist'),
            filename: '[name].[chunkhash].bundle.js',
            sourceMapFilename: '[name].[chunkhash].bundle.map',
            chunkFilename: '[id].[chunkhash].chunk.js'
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    exclude: /node_modules/,
                    loader: extractCSS.extract(['css-loader', 'postcss-loader', 'sass-loader'])
                }
            ]
        },
        plugins: [
            extractCSS,
            new WebpackMd5Hash(),
            // new DedupePlugin(), // see: https://github.com/angular/angular-cli/issues/1587
            new DefinePlugin({
                'VERSION': JSON.stringify(METADATA.VERSION),
                'ENV': JSON.stringify(METADATA.ENV)
            }),
            new UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8: true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true
                },
                comments: false
            }),

            new NormalModuleReplacementPlugin(
                /angular2-hmr/,
                helpers.root('config/modules/angular2-hmr-prod.js')
            ),
            // new IgnorePlugin(/angular2-hmr/),
            // new CompressionPlugin({
            //   regExp: /\.css$|\.html$|\.js$|\.map$/,
            //   threshold: 2 * 1024
            // })
            new LoaderOptionsPlugin({
                debug: false,
                options: {
                    tslint: {
                        emitErrors: false,
                        failOnHint: false,
                        resourcePath: 'demo',
                        formattersDirectory: 'node_modules/custom-tslint-formatters/formatters',
                        formatter: 'grouped'
                    },
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
                    sassLoader: {
                        includePaths: [
                            helpers.root('node_modules/hint.css/src')
                        ]
                    },
                    postcss: () => {
                        return [autoprefixer({ browsers: ['last 2 versions'] })];
                    }
                }
            })
        ],
        node: {
            global: true,
            crypto: 'empty',
            process: false,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    });
};
