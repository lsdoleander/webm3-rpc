
    import factory from './@factory.js'

    const URI = (address,symbol) => `https://explorer.dash.org/insight-api/addr/${address}/balance`
	const F = data => data;
	export default factory(URI,F)
	