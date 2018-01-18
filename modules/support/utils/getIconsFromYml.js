'use strict';

import fs    from 'graceful-fs';
import CSSOM from 'cssom';

export default function(glyphs, prefix) {
  let icons = {};
  glyphs.forEach(function(glyph) {
    let icon = {};
    if(glyph.css) {
      icon.name = glyph.css.replace(new RegExp(`^${prefix}`), '');
      icon.title = icon.name;
      icon.content = '\\' + glyph.code.toString(16);
      icons[icon.name] = icon;
    }
  });

  return icons;
}
