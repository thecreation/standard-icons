const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const generateSvgs = require('../../scripts/utils/generateSvgs');
const fs = require('fs-extra');
const config = require('../../config');
const path = require('path');

let options = {
  source: path.join(config.sets.customs, 'mfglabs-iconset'),
  name: 'mfglabs-iconset',
  class: 'mli',
  prefix: 'mli-',
  className: 'MfglabsIconset',
  title: 'Mfglabs iconset',
  author: 'MfgLabs',
  version: '',
  classifiable: false
};

let paths = {
  bower: path.join(options.source, 'bower.json'),
  css: path.join(options.source, 'css', 'mfglabs_iconset.css'),
  fonts: path.join(options.source, 'css', 'font'),
  svgs: path.join(options.source, 'css', 'font'),
  dest: __dirname
};

options =  Object.assign(options, extraFromJson(paths.bower, ['homepage', 'description', 'license']));
options.fonts = getFonts(paths.fonts);

module.exports = function() {
  options.icons = getIconsFromCss(paths.css, 'icon-');
  options = prepareIcons(options);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options);
  copyLicense(paths.dest, path.join(options.source, 'licenses.txt'));
  generateSvgs(paths.dest, options.name, options);
};
