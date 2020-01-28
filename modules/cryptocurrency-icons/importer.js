const generateCss = require('../../scripts/utils/generateCss');
const generateJson = require('../../scripts/utils/generateJson');
const extraFromJson = require('../../scripts/utils/extraFromJson');
const getIconsFromCss3 = require('../../scripts/utils/getIconsFromCss3');
const prepareIcons = require('../../scripts/utils/prepareIcons');
const getSvgs = require('../../scripts/utils/getSvgs');
const getSelectedSvgs = require('../../scripts/utils/getSelectedSvgs');
const copySvgs = require('../../scripts/utils/copySvgs');
const copyLicense = require('../../scripts/utils/copyLicense');
const generateFontsFromSvg = require('../../scripts/utils/generateFontsFromSvg');
const jsonfile = require('../../scripts/utils/jsonfile');
const generateSvgs = require('../../scripts/utils/generateSvgs');
const clean = require('../../scripts/utils/clean');
const fs = require('fs-extra');
const path = require('path');

let options = {
  source: path.join(`${__dirname}/node_modules/`, 'cryptocurrency-icons'),
  author: 'atomiclabs',
  name: 'cryptocurrency-icons',
  class: 'crypto',
  prefix: 'crypto-',
  className: 'CryptocurrencyIcons',
  title: 'CryptocurrencyIcons',
  classifiable: false,
  selections: [
    'btc',
    'eth',
    // 'xrp',
    // 'bch',
    // 'bsv',
    'usdt',
    'ltc',
    // 'eos',
    'bnb',
    // 'xlm',
    // 'ada',
    // 'trx',
    // 'xmr',
    // 'etc',
    'dash',
    'ht',
    // 'xtz',
    // 'link',
    'okb',
    // 'atom',
    'neo',
    // 'miota',
    'mkr',
    'ont',
    // 'zec',
    // 'xem',
    // 'vet',
    // 'doge',
    // 'btg',
    'bat',
    // 'tusd',
    // 'qtum',
    // 'dcr',
    // 'rep',
    'brc',
    // 'zrx',
    'vsys',
    'bcd',
    // 'omg',
    // 'rvn',
    // 'kcs',
    // 'lsk',
    // 'icx',
    // 'nano',
    // 'gusd',
    'waves',
    // 'xuc',
    'btm',
    // 'zen',
    'seele',
    // 'mona',
    // 'dgb',
    'mco',
    'iost',
    // 'kmd',
    // 'enj',
    'hc',
    // 'sc',
    'wt',
    'dgd',
    'steem',
    'xvg',
    // 'bts',
    'dai',
    // 'ae',
    'knc',
    // 'rlc',
    'ardr',
    // 'xzc',
    'bhd',
    // 'etn',
    'bhp',
    'zil',
    // 'snt',
    // 'mana',
    // 'gnt',
    // 'crpt',
    // 'strat',
    // 'eng',
    'gxc',
    // 'tomo',
    'ren',
    'lamb',
    'lend',
    // 'dtr',
    // 'etp',
    'xwc',
    // 'aion',
    'lrc',
    // 'rcn',
    'ela',
    // 'wicc',
    'ekt',
    'dt',
    'true',
    // 'tnt',
    'gbyte',
    // 'nas',
    'ppt',
    // 'fct',
  ]
};

let paths = {
  package: path.join(options.source, 'package.json'),
  svgs: path.join(options.source, 'svg', 'black'),
  url: 'http://cryptoicons.co/',
  dest: __dirname,
  svgsDest: path.join(__dirname, 'icons')
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
// options.author = info.author.name;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.svgs = getSelectedSvgs(getSvgs(paths.svgs), options.selections);

module.exports = function(callback) {
  clean(paths.dest)
  copySvgs(paths.svgsDest, paths.svgs, options.svgs, '$');
  generateFontsFromSvg(paths.dest, options, () => {
    options.icons = getIconsFromCss3(`${__dirname}/${options.name}.css`, 'crypto-');
    options = prepareIcons(options);
    generateJson(paths.dest, options);
    copyLicense(paths.dest, path.join(options.source, 'LICENSE.md'));
    generateSvgs(paths.dest, options.name, options);
    jsonfile(paths.dest, options);
    callback();
  });
};
