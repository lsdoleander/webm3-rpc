
    import factory from './@factory.js'

    const URI = (address,symbol)=>`https://horizon.stellar.org/accounts/${address}`

    const F = data => {
        if (typeof data === "string") data = JSON.parse(data);
        if (data?.balances?.length > 0) {
            let b = 0;
            for (let balance of data.balances){
                if (balance.asset_type === "native") b += parseFloat(balance.balance);
            }
            return (b) * Math.pow(10,7);
        } 
    }

    export default factory(URI,F)
    