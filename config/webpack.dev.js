const helpers = require('./helpers');
const pkg = require('../package.json');
const autoprefixer = require('autoprefixer');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const HMR = helpers.hasProcessFlag('hot');
const VERSION = pkg.version;
const METADATA = {
    host: HOST,
    port: PORT,
    ENV: ENV,
    HMR: HMR,
    VERSION: VERSION
};

module.exports = function () {
    return webpackMerge(commonConfig({ env: ENV }), {
        devtool: 'cheap-module-source-map',
        output: {
            path: helpers.root('dist'),
            filename: '[name].bundle.js',
            sourceMapFilename: '[name].map',
            chunkFilename: '[id].chunk.js',
            library: 'ac_[name]',
            libraryTarget: 'var',
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    exclude: /node_modules/,
                    loader: 'style-loader!css-loader!postcss-loader!sass-loader'
                }
            ]
        },
        plugins: [
            new DefinePlugin({
                'VERSION': JSON.stringify(METADATA.VERSION),
                'ENV': JSON.stringify(METADATA.ENV)
            }),
            new NamedModulesPlugin(),
            new LoaderOptionsPlugin({
                debug: true,
                options: {
                    tslint: {
                        emitErrors: false,
                        failOnHint: false,
                        resourcePath: 'demo'
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
        devServer: {
            port: METADATA.port,
            host: METADATA.host,
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            outputPath: helpers.root('dist')
        },
        node: {
            global: true,
            crypto: 'empty',
            process: true,
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    });
};
