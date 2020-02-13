const generateSvgFromJs = require('../../scripts/utils/generateSvgFromJs');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const generateFontsFromSvg = require('../../scripts/utils/generateFontsFromSvg');
const getIconsFromCss3 = require('../../scripts/utils/getIconsFromCss3');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const clean = require('../../scripts/utils/clean');
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, '@fortawesome/'),
  name: 'fontawesome-brands',
  title: 'Font Awesome Brands',
  class: 'fab',
  prefix: 'fab-',
  homepage: 'https://fontawesome.com/',
  className: 'FontawesomeBrands',
  classifiable: false
};

let paths = {
  svgs: path.join(options.source, 'free-brands-svg-icons'),
  package: path.join(options.source + 'free-brands-svg-icons', 'package.json'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, [ 'author', 'homepage', 'license', 'description', 'version' ]);

options = Object.assign(options, {
  author: info.author.name,
  homepage: info.homepage,
  license: info.license,
  description: info.description,
  version: info.version
});

module.exports = function(callback) {
  clean(paths.dest)
  generateSvgFromJs(paths.svgs, paths.svgsDest);
  generateFontsFromSvg(paths.dest, options, () => {
    options.icons = getIconsFromCss3(`${__dirname}/${options.name}.css`, 'fab-');
    options = prepareIcons(options);
    generateJson(paths.dest, options);
    copyLicense(paths.dest, path.join(options.source + 'fontawesome-common-types/', 'LICENSE.txt'));
    jsonfile(paths.dest, options);
    callback()
  });
};
