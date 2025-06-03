
	import mappings from "./mappings.js"
	
	import wei from "./wei.js";

	import { getPrices } from "./prices.js";

	const symbolmap = (function(){
		let output = {};
		for (let m of mappings) {
			if (output[m.symbol]) {
				output[m.symbol].push(m.mod);
			} else {
				output[m.symbol] = [m.mod];
			}
		}
		return output;
	})()

	const MAXTRIES = {
		ADDRESS: 3,
		HOST: 5
	};

	let failures = {};
	let hidx = {};

	export default function (symbol) {
		if (!hidx[symbol]) hidx[symbol] = -1;

		function getHost() {
			hidx[symbol]++
			if (hidx[symbol] === symbolmap[symbol].length) hidx[symbol] = 0;
			let host = symbolmap[symbol][hidx[symbol]];
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

						await mod.balance(address).then(json=>{
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