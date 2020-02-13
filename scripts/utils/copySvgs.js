'use strict';

let fs = require('fs-extra');
let path = require('path');

module.exports = function(dest, src, files, prefix, nameFunc = null) {
  var new_files = []
  for(var i in files) {
    if(files[i]) {
      var file;
      if(nameFunc instanceof Function) {
        file = nameFunc(files[i]);
      } else {
        file = path.basename(files[i]);
      }
      new_files[i] = file.replace(prefix, '');
      fs.copySync(path.join(src, files[i]), path.join(dest, new_files[i]));
    }
  }

  return new_files;
}
