let generateCss = require('../../scripts/utils/generateCss');
let generateJson = require('../../scripts/utils/generateJson');
let prepareIcons = require('../../scripts/utils/prepareIcons');
let extraFromJson = require('../../scripts/utils/extraFromJson');
let detectLicense = require('../../scripts/utils/detectLicense');
let getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
let getIconsFromUrl = require('../../scripts/utils/getIconsFromUrl');
let getIconsMap = require('../../scripts/utils/getIconsMap');
let getSvgs = require('../../scripts/utils/getSvgs');
let copySvgs = require('../../scripts/utils/copySvgs');
let getFonts = require('../../scripts/utils/getFonts');
let copyFonts = require('../../scripts/utils/copyFonts');
let copyLicense = require('../../scripts/utils/copyLicense');
let fs = require('fs-extra');
let path = require('path');

let options = {
  source: path.join(`${__dirname}/custom_packages/`, 'themify-icons'),
  name: 'themify-icons',
  class: 'ti',
  prefix: 'ti-',
  className: 'ThemifyIcons',
  title: 'Themify icons',
  author: 'Themify',
  version: '1.0.1',
  homepage: 'http://themify.me/themify-icons',
  classifiable: true
};

let paths = {
  css: path.join(options.source, 'themify-icons.css'),
  fonts: path.join(options.source, 'fonts'),
  svgs: path.join(options.source, 'SVG'),
  license: path.join(options.source, 'readme.txt'),
  url: 'http://themify.me/themify-icons',
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

options.license = detectLicense(paths.license);
options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function() {
  let iconsMap = getIconsMap(getIconsFromCss(paths.css, 'ti-'));
  getIconsFromUrl(paths.url, function($) {
    let icons = {};
    $('.icons-list').find('.icon-section').each(function(i, element){
      let $section = $(this);
      let category = $section.find('h3').text().trim();
      icons[category] = [];
      let $icons = $section.find('.icon-name');
      $icons.each(function() {
        let name = $(this).text().trim().replace('ti-', '');
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
    copySvgs(paths.svgsDest, paths.svgs, options.svgs);
    copyLicense(paths.dest, path.join(options.source, 'readme.txt'));
  });
};
