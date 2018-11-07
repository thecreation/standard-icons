'use strict';

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

const mandelbrot = require('@frctl/mandelbrot')({
  // favicon: '/favicon/favicon.ico',
  skin: "aqua",
  panels: ["html", "view", "context", "resources", "info"]
});

/*
 * Give your project a title.
 */
fractal.set('project.title', 'Icon');

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, 'modules'));
fractal.components.set('default.preview', '@support-layout');

fractal.components.set('title', 'Patterns');
fractal.components.set('label', 'Patterns');

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, 'docs'));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, 'modules'));
fractal.web.theme(mandelbrot);
