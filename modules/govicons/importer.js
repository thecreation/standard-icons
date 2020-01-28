const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const generateFontsFromSvg = require('../../scripts/utils/generateFontsFromSvg');
const getSvgs = require('../../scripts/utils/getSvgs');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const copySvgs = require('../../scripts/utils/copySvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const optimizeSvgs = require('../../scripts/utils/optimizeSvgs');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const clean = require('../../scripts/utils/clean');
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'govicons'),
  name: 'govicons',
  class: 'gi',
  prefix: 'gi-',
  className: 'Govicons',
  title: 'Govicons',
  classifiable: false
};

let paths = {
  package: path.join(options.source, 'package.json'),
  css: path.join(options.source, 'css', 'govicons.css'),
  fonts: path.join(options.source, 'fonts'),
  svgs: path.join(options.source, 'raw-svg'),
  url: 'http://govicons.io',
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
options.author = info.author.name;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function(callback) {
  options.icons = getIconsFromCss(paths.css, 'gi-');
  options = prepareIcons(options);
  clean(paths.dest)
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options);
  copyFonts(paths.dest, paths.fonts, options);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs, 'gi-');
  optimizeSvgs(paths.svgsDest, options.svgs);
  copyLicense(paths.dest, path.join(options.source, 'LICENSE.md'));
  jsonfile(paths.dest, options);
  callback()
};
