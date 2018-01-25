const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsFromUrl = require('../../scripts/utils/getIconsFromUrl');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const generateSvgs = require('../../scripts/utils/generateSvgs');
const fs = require('fs-extra');
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'weather-icons'),
  name: 'weather-icons',
  class: 'wi',
  prefix: 'wi-',
  className: 'WeatherIcons',
  title: 'Weather icons',
  author: 'Erik Flowers',
  classifiable: true
};

let paths = {
  package: path.join(options.source, 'package.json'),
  css: path.join(options.source, 'css', 'weather-icons.css'),
  fonts: path.join(options.source, 'font'),
  svgs: path.join(options.source, 'font'),
  url: 'https://erikflowers.github.io/weather-icons/',
  dest: __dirname
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
// options.author = info.author;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.fonts = getFonts(paths.fonts);

module.exports = function() {
  getIconsFromUrl(paths.url, function($) {
    let icons = {};

    $('.icon-set').each(function(i, element){
      let $section = $(this);
      let category = $section.find('.section-title').text().trim();
      if(category !== 'Wind Cardinal Examples' && category !== 'Wind Degree Examples') {
        icons[category] = [];

        let $icons = $section.find('.icon-wrap');

        $icons.each(function() {
          let $icon = $(this);
          let name = $(this).find('.icon-name').text().replace('wi-', '');
          icons[category].push({
            name: name,
            content: '\\' + $(this).find('.icon_unicode').text().trim(),
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
  });
};