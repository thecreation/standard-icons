const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const getSvgs = require('../../scripts/utils/getSvgs');
const copySvgs = require('../../scripts/utils/copySvgs');
const optimizeSvgs = require('../../scripts/utils/optimizeSvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const clean = require('../../scripts/utils/clean');
const generateSvgs = require('../../scripts/utils/generateSvgs');
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, '@uiw', 'icons'),
  name: 'uiw-icons',
  class: 'w-icon',
  prefix: 'w-icon-',
  className: 'UiwIcons',
  title: 'Uiw Icons',
  classifiable: false
};

let paths = {
  package: path.join(options.source, 'package.json'),
  css: path.join(options.source, 'fonts', 'w-icon.css'),
  url: 'https://uiwjs.github.io/icons/',
  dest: __dirname,
  fonts: path.join(options.source, 'fonts'),
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
options.author = info.author.name;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.fonts = getFonts(paths.fonts, "w-icon");

console.info(options)

module.exports = function(callback) {
  options.icons = getIconsFromCss(paths.css, 'w-icon-');
  options = prepareIcons(options);
  clean(paths.dest)
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options);
  copyFonts(paths.dest, paths.fonts, options);
  generateSvgs(paths.dest, options.name, options);
  jsonfile(paths.dest, options);
  callback()
};
