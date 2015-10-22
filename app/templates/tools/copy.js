import path from 'path';
import replace from 'replace';
import copy from './lib/copy';

export default async () => {
  console.log('Copying...');

  await Promise.all([
    copy('package.json', 'build/package.json')
  ]);

  replace({
    regex: '"start".*',
    replacement: '"start": "node server.js"',
    paths: [path.join(__dirname, '../build/package.json')],
    recursive: false,
    silent: false
  });
};
