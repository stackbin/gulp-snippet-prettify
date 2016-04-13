'use strict';

var refactor = require('esrefactor');
var esprima = require('esprima');
var estraverse = require('estraverse');

function getIdentifiers(source) {

    var identifiers = [];
    var ast = esprima.parse(source, {range: true});

    // Get the identifiers for each of the variables in the first function expression
    estraverse.traverse(ast, {
        enter: function (node, parent) {

            if ((parent && (parent.type === 'FunctionDeclaration' || parent.type === 'FunctionExpression'))) {
                if (node.type === 'Identifier') {
                    identifiers.push(node.range);
                } else {
                    this.break();
                }
            }
        }
    });

    return identifiers;
}

module.exports = function (source, options) {

    if (!source) {
        throw new Error('No sourcecode');
    }

    if (!options) {
        throw new Error('Missing options');
    }

    if (typeof source !== 'string' || !Array.isArray(options.replacements)) {
        throw new Error('Invalid options');
    }

    var identifiers = getIdentifiers(source);

    if (identifiers.length !== options.replacements.length) {
        throw new Error('First function arguments count is not the same as replacements: ' + identifiers.length);
    }

    var ctx; //= new refactor.Context(source);
    for (var i = 0; i < options.replacements.length; i++) {

        var replacement = options.replacements[i];
        var identifier = identifiers[i].slice(-1).pop();
        ctx = new refactor.Context(source);

        var node = ctx.identify(identifier);
        source = ctx.rename(node, replacement);

        identifiers = getIdentifiers(source);

    }

    //replace consecutive new lines
    source = source.replace(/\n\s*\n/g, '\n');

    // kill the use strict comment
    source = source.replace(/"use strict";/, '');

    return source;

};
