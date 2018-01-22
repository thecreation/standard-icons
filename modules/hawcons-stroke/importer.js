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
  source: path.join(`${__dirname}/custom_packages/`, 'Hawcons', 'Font', 'Stroke'),
  name: 'hawcons-stroke',
  class: 'hfi',
  prefix: 'hfi-',
  className: 'HawconsStroke',
  title: 'Hawcons stroke',
  homepage: 'http://www.hawcons.com',
  author: 'Yannick Lung',
  version: '2.0',
  classifiable: false,
};

let paths = {
  css: path.join(options.source, 'style.css'),
  fonts: path.join(options.source, 'fonts'),
  svgs: path.join(`${__dirname}/custom_packages/`, 'Hawcons', 'SVG'),
  license: path.join(`${__dirname}/custom_packages/`, 'Hawcons', 'Read Me.md'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs, '**/Stroke/*.svg');
options.license = detectLicense(paths.license);

module.exports = function() {
  options.icons = getIconsFromCss(paths.css, 'icon-icon-', "^\\.{prefix}\\d+-([\\w\\d-]+):before");
  options = prepareIcons(options);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options.fonts);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs, function(name) {
    return path.basename(name).replace(/^icon-(\d)-/i, '');
  });
  copyLicense(paths.dest, paths.license);
};