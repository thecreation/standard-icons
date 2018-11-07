const path = require('path');
const pkg = require(path.resolve(process.cwd(), 'package.json'));
const year = new Date().getFullYear();

module.exports = {
  banner: `/*!
  * ${pkg.name} v${pkg.version} (${pkg.homepage})
  * Copyright ${year} ${pkg.author}
  * Licensed under ${pkg.license} (https://github.com/icon/icon/blob/master/LICENSE)
  */`,

  styles: {
    source: 'scss/**/*.scss',
    build: 'dist'
  },

  scripts: {
    source: 'js/*.js',
    build: 'dist'
  },

  markdowns: {
    source: '*.md'
  },

  images: {
    source: 'images/**/*.{jpg,png,gif,webp}',
    build: 'dist/images'
  },

  sets: {
    customs: `${__dirname}/customs/`
  },

  icons: {
    source: 'icons/*.svg',
    build: 'svgs'
  }
};
