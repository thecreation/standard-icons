'use strict';

let fs = require('graceful-fs');
let CSSOM = require('cssom');
let humanize = require('humanize-string');

module.exports = function(file, prefix, selector = "\\.{prefix}([\\w\\d-]+):before") {
  var content = fs.readFileSync(file);
  selector = selector.replace('{prefix}', prefix);

  var icons = {};
  var reg = new RegExp(selector);
  var reg2 = new RegExp(`${selector},\\s${selector}`);
  var reg3 = new RegExp(`${selector},\\s${selector},\\s${selector}`);
  let css = CSSOM.parse(content.toString());

  css.cssRules.forEach(function(rule) {
    let icon = {};
    if(rule.style && rule.style.content) {
        var match3 = reg3.exec(rule.selectorText);
        if(match3) {
          icon.name = match3[1];
          icon.title = match3[1];
          icon.content = rule.style.content.replace(/["'](.+)["']/, '$1');

          icons[icon.name] = icon;

          icon.name = match3[2];
          icon.title = match3[2];

          icons[icon.name] = icon;

          icon.name = match3[3];
          icon.title = match3[3];

          icons[icon.name] = icon;
        } else {
          var match2 = reg2.exec(rule.selectorText);

          if(match2) {
            icon.name = match2[1];
            icon.title = match2[1];
            icon.content = rule.style.content.replace(/["'](.+)["']/, '$1');

            icons[icon.name] = icon;

            icon.name = match2[2];
            icon.title = match2[2];

            icons[icon.name] = icon;
          } else {
            var match = reg.exec(rule.selectorText);

            if(match && match[1]) {
                icon.name = match[1];
                icon.title = match[1];
                icon.content = rule.style.content.replace(/["'](.+)["']/, '$1');

                icons[icon.name] = icon;
            }
          }
        }
    }
  });

  return icons;
}
