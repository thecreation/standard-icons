'use strict';

let generate = require('./generate');
let path = require('path');

module.exports = function(dest, filename, data) {
  let outputFile = path.join(dest, `manifest.json`);

  return generate(outputFile, path.join(`${__dirname}/../templates/`, 'json.hbs'), data);
}
