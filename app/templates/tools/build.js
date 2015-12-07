export default async () => {
  console.log('Building...');

  await require('./clean').default();
  await require('./bundle').default();
  await require('./copy').default();
};
