'use strict';

const fs = require('fs-extra');
const path = require('path');
const colors = require('colors');
const expand = require('glob-expand');
const webfont = require('webfont').default;
const getSvgs = require('./getSvgs');

module.exports = function(dest, options, done) {
  webfont({
    files: `${dest}/icons/*.svg`,
    fontName: `${options.name}`,
    prefix: `${options.prefix}`,
    class: `${options.class}`,
    title: `${options.title}`,
    version: `${options.version}`,
    author: `${options.author}`,
    homepage: `${options.homepage}`,
    license: `${options.license}`,
    fontHeight: 128,
    normalize: true,
    centerHorizontally: true,
    formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
    glyphTransformFn: obj => {
      return obj
    },
    template: path.resolve(`${dest}/template.hbs`)
  }).then((result) => {
    fs.writeFileSync(`${dest}/${options.name}.css`, result.template);
    fs.writeFileSync(`${dest}/${options.name}.svg`, result.svg);
    fs.writeFileSync(`${dest}/${options.name}.ttf`, Buffer.from(result.ttf));
    fs.writeFileSync(`${dest}/${options.name}.eot`, Buffer.from(result.eot));
    fs.writeFileSync(`${dest}/${options.name}.woff`, Buffer.from(result.woff));
    fs.writeFileSync(`${dest}/${options.name}.woff2`, Buffer.from(result.woff2));
    console.log(colors.green('Icon generated.'));
    if (done) {
      done();
    }
  })
}
