
  import factory from './@factory.js'

  const URI = (address, symbol) => `https://api.fullstack.cash/v5/electrumx/balance/bitcoincash:${address}`;
  const F = data=>(data?.success?data?.balance?.confirmed:null)
  
  export default factory(URI,F)