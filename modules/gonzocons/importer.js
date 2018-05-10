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
  source: path.join(config.sets.customs, 'gonzocons'),
  name: 'gonzocons',
  class: 'gon',
  prefix: 'gon-',
  className: 'Gonzocons',
  title: 'Gonzocons',
  homepage: 'http://www.gonzodesign.nl/gonzocons/',
  description: "An Icon Font designed by Jan Rajtoral, gonzodesign.nl",
  author: 'Jan Rajtoral',
  version: '2.0.0-1',
  classifiable: false,
};

let paths = {
  css: path.join(options.source, 'gonzocons.css'),
  fonts: path.join(options.source, 'fonts'),
  svgs: path.join(options.source, 'SVGs 2.0'),
  license: path.join(options.source, 'Read Me.txt'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);
options.license = detectLicense(paths.license);

module.exports = function() {
  options.icons = getIconsFromCss(paths.css, 'icon-');
  options = prepareIcons(options);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  jsonfile(paths.dest, options);
};