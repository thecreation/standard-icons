'use strict';

import generate from './generate';
import path from 'path';

export default function(dest, filename, data) {
  let outputFile = path.join(dest, `${filename}.css`);
  return generate(outputFile, path.join('../templates/', 'css.hbs'), data);
}
