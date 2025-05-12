
  import factory from './@factory.js'

  const URI = (address, symbol) => `https://api.blockcypher.com/v1/${symbol}/main/addrs/${address}`;

  export default factory(URI)