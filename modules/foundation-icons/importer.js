const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromYml');
const detectLicense = require('../../scripts/utils/detectLicense');
const getIconsMap = require('../../scripts/utils/getIconsMap');
const getIconsFromUrl = require('../../scripts/utils/getIconsFromUrl');
const getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const getSvgs = require('../../scripts/utils/getSvgs');
const copySvgs = require('../../scripts/utils/copySvgs');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const fs = require('fs-extra');
const path = require('path');;

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'foundation-icon-fonts'),
  name: 'foundation-icons',
  class: 'fi',
  prefix: 'fi-',
  className: 'FoundationIcons',
  title: 'Foundation Icons',
  homepage: 'http://zurb.com/playground/foundation-icon-fonts-3',
  author: 'ZURB',
  classifiable: true
};

let paths = {
  bower: path.join(options.source, 'bower.json'),
  css: path.join(options.source, 'foundation-icons.css'),
  license: path.join(options.source, 'foundation-icons.css'),
  fonts: path.join(options.source),
  svgs: path.join(options.source, 'svgs'),
  url: 'http://zurb.com/playground/foundation-icon-fonts-3',
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

options =  Object.assign(options, extraFromJson(paths.bower, ['version']));

options.license = detectLicense(paths.license);
options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function() {
  let iconsMap = getIconsMap(getIconsFromCss(paths.css, 'fi-'));
  getIconsFromUrl(paths.url, function($) {
    let icons = {};
    $('.interchange-body .large-12').find('h2').each(function(i, element){
      let category = $(this).text().trim();
      icons[category] = [];

      let $icons;
      if(category === 'General Icons') {
        $icons = $(this).parent().nextUntil('h2').find('li p i');
      } else {
        $icons = $(this).nextUntil('h2').find('li p i');
      }

      $icons.each(function() {
        let name = $(this).attr('class').replace('fi-', '');
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
    copySvgs(paths.svgsDest, paths.svgs, options.svgs, function(name) {
      return path.basename(name).replace('fi-', '');
    });
    jsonfile(paths.dest, options);
  });
};
