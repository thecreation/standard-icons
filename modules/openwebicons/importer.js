const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsMap = require('../../scripts/utils/getIconsMap');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const generateSvgs = require('../../scripts/utils/generateSvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const clean = require('../../scripts/utils/clean');
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'openwebicons'),
  name: 'openwebicons',
  class: 'openwebicons',
  prefix: 'openwebicons-',
  className: 'OpenWebIcons',
  title: 'OpenWeb Icons',
  description: 'The OpenWeb Icons is a web-font that gives you scalable vector icons/logos of some open communities, standards or projects.',
  classifiable: false
};

let paths = {
  package: path.join(options.source, 'package.json'),
  css: path.join(options.source, 'css', 'openwebicons-cdn.css'),
  fonts: path.join(options.source, 'font'),
  url: 'https://pfefferle.dev/openwebicons/',
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
options.author = info.author.name;
options.homepage = info.homepage;
// options.description = info.description;
options.version = info.version;
options.fonts = getFonts(paths.fonts);

module.exports = function(callback) {
  options.icons = getIconsFromCss(paths.css, 'openwebicons-');
  options = prepareIcons(options);
  clean(paths.dest)
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options);
  copyFonts(paths.dest, paths.fonts, options);
  generateSvgs(paths.dest, options.name, options);
  copyLicense(paths.dest, path.join(options.source, 'License.txt'));
  jsonfile(paths.dest, options);
  callback()
};
