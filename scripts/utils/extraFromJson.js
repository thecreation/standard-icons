let fs = require('fs-extra');
let extract = require('extract');

module.exports = function(jsonFile, keys) {
  let obj = fs.readJsonSync(jsonFile);
  return extract(obj, keys);
}
