#!/usr/bin/env node

const fs = require('fs');

// extar font-awesome svg from js file
const getFileList = function ( path ) {
	let stat = fs.lstatSync(path)
	if ( !stat.isDirectory() ) return false;
	
	// extra js file list
	let jsFiles = fs.readdirSync( path ).
	              filter( (file) => { 
	                let ext = file.slice( -3 )  === '.js';
	                let flag = file.slice( 0, 2 ) === 'fa';
	                if ( ext && flag ) return file
	              } )
	return jsFiles;
}

const extraSvgDataFromFolder = function ( folder, saveTo ) {
	let jsFiles = getFileList(folder);
	jsFiles.map(( file ) => {
		let filePath = `${folder}/${file}`;
		let { svgPathData, width, height, iconName } = require(filePath);
		let svgDom = `<svg width="${ width }" height="${ height }" xmlns="http://www.w3.org/2000/svg"><path d="${ svgPathData }"/></svg>`;
		fs.writeFile(`${saveTo}/${iconName}.svg`, svgDom, (err)=> {
			if (err) throw err;
			console.log(`${iconName}.svg generate`)
		});
	})
}



module.exports = extraSvgDataFromFolder;