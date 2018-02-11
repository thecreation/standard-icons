const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const generateSvgs = require('../../scripts/utils/generateSvgs');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const fs = require('fs-extra');
const config = require('../../config');
const path = require('path');

let options = {
  source: path.join(config.sets.customs, 'payment-webfont'),
  name: 'payment-webfont',
  class: 'pw',
  prefix: 'pw-',
  className: 'Payment-webfont',
  classifiable: false
};

let paths = {
  package: path.join(options.source, 'bower.json'),
  css: path.join(options.source, 'style.css'),
  fonts: path.join(options.source, 'fonts'),
  dest: __dirname
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'authors', 'license']);

options.license = info.license;
options.author = info.authors[0].name + ', '+ info.authors[1].name + ', ' + info.authors[2].name;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.fonts = getFonts(paths.fonts);

module.exports = function() {
  options.icons = getIconsFromCss(paths.css, 'pw-');
  options = prepareIcons(options);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options);
  copyLicense(paths.dest, path.join(options.source, 'LICENSE'));
  generateSvgs(paths.dest, options.name, options);
  jsonfile(paths.dest, options);
};