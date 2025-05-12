  import factory from './@factory.js'
  import { load } from 'cheerio'

  const URI = (address, symbol) => `https://bitinfocharts.com/${symbol}/address/${address}`;
  const F=text=>{
    let $ = load(text);
    let ele = $("body > div:nth-child(5) > div:nth-child(4) > table > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > b");
   
    return parseFloat(ele.text().replace(/,/g, "").replace(/ [A-Z]/g, ""))*Math.pow(10,8)
  }
  export default factory(URI,F)

 
