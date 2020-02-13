const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const generateFontsFromSvg = require('../../scripts/utils/generateFontsFromSvg');
const getSvgs = require('../../scripts/utils/getSvgs');
const getIconsFromCss3 = require('../../scripts/utils/getIconsFromCss3');
const copySvgs = require('../../scripts/utils/copySvgs');
const optimizeSvgs = require('../../scripts/utils/optimizeSvgs');
const getFonts = require('../../scripts/utils/getFonts');
const copyFonts = require('../../scripts/utils/copyFonts');
const copyLicense = require('../../scripts/utils/copyLicense');
const jsonfile = require('../../scripts/utils/jsonfile');
const clean = require('../../scripts/utils/clean');
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, '@ant-design', 'icons'),
  name: 'ant-design-fill-icons',
  class: 'adif',
  prefix: 'adif-',
  className: 'AntDesignFillIcons',
  title: 'Ant Design Fill Icons',
  author: 'Ant Design Team',
  classifiable: false
};

let paths = {
  package: path.join(options.source, 'package.json'),
  svgs: path.join(options.source, 'svg', 'fill'),
  url: 'https://ant.design/components/icon/',
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
// options.author = info.author.name;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.fonts = getFonts(paths.fonts, "ant-design-fill-icons");
options.svgs = getSvgs(paths.svgs);

module.exports = function(callback) {
  clean(paths.dest)

  copySvgs(paths.svgsDest, paths.svgs, options.svgs);
  optimizeSvgs(paths.svgsDest, options.svgs);

  generateFontsFromSvg(paths.dest, options, () => {
    options.icons = getIconsFromCss3(`${__dirname}/${options.name}.css`, 'adif-');
    options = prepareIcons(options);
    generateJson(paths.dest, options);
    // copyLicense(paths.dest, path.join(options.source, 'LICENSE.md'));
    jsonfile(paths.dest, options);
    callback();
  })
};
