'use strict';

let fs = require('graceful-fs');
module.exports = function(file) {
  var content = fs.readFileSync(file);

  var licenses = {
    'Apache-1.0': ['Apache-1.0', 'Apache License 1.0'],
    'Apache-1.1': ['Apache-1.1', 'Apache License 1.1'],
    'Apache-2.0': ['Apache-2.0', 'Apache License 2.0'],
    'BSD-2-Clause': ['BSD-2-Clause', 'BSD 2-clause'],
    'BSD-3-Clause': ['BSD-3-Clause', 'BSD 3-clause'],
    'BSD-4-Clause': ['BSD-4-Clause', 'BSD 4-clause'],
    'CC-BY-1.0': ['CC-BY-1.0', 'Creative Commons Attribution 1.0'],
    'CC-BY-2.5': ['CC-BY-2.5', 'Creative Commons Attribution 2.5'],
    'CC-BY-2.0': ['CC-BY-2.0', 'Creative Commons Attribution 2.0'],
    'CC-BY-3.0': ['CC-BY-3.0', 'Creative Commons Attribution 3.0'],
    'CC-BY-4.0': ['CC-BY-4.0', 'Creative Commons Attribution 4.0'],
    'CC-BY-SA-1.0': ['CC-BY-SA-1.0', 'Creative Commons Attribution Share Alike 1.0'],
    'CC-BY-SA-2.5': ['CC-BY-SA-2.5', 'Creative Commons Attribution Share Alike 2.5'],
    'CC-BY-SA-2.0': ['CC-BY-SA-2.0', 'Creative Commons Attribution Share Alike 2.0'],
    'CC-BY-SA-3.0': ['CC-BY-SA-3.0', 'Creative Commons Attribution Share Alike 3.0'],
    'CC-BY-SA-4.0': ['CC-BY-SA-4.0', 'Creative Commons Attribution Share Alike 4.0'],
    'CC0-1.0': ['CC0 1.0', 'CC0-1.0', 'Creative Commons Zero v1.0 Universal'],
    'GPL-1.0': ['GPLv1', 'GPL-1.0', 'GNU General Public License v1.0'],
    'GPL-2.0': ['GPLv2', 'GPL-2.0', 'GNU General Public License v2.0'],
    'GPL-3.0': ['GPLv3', 'GPL-3.0', 'GNU General Public License v3.0'],
    'LGPL-2.1': ['LGPLv2.1', 'LGPL-2.1', 'GNU Lesser General Public License v2.1'],
    'LGPL-3.0': ['LGPLv3', 'LGPL-3.0', 'GNU Lesser General Public License v3.0'],
    'LGPL-2.0': ['LGPLv2', 'LGPL-2.0', 'GNU Lesser General Public License v2.0'],
    'MIT': ['MIT', 'MIT License']
  };

  content = content.toString().toLowerCase();

  for(let license in licenses) {
    for(let i in licenses[license]) {
        if(content.indexOf(licenses[license][i].toLowerCase()) !== -1){
            return license;
        }
    }
  }

  return null;
}
