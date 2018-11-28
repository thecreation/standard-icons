'use strict';

const del = require('del');
const colors = require('colors');

module.exports = function(dest) {
	del.sync([`${dest}/icons`, `${dest}/*.+(css|woff2|woff|eot|ttf|svg)`, `${dest}/manifest.json`])
	console.log(colors.green('clean success!'));
}
