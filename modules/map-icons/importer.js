const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const generateSvgs = require('../../scripts/utils/generateSvgs');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const getIconsFromHtml = require('../../scripts/utils/getIconsFromHtml');
const getIconsMap = require('../../scripts/utils/getIconsMap');
const getSvgs = require('../../scripts/utils/getSvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const clean = require('../../scripts/utils/clean');
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'map-icons'),
  name: 'map-icons',
  class: 'mai',
  prefix: 'mai-',
  className: 'MapIcons',
  title: 'Map Icons',
  license: 'MIT',
  classifiable: true
};

let paths = {
  package: path.join(options.source, 'package.json'),
  css: path.join(options.source, 'dist', 'css', 'map-icons.css'),
  fonts: path.join(options.source, 'dist', 'fonts'),
  svgs: path.join(options.source, 'src', 'icons'),
  html: path.join(options.source, 'index.html'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

// options.license = info.license;
options.author = info.author.name;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function(callback) {
  let iconsMap = getIconsMap(getIconsFromCss(paths.css, 'map-icon-'));
  getIconsFromHtml(paths.html, function($) {
    let icons = {};
    $('#icons').find('.block-title').each(function(i, element){
      let category = $(this).text().trim();
      icons[category] = [];
      let $icons = $(this).nextUntil('.block-title').find('.map-icon');
      $icons.each(function() {
        if($(this).hasClass('map-icon')) {
          $(this).removeClass('map-icon');
          let name = $(this).attr('class').replace('map-icon-', '');
          icons[category].push({
            name: name,
            content: iconsMap[name],
            title: name
          });
        }
      });
    });

    return icons;
  }).then(function(icons){
    options.icons = icons;
    options = prepareIcons(options);
    clean(paths.dest);
    generateCss(paths.dest, options.name, options);
    generateJson(paths.dest, options.className, options);
    copyFonts(paths.dest, paths.fonts, options);
    generateSvgs(paths.dest, options.name, options)
    copyLicense(paths.dest, path.join(options.source, 'LICENSE'));
    jsonfile(paths.dest, options);
    callback();
  });
};
