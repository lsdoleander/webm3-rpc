

    import factory from './@factory.js'

    const URI = (address,symbol) => `https://chainz.cryptoid.info/${symbol}/api.dws?` + new URLSearchParams({ q: "getbalance", a: address, key: "6e25f5736c3e" })
	const F = data => Math.pow(10, 8) * data;
	
	export default factory(URI,F)
