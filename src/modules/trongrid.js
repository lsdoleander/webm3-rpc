
  import factory from './@factory.js'

  const URI = (address, symbol) => `https://api.trongrid.io/v1/accounts/${address}`;
  const F = data=>(data && data.data.length > 0) ? data.data[0].balance : undefined;
  export default factory(URI,F)
