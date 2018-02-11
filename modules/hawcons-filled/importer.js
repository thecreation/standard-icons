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
  source: path.join(config.sets.customs, 'Hawcons', 'Font', 'Filled'),
  name: 'hawcons-filled',
  class: 'hfi',
  prefix: 'hfi-',
  className: 'HawconsFilled',
  title: 'Hawcons filled',
  homepage: 'http://www.hawcons.com',
  author: 'Yannick Lung',
  version: '2.0.0',
  classifiable: false,
};

let paths = {
  css: path.join(options.source, 'style.css'),
  fonts: path.join(options.source, 'fonts'),
  svgs: path.join(config.sets.customs, 'Hawcons', 'SVG'),
  license: path.join(config.sets.customs, 'Hawcons', 'Read Me.md'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs, '**/Filled/*.svg');
options.license = detectLicense(paths.license);

module.exports = function() {
  options.icons = getIconsFromCss(paths.css, 'hawcons-icon-', "\\.{prefix}\\d+-([\\w\\d-]+):before");
  options = prepareIcons(options);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs, function(name) {
    return path.basename(name).replace(/^icon-(\d)-/i, '');
  });
  copyLicense(paths.dest, paths.license);
  jsonfile(paths.dest, options);
};