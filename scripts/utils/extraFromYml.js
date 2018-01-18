let yaml = require('js-yaml');
let fs = require('fs');
let extract = require('extract');

module.exports = function(ymlFile, keys) {
  let obj = yaml.load(fs.readFileSync(ymlFile, 'utf8'), {
    json: true
  });
  return extract(obj, keys);
}
