/* jshint mocha: true */
'use strict';

var fs = require('fs');
var path = require('path');
var gutil = require('gulp-util');
var gulp = require('gulp');

var assert = require('chai').assert;

var fixtures = function (glob) {
    return path.join(__dirname, 'fixtures', glob);
};

var prettify = require('../src');

function load(file) {
    var file_path = fixtures(file);
    var buffer = fs.readFileSync(file_path);
    return new gutil.File({
        path: file_path,
        contents: buffer
    });
}

function contents(file) {
    var file_path = fixtures(file);
    return fs.readFileSync(file_path).toString();

}

describe('gulp-snippet-prettify', function () {

    before(function (done) {
        done();
    });

    after(function (done) {
        done();
    });

    it('should emit error on streamed file', function (done) {

        gulp.src(fixtures('*'), {buffer: false})
            .pipe(prettify({replacements:['ab','c']}))
            .on('error', function (err) {
                assert.equal(err.message, 'Streaming not supported');
                done();
            });
    });

    it('should throw, when options are missing', function () {
        assert.throws(function () {
            prettify();
        }, 'Missing options');
    });

    it('should throw, when options are invalid', function () {
        assert.throws(function () {
            var x = prettify('!1', {
                replacements: 'heh'
            });
            console.log(x);
        }, 'Invalid options');
    });

    it('should work with Outfound snippet', function (done) {
        var fake = load('outfound.js');

        var prettifier = prettify({
            replacements: ['O', 'u', 'T', 'F', 'o', 'U', 'N', 'D', '_']
        });

        prettifier.write(fake);

        // wait for the file to come back out
        prettifier.once('data', function (file) {
            // make sure it came out the same way it went in
            assert.ok(file.isBuffer());

            // check the contents
            assert.equal(file.contents.toString('utf8'), contents('outfound.pretty.js'));
            done();
        });
    });

    it('should work with Stackbin snippet', function (done) {

        var fake = load('stackbin.js');

        var prettifier = prettify({
            replacements: ['S', 'T', 'A', 'C', 'K', 'B', 'I', 'N', '_']
        });

        prettifier.write(fake);

        // wait for the file to come back out
        prettifier.once('data', function (file) {
            assert.ok(file.isBuffer());

            // check the contents
            assert.equal(file.contents.toString('utf8'), contents('stackbin.pretty.js'));
            done();
        });

    });

    it('should work with Random snippet', function (done) {

        var fake = load('random.js');

        var prettifier = prettify({
            replacements: ['snap', 'crackle', 'pop']
        });

        prettifier.write(fake);

        // wait for the file to come back out
        prettifier.once('data', function (file) {
            assert.ok(file.isBuffer());

            // check the contents
            assert.equal(file.contents.toString('utf8'), contents('random.pretty.js'));
            done();
        });

    });

});
