const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsFromUrl = require('../../scripts/utils/getIconsFromUrl');
const getSvgs = require('../../scripts/utils/getSvgs');
const copySvgs = require('../../scripts/utils/copySvgs');
const optimizeSvgs = require('../../scripts/utils/optimizeSvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const generateSvgs = require('../../scripts/utils/generateSvgs');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const clean = require('../../scripts/utils/clean');
const fs = require('fs-extra');
const config = require('../../config');
const path = require('path');
const getIconsMap = require('../../scripts/utils/getIconsMap');
const iconData = require('./data');

let options = {
  source: path.join(config.sets.customs, 'jam'),
  name: 'jam-icons',
  class: 'jam',
  prefix: 'jam-',
  className: 'JamIcons',
  version: '2.0.0',
  title: 'Jam Icons',
  author: 'Michael Amprimo',
  homepage: 'https://jam-icons.com/',
  description: "Jam icons is a set of icons designed for web projects, illustrations, print projects, etc.",
  classifiable: true
};

let paths = {
  license: path.join(options.source, 'LICENSE'),
  css: path.join(options.source, 'css', 'jam.min.css'),
  url: 'https://jam-icons.com/',
  fonts: path.join(options.source, 'fonts'),
  svgs: path.join(options.source, 'svg'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

options.license = detectLicense(paths.license);
options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function(callback) {
  let iconsMap = getIconsMap(getIconsFromCss(paths.css, 'jam-'));
  let icons = {};
  for (let [category, names] of Object.entries(iconData)) {
    icons[category] = [];
    names.forEach(name => {
      icons[category].push({
        name: name,
        content: iconsMap[name],
        title: name
      });
    })
  }

  options.icons = icons;
  options = prepareIcons(options);
  clean(paths.dest)
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options);
  copyFonts(paths.dest, paths.fonts, options);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  copyLicense(paths.dest, path.join(options.source, 'LICENSE'));
  jsonfile(paths.dest, options);
  callback()
};
