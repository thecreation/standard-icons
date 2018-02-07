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
  source: path.join(`${__dirname}/node_modules/`, 'caomei'),
  name: 'caomei-icons',
  class: 'czs',
  prefix: 'czs-',
  className: 'CaomeiIcons',
  title: 'Caomei Icons',
  author: 'xiangsudian',
  classifiable: true
};

let paths = {
  package: path.join(options.source, 'package.json'),
  css: path.join(options.source, 'style.css'),
  fonts: path.join(options.source, 'fonts'),
  url: 'http://chuangzaoshi.com/icon/',
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
options.author = info.author.name;
options.homepage = info.homepage;
// options.description = info.description;
options.version = info.version;
options.fonts = getFonts(paths.fonts);

module.exports = function() {
  let iconsMap = getIconsMap(getIconsFromCss(paths.css, 'czs-'));

  getIconsFromUrl(paths.url, function($) {
    let icons = {};
    $('.icons-list').children('.pagewidth').children('.icon-section').each(function(i, element){
      let $section = $(this);
      let category = $section.find('h4').text().trim();
      icons[category] = [];

      let $icons = $section.find('.icon-container');
      $icons.each(function() {
        let name = $(this).find('.icon-name').text().trim().replace('czs-', '');
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
    generateCss(paths.dest, options.name, options);
    generateJson(paths.dest, options.className, options);
    copyFonts(paths.dest, paths.fonts, options);
    generateSvgs(paths.dest, options.name, options);
    copyLicense(paths.dest, path.join(options.source, 'Read Me.txt'));
    jsonfile(paths.dest, options);
  });
};