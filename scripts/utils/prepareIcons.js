'use strict';

module.exports = function(data) {
  if(data.classifiable) {
    let categories = {};
    let icons = {};

    for(var i in data.icons) {
      if (data.icons.hasOwnProperty(i)) {
        categories[i] = [];
        for(var j in data.icons[i]) {
          if (data.icons[i].hasOwnProperty(j)) {
            icons[data.icons[i][j].name] = data.icons[i][j];
            categories[i].push(data.icons[i][j].name);
          }
        }
      }
    }

    data.icons = icons;
    data.categories = categories;
  }

  data.count = Object.keys(data.icons).length;
  return data;
}
