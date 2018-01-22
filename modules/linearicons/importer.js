let generateCss = require('../../scripts/utils/generateCss');
let generateJson = require('../../scripts/utils/generateJson');
let prepareIcons = require('../../scripts/utils/prepareIcons');
let extraFromJson = require('../../scripts/utils/extraFromJson');
let detectLicense = require('../../scripts/utils/detectLicense');
let getIconsFromCss = require('../../scripts/utils/getIconsFromCss');
let getSvgs = require('../../scripts/utils/getSvgs');
let copySvgs = require('../../scripts/utils/copySvgs');
let getFonts = require('../../scripts/utils/getFonts');
let copyFonts = require('../../scripts/utils/copyFonts');
let copyLicense = require('../../scripts/utils/copyLicense');
let fs = require('fs-extra');
let path = require('path');

let options = {
    source: path.join(`${__dirname}/node_modules/`, 'linearicons'),
    name: 'linearicons',
    class: 'lnr',
    prefix: 'lnr-',
    className: 'Linearicons',
    title: 'Linearicons free',
    author: 'Perxis',
    classifiable: false
};

let paths = {
    package: path.join(options.source, 'package.json'),
    css: path.join(options.source, 'dist', 'web-font', 'style.css'),
    fonts: path.join(options.source, 'dist',  'web-font', 'fonts'),
    svgs: path.join(options.source, 'dist',  'svg'),
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
  options.icons = getIconsFromCss(paths.css, 'lnr-');
  options = prepareIcons(options);
  generateCss(paths.dest, options.name, options);
  generateJson(paths.dest, options.className, options);
  copyFonts(paths.dest, paths.fonts, options.fonts);
  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  copyLicense(paths.dest, path.join(options.source, 'LICENSE'));
};