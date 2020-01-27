'use strict';

let path = require('path');

module.exports = function(svgs, selections) {
  let files = svgs.filter(svg => selections.includes(path.basename(svg, '.svg')));

  return files;
}
