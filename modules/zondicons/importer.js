const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const getIconsFromCss3 = require('../../scripts/utils/getIconsFromCss3');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const getSvgs = require('../../scripts/utils/getSvgs');
const copySvgs = require('../../scripts/utils/copySvgs');
const copyLicense = require('../../scripts/utils/copyLicense');
const generateFontsFromSvg = require('../../scripts/utils/generateFontsFromSvg');
const jsonfile = require('../../scripts/utils/jsonfile');
const config = require('../../config');
const fs = require('fs-extra');
const path = require('path');

let options = {
  source: path.join(config.sets.customs, 'zondicons'),
  name: 'zondicons',
  class: 'zondicons',
  prefix: 'zondicons-',
  className: 'Zondicons',
  title: 'Zondicons',
  author: 'Steve Schoger',
  homepage: 'http://www.zondicons.com/',
  description: 'A set of free premium SVG icons for you to use on your digital products.',
  classifiable: false
};

let paths = {
  svgs: path.join(options.source, 'zondicons'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

options.svgs = getSvgs(paths.svgs);

function callback() {
  options.icons = getIconsFromCss3(`${__dirname}/${options.name}.css`, 'zondicons-');
  options = prepareIcons(options);
  generateJson(paths.dest, options.className, options);
}

module.exports = function() {
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  generateFontsFromSvg(paths.dest, options, callback);
  jsonfile(paths.dest, options);
};