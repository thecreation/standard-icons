import generateCss from '../../scripts/utils/generateCss';
import prepareIcons from '../../scripts/utils/prepareIcons';
import extraFromJson from '../../scripts/utils/extraFromJson';
import detectLicense from '../../scripts/utils/detectLicense';
import getIconsMap from '../../scripts/utils/getIconsMap';
import getIconsFromUrl from '../../scripts/utils/getIconsFromUrl';
import getIconsFromCss from '../../scripts/utils/getIconsFromCss';
import getFonts from '../../scripts/utils/getFonts';
import copyFonts from '../../scripts/utils/copyFonts';
import copyLicense from '../../scripts/utils/copyLicense';
import fs from 'fs-extra';
import path from 'path';


let options = {
  source: path.join('./node_modules/', 'font-awesome'),
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
  dest: './'
};

let info = extraFromJson(paths.package, ['homepage', 'description', 'version', 'author', 'license']);

options.license = info.license;
options.author = info.author.name;
options.homepage = info.homepage;
options.description = info.description;
options.version = info.version;
options.fonts = getFonts(paths.fonts);

const import = () => {
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
    copyFonts(paths.dest, paths.fonts, options.fonts);
  });
};