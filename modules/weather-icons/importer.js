let generateCss = require('../../scripts/utils/generateCss');
let generateJson = require('../../scripts/utils/generateJson');
let prepareIcons = require('../../scripts/utils/prepareIcons');
let extraFromJson = require('../../scripts/utils/extraFromJson');
let detectLicense = require('../../scripts/utils/detectLicense');
let getIconsFromUrl = require('../../scripts/utils/getIconsFromUrl');
let getSvgs = require('../../scripts/utils/getSvgs');
let copySvgs = require('../../scripts/utils/copySvgs');
let getFonts = require('../../scripts/utils/getFonts');
let copyFonts = require('../../scripts/utils/copyFonts');
let copyLicense = require('../../scripts/utils/copyLicense');
let fs = require('fs-extra');
let path = require('path');

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
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
// options.author = info.author;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

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
    copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  });
};