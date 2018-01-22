let generateCss = require('../../scripts/utils/generateCss');
let generateJson = require('../../scripts/utils/generateJson');
let prepareIcons = require('../../scripts/utils/prepareIcons');
let extraFromJson = require('../../scripts/utils/extraFromJson');
let detectLicense = require('../../scripts/utils/detectLicense');
let getIconsMap = require('../../scripts/utils/getIconsMap');
let getIconsFromUrl = require('../../scripts/utils/getIconsFromUrl');
let getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
let getFonts = require('../../scripts/utils/getFonts');
let copyFonts = require('../../scripts/utils/copyFonts');
let copyLicense = require('../../scripts/utils/copyLicense');
let generateSvgs = require('../../scripts/utils/generateSvgs');
let fs = require('fs-extra');
let path = require('path');


let options = {
  source: path.join(`${__dirname}/node_modules/`, 'font-awesome'),
  name: 'font-awesome',
  class: 'fa',
  prefix: 'fa-',
  className: 'FontAwesome',
  title: 'Font Awesome',
  classifiable: true
};

let paths = {
  package: path.join(options.source, 'package.json'),
  css: path.join(options.source, 'css', 'font-awesome.css'),
  fonts: path.join(options.source, 'fonts'),
  url: 'http://fontawesome.io/icons/',
  dest: __dirname
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
options.author = info.author.name;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
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

        let $icons = $section.find('.fa');
        $icons.each(function() {
          $(this).removeClass('fa');
          let name = $(this).attr('class').replace('fa-', '');
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
console.info(options.icons);
  //  generateSvgs(paths.dest, options.name, options);
  });
};