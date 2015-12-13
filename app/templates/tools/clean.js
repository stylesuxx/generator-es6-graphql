import del from 'del';
import mkdirp from 'mkdirp';

export default async () => {
  await del(['.tmp', 'build/*', '!build/.git'], {dot: true});
  await mkdirp('build/public');
};
