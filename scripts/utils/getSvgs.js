'use strict';

let fs = require('graceful-fs');
let globule = require('globule');

module.exports = function(folder, filter = "**/*.svg") {
  let files = globule.find(filter, {
    srcBase: folder
  });

  return files;
}
