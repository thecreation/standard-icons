const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const getIconsMap = require('../../scripts/utils/getIconsMap');
const getSvgs = require('../../scripts/utils/getSvgs');
const copySvgs = require('../../scripts/utils/copySvgs');
const optimizeSvgs = require('../../scripts/utils/optimizeSvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const generateFontsFromSvg = require('../../scripts/utils/generateFontsFromSvg');
const generateSvgs2 = require('../../scripts/utils/generateSvgs2');
const clean = require('../../scripts/utils/clean');
const fs = require('fs-extra');
const config = require('../../config');
const path = require('path');
const { readdirSync } = require('fs')

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'remixicon'),
  name: 'remixicon-fill',
  class: 'rif',
  prefix: 'rif-',
  className: 'RemixiconFill',
  title: 'Remixicon Fill',
  author: 'Remix Design',
  homepage: 'https://remixicon.com/',
  classifiable: true
};

let paths = {
  package: path.join(options.source, 'package.json'),
  license: path.join(options.source, 'License'),
  css: path.join(options.source, 'fonts', 'remixicon.css'),
  url: 'https://remixicon.com/',
  fonts: path.join(options.source, 'fonts'),
  svgs: path.join(options.source, 'icons'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

options =  Object.assign(options, extraFromJson(paths.package, ['homepage', 'version', 'description', 'license']));
options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs, '**/*-fill.svg');

module.exports = function(callback) {
  let categories = getDirectories(paths.svgs)
  let iconsMap = getIconsMap(getIconsFromCss(paths.css, 'ri-'));
  let icons = {};

  categories.forEach(category => {
    icons[category] = [];
    let svgs = getSvgs(path.join(paths.svgs, category), '*-fill.svg').map(svg => svg.replace(/\.svg$/, ''));

    svgs.sort((a, b) => {
      a = a.replace(/-fill/, '');
      b = b.replace(/-fill/, '');
      if (b.startsWith(a)) {
        return -1;
      }
      if (a.startsWith(b)) {
        return 1;
      }
      if (b > a) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }).forEach(svg => {
      icons[category].push({
        name: svg.replace(/-fill/, ''),
        content: iconsMap[svg],
        title: svg.replace(/-fill/, '')
      });
    })
  })

  clean(paths.dest)
  options.svgs = copySvgs(paths.svgsDest, paths.svgs, options.svgs, '-fill')
  optimizeSvgs(paths.svgsDest, options.svgs);

  generateFontsFromSvg(paths.dest, options, () => {
    options.icons = icons;
    options = prepareIcons(options);
    generateJson(paths.dest, options);
    copyLicense(paths.dest, paths.license);
    jsonfile(paths.dest, options);
    callback()
  });
};
