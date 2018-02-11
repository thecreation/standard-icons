'use strict';

let fs = require('fs-extra');
let path = require('path');

module.exports = function(dest, src, files, prefix, nameFunc = null) {
  for(var i in files) {
    if(files[i]) {
      var file;
      if(nameFunc instanceof Function) {
        file = nameFunc(files[i]);
      } else {
        file = path.basename(files[i]);
      }
      fs.copySync(path.join(src, files[i]), path.join(dest, file.replace(prefix, '')));
    }
  }
}
