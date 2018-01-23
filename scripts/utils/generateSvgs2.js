/* Credit to https://github.com/encharm/Font-Awesome-SVG-PNG MIT */

'use strict';

let Promise = require("bluebird");
let indexBy = require('lodash.indexby');
let readFile = Promise.promisify(require("fs").readFile);
let parseXml = Promise.promisify(require("xml2js").parseString);
let fs = require('graceful-fs');
let mkdirp = require("mkdirp");
let SVGO = require('svgo');
let pathModule = require('path');
let extend = require('extend');

// getGlyphs
function getFontData(file) {
  let SVG_FILE = require.resolve(file);
  return readFile(SVG_FILE)
    .then(function(fontData) {
      return fontData.toString("utf-8");
    })
    .then(parseXml)
    .then(function(parsedXml) {
      return parsedXml.svg.defs[0].font[0].glyph;
    })
    .map(function(xmlGlyph) {
      if (xmlGlyph.$.unicode) {
        return {
          data: xmlGlyph.$,
          content: xmlGlyph.$.unicode.charCodeAt(0)
        };
      }
    })
    .then(function(fontData) {
      return indexBy(fontData, "content");
    });
}

function getGlyphs(cssFile, file) {
  return Promise.all([getIconsFromCss(cssFile, 'fa-'), getFontData(file)]).spread(function(icons, fontData) {
    return icons.map(function(icon) {
      return {
        name: icon.name,
        content: icon.content,
        title: icon.title,
        data: fontData[icon.content].data
      }
    })
  });
}

// generateSvg
var PIXEL = 128;

function optionsForSize(pixelWidth, pixelHeight, width, height, addPadding) {
  var horizontalPadding = 0;
  var verticalPadding = 0;

  if(addPadding && width && height) {
    var vPad = parseInt(height / pixelHeight)*pixelHeight;
    var scaledHeight = (height / vPad)*pixelHeight;
    
    verticalPadding = scaledHeight - pixelHeight;
    if(verticalPadding > 2) {
      verticalPadding = 0;
    }
  }
  
  let paddingTop = (parseInt(verticalPadding / 2)) * PIXEL;
  let paddingBottom = verticalPadding*PIXEL - paddingTop;
      
  let paddingLeft = 0;
  let paddingRight = 0;

  if(pixelWidth === pixelHeight) {
    paddingLeft = paddingTop;
    paddingRight = paddingBottom;
  }
  
  return {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight
  };
}

function getIconSvg(params, size) {
  let {path, color, advWidth} = params;
  const PIXEL_WIDTH = advWidth > 2048 ? 18 : (advWidth > 1792 ? 16 : 14);
  const PIXEL_HEIGHT = 14;
  
  const BASE_WIDTH = PIXEL_WIDTH * PIXEL;
  const BASE_HEIGHT = PIXEL_HEIGHT * PIXEL;
  
  var options = optionsForSize(PIXEL_WIDTH, PIXEL_HEIGHT, 
    parseInt((BASE_WIDTH / BASE_HEIGHT) * size), size,
    params.addPadding);

  let {paddingLeft, paddingTop, paddingRight, paddingBottom} = options;  
  let shiftX = -(-(BASE_WIDTH - advWidth)/2 - paddingLeft);
  let shiftY = -(-2*PIXEL - paddingTop);  
  let width = BASE_WIDTH + paddingLeft + paddingRight;
  let height = BASE_HEIGHT + paddingBottom + paddingTop;
  
  const result =
`<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(${shiftX} ${shiftY})">
  <g transform="scale(1 -1) translate(0 -1280)">
  <path d="${path}" fill="${color}" />
  </g></g>
</svg>`;
  
  return result;
}

let svgo = new SVGO({
  removeViewBox: true
});

function generateSvg(params) {
  let name = params.name;
  let svgFolder = pathModule.join(params.destFolder, 'svg');
  mkdirp.sync(svgFolder);

  return new Promise(function(resolve, reject) {
    let outSvg = fs.createWriteStream(pathModule.join(svgFolder, name + '.svg'));
    svgo.optimize(getIconSvg(params), function(result) {
      outSvg.write('<?xml version="1.0" encoding="utf-8"?>' +'\n'); 
      outSvg.end(result.data);
      resolve();
    });
  });
}


// generateSvgs
function flatten(arr) {
  return arr.reduce(function(a, b) {
    return a.concat(b);
  }, []);
}

module.exports = function(cssFile, file, folder, callback) {
  return getGlyphs(cssFile, file).then(function (glyphs) {
    let work = [];

    let iconConfigs = flatten(glyphs.map(function (glyph) {
      return extend(true, {}, {
        name: glyph.name,
        advWidth: glyph.data['horiz-adv-x'] || 1536,
        path: glyph.data.d,
        destFolder: folder
      });
    }));

    work.push(Promise.map(iconConfigs, generateSvg, {concurrency: 1}).then(function(done) {
      console.log("Done",done.map(function(doneItem) {
        return doneItem.name
      }).join(", "));
    }))

    return Promise.all(work).then(function() {
      console.log("All done!");
    }).nodeify(callback);
  })
}