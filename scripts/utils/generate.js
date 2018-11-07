'use strict';

let fs = require('graceful-fs');
let path = require('path');
let Handlebars = require('handlebars');

Handlebars.registerHelper('equal', function(arg1, arg2, options) {
	return (arg1 === Object.keys(arg2).length - 1) ? options.fn(this) : options.inverse(this);
})

module.exports = function(outputFile, templateFile, data = {}) {
  var source = fs.readFileSync(templateFile);
  var template = Handlebars.compile(source.toString());
  var output = template(data);

  return fs.writeFileSync(outputFile, output);
}
