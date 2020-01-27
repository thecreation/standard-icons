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
const clean = require('../../scripts/utils/clean');
const config = require('../../config');
const fs = require('fs-extra');
const path = require('path');

let options = {
  source: path.join(config.sets.customs, 'caomei'),
  name: 'caomei-icons',
  class: 'czs',
  prefix: 'czs-',
  className: 'CaomeiIcons',
  description: 'A Free And Open Iconic Font Library for Developer and Creator',
  title: 'Caomei Icons',
  author: '像素君',
  homepage: 'http://chuangzaoshi.com/icon/',
  license: 'SIL OFL 1.1',
  version: '2.0.0',
  classifiable: true
};

let paths = {
  package: path.join(options.source, 'selection.json'),
  css: path.join(options.source, 'style.css'),
  fonts: path.join(options.source, 'fonts'),
  url: 'http://chuangzaoshi.com/icon/',
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

options.fonts = getFonts(paths.fonts);

module.exports = function(callback) {
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
    clean(paths.dest)
    generateCss(paths.dest, options.name, options);
    generateJson(paths.dest, options.className, options);
    copyFonts(paths.dest, paths.fonts, options);
    generateSvgs(paths.dest, options.name, options);
    copyLicense(paths.dest, path.join(options.source, 'Read Me.txt'));
    jsonfile(paths.dest, options);
    callback()
  });
};
