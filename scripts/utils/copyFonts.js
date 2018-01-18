'use strict';

import fs   from 'fs-extra';
import path from 'path';

export default function(dest, src, fonts) {
  for(var i in fonts) {
    if(fonts[i]) {
      fs.copySync(path.join(src, fonts[i]), path.join(dest, fonts[i]));
    }
  }
}
