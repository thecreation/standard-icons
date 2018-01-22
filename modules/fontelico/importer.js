let generateCss = require('../../scripts/utils/generateCss');
let generateJson = require('../../scripts/utils/generateJson');
let prepareIcons = require('../../scripts/utils/prepareIcons');
let extraFromYml = require('../../scripts/utils/extraFromYml');
let detectLicense = require('../../scripts/utils/detectLicense');
let getIconsFromYml = require('../../scripts/utils/getIconsFromYml');
let getSvgs = require('../../scripts/utils/getSvgs');
let copySvgs = require('../../scripts/utils/copySvgs');
let getFonts = require('../../scripts/utils/getFonts');
let copyFonts = require('../../scripts/utils/copyFonts');
let copyLicense = require('../../scripts/utils/copyLicense');
let fs = require('fs-extra');
let path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'fontelico.font'),
  name: 'fontelico',
  class: 'emo',
  prefix: 'emo-',
  className: 'Fontelico',
  classifiable: false
};

let paths = {
  css: path.join(options.source, 'font', 'fontelico.css'),
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
  version: yml.font.version,
  homepage: yml.meta.homepage,
  license: yml.meta.license
});

options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function() {
  options.icons = getIconsFromYml(yml.glyphs, 'emo-');
  options = prepareIcons(options);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
};
