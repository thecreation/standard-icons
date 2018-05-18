const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const getSvgs = require('../../scripts/utils/getSvgs');
const copySvgs = require('../../scripts/utils/copySvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const fs = require('fs-extra');
const config = require('../../config');
const path = require('path');

let options = {
  source: path.join(config.sets.customs, '150-outlined-icons'),
  name: 'outlined-icons',
  class: 'oui',
  prefix: 'oui-',
  className: 'OutlinedIcons',
  title: 'Outlined Icons',
  homepage: 'http://freebiesbug.com/psd-freebies/150-free-outlined-icons-psd-ai-svg-webfont/',
  author: 'Dario Ferrando.',
  version: '0.0.2-2',
  description: 'Outlined icon fonts.',
  license: 'MIT',
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
  copyFonts(paths.dest, paths.fonts, options);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  jsonfile(paths.dest, options);
};