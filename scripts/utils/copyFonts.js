'use strict';

let fs = require('fs-extra');
let path = require('path');

module.exports = function(dest, src, fonts) {
  for(var i in fonts) {
    if(fonts[i]) {
      fs.copySync(path.join(src, fonts[i]), path.join(dest, fonts[i]));
    }
  }
}
