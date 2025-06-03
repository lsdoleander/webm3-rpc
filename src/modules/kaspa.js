
  import factory from './@factory.js'

  export const api = (()=>{
      const URI = (address, symbol) => `https://api.kaspa.org/addresses/${address}/balance`;

      return factory(URI)
    })()
  
  export const fyi = (()=>{
      const URI = (address, symbol) => `https://api-v2-do.kas.fyi/addresses/${address}/info`;

      return factory(URI)
    })()

  export default {
    api,
    fyi
  }