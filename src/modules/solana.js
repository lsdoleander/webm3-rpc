
	const MAXTRIES = {
		ADDRESS: 5,
		HOST: 5
	};

	let failures = {};
	let hidx = 0;
	
	let HOSTS = [
		"https://api.mainnet-beta.solana.com",
		"https://solana-api.projectserum.com",
		"https://rpc.ankr.com/solana",
		"https://solana.api.onfinality.io/public",
		"https://solana.drpc.org"
	]

	function getHost() {
		let host = HOSTS[hidx];
		if (failures[host] && failures[host] >= MAXTRIES.HOST) {
			return getHost();
		} else {
			return host;
		}
	}

	export default function(symbol, name) {
		return {
			name,
			balance (address) {
				return new Promise(resolve=>{				
					let tries = 0;

		            (async function innar(){
						let url = getHost();
		            	
		            	tries++;  

		            	function handleErrorCondition(message, econ){

		            		console.log(message);
		            		console.log(econ);

							hidx++
							if (hidx === HOSTS.length) hidx = 0;
							
							if (!failures[url]) {
								failures[url] = 1;
							} else {
								failures[url]++;
							}
							if (tries < MAXTRIES.ADDRESS) {
								innar();
							} else {
								resolve({ error: econ });
							}
		            	}

						const message = JSON.stringify({
							jsonrpc: "2.0",
							method: "getBalance",
							params: [address],
							id: 1 
						});

						fetch(url, {
							method: "POST",
							headers: {"content-type": "application/json"},
							body: message
							
						}).catch(ex=>{
							handleErrorCondition(message, ex)

						}).then(response=>{
							if (!response.ok) {
								handleErrorCondition(message, response.status)
							} else {
								response.json().then(json=>{
									if (json.result && !json.error){
										resolve({ result: json.result.value })
									} else {
										handleErrorCondition(message, json.error)
									}
								})
							}
						})
					})()
				})
			}
		}
	}
