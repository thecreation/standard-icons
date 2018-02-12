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
function getGlyph(file) {
  return readFile(file)
    .then(function(fontData) {
      return fontData.toString("utf-8");
    })
    .then(parseXml)
    .then(function(parsedXml) {
      let advWidth = parsedXml.svg.defs[0].font[0].$['horiz-adv-x'];
      let descent = parsedXml.svg.defs[0].font[0]['font-face'][0].$.descent;
      return {
        advWidth: advWidth,
        descent: descent
      };
    })
}

function getGlyphs(file) {
  let SVG_FILE = require.resolve(file);
  return getGlyph(SVG_FILE).then(function(glyph) {
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
            advWidth: xmlGlyph.$['horiz-adv-x'] || glyph.advWidth,
            descent: glyph.descent,
            data: xmlGlyph.$,
            content: xmlGlyph.$.unicode.charCodeAt(0)
          };
        }
      })
      .then(function(fontData) {
        return indexBy(fontData, "content");
      });
  });
}

// generateSvg
function getIconSvg(params, size) {
  let {path, advWidth, descent, horiz_adv} = params;
  let result = '';

  if (params.isFontawesome) {
    const PIXEL = 128;

    const PIXEL_WIDTH = advWidth > 2048 ? 18 : (advWidth > 1792 ? 16 : 14);
    const PIXEL_HEIGHT = 14;
    
    const width = PIXEL_WIDTH * PIXEL;
    const height = PIXEL_HEIGHT * PIXEL;

    let shiftX = (width - advWidth)/2;
    let shiftY = 2*PIXEL;

    result = 
      `<svg width="${size}" height="${size}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(${shiftX} ${shiftY})">
          <g transform="scale(1 -1) translate(0 -1280)">
            <path d="${path}" />
          </g>
        </g>
      </svg>`;
  }else {
    result =
      `<svg width="${size}" height="${size}" viewBox="0 0 ${advWidth} ${advWidth}" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0 ${descent})">
          <g transform="scale(1 -1) translate(0 -${advWidth})">
            <path d="${path}" />
          </g>
        </g>
      </svg>`;
  }
  return result;
}

var svgo = new SVGO({
  plugins: [{
    removeViewBox: false
  }]
});

function generateSvg(name, params, size) {
  let svgFolder = pathModule.join(params.destFolder, 'icons');
  mkdirp.sync(svgFolder);

  return new Promise(function(resolve, reject) {
    var outSvg = fs.createWriteStream(pathModule.join(svgFolder, name + '.svg'));
    svgo.optimize(getIconSvg(params, size)).then(function(result) {
      outSvg.end(result.data);
      resolve();
    })
  });
}

function generateIcon(params) {
  var name = params.name;
  var size = params.size;
  console.log('Generating', name);
  var workChain = [];
  workChain.push(generateSvg(name, params, size));

  return Promise.all(workChain).then(function() {
    return {name: name}
  })
}

function flatten(arr) {
  return arr.reduce(function(a, b) {
    return a.concat(b);
  }, []);
}

function hexToDec(hex) {
  return parseInt(hex, 16);
}

module.exports = function(dest, filename, options) {
  return getGlyphs(`${dest}/${filename}.svg`).then(function(fontData) {
    let icons = new Array();
    for (let i in options.icons) {
      if (options.icons[i].content != undefined) {
        let str = options.icons[i].content.slice(1);
        for (let data in fontData) {
          if (fontData[data] != undefined) {
            if (hexToDec(str) == fontData[data].content) {
              icons.push({
                name: options.icons[i].name,
                advWidth: fontData[data].advWidth,
                descent: fontData[data].descent,
                isFontawesome: options.isFontawesome,
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
        advWidth: glyph.advWidth,
        descent: glyph.descent,
        path: glyph.data.d,
        size: 64,
        isFontawesome: glyph.isFontawesome,
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
