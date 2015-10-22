export default async () => {
  console.log('Building...');

  await require('./clean')();
  await require('./bundle')();
  await require('./copy')();
};
