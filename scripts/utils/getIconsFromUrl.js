let request = require('requestretry');
let cheerio = require('cheerio');
let zlib = require('zlib');

module.exports = function(url, callback) {
  console.info('Fetch ' + url);
  return new Promise(function(resolve, reject) {
    request({
      url: url,
      timeout: 300000,
      maxAttempts: 5,   // (default) try 5 times
      retryDelay: 5000,
    }, function(err, response, body){
      if (err) {
        reject(err);
      } else {
        var end = function(body) {
          let $ = cheerio.load(body);
          let icons = callback($, body);

          resolve(icons);
        };
        end(body);
      }
    });
    //   .on('response', function(response) {
    //   var chunks = [];


    //   var end = function(body) {
    //     let $ = cheerio.load(body);
    //     let icons = callback($, body);

    //     resolve(icons);
    //   };

    //   response.on('end', function() {
    //     console.info('end')
    //     var buffer = Buffer.concat(chunks);
    //     var encoding = response.headers['content-encoding'];
    //     if (encoding == 'gzip') {
    //       zlib.gunzip(buffer, function(err, decoded) {
    //         if (err) {
    //           reject(err);
    //         }
    //         end(decoded && decoded.toString());
    //       });
    //     } else if (encoding == 'deflate') {
    //       zlib.inflate(buffer, function(err, decoded) {
    //         if (err) {
    //           reject(err);
    //         }
    //         end(decoded && decoded.toString());
    //       })
    //     } else {
    //       end(buffer.toString());
    //     }
    //   });

    //   response.on('data', function(chunk) {
    //     chunks.push(chunk);
    //   });
    // }).on('error', function(err) {
    //   reject(err);
    // });
  });
}
