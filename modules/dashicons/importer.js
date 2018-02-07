const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsFromUrl = require('../../scripts/utils/getIconsFromUrl');
const getSvgs = require('../../scripts/utils/getSvgs');
const copySvgs = require('../../scripts/utils/copySvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const fs = require('fs-extra');
const config = require('../../config');
const path = require('path');

let options = {
  source: path.join(config.sets.customs, 'dashicons'),
  name: 'dashicons',
  class: 'dashicons',
  prefix: 'dashicons-',
  className: 'Dashicons',
  title: 'Dashicons',
  author: 'Wordpress',
  homepage: 'http://developer.wordpress.org/resource/dashicons/',
  version: '',
  classifiable: true
};

let paths = {
  package: path.join(options.source, 'package.json'),
  license: path.join(options.source, 'README.md'),
  css: path.join(options.source, 'icon-font', 'css', 'dashicons.css'),
  url: 'https://developer.wordpress.org/resource/dashicons/',
  fonts: path.join(options.source, 'icon-font', 'fonts'),
  svgs: path.join(options.source, 'svg-min'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

options =  Object.assign(options, extraFromJson(paths.package, ['homepage']));
options.license = detectLicense(paths.license);
options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function() {
  getIconsFromUrl(paths.url, function($) {
    let icons = {};
    $('#iconlist').find('h4').each(function(i, element){
      let category = $(this).text().trim();
      icons[category] = [];
      let $icons = $(this).nextUntil('h4');
      $icons.each(function() {
        if($(this).hasClass('dashicons')) {
          $(this).removeClass('dashicons');
          icons[category].push({
            name: $(this).attr('class').replace('dashicons-', ''),
            content: '\\' + $(this).attr('alt'),
            title: $(this).text().trim()
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
    copyFonts(paths.dest, paths.fonts, options);
    copySvgs(paths.svgsDest, paths.svgs, options.svgs);
    copyLicense(paths.dest, path.join(options.source, 'gpl.txt'));
    jsonfile(paths.dest, options);
  });
};
