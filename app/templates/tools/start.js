export default async () => {
  await require('./build').default();
  await require('./serve').default('develop');
}
