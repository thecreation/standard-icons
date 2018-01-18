'use strict';

let generate = require('./generate');
let path = require('path');

module.exports = function(dest, filename, data) {
  let outputFile = path.join(dest, `${filename}.css`);
  return generate(outputFile, path.join(`${__dirname}/../templates/`, 'css.hbs'), data);
}
