import del from 'del';

export default async () => {
  console.log('Cleaning...');

  await del(['.tmp', 'build/*', '!build/.git'], {dot: true});
};
