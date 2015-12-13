import path from 'path';
import replace from 'replace';
import copy from './lib/copy';

export default async () => {
  await Promise.all([
    copy('package.json', 'build/package.json'),
    copy('public', 'build/public')
  ]);

  replace({
    regex: '"start".*',
    replacement: '"start": "node server.js",',
    paths: [path.join(__dirname, '../build/package.json')],
    recursive: false,
    silent: false
  });
};
