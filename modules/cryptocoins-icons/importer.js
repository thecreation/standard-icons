const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const getIconsFromCss3 = require('../../scripts/utils/getIconsFromCss3');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const getSvgs = require('../../scripts/utils/getSvgs');
const copySvgs = require('../../scripts/utils/copySvgs');
const optimizeSvgs = require('../../scripts/utils/optimizeSvgs');
const copyLicense = require('../../scripts/utils/copyLicense');
const generateFontsFromSvg = require('../../scripts/utils/generateFontsFromSvg');
const jsonfile = require('../../scripts/utils/jsonfile');
const clean = require('../../scripts/utils/clean');
const fs = require('fs-extra');
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'cryptocoins-icons'),
  author: 'Martin Allien',
  name: 'cryptocoins-icons',
  class: 'cci',
  prefix: 'cci-',
  className: 'CryptocoinsIcons',
  title: 'Cryptocoins Icons',
  classifiable: false
};

let paths = {
  package: path.join(options.source, 'package.json'),
  svgs: path.join(options.source, 'SVG'),
  url: 'https://github.com/AllienWorks/cryptocoins',
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
options.author = info.author.name;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.svgs = getSvgs(paths.svgs);

module.exports = function(callback) {
  clean(paths.dest)
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  optimizeSvgs(paths.svgsDest, options.svgs);
  generateFontsFromSvg(paths.dest, options, () => {
    options.icons = getIconsFromCss3(`${__dirname}/${options.name}.css`, 'cci-');
    options = prepareIcons(options);
    generateJson(paths.dest, options);
    copyLicense(paths.dest, path.join(options.source, 'LICENCE'));
    jsonfile(paths.dest, options);
    callback();
  });
};
