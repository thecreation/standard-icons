'use strict';

const del = require('del');
const colors = require('colors');

module.exports = function(dest) {
	del.sync([`${dest}/icons`])
	console.log(colors.green('icons cleaned.'));
}