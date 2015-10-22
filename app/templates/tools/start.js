export default async () => {
  await require('./build')();
  await require('./serve')('develop');
}
