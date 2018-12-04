const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsFromCss2 = require('../../scripts/utils/getIconsFromCss2');
const getSvgs = require('../../scripts/utils/getSvgs');
const copySvgs = require('../../scripts/utils/copySvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const clean = require('../../scripts/utils/clean');
const fs = require('fs-extra');
const path = require('path');


let options = {
  source: path.join(`${__dirname}/node_modules/`, 'feather-font'),
  name: 'feather',
  title: 'Feather',
  class: 'fe',
  prefix: 'fe-',
  author: 'colebemis',
  homepage: 'http://colebemis.com/feather/',
  description: "Simply beautiful open source icons",
  className: 'Feather',
  license: 'MIT',
  classifiable: false
};

let paths = {
  css: path.join(options.source, 'src', 'css', 'iconfont.css'),
  license: path.join(options.source, 'LICENSE'),
  fonts: path.join(options.source, 'src', 'fonts'),
  svgs: path.join(options.source, 'src', 'icons'),
  dest: __dirname,
  package: path.join(options.source, 'package.json'),
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.version = info.version;
options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);
options.license = info.license;

module.exports = function(callback) {
  options.icons = getIconsFromCss2(paths.css, 'icon-', "^\\.{prefix}([\\w\\d-]+):before", (icon) => {
    if (icon.name.charAt(icon.name.length - 1) === '-') {
      icon.name = icon.name + '2'
      icon.title = icon.title + '2'
    }
    if (icon.name === 'edit-1') {
      icon.name = 'edit-3'
      icon.title = 'edit-3'
    }
  });
  options = prepareIcons(options);
  clean(paths.dest)
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  copyLicense(paths.dest, paths.license);
  jsonfile(paths.dest, options);
  callback()
};
