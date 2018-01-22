let generateCss = require('../../scripts/utils/generateCss');
let generateJson = require('../../scripts/utils/generateJson');
let prepareIcons = require('../../scripts/utils/prepareIcons');
let extraFromJson = require('../../scripts/utils/extraFromJson');
let detectLicense = require('../../scripts/utils/detectLicense');
let getIconsMap = require('../../scripts/utils/getIconsMap');
let getIconsFromUrl = require('../../scripts/utils/getIconsFromUrl');
let getSvgs = require('../../scripts/utils/getSvgs');
let copySvgs = require('../../scripts/utils/copySvgs');
let getFonts = require('../../scripts/utils/getFonts');
let copyFonts = require('../../scripts/utils/copyFonts');
let copyLicense = require('../../scripts/utils/copyLicense');
let fs = require('fs-extra');
let path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'material-design-iconic-font'),
  name: 'material-icons',
  class: 'zmdi',
  prefix: 'zmdi-',
  className: 'MaterialIcons',
  title: 'Material Design Iconic',
  author: 'Sergey Kupletsky',
  classifiable: true
};

let paths = {
  package: path.join(options.source, 'package.json'),
  css: path.join(options.source, 'dist', 'css', 'material-design-iconic-font.css'),
  fonts: path.join(options.source, 'dist', 'fonts'),
  svgs: path.join(options.source, 'svg', '2.2'),
  url: 'https://zavoloklom.github.io/material-design-iconic-font/icons.html',
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
    $('[role="main"]').children('section.icon-set').each(function(i, element){
      let $section = $(this);
      if($section.attr('id') !== 'new') {
        let category = $section.find('h2').text().trim();
        icons[category] = [];

        let $icons = $section.find('.icon');
        $icons.each(function() {
          let $icon = $(this);
          icons[category].push({
            name: $icon.attr('data-name'),
            content: '\\' + $icon.attr('data-code'),
            title: $icon.attr('data-name')
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
    copyLicense(paths.dest, path.join(options.source, 'License.md'));
  });
};