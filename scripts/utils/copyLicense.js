'use strict';

let fs = require('fs-extra');
let path = require('path');

module.exports = function(dest, license) {
  fs.copySync(license, path.join(dest, path.basename('LICENSE')));
}
