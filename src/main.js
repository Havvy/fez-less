var Parser = less = require("less").Parser,
    Promise = require("bluebird");

module.exports = function(options) {
  var parser = new Parser(options),
      parse = Promise.promisify(parser.parse, parser);

  function lessp(p) {
    return p.then(parse).then(function (tree) { return tree.toCSS(); });
  };

  return function(inputs) {
    return Promise.all(inputs.map(function(input) { return input.asBuffer(); }).map(lessp)).then(function(css) { return css.join(""); });
  };
};

