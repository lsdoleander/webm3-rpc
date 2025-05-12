  import factory from './@factory.js'
  import { load } from 'cheerio'

  const URI = (address, symbol) => `https://blockbook.zec.zelcore.io/address/${address}`;
  const F=text=>{
    let $ = load(text);
    let ele = $("#wrap > div > table > tbody > tr:nth-child(4) > td:nth-child(2) > span > span.prim-amt");
   
    return parseFloat(ele.text().replace(/,/g, "").replace(/ [A-Z]/g, ""))*Math.pow(10,8)
  }
  export default factory(URI,F)
