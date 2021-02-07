const generateSvgFromJs = require('../../scripts/utils/generateSvgFromJs');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const generateFontsFromSvg = require('../../scripts/utils/generateFontsFromSvg');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const clean = require('../../scripts/utils/clean');
const path = require('path');
const getFonts = require('../../scripts/utils/getFonts');
const getSvgs = require('../../scripts/utils/getSvgs');
const generateCss = require('../../scripts/utils/generateCss');
const copyFonts = require('../../scripts/utils/copyFonts');
const copySvgs = require('../../scripts/utils/copySvgs');
const optimizeSvgs = require('../../scripts/utils/optimizeSvgs');
const getIconsMap = require('../../scripts/utils/getIconsMap');
const getIconsFromUrl = require('../../scripts/utils/getIconsFromUrl');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'line-awesome'),
  name: 'line-awesome',
  title: 'Line Awesome',
  description: 'Swap Font Awesome for modern line icons in one line of code.',
  class: 'las',
  prefix: 'las-',
  className: 'LineAwesome',
  author: 'Icons8',
  homepage: 'https://icons8.com/line-awesome',
  classifiable: true
};

let paths = {
  svgs: path.join(options.source, 'svg'),
  css: path.join(options.source, 'dist', 'line-awesome', 'css', 'line-awesome.css'),
  fonts: path.join(options.source, 'dist', 'line-awesome', 'fonts'),
  package: path.join(options.source, 'package.json'),
  url: 'https://icons8.com/line-awesome',
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, [ 'author', 'license', 'version' ]);

options = Object.assign(options, {
  license: info.license,
  // author: info.author,
  // description: info.description,
  version: info.version
});

options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function(callback) {
  let iconsMap = getIconsMap(getIconsFromCss(paths.css, 'la-'));

  getIconsFromUrl(paths.url, function($) {
    let icons = {};
    $('.icons-group').each(function(i, element){
      let category = $(this).find('h2').text().trim();
      console.info(category);
      icons[category] = [];

      let $icons;
      $icons = $(this).find('.icon-info');

      $icons.each(function() {
        let name = $(this).find('.name').text().trim();

        icons[category].push({
          name: name,
          content: iconsMap[name],
          title: name
        });
      });
    });

    return icons;
  }).then(function(icons){
    options.icons = icons;
    options = prepareIcons(options);
    clean(paths.dest)
    generateCss(paths.dest, options.name, options);
    generateJson(paths.dest, options);
    copyFonts(paths.dest, paths.fonts, options);
    options.svgs = copySvgs(paths.svgsDest, paths.svgs, options.svgs);
    optimizeSvgs(paths.svgsDest, options.svgs);
    copyLicense(paths.dest, path.join(options.source, 'LICENSE.md'));
    jsonfile(paths.dest, options);
    callback()
  });


};
