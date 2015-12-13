import del from 'del';
import mkdirp from 'mkdirp';

export default async () => {
  await del(['build/*'], { dot: true });
  await mkdirp('build/public');
};
