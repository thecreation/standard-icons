/* Credit to https://github.com/encharm/Font-Awesome-SVG-PNG MIT */

'use strict';

const pathModule = require('path');
const fs = require('graceful-fs');
const Promise = require("bluebird");
const indexBy = require('lodash.indexby');
const readFile = Promise.promisify(require("fs").readFile);
const parseXml = Promise.promisify(require("xml2js").parseString);
const mkdirp = require("mkdirp");
const SVGO = require('svgo');
const extend = require('extend');
const colors = require('colors');

// getGlyphs
function hexToDec(hex) {
  return parseInt(hex, 16);
}

function getGlyphs(file) {
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

var svgo = new SVGO({
  plugins: [{
    removeViewBox: false
  }]
});

function generateSvg(name, params) {
  let svgFolder = pathModule.join(params.destFolder, 'icons');
  mkdirp.sync(svgFolder);

  return new Promise(function(resolve, reject) {
    var outSvg = fs.createWriteStream(pathModule.join(svgFolder, name + '.svg'));
    svgo.optimize(getIconSvg(params)).then(function(result) {
      outSvg.write('<?xml version="1.0" encoding="utf-8"?>' +'\n'); 
      outSvg.end(result.data);
      resolve();
    })
  });
}

function generateIcon(params) {
  var name = params.name;
  console.log('Generating', name);
  var workChain = [];
  if (params.generateSvg) {
    workChain.push(generateSvg(name, params));
  }
  return Promise.all(workChain).then(function() {
    return {name: name}
  })
}

function flatten(arr) {
  return arr.reduce(function(a, b) {
    return a.concat(b);
  }, []);
}

module.exports = function(dest, filename, options) {
  return getGlyphs(`${dest}/${filename}.svg`).then(function(fontData) {
    let icons = new Array();
    for (let i in options.icons) {
      if (options.icons[i].content != undefined) {
        // let str = options.icons[i].content.slice(1);
        for (let data in fontData) {
          if (fontData[data] != undefined) {
            if (options.icons[i].content == fontData[data].data.unicode) {
              icons.push({
                name: options.icons[i].name,
                content: options.icons[i].content,
                title: options.icons[i].title,
                data: fontData[data].data
              })
            }
          }
        }
      }
    }
    return icons;
  }).then(function(glyphs) {
    let work = [];

    let iconConfigs = flatten(glyphs.map(function (glyph) {
      return extend(true, {}, {
        name: glyph.name,
        advWidth: glyph.data['horiz-adv-x'] || 1536,
        path: glyph.data.d,
        generateSvg: true,
        destFolder: dest
      });
    }));
    
    work.push(iconConfigs.map(function(params) {
      generateIcon(params);
    }));

    Promise.all(work).then(function() {
      console.log(colors.green("All done!"));
    });
  });
}
