import fs     from 'fs-extra';
import extract from 'extract';

export default function(jsonFile, keys) {
  let obj = fs.readJsonSync(jsonFile);
  return extract(obj, keys);
}
