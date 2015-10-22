export default async () => {
  console.log('Building...');

  await require('./clean')();
  await require('./copy')();
  await require('./bundle')();
};
