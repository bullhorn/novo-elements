const helpers = require('./helpers');

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {
    // Options affecting the resolving of modules.
    //
    // See: http://webpack.github.io/docs/configuration.html#resolve
    resolve: {
        // An array of extensions that should be used to resolve modules.
        //
        // See: http://webpack.github.io/docs/configuration.html#resolve-extensions
        extensions: ['', '.js'],

        // Make sure root is src
        root: helpers.root('src')
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
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: [
                    helpers.root('node_modules'),
                    helpers.root('config')
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
                exclude: [
                    /\.e2e\.js$/,
                    helpers.root('node_modules'),
                    helpers.root('node_modules/@angular')
                ]
            },

            // Json loader support for *.json files.
            //
            // See: https://github.com/webpack/json-loader
            { test: /\.json$/, loader: 'json-loader' },

            // Raw loader support for *.css files
            // Returns file content as string
            //
            // See: https://github.com/webpack/raw-loader
            { test: /\.css$/, loader: 'raw-loader' },

            // Raw loader support for *.html
            // Returns file content as string
            //
            // See: https://github.com/webpack/raw-loader
            { test: /\.html$/, loader: 'raw-loader' }
        ]
    },

    // Add additional plugins to the compiler.
    //
    // See: http://webpack.github.io/docs/configuration.html#plugins
    plugins: [
        // Plugin: DefinePlugin
        // Description: Define free variables.
        // Useful for having development builds with debug logging or adding global constants.
        //
        // Environment helpers
        //
        // See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new DefinePlugin({
            'ENV': JSON.stringify(ENV),
            'process.env': {
                'ENV': JSON.stringify(ENV),
                'NODE_ENV': JSON.stringify(ENV)
            }
        })
    ],

    // Static analysis linter for JavaScript advanced options configuration
    // Description: An extensible linter for the JavaScript language.
    //
    // See: https://github.com/MoOx/eslint-loader
    eslint: {
        emitErrors: true,
        failOnError: true,
        resourcePath: 'src'
    },

    // Include polyfills or mocks for various node stuff
    // Description: Node configuration
    //
    // See: https://webpack.github.io/docs/configuration.html#node
    node: {
        global: 'window',
        process: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};
