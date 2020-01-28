const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const detectLicense = require('../../scripts/utils/detectLicense');
const generateFontsFromSvg = require('../../scripts/utils/generateFontsFromSvg');
const getIconsFromCss3 = require('../../scripts/utils/getIconsFromCss3');
const getSvgs = require('../../scripts/utils/getSvgs');
const copySvgs = require('../../scripts/utils/copySvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const clean = require('../../scripts/utils/clean');
const config = require('../../config');
const fs = require('fs-extra');
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'feather-icons'),
  name: 'feather',
  title: 'Feather',
  class: 'fe',
  prefix: 'fe-',
  author: 'colebemis',
  homepage: 'https://feathericons.com/',
  description: "Simply beautiful open source icons",
  className: 'Feather',
  license: 'MIT',
  classifiable: false
};

let paths = {
  license: path.join(options.source, 'LICENSE'),
  // fonts: path.join(options.source, 'src', 'fonts'),
  svgs: path.join(options.source, 'dist', 'icons'),
  dest: __dirname,
  package: path.join(options.source, 'package.json'),
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.version = info.version;
options.svgs = getSvgs(paths.svgs);
options.license = info.license;

module.exports = function(callback) {
  clean(paths.dest)
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  generateFontsFromSvg(paths.dest, options, () => {
    options.icons = getIconsFromCss3(`${__dirname}/${options.name}.css`, 'fe-');
    options = prepareIcons(options);
    generateJson(paths.dest, options);
    copyLicense(paths.dest, path.join(options.source, 'LICENSE'));
    jsonfile(paths.dest, options);
    callback();
  });
};
