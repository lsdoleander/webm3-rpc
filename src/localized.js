
	import _3xpl from './modules/3xpl.js'
	import bchchain from './modules/bchchain.js'
	import blockcypher from './modules/blockcypher.js'
	import cryptoid from './modules/cryptoid.js'
	import dash from './modules/dash.js'
	import forbole from './modules/forbole.js'
	import kaspa from './modules/kaspa.js'
	import ripple from './modules/ripple.js'
	import solana from './modules/solana.js'
	import stellar from './modules/stellar.js'
	import trezor from './modules/trezor.js'
	import trongrid from './modules/trongrid.js'
	import zchain from './modules/zchain.js'
	
	import wei from "./wei.js";

	import { getPrices } from "./prices";

	const mappings = {
		BTC: [blockcypher("btc", "blockcypher"), _3xpl("bitcoin", "3xpl"), cryptoid("btc", "cryptoid"), trezor("btc1", "trezor1"), trezor("btc2", "trezor2") ],
		LTC: [blockcypher("ltc", "blockcypher"), _3xpl("litecoin", "3xpl"), cryptoid("ltc", "cryptoid"), trezor("ltc1", "trezor")],
		DASH: [blockcypher("dash", "blockcypher"), _3xpl("dash", "3xpl"), cryptoid("dash", "cryptoid"), dash("dash", "dash")],
		DGB: [cryptoid("dgb", "cryptoid"), _3xpl("digibyte", "3xpl")],

		ZEC: [zchain("zec", "scraper"), _3xpl("zcash", "3xpl")],
		BCH: [bchchain("bch", "fullstack"), _3xpl("bitcoin-cash", "3xpl")],
		XRP: [ripple("xrp", "s2"), _3xpl("xrp-ledger", "3xpl")],
		TRX: [trongrid("trx", "trongrid"), _3xpl("tron", "3xpl")],
		DOGE: [blockcypher("doge", "blockcypher"), _3xpl("dogecoin", "3xpl")],
		SOL: [solana("sol", "solana"), _3xpl("solana", "3xpl")],
		XLM: [stellar("xlm", "horizon"), _3xpl("stellar", "3xpl")],
	};

	
	const MAXTRIES = {
		ADDRESS: 3,
		HOST: 5
	};

	let failures = {};
	let hidx = {};

	function RPC (symbol) {
		if (!hidx[symbol]) hidx[symbol] = -1;

		function getHost() {
			hidx[symbol]++
			if (hidx[symbol] === mappings[symbol].length) hidx[symbol] = 0;
			let host = mappings[symbol][hidx[symbol]];
			if (failures[symbol + ":" + host.name] && failures[symbol + ":" + host.name] >= MAXTRIES.HOST) {
				return getHost();
			} else {
				return host;
			}
		}

		return { 
			getBalance(address, decimals){
				return new Promise(resolve=>{
					let tries = 0;

	                (async function innar(){
						let mod = getHost();
	                	
	                	tries++;  

	                	function handleErrorCondition(err){
							if (!failures[symbol + ":" + mod.name]) {
								failures[symbol + ":" + mod.name] = 1;
							} else {
								failures[symbol + ":" + mod.name]++;
							}
							if (tries < MAXTRIES.ADDRESS) {
								innar();
							} else {
								resolve();
							}
	                	}

						await host.balance(address).then(json=>{
							if (json.result && !json.error){
		                        const balance = wei.decimals(decimals).fromWei(json.result);
		                        if (failures[symbol + ":" + mod.name]) failures[symbol + ":" + mod.name] = 0;
		                        resolve(balance);
		                    } else {
		                    	handleErrorCondition(json.error);
		                    }
						}).catch (handleErrorCondition);
					})();
				});
			}
		}
	}

	export default {
		getPrices,
		RPC
	}