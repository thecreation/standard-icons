let generateCss = require('../../scripts/utils/generateCss');
let generateJson = require('../../scripts/utils/generateJson');
let prepareIcons = require('../../scripts/utils/prepareIcons');
let extraFromJson = require('../../scripts/utils/extraFromJson');
let detectLicense = require('../../scripts/utils/detectLicense');
let getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
let getIconsFromHtml = require('../../scripts/utils/getIconsFromHtml');
let getIconsMap = require('../../scripts/utils/getIconsMap');
let getSvgs = require('../../scripts/utils/getSvgs');
let copySvgs = require('../../scripts/utils/copySvgs');
let getFonts = require('../../scripts/utils/getFonts');
let copyFonts = require('../../scripts/utils/copyFonts');
let copyLicense = require('../../scripts/utils/copyLicense');
let fs = require('fs-extra');
let path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'map-icons'),
  name: 'map-icons',
  class: 'map-icon',
  prefix: 'map-icon-',
  className: 'MapIcons',
  title: 'Map Icons',
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

options.license = info.license;
options.author = info.author;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function() {
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
    generateCss(paths.dest, options.name, options);
    generateJson(paths.dest, options.className, options);
    copyFonts(paths.dest, paths.fonts, options.fonts);
    copySvgs(paths.svgsDest, paths.svgs, options.svgs);
    copyLicense(paths.dest, path.join(options.source, 'LICENSE'));
  });
};