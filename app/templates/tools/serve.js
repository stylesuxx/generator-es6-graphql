import path from 'path';
import cp from 'child_process';

export default (env) => new Promise((resolve, reject) => {
  const server = cp.fork(path.join(__dirname, '../build/server.js'), {
    env: Object.assign({NODE_ENV: env}, process.env)
  });
  server.once('message', message => {
    if (message.match(/^online$/)) {
      resolve();
    }
  });
  server.once('error', err => reject(error));
  process.on('exit', () => server.kill('SIGTERM'));
});
