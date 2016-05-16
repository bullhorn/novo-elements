#!/usr/bin/env node

// System.js bundler
// simple and yet reusable system.js bundler
// bundles, minifies and gzips

const fs = require('fs');
const del = require('del');
const path = require('path');
const zlib = require('zlib');
const async = require('async');
const Builder = require('systemjs-builder');

const pkg = require('../package.json');
const name = pkg.name;
const targetFolder = path.resolve('./bundles');

console.log('target directory:', targetFolder); // eslint-disable-line

async.waterfall([
    cleanBundlesFolder,
    getSystemJsBundleConfig,
    buildSystemJs({ minify: false, sourceMaps: true, mangle: false }),
    getSystemJsBundleConfig,
    buildSystemJs({ minify: true, sourceMaps: true, mangle: false }),
    gzipSystemJsBundle
], err => {
    if (err) {
        throw err;
    }
});

/**
 * SystemJS Bundle Config
 */
function getSystemJsBundleConfig(cb) {
    const config = {
        baseURL: '..',
        transpiler: 'typescript',
        map: {
            typescript: path.resolve('node_modules/typescript/lib/typescript.js'),
            '@angular/core': path.resolve('node_modules/@angular/core/index.js'),
            '@angular/common': path.resolve('node_modules/@angular/common/index.js'),
            '@angular/compiler': path.resolve('node_modules/@angular/compiler/index.js'),
            '@angular/platform-browser': path.resolve('node_modules/@angular/platform-browser/index.js'),
            '@angular/platform-browser-dynamic': path.resolve('node_modules/@angular/platform-browser-dynamic/'),
            rxjs: path.resolve('node_modules/rxjs'),
            moment: path.resolve('node_modules/moment/min/moment.min.js')
        },
        paths: {
            '*': '*.js'
        }
    };

    config.meta = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        'rxjs',
        'moment'
    ].reduce((memo, currentValue) => {
        memo[path.resolve(`node_modules/${currentValue}/*`)] = { build: false };
        return memo;
    }, {});
    config.meta.moment = { build: false };
    return cb(null, config);
}

/**
 * Cleans the bundles
 */
function cleanBundlesFolder(cb) {
    return del(targetFolder)
        .then(paths => {
            console.log('Deleted files and folders:', paths.join(',')); // eslint-disable-line
            cb();
        });
}

/**
 * Builds with SystemJS
 */
function buildSystemJs(options) {
    return (config, cb) => {
        const minPostFix = options && options.minify ? '.min' : '';
        const fileName = `${name}${minPostFix}.js`;
        const dest = path.resolve(__dirname, targetFolder, fileName);
        const builder = new Builder();

        console.log('Bundling system.js file:', fileName, options); // eslint-disable-line
        builder.config(config);
        return builder
            .bundle([name, 'src', name].join('/'), dest, options)
            .then(() => cb())
            .catch(cb);
    };
}

/**
 * GZips the Bundles
 */
function gzipSystemJsBundle(cb) {
    const files = fs
        .readdirSync(path.resolve(targetFolder))
        .map(file => path.resolve(targetFolder, file))
        .filter(file => fs.statSync(file).isFile())
        .filter(file => path.extname(file) !== 'gz');

    return async.eachSeries(files, (file, gzipcb) => {
        process.nextTick(() => {
            console.log('Gzipping ', file); // eslint-disable-line
            const gzip = zlib.createGzip({ level: 9 });
            const inp = fs.createReadStream(file);
            const out = fs.createWriteStream(`${file}.gz`);

            inp.on('end', () => gzipcb());
            inp.on('error', err => gzipcb(err));
            return inp.pipe(gzip).pipe(out);
        });
    }, cb);
}
