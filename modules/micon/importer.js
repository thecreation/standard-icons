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
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'micon-font'),
  name: 'micon',
  class: 'mi',
  prefix: 'mi-',
  className: 'Micon',
  title: 'Micon',
  version: '2.2.2',
  classifiable: false
};

let paths = {
  package: path.join(options.source, 'package.json'),
  css: path.join(options.source, 'dist', 'micon', 'css', 'micon.css'),
  fonts: path.join(options.source, 'dist', 'micon', 'fonts'),
  svgs1: path.join(options.source, 'icons', 'mdl2'),
  svgs2: path.join(options.source, 'icons', 'webbrand'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
options.author = info.author.name;
options.homepage = info.homepage;
options.description = info.description;
// options.version = info.version;
options.fonts = getFonts(paths.fonts);
options.svgs1 = getSvgs(paths.svgs1);
options.svgs2 = getSvgs(paths.svgs2);

module.exports = function() {
  options.icons = getIconsFromCss(paths.css, 'mi-');
  options = prepareIcons(options);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options);
  copySvgs(paths.svgsDest, paths.svgs1, options.svgs1);
  copySvgs(paths.svgsDest, paths.svgs2, options.svgs2);
  copyLicense(paths.dest, path.join(options.source, 'LICENSE'));
  jsonfile(paths.dest, options);
};
