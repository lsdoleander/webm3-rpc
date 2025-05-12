
  import factory from './@factory.js'

  const URI = (address, symbol) => `https://ravencoin.network/api/addr/${address}/balance`;
  const F = data => data;
  export default factory(URI,F)
  