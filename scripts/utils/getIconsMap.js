'use strict';

module.exports = function(icons) {
  let map = {};

  for(let i in icons) {
    map[icons[i].name] = icons[i].content;
  }

  return map;
}
