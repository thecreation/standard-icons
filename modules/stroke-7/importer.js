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
  source: path.join(config.sets.customs, 'stroke-7'),
  name: 'stroke-7',
  class: 's7',
  prefix: 's7-',
  className: 'Stroke7',
  title: 'Stroke Icons 7',
  author: 'The Pixeden Team',
  homepage: 'http://themes-pixeden.com/font-demos/7-stroke/',
  version: '1.2.0-1',
  license: 'PIXEDEN license',
  description: 'Icon Font - Stroke Icons 7 - by Pixeden',
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
  jsonfile(paths.dest, options);
};