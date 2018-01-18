let fs = require('fs-extra');
let cheerio = require('cheerio');

module.exports = function(file, callback) {
   return new Promise(function(resolve, reject) {
        fs.readFile(file, function (err, data) {
            if(err) {
                reject(err);
            }
            let $ = cheerio.load(data);
            let icons = callback($);

            resolve(icons);
        });
    });
}
