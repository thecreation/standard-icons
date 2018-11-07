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
  var reg4 = new RegExp(`${selector},\\s${selector},\\s${selector},\\s${selector}`);
  var reg5 = new RegExp(`${selector},\\s${selector},\\s${selector},\\s${selector},\\s${selector}`);
  let css = CSSOM.parse(content.toString());

  css.cssRules.forEach(function(rule) {
    let icon = {};
    if(rule.style && rule.style.content) {
      var match5 = reg5.exec(rule.selectorText);
      if (match5) {
        icon.name = match5[1];
        icon.title = match5[1];
        icon.content = rule.style.content.replace(/["'](.+)["']/, '$1');
        icons[icon.name] = icon;

        for (var i = 2; i < 6; i++) {
          icons[match5[i]] = {
            name: match5[i],
            title: match5[i],
            content: icon.content
          }
        }
      }else {
        var match4 = reg4.exec(rule.selectorText);
        if (match4) {
          icon.name = match4[1];
          icon.title = match4[1];
          icon.content = rule.style.content.replace(/["'](.+)["']/, '$1');
          icons[icon.name] = icon;

          for (var i = 2; i < 5; i++) {
            icons[match4[i]] = {
              name: match4[i],
              title: match4[i],
              content: icon.content
            }
          }
        }else {
          var match3 = reg3.exec(rule.selectorText);
          if(match3) {
            icon.name = match3[1];
            icon.title = match3[1];
            icon.content = rule.style.content.replace(/["'](.+)["']/, '$1');
            icons[icon.name] = icon;

            for (var i = 2; i < 5; i++) {
              icons[match3[i]] = {
                name: match3[i],
                title: match3[i],
                content: icon.content
              }
            }
          } else {
            var match2 = reg2.exec(rule.selectorText);
            if(match2) {
              icon.name = match2[1];
              icon.title = match2[1];
              icon.content = rule.style.content.replace(/["'](.+)["']/, '$1');
              icons[icon.name] = icon;

              icons[match2[2]] = {
                name: match2[2],
                title: match2[2],
                content: icon.content
              };
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
      }
    }
  });

  return icons;
}
