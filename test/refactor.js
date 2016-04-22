/* jshint mocha: true */
'use strict';

var fs = require('fs');
var path = require('path');
var assert = require('chai').assert;
var prettify = require('../src/refactor');

var fixtures = function (glob) {
    return path.join(__dirname, 'fixtures', glob);
};

function contents(file) {
    var file_path = fixtures(file);
    return fs.readFileSync(file_path).toString();

}

describe('refactor', function () {

    before(function (done) {
        done();
    });

    after(function (done) {
        done();
    });

    it('should refactor for stackbin', function (done) {
        var source = contents('stackbin.js');
        var output = contents('stackbin.pretty.js');

        var pretty = prettify(source, {
            replacements: ['S', 'T', 'A', 'C', 'K', 'B', 'I', 'N', '_']
        });

        assert.equal(pretty, output);

        done();
    });

    it('should refactor for outfound', function (done) {
        var source = contents('outfound.js');
        var output = contents('outfound.pretty.js');

        var pretty = prettify(source, {
            replacements: ['o', 'u', 't', 'F', 'O', 'U', 'N', 'D', '__']
        });

        assert.equal(pretty, output);

        done();
    });

    it('should refactor for random', function (done) {
        var source = contents('random.js');
        var output = contents('random.pretty.js');

        var pretty = prettify(source, {
            replacements: ['snap', 'crackle', 'pop']
        });

        assert.equal(pretty, output);

        done();
    });

});
