
  import factory from './@factory.js'

  const URI = (address, symbol) => `https://bitcoinexplorer.org/api/address/${address}`;
  const F = data=>data.txHistory.balanceSat
  export default factory(URI,F)
