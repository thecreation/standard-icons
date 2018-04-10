const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromYml = require('../../scripts/utils/extraFromYml');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const getSvgs = require('../../scripts/utils/getSvgs');
const copySvgs = require('../../scripts/utils/copySvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const fs = require('fs-extra');
const config = require('../../config');
const path = require('path');

let options = {
  source: path.join(config.sets.customs, 'entypo'),
  name: 'entypo',
  class: 'entypo',
  prefix: 'entypo-',
  className: 'Entypo',
  description: "Entypo, the premium pictograms",
  version: '1.0.2',
  classifiable: false
};

let paths = {
  css: path.join(options.source, 'font', 'entypo.css'),
  fonts: path.join(options.source, 'font'),
  svgs: path.join(options.source, 'src', 'svg'),
  yml: path.join(options.source, 'config.yml'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let yml = extraFromYml(paths.yml, [['meta', ['author', 'homepage', 'license']], ['font', ['version', 'fullname']], 'glyphs']);

options = Object.assign(options, {
  title: yml.font.fullname,
  author: yml.meta.author,
  // version: yml.font.version,
  homepage: yml.meta.homepage,
  license: yml.meta.license
});

options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function() {
  options.icons = getIconsFromCss(paths.css, 'icon-');
  options = prepareIcons(options);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  jsonfile(paths.dest, options);
};
