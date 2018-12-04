#!/usr/bin/env node

const fs = require('fs-extra');
const colors = require('colors');
const path = require('path')

// extar font-awesome svg from js file
const getFileList = function(path) {
	let stat = fs.lstatSync(path)
	if (!stat.isDirectory()) return false;
	
	// extra js file list
	return fs.readdirSync(path).filter( (file) => { 
			let ext = file.slice( -3 )  === '.js';
			let flag = file.slice( 0, 2 ) === 'fa';
			if ( ext && flag ) return file
		})
}

module.exports = function(folder, saveTo) {
	const jsFiles = getFileList(folder);
	jsFiles.forEach(file => {
		let filePath = `${folder}/${file}`;
		let { svgPathData, width, height, iconName } = require(filePath);
		let svgDom = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><path d="${ svgPathData }"/></svg>`;
		fs.ensureDir(saveTo)
		fs.writeFile(`${saveTo}/${iconName}.svg`, svgDom, () => {
			console.log(colors.green(`${iconName}.svg generate`))
		});
	})
}