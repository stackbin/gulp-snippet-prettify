/**
 Copyright (c) 2016 Null Lines Pte Ltd

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
*/

/* jshint node:true */
'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var refactor = require('./refactor');

module.exports = function gulpSnippetPrettify(options) {

    if (!options) {
        throw new PluginError('gulp-snippet-prettify', 'Missing options');
    }

    if (!Array.isArray(options.replacements)) {
        throw new PluginError('gulp-snippet-prettify', 'Invalid options');
    }

    return through.obj(function (file, enc, callback) {

        if (file.isStream()) {
            this.emit('error', new PluginError('gulp-snippet-prettify', 'Streaming not supported'));
            return callback();
        }

        if (file.isBuffer()) {

            var source = file.contents.toString();

            if (!source) {
                throw new PluginError('gulp-snippet-prettify', 'Source is empty');
            }

            source = refactor(source, options);

            // return a new buffer with the source
            file.contents = new Buffer(source);

        }

        this.push(file);
        callback();
    });

};
