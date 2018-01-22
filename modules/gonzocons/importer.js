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
  source: path.join(`${__dirname}/custom_packages/`, 'gonzocons'),
  name: 'gonzocons',
  class: 'gon',
  prefix: 'gon-',
  className: 'Gonzocons',
  title: 'Gonzocons',
  homepage: 'http://www.gonzodesign.nl/gonzocons/',
  author: 'Jan Rajtoral',
  version: '2.0',
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
};