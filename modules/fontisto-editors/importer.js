const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const detectLicense = require('../../scripts/utils/detectLicense');
const generateSvgs = require('../../scripts/utils/generateSvgs');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const copySvgs = require('../../scripts/utils/copySvgs');
const optimizeSvgs = require('../../scripts/utils/optimizeSvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const clean = require('../../scripts/utils/clean');
const fs = require('fs-extra');
const config = require('../../config');
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'fontisto'),
  name: 'fontisto-editors',
  class: 'fie',
  prefix: 'fie-',
  className: 'FontistoEditors',
  title: 'Fontisto Editors',
  classifiable: false
};

let paths = {
  package: path.join(options.source, 'package.json'),
  license: path.join(options.source, 'LICENSE.md'),
  css: path.join(options.source, 'css', 'fontisto', 'fontisto-editors.css'),
  fonts: path.join(options.source, 'fonts', 'fontisto'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
options.author = info.author.name;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.license = detectLicense(paths.license);
options.fonts = getFonts(paths.fonts, 'fontisto-editors*');

module.exports = function(callback) {
  options.icons = getIconsFromCss(paths.css, 'fi-');
  options = prepareIcons(options);
  clean(paths.dest);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options);
  copyFonts(paths.dest, paths.fonts, options);
  generateSvgs(paths.dest, options.name, options);
  copyLicense(paths.dest, paths.license)
  jsonfile(paths.dest, options);
  callback();
};
