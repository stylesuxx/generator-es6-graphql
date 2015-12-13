export default async () => {
  global.WATCH = true;

  await require('./build').default();
  await require('./serve').default('develop');
}
