
  import factory from './@factory.js'
  import { load } from 'cheerio'

  const URI = (address, symbol) => `https://mainnet.zcashexplorer.app/address/${address}`;
  const F=text=>{
    let $ = load(text);
    let ele = $("body > div > main > div > div.col-span-3 > div > div:nth-child(4) > div > ul > li:nth-child(1) > div > div.inline-flex");
   
    return parseFloat(ele.text())*Math.pow(10,8)
  }
  export default factory(URI,F)

  // 

  