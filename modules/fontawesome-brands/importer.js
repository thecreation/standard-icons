const generateSvg = require('../../scripts/utils/generateSvgFromJs');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const generateFontsFromSvg = require('../../scripts/utils/generateFontsFromSvg');
const getIconsFromCss3 = require('../../scripts/utils/getIconsFromCss3');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, '@fortawesome/'),
  name: 'fontawesome-brands',
  title: 'Font awesome brands',
  class: 'fa',
  prefix: 'fa-',
  author: 'Dave Gandy',
  homepage: 'https://fontawesome.com/',
  description: "The web’s most popular icon.",
  className: 'fontawesome',
  license: 'MIT',
  version: '5.5.0',
  classifiable: false
};

let paths = {
  css: path.join(options.source, 'font', 'entypo.css'),
  fonts: path.join(options.source, 'font'),
  svgs: path.join(options.source, 'free-brands-svg-icons'),
  package: path.join(options.source + 'fontawesome-common-types/', 'package.json'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, [ 'author', 'homepage', 'license', 'description' ]);

options = Object.assign(options, {
  author: info.author.name,
  homepage: info.homepage,
  license: info.license,
  description: info.description
});

function callback() {
  options.icons = getIconsFromCss3(`${__dirname}/${options.name}.css`, 'fa-');
  options = prepareIcons(options);
  generateJson(paths.dest, options.className, options);
  copyLicense(paths.dest, path.join(options.source + 'fontawesome-common-types/', 'LICENSE.txt'));
  jsonfile(paths.dest, options);
}

module.exports = function() {
  generateSvg(paths.svgs, paths.dest + '/icons');
  generateFontsFromSvg(paths.dest, options, callback);

};
