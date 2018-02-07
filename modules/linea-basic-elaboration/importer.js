const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsFromCss2 = require('../../scripts/utils/getIconsFromCss2');
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
  source: path.join(config.sets.customs, 'Linea-Iconset', '_basic_elaboration'),
  name: 'linea-basic-elaboration',
  class: 'linea',
  prefix: 'linea-',
  className: 'LineaBasicElaboration',
  title: 'Linea Basic Elaboration',
  author: 'Dario Ferrando',
  homepage: 'http://www.linea.io/',
  classifiable: false,
  version: '1.0'
};

let paths = {
  license: path.join(config.sets.customs, 'Linea-Iconset', 'LICENSE'),
  css: path.join(options.source, '_ICONFONT', 'styles.css'),
  fonts: path.join(options.source, '_ICONFONT', 'fonts'),
  svgs: path.join(options.source, '_SVG'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

options.license = detectLicense(paths.license);
options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function() {
  options.icons = getIconsFromCss2(paths.css, 'icon-');
  options = prepareIcons(options);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  copyLicense(paths.dest, paths.license);
  jsonfile(paths.dest, options);
};
