import yaml    from 'js-yaml';
import fs      from 'fs';
import extract from 'extract';

export default function(ymlFile, keys) {
  let obj = yaml.load(fs.readFileSync(ymlFile, 'utf8'), {
    json: true
  });
  return extract(obj, keys);
}
