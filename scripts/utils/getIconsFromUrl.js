let request = require('retry-request');
let cheerio = require('cheerio');
let zlib = require('zlib');

module.exports = function(url, callback) {
  console.info('Fetch ' + url);
  return new Promise(function(resolve, reject) {
    request({
      url: url
    }, {
      retries: 5,
      objectMode: true
    }).on('response', function(response) {
      var chunks = [];
      response.on('data', function(chunk) {
        chunks.push(chunk);
      });

      var end = function(body) {
        let $ = cheerio.load(body);
        let icons = callback($, body);

        resolve(icons);
      };

      response.on('end', function() {
        var buffer = Buffer.concat(chunks);
        var encoding = response.headers['content-encoding'];
        if (encoding == 'gzip') {
          zlib.gunzip(buffer, function(err, decoded) {
            if (error) {
              reject(err);
            }
            end(decoded && decoded.toString());
          });
        } else if (encoding == 'deflate') {
          zlib.inflate(buffer, function(err, decoded) {
            if (error) {
              reject(err);
            }
            end(decoded && decoded.toString());
          })
        } else {
          end(buffer.toString());
        }
      });
    }).on('error', function() {
      reject(err);
    });
  });
}