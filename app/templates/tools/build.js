export default async () => {
  await require('./clean').default();
  await require('./bundle').default();
  await require('./copy').default();
};
