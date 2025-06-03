
  import factory from './@factory.js'

  const URI = (address, symbol) => `https://${symbol}.trezor.io/api/v2/address/${address}`;

  export default factory(URI)