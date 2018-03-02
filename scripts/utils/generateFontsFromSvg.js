'use strict';

const fs = require('fs-extra');
const path = require('path');
const colors = require('colors');
const expand = require('glob-expand');
const webfont = require('webfont').default;

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
    formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
    glyphTransformFn: obj => {
      obj.name;
    },
    template: path.resolve(`${dest}/template.hbs`)
  }).then((result) => {
    fs.writeFileSync(`${dest}/${options.name}.css`, result.styles);
    fs.writeFileSync(`${dest}/${options.name}.svg`, result.svg);
    fs.writeFileSync(`${dest}/${options.name}.ttf`, new Buffer(result.ttf));
    fs.writeFileSync(`${dest}/${options.name}.eot`, new Buffer(result.eot));
    fs.writeFileSync(`${dest}/${options.name}.woff`, new Buffer(result.woff));
    fs.writeFileSync(`${dest}/${options.name}.woff2`, new Buffer(result.woff2));
    console.log(colors.green('Icon generated.'));
    if (done) {
      done();
    }
  })
}