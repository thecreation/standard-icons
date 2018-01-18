'use strict';

import fs   from 'fs-extra';
import path from 'path';

export default function(dest, license) {
  fs.copySync(license, path.join(dest, path.basename(license)));
}
