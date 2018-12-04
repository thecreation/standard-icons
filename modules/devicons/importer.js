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
const clean = require('../../scripts/utils/clean');
const fs = require('fs-extra');
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'devicons'),
  name: 'devicons',
  class: 'devicons',
  prefix: 'devicons-',
  className: 'Devicons',
  title: 'Devicons',
  classifiable: false
};

let paths = {
  package: path.join(options.source, 'package.json'),
  css: path.join(options.source, 'css', 'devicons.css'),
  fonts: path.join(options.source, 'fonts'),
  svgs: path.join(options.source, '!SVG'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'licenses']);

options.license = info.licenses.type;
options.author = info.author.name;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

const checkArr = ['ror', 'jquery_ui_logo', 'jquery_logo', 'angular_simple', 'javascript', 'rasberry_pi', 'js_badge', 'javascript_1']

let fileReplace = {
  'ror': 'ruby_on_rails',
  'jquery_ui_logo': 'jquery_ui',
  'jquery_logo': 'jquery',
  'angular_simple': 'angular',
  'javascript': 'javascript_shield',
  'rasberry_pi': 'raspberry_pi',
  'js_badge': 'javascript_badge',
  'javascript_1': 'javascript'
}

module.exports = function(callback) {
  options.icons = getIconsFromCss(paths.css, 'devicons-');
  options = prepareIcons(options);
  clean(paths.dest)
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs, '', file => {
    if (checkArr.includes(file.replace('.svg', ''))) {
      const keys = Object.keys(fileReplace);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === file.replace('.svg', '')) {
          return fileReplace[keys[i]] + '.svg'
        }
      }
    }
    return file
  });
  jsonfile(paths.dest, options);
  callback()
};
