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
  source: path.join(`${__dirname}/custom_packages/`, '150-outlined-icons'),
  name: 'outlined-icons',
  class: 'oi',
  prefix: 'oi-',
  className: 'OutlinedIcons',
  title: 'Outlined Icons',
  homepage: 'http://freebiesbug.com/psd-freebies/150-free-outlined-icons-psd-ai-svg-webfont/',
  author: 'Dario Ferrando.',
  version: '',
  license: '',
  classifiable: false,
};

let paths = {
  css: path.join(options.source, 'Icon Font', 'styles.css'),
  fonts: path.join(options.source, 'Icon Font', 'fonts'),
  svgs: path.join(options.source, 'SVG'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function() {
  options.icons = getIconsFromCss(paths.css, 'icon-');
  options = prepareIcons(options);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options.fonts);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
};