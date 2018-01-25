'use strict';

let fs = require('graceful-fs');
let globule = require('globule');

module.exports = function(folder) {
  let files = globule.find("*.{svg,eot,ttf,woff,woff2}", {
    srcBase: folder
  });

  let fonts = {
    eot: false,
    svg: false,
    ttf: false,
    woff: false,
    woff2: false
  };

  for(let type in fonts) {
    files.forEach(function(file) {
      if(file.indexOf(type) === file.length - type.length) {
        fonts[type] = file;
      }
    });
  }
  
  return fonts;
}
