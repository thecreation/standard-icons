'use strict';

let fs = require('graceful-fs');
let globule = require('globule');

module.exports = function(folder, filter = "**/*.svg", prefixBase = "") {
  let files = globule.find(filter, {
    srcBase: folder,
    prefixBase: prefixBase
  });

  return files;
}
