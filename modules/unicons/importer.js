const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromYml');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsMap = require('../../scripts/utils/getIconsMap');
const generateFontsFromSvg = require('../../scripts/utils/generateFontsFromSvg');
const getIconsFromCss3 = require('../../scripts/utils/getIconsFromCss3');
const optimizeSvgs = require('../../scripts/utils/optimizeSvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const getSvgs = require('../../scripts/utils/getSvgs');
const copySvgs = require('../../scripts/utils/copySvgs');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const clean = require('../../scripts/utils/clean');
const path = require('path');;

let options = {
  source: path.join(`${__dirname}/node_modules/`, '@iconscout', 'unicons'),
  name: 'unicons',
  class: 'uil',
  prefix: 'uil-',
  className: 'Unicons',
  title: 'Unicons',
  description: "1000+ Pixel-perfect vector icons and Iconfont for your next project.",
  homepage: 'https://iconscout.com/unicons',
  classifiable: false
};

let paths = {
  package: path.join(options.source, 'package.json'),
  css: path.join(options.source, 'css', 'unicons.css'),
  license: path.join(options.source, 'LICENSE'),
  fonts: path.join(options.source, 'fonts'),
  svgs: path.join(options.source, 'svg', 'line'),
  url: 'https://iconscout.com/unicons',
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
  clean(paths.dest);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  optimizeSvgs(paths.svgsDest, options.svgs);
  generateFontsFromSvg(paths.dest, options, () => {
    // options.icons = getIconsFromCss3(`${__dirname}/${options.name}.css`, 'uil-');
    // options = prepareIcons(options);
    // generateJson(paths.dest, options);
    // copyLicense(paths.dest, path.join(options.source, 'LICENSE'));
    // jsonfile(paths.dest, options);
    // callback();
  })
};
