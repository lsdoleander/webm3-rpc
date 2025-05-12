
  import factory from './@factory.js'
  import { load } from 'cheerio'

  const URI = (address, symbol) => `https://www.oklink.com/${symbol}/address/${address}`;
  const F=text=>{
    let $ = load(text);
    let ele = $("#root > main > div > div > div.single-pannel > div > div > div > div > div:nth-child(1) > div > div > span > div.okui-popup.okui-tooltip > div.text-ellipsis");
   
    return parseFloat(ele.text())*Math.pow(10,8)
  }
  export default factory(URI,F)

 