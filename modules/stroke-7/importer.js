let generateCss = require('../../scripts/utils/generateCss');
let generateJson = require('../../scripts/utils/generateJson');
let prepareIcons = require('../../scripts/utils/prepareIcons');
let extraFromJson = require('../../scripts/utils/extraFromJson');
let detectLicense = require('../../scripts/utils/detectLicense');
let getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
let getSvgs = require('../../scripts/utils/getSvgs');
let copySvgs = require('../../scripts/utils/copySvgs');
let getFonts = require('../../scripts/utils/getFonts');
let copyFonts = require('../../scripts/utils/copyFonts');
let copyLicense = require('../../scripts/utils/copyLicense');
let fs = require('fs-extra');
let path = require('path');

let options = {
  source: path.join(`${__dirname}/custom_packages/`, 'stroke-7'),
  name: 'stroke-7',
  class: 's7',
  prefix: 's7-',
  className: 'Stroke7',
  title: 'Stroke Icons 7',
  author: 'The Pixeden Team',
  homepage: 'http://themes-pixeden.com/font-demos/7-stroke/',
  version: '1.2.0',
  classifiable: false
};

let paths = {
  css: path.join(options.source, 'pe-icon-7-stroke', 'css', 'pe-icon-7-stroke.css'),
  fonts: path.join(options.source, 'pe-icon-7-stroke', 'fonts'),
  svgs: path.join(options.source, 'SVG'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function() {
  options.icons = getIconsFromCss(paths.css, 'pe-7s-');
  options = prepareIcons(options);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  copyLicense(paths.dest, path.join(options.source, 'read-me.txt'));
};