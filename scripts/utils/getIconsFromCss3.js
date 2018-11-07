'use strict';

let fs = require('graceful-fs');
let CSSOM = require('css');

module.exports = function(file, prefix, selector = "^\\.{prefix}([\\w\\d-]+)::before") {
  var content = fs.readFileSync(file);
  selector = selector.replace('{prefix}', prefix);

  var icons = {};
  var reg = new RegExp(selector);
  let css = CSSOM.parse(content.toString());

  css.stylesheet.rules.forEach(function(rule) {
    let icon = {};
    if(rule.type === 'rule') {
      var match = reg.exec(rule.selectors[0]);
      if(match && match[1]) {
          icon.name = match[1];
          icon.title = match[1];
          rule.declarations.forEach(function(declaration){
            if(declaration.type === 'declaration' && declaration.property === 'content') {
              icon.content = declaration.value.replace(/["'](.+)["']/, '$1');
            }
          });
          icons[icon.name] = icon;
      }
    }
  });

  return icons;
}