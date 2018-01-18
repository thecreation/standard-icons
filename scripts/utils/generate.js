'use strict';

import fs    from 'graceful-fs';
import path  from 'path';
import Handlebars from 'handlebars';

export default function(outputFile, templateFile, data = {}) {
  var source = fs.readFileSync(templateFile);
  var template = Handlebars.compile(source.toString());
  var output = template(data);

  return fs.writeFileSync(outputFile, output);
}
