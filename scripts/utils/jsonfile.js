'use strict';

const jsonfile = require('jsonfile');
const path = require('path');
const colors = require('colors');

module.exports = function(dest, options) {
  const file = path.join(`${dest}`,'package.json');

  jsonfile.readFile(file, function(err, obj) {
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
    if (options.version) {
      obj.version = options.version;
    }
    
    let newObj = obj;

    jsonfile.writeFile(file, newObj, {spaces: 2}, function(err) {
      if (err) {
        console.error(err);
      }else {
        console.log(colors.green('Jsonfiled.'));
      }
    })
  })
}