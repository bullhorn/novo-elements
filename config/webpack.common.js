var webpack = require('webpack');
var helpers = require('./helpers');
var pkg = require('../package.json');

/**
 * Webpack Plugins
 */
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * Webpack Constants
 */
const METADATA = {
    name: pkg.name,
    version: pkg.version,
    title: 'Demo',
    baseUrl: '/'
};

/**
 * AutoPrefixer Options
 */
var autoprefixerOptions = {
    browsers: [
        'last 2 versions',
        'iOS >= 7',
        'Android >= 4',
        'Explorer >= 10',
        'ExplorerMobile >= 11'
    ],
    cascade: false
};

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
    // Static metadata for index.html
    //
    // See: (custom attribute)
    metadata: METADATA,

    // Cache generated modules and chunks to improve performance for multiple incremental builds.
    // This is enabled by default in watch mode.
    // You can pass false to disable it.
    //
    // See: http://webpack.github.io/docs/configuration.html#cache
    // cache: false,

    // The entry point for the bundle
    // Our Angular.js app
    //
    // See: http://webpack.github.io/docs/configuration.html#entry
    entry: {
        'vendor': [
            'es6-shim',
            'es6-promise',
            'zone.js',
            'reflect-metadata',
            'angular2/common',
            'angular2/core'
        ],
        'lib': [`src/${METADATA.name}`],
        'demo': 'demo'
    },

    // Options affecting the resolving of modules.
    //
    // See: http://webpack.github.io/docs/configuration.html#resolve
    resolve: {
        // An array of extensions that should be used to resolve modules.
        //
        // See: http://webpack.github.io/docs/configuration.html#resolve-extensions
        extensions: ['', '.js'],

        // Make sure root is demo
        root: helpers.root(METADATA.name),

        // remove other default values
        modulesDirectories: ['node_modules', METADATA.name]
    },

    // Options affecting the normal modules.
    //
    // See: http://webpack.github.io/docs/configuration.html#module
    module: {
        // An array of applied pre and post loaders.
        //
        // See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
        preLoaders: [
            // Eslint loader support for *.js files
            //
            // See: https://github.com/MoOx/eslint-loader
            { test: /\.js$/, loader: 'eslint-loader', exclude: [helpers.root('node_modules'), helpers.root('config')] },

            // Source map loader support for *.js files
            // Extracts SourceMaps for source files that as added as sourceMappingURL comment.
            //
            // See: https://github.com/webpack/source-map-loader
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    helpers.root('node_modules/rxjs')
                ]
            }
        ],

        // An array of automatically applied loaders.
        //
        // IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
        // This means they are not resolved relative to the configuration file.
        //
        // See: http://webpack.github.io/docs/configuration.html#module-loaders
        loaders: [
            // Loader support for .js using babel
            //
            // See: https://github.com/babel/babel-loader
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [/\.spec\.js$/, helpers.root('node_modules')]
            },

            // Json loader support for *.json files.
            //
            // See: https://github.com/webpack/json-loader
            {
                test: /\.json$/,
                loader: 'json-loader'
            },

            // Raw loader support for *.css files
            // Returns file content as string
            //
            // See: https://github.com/webpack/raw-loader
            {
                test: /\.css$/,
                loader: 'raw-loader'
            },

            // Raw loader support for *.html
            // Returns file content as string
            //
            // See: https://github.com/webpack/raw-loader
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [helpers.root('demo/index.html')]
            },

            // SCSS/Sass loader support for *.scss / .sass
            // Returns file content as string
            //
            // See: https://github.com/jtangelder/sass-loader
            {
                test: /\.scss$/,
                loaders: ['style', 'css?sourceMap', 'autoprefixer?' + JSON.stringify(autoprefixerOptions), 'sass?sourceMap']
            }
        ]
    },

    // Add additional plugins to the compiler.
    //
    // See: http://webpack.github.io/docs/configuration.html#plugins
    plugins: [
        // Plugin: OccurenceOrderPlugin
        // Description: Varies the distribution of the ids to get the smallest id length
        // for often used ids.
        //
        // See: https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
        // See: https://github.com/webpack/docs/wiki/optimization#minimize
        new webpack.optimize.OccurenceOrderPlugin(true),

        // Plugin: CommonsChunkPlugin
        // Description: Shares common code between the pages.
        // It identifies common modules and put them into a commons chunk.
        //
        // See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        // See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
        new webpack.optimize.CommonsChunkPlugin({
            name: helpers.reverse(['vendor', 'lib', 'demo']),
            minChunks: Infinity
        }),

        // Plugin: CopyWebpackPlugin
        // Description: Copy files and directories in webpack.
        //
        // Copies project static assets.
        //
        // See: https://www.npmjs.com/package/copy-webpack-plugin
        new CopyWebpackPlugin([{
            from: 'demo/assets',
            to: 'assets'
        }]),
        new CopyWebpackPlugin([{
            from: 'demo/favicon.ico',
            to: 'favicon.ico'
        }]),

        // Plugin: HtmlWebpackPlugin
        // Description: Simplifies creation of HTML files to serve your webpack bundles.
        // This is especially useful for webpack bundles that include a hash in the filename
        // which changes every compilation.
        //
        // See: https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: 'demo/index.html',
            chunksSortMode: helpers.packageSort(['vendor', 'lib', 'demo'])
        })
    ],

    // Include polyfills or mocks for various node stuff
    // Description: Node configuration
    //
    // See: https://webpack.github.io/docs/configuration.html#node
    node: {
        global: 'window',
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};
