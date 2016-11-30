const webpack = require('webpack');
const helpers = require('./helpers');
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const {
    ForkCheckerPlugin
} = require('awesome-typescript-loader');

module.exports = function (options) {
    isProd = options.env === 'production';

    return {
        entry: {
            'polyfills': './demo/polyfills.browser.ts',
            'vendor': './demo/vendor.browser.ts',
            'main': './demo/main.browser.ts'
        },
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            modules: [helpers.root('demo'), 'node_modules']
        },
        module: {
            rules: [{
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: /(node_modules)/
            }, {
                test: /\.ts$/,
                loaders: [
                    'ts-loader?transpileOnly=true'
                ],
                exclude: [/\.(spec|e2e)\.ts$/]
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader']
            }, {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [helpers.root('demo/index.html')]
            }, {
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader'
            }]
        },
        plugins: [
            new AssetsPlugin({
                path: helpers.root('dist'),
                filename: 'webpack-assets.json',
                prettyPrint: true
            }),
            new ForkCheckerPlugin(),
            new CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),
            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
                helpers.root('demo') // location of your src
            ),
            new CopyWebpackPlugin([{
                from: 'demo/assets/images',
                to: 'assets/images'
            }, {
                from: 'demo/favicon.ico'
            }]),
            new HtmlWebpackPlugin({
                template: 'demo/index.html',
                chunksSortMode: 'dependency',
                inject: 'head'
            }),
            new ScriptExtHtmlWebpackPlugin({
                defaultAttribute: 'defer'
            })
        ],
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
};
