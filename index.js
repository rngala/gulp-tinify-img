/**!
 * gulp-tinify-img 1.0.0 (c) 2016 Yi wei - MIT license
 * @desc Tinify performed using image compression
 * gulp widget only supports jpeg & png format
 */
'use strict';
var through = require('through2');
var gutil = require('gulp-util');
var tinify = require("tinify");
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-tinify-img';
// Global Count
var count = 0;

/**
 * @desc Plug body
 * @param options
 *        {
 *          tinify_key: '',
 *          log: true || false
 *        }
 */
module.exports = function (options) {
    // Configuration object can not be null || configuration object must contain an available tinify key
    if (!options || !options.tinify_key) {
        throw new PluginError(PLUGIN_NAME, 'Missing tinify key');
    }
    // Set key, the key is the key to an effective user of tinify
    tinify.key = options.tinify_key;

    // Compression processing
    return through.obj(function (file, enc, cb) {
        var that = this;
        if (options.log) console.log('-------------- ', PLUGIN_NAME, '：the ', ++count ,' image started compressing -----------------');
        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
            return cb();
        }

        if (file.isBuffer()) {
            if (options.log) console.log('------------  file buffer：' , file.contents ,' ------------');
            tinify.fromBuffer(file.contents).toBuffer(function(err, resultData) {
                if (err) {
                    if (err instanceof tinify.AccountError) {
                        // Verify your API key and account limit.
                        throw new PluginError(PLUGIN_NAME, "The AccountError error message is: " + err.message);
                    } else if (err instanceof tinify.ClientError) {
                        // Check your source image and request options.
                        throw new PluginError(PLUGIN_NAME, "The ClientError message is: " + err.message);
                    } else if (err instanceof tinify.ServerError) {
                        // Temporary issue with the Tinify API.
                        throw new PluginError(PLUGIN_NAME, "The ServerError message is: " + err.message);
                    } else if (err instanceof tinify.ConnectionError) {
                        // A network connection error occurred.
                        throw new PluginError(PLUGIN_NAME, "The ConnectionError message is: " + err.message);
                    } else {
                        // Something else went wrong, unrelated to the Tinify API.
                        throw new PluginError(PLUGIN_NAME, "The UnknowError message is: " + err.message);
                    }
                }
                file.contents = resultData;
                if (options.log) console.log('-------------- ', PLUGIN_NAME, '：the ', count ,' image are compressed -----------------');
                // Make sure the file is pushed into the next gulp Widget
                that.push(file);
                // Tell stream engine, we've finished processing the file
                cb && cb();
            });
        }
    });
};
