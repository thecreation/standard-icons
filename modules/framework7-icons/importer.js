let generateCss = require('../../scripts/utils/generateCss');
let generateJson = require('../../scripts/utils/generateJson');
let prepareIcons = require('../../scripts/utils/prepareIcons');
let extraFromJson = require('../../scripts/utils/extraFromJson');
let detectLicense = require('../../scripts/utils/detectLicense');
let getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
let getIconsFromHtml = require('../../scripts/utils/getIconsFromHtml');
let getSvgs = require('../../scripts/utils/getSvgs');
let copySvgs = require('../../scripts/utils/copySvgs');
let getFonts = require('../../scripts/utils/getFonts');
let copyFonts = require('../../scripts/utils/copyFonts');
let copyLicense = require('../../scripts/utils/copyLicense');
let fs = require('fs-extra');
let path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'framework7-icons'),
  name: 'framework7-icons',
  class: 'f7',
  prefix: 'f7-',
  className: 'Framework7Icons',
  title: 'Framework7 Icons',
  classifiable: false
};

let paths = {
  package: path.join(options.source, 'package.json'),
  css: path.join(options.source, 'css', 'framework7-icons.css'),
  fonts: path.join(options.source, 'fonts'),
  svgs: path.join(options.source, 'fonts'),
  html: path.join(options.source, 'cheatsheet.html'),
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
options.author = info.author;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.fonts = getFonts(paths.fonts);
options.svgs = getSvgs(paths.svgs);

module.exports = function() {
  getIconsFromHtml(paths.html, function($) {
    let icons = [];
    
    let $icons = $('.content .icons .f7-icons');
    $icons.each(function() {
      let name = $(this).text();
      icons.push({
        name: name,
        content: name,
        title: name
      });
    });
      
    return icons;
  }).then(function(icons){
    options.icons = icons;
    options = prepareIcons(options);
    generateCss(paths.dest, options.name, options);
    generateJson(paths.dest, options.className, options);
    copyFonts(paths.dest, paths.fonts, options.fonts);
    copySvgs(paths.svgsDest, paths.svgs, options.svgs);
    copyLicense(paths.dest, path.join(options.source, 'LICENSE'));
  });
};
