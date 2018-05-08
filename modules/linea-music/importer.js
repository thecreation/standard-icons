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
  source: path.join(config.sets.customs, 'Linea-Iconset', '_music'),
  name: 'linea-music',
  class: 'lmu',
  prefix: 'lmu-',
  className: 'LineaMusic',
  title: 'Linea music',
  author: 'Dario Ferrando',
  description: 'Linea Iconset a free outline iconset  featuring 730+ Icons.',
  homepage: 'http://www.linea.io/',
  classifiable: false,
  version: '1.0.5'
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
  options.icons = getIconsFromCss(paths.css, 'icon-');
  options = prepareIcons(options);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  copyLicense(paths.dest, paths.license);
  jsonfile(paths.dest, options);
};
