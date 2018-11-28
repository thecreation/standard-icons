'use strict';

const jsonfile = require('jsonfile');
const path = require('path');
const colors = require('colors');

module.exports = function(dest, options) {
  const file = path.join(`${dest}`,'package.json');

  const obj = jsonfile.readFileSync(file)

  if (options.author) {
    obj.author = options.author;
  }
  if (options.homepage) {
    obj.homepage = options.homepage;
  }
  if (options.description) {
    obj.description = options.description;
  }
  if (options.license) {
    obj.license = options.license;
  }
  if (options.version && !obj.version.includes(options.version)) {
    obj.version = `${options.version}-alpha.0`;
  }
  if (options.pkgVersion) {
    obj.version = options.pkgVersion;
  }

  jsonfile.writeFileSync(file, obj, { spaces: 2 })

  console.log(colors.green('Jsonfiled.'))
}
