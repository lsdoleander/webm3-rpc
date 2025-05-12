
    const TIMEOUT = 1000 /* MS */ * 60 /* S */ * 60 /* M */ * 2 // HRS;
   
    let cache;

    const idlist = {
        BTC: 'bitcoin',
        BCH: 'bitcoincash',
        DASH: 'dash',
        DOGE: 'dogecoin',
        DGB: 'digibyte',
        LTC: 'litecoin',
        KAS: 'kaspa',
        SOL: 'solana',
        TRX: 'tron',
        XLM: 'stellar',
        XRP: 'ripple',
        ZEC: 'zcash',
        
        ETH: 'ethereum',
        BNB: 'binancecoin',
        AVAX: 'avalanche-2',
        PLS: 'pulsechain',
        POL: 'matic-network',
        FTM: 'fantom',
        XDAI: 'xdai',
        CORE: 'cvault-finance',
        ETC: 'ethereum-classic',
        MNT: 'mantle',
        CRO: 'crypto-com-chain',
        S: 'sonic-3'
    };


    let callids = "";
    let idToSym = {};

    for (let idx in idlist) {
        if (callids !== "") callids += ",";
        callids+=(idlist[idx]);
        idToSym[idlist[idx]] = idx;
    }

    export function getPrices() {
        return new Promise(resolve => {
            if (!cache || (new Date().getTime() - cache.timer) > TIMEOUT) {
                const URI = "https://api.coingecko.com/api/v3/simple/price?" + new URLSearchParams({ ids: callids, vs_currencies: "usd" });
                fetch(URI).then(async response => {
                    if (response.status === 200 && /json/.test(response.headers.get("content-type"))){
                        const data = await response.json();
                        let output = {};
                        for (let idx in data) {
                            output[idToSym[idx]] = data[idx].usd;
                        }
                        cache = {
                            timer: new Date().getTime(),
                            data: output
                        }
                        resolve(output);
                    }
                })
            } else {
                resolve(cache.data);
            }
        })
    }

    export default getPrices

    