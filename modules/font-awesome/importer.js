const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsMap = require('../../scripts/utils/getIconsMap');
const getIconsFromUrl = require('../../scripts/utils/getIconsFromUrl');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const generateSvgs = require('../../scripts/utils/generateSvgs');
const jsonfile = require('../../scripts/utils/jsonfile');
const fs = require('fs-extra');
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'font-awesome'),
  name: 'font-awesome',
  class: 'fa',
  prefix: 'fa-',
  className: 'FontAwesome',
  title: 'Font Awesome',
  version: '4.7.3',
  classifiable: true,
  isFontawesome: true
};

let paths = {
  package: path.join(options.source, 'package.json'),
  css: path.join(options.source, 'css', 'font-awesome.css'),
  fonts: path.join(options.source, 'fonts'),
  url: 'https://fontawesome.com/v4.7.0/icons/',
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
options.author = info.author.name;
options.homepage = info.homepage;
options.description = info.description;
// options.version = info.version;
options.fonts = getFonts(paths.fonts);

module.exports = function() {
  let iconsMap = getIconsMap(getIconsFromCss(paths.css, 'fa-'));

  getIconsFromUrl(paths.url, function($) {
    let icons = {};
    $('#icons').find('section').each(function(i, element){
      let $section = $(this);
      if($section.attr('id') !== 'new') {
        let category = $section.find('h2').text().trim();
        icons[category] = [];

        let $icons = $section.find('.fa-hover');
        $icons.each(function() {
          let $icon = $(this).find('.fa');
          $icon.removeClass('fa');
          let name = $icon.attr('class').replace('fa-', '');

          icons[category].push({
            name: name,
            content: iconsMap[name],
            title: name
          });
        });
      }
    });

    return icons;
  }).then(function(icons){
    options.icons = icons;
    options = prepareIcons(options);
    generateCss(paths.dest, options.name, options);
    generateJson(paths.dest, options.className, options);
    copyFonts(paths.dest, paths.fonts, options);
    generateSvgs(paths.dest, options.name, options);
    jsonfile(paths.dest, options);
  });
};