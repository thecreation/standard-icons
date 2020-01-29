const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const generateFontsFromSvg = require('../../scripts/utils/generateFontsFromSvg');
const getSvgs = require('../../scripts/utils/getSvgs');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const getIconsMap = require('../../scripts/utils/getIconsMap');
const copySvgs = require('../../scripts/utils/copySvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const generateSvgs = require('../../scripts/utils/generateSvgs');
const jsonfile = require('../../scripts/utils/jsonfile');
const clean = require('../../scripts/utils/clean');
const config = require('../../config');
const path = require('path');
const fs = require('fs-extra');

let options = {
  source: path.join(config.sets.customs, 'icofont'),
  name: 'icofont',
  class: 'icofont',
  prefix: 'icofont-',
  className: 'Icofont',
  title: 'Icofont',
  license: 'CC BY 4.0',
  author: 'IcoFont',
  homepage: 'https://icofont.com',
  description: '2100+ free icons to spice up your creative design',
  version: '1.0.1',
  classifiable: true
};

let paths = {
  css: path.join(options.source, 'icofont.css'),
  html: path.join(options.source, 'demo.html'),
  fonts: path.join(options.source, 'fonts'),
  icons: path.join(options.source, 'icons.json'),
  url: 'https://icofont.com/icons',
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

options.fonts = getFonts(paths.fonts);

module.exports = function(callback) {
  let iconsMap = getIconsMap(getIconsFromCss(paths.css, 'icofont-'));
  let data = fs.readJsonSync(paths.icons);
  let icons = {};

  data.localstore.icons.forEach(icon => {
    if (!Object.prototype.hasOwnProperty.call(icons, icon.cat)) {
      icons[icon.cat] = [];
    }

    icons[icon.cat].push({
      name: icon.name,
      content: iconsMap[icon.name],
      title: icon.name
    });
  })
  options.icons = icons;
  options = prepareIcons(options);
  clean(paths.dest);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options);
  copyFonts(paths.dest, paths.fonts, options);
  generateSvgs(paths.dest, options.name, options);
  jsonfile(paths.dest, options);
  callback();
};
