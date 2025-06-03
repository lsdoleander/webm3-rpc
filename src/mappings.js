	
	import _3xpl from './modules/threexpl.js'
	import bchchain from './modules/bchchain.js'
	import bitinfo from './modules/bitinfocharts.js'
	import blockcypher from './modules/blockcypher.js'
	import cryptoid from './modules/cryptoid.js'
	import dash from './modules/dash.js'
	import ripple from './modules/ripple.js'
	import solana from './modules/solana.js'
	import stellar from './modules/stellar.js'
	import trezor from './modules/trezor.js'
	import trongrid from './modules/trongrid.js'
//	import zelcore from './modules/zelcore.js'
//	import zchain from './modules/zchain.js'

	export const mappings = [
		{ symbol: 'BTC', mod: blockcypher("btc", "blockcypher")},
		{ symbol: 'LTC', mod: blockcypher("ltc", "blockcypher")},
		{ symbol: 'DASH', mod: blockcypher("dash", "blockcypher")},
		{ symbol: 'DGB', mod: cryptoid("dgb", "cryptoid")},
	//	{ symbol: 'ZEC', mod: zchain("zec", "scraper")},
		{ symbol: 'BCH', mod: bchchain("bch", "fullstack")},
		{ symbol: 'XRP', mod: ripple("xrp", "s2")},
		{ symbol: 'TRX', mod: trongrid("trx", "trongrid")},
		{ symbol: 'DOGE', mod: blockcypher("doge", "blockcypher")},
		{ symbol: 'SOL', mod: solana("sol", "solana")},
		{ symbol: 'XLM', mod: stellar("xlm", "horizon")},
	//	{ symbol: 'KAS', mod: kaspa.api()},

		{ symbol: 'BTC', mod: _3xpl("bitcoin", "3xpl")},
		{ symbol: 'LTC', mod: _3xpl("litecoin", "3xpl")},
		{ symbol: 'DASH', mod: _3xpl("dash", "3xpl")},
		{ symbol: 'DGB', mod: _3xpl("digibyte", "3xpl")},
	//	{ symbol: 'ZEC', mod: _3xpl("zcash", "3xpl")},
		{ symbol: 'BCH', mod: _3xpl("bitcoin-cash", "3xpl")},
		{ symbol: 'XRP', mod: _3xpl("xrp-ledger", "3xpl")},
		{ symbol: 'TRX', mod: _3xpl("tron", "3xpl")},
		{ symbol: 'DOGE', mod: _3xpl("dogecoin", "3xpl")},
		{ symbol: 'SOL', mod: _3xpl("solana", "3xpl")},
		{ symbol: 'XLM', mod: _3xpl("stellar", "3xpl")},
	//	{ symbol: 'KAS', mod: kaspa.fyi()},

		{ symbol: 'BTC', mod: bitinfo("bitcoin", "bitinfo")},
		{ symbol: 'LTC', mod: bitinfo("litecoin", "bitinfo")},
		{ symbol: 'DASH', mod: bitinfo("dash", "bitinfo")},
		{ symbol: 'DOGE', mod: bitinfo("dogecoin", "bitinfo")},
	//	{ symbol: 'ZEC', mod: zelcore("zcash", "zelcore")},

		{ symbol: 'BTC', mod: cryptoid("btc", "cryptoid")},
		{ symbol: 'LTC', mod: cryptoid("ltc", "cryptoid")},
		{ symbol: 'DASH', mod: cryptoid("dash", "cryptoid")},

		{ symbol: 'BTC', mod: trezor("btc1", "trezor1")},
		{ symbol: 'LTC', mod: trezor("ltc1", "trezor")},
		{ symbol: 'DASH', mod: dash("dash", "dash")},

		{ symbol: 'BTC', mod: trezor("btc2", "trezor2")},
	];

	export default mappings;