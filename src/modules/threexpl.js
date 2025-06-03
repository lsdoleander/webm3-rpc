

    import factory from './@factory.js'

    const URI = (address,symbol) => `https://api.3xpl.com/${symbol}/address/${address}?` 
    	+ new URLSearchParams({ data: "balances", from: `${symbol}-main`, token: "3A0_t3st3xplor3rpub11cb3t4efcd21748a5e" })
	
	const F = (data,symbol) => {
		let main = data.data.balances[`${symbol}-main`];

		if (!(main instanceof Array)) {
			return main[`${symbol==="xrp-ledger"?"xrp":symbol}`].balance
		} else {
			return null;
		}
	}
	export default factory(URI,F)
