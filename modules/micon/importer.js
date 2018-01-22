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
  source: path.join(`${__dirname}/node_modules/`, 'micon'),
  name: 'micon',
  class: 'mi',
  prefix: 'mi-',
  className: 'Micon',
  title: 'Micon',
  classifiable: false
};

let paths = {
  bower: path.join(options.source, '.bower.json'),
  css: path.join(options.source, 'dist', 'micon', 'css', 'micon.css'),
  fonts: path.join(options.source, 'dist', 'micon', 'fonts'),
  svgs: path.join(options.source, 'dist', 'micon', 'fonts'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.bower, ['homepage', 'description', 'version', 'authors', 'license']);

options.license = info.license;
options.author = info.authors[0].name;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function() {
  options.icons = getIconsFromCss(paths.css, 'mi-');
  options = prepareIcons(options);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options.fonts);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  copyLicense(paths.dest, path.join(options.source, 'LICENSE'));
};
