
	import colors from 'chalk-css-colors'

	let rich = {
		BTC: { address: "34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo", amount: 248598, decimals: 8, names: [ "blockcypher", "3xpl", "cryptoid", "trezor1", "trezor2", "bitinfo" ]},
		LTC: { address: "MQd1fJwqBJvwLuyhr17PhEFx1swiqDbPQS", amount: 5679799, decimals: 8, names: [ "blockcypher","3xpl", "cryptoid", "trezor", "bitinfo" ] },
		DASH: { address: "XnT33zjrFKjt3ymfyQZs2FPiKNer3WVj14", amount: 1353008, decimals: 8, names: [ "blockcypher", "3xpl", "cryptoid", "dash", "bitinfo" ] },
		DGB: { address: "dgb1qnjf7e2a5ezft480kxzmhgg66pnzqk0aawxa06u", amount: 2353210045, decimals: 8, names: [ "3xpl", "cryptoid" ]},
		ZEC: { address: "t1RyCw14wRXrh3mp21uxgr9ynjem7cNUkMH", amount: 715889, decimals: 8, names: [ "3xpl", "scraper", "zelcore" ] },
		BCH: { address: "qre24q38ghy6k3pegpyvtxahu8q8hqmxmqqn28z85p", amount: 613645, decimals: 8, names: [ "3xpl", "fullstack" ]},
		XRP: { address: "rsX8cp4aj9grKVD9V1K2ouUBXgYsjgUtBL", amount: 1833243714, decimals: 6, names: [ "3xpl", "s2" ] },
		TRX: { address: "TNMcQVGPzqH9ZfMCSY4PNrukevtDgp24dK", amount: 8997562062, decimals: 6, names: [ "3xpl", "trongrid" ] },
		DOGE: { address: "DEgDVFa2DoW1533dxeDVdTxQFhMzs1pMke", amount: 28856003426, decimals: 8, names: [ "3xpl", "blockcypher", "bitinfo" ] },
		SOL: { address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", amount: 7400798, decimals: 9, names: [ "3xpl", "solana" ] },
		XLM: { address: "GDUY7J7A33TQWOSOQGDO776GGLM3UQERL4J3SPT56F6YS4ID7MLDERI4", amount: 7246853515, decimals: 7, names: [ "3xpl", "horizon" ] }

	//	KAS: { address: "kaspa:qpzpfwcsqsxhxwup26r55fd0ghqlhyugz8cp6y3wxuddc02vcxtjg75pspnwz", amount: 1044305743, decimals: 8 }
	};

	async function testpost(){
		return new Promise(async root=>{
			for (let key in rich) {
				let address = rich[key].address;
				let amount = rich[key].amount;
				
				for (let name of rich[key].names) {
					let response = await fetch(`http://localhost:9000/${key}/${name}/jsonrpc`,{
						method: "POST",
						headers: {"content-type": "application/json"},
						body: JSON.stringify({
							jsonrpc: "2.0",
							method: "getBalance",
							params: [address],
							id: 1 
						})
					})
					if (response.status === 200 && /json/.test(response.headers.get("content-type"))) {
						let json = await response.json();
						let balance = json.result / Math.pow(10, rich[key].decimals)

						if (json.error || (balance < amount && amount / balance > 1.2)) {
							console.log(`[${colors.orange('FAIL')}][${key}:${name}] amount is ${parseInt(amount / balance)}x ${balance} or < ${amount}`)
						} else {
							console.log(`[${colors.cyan('PASS')}][${key}:${name}] ${balance} >= ${amount}`)
						}
					} else {
						let text = await response.text()
						console.log(`[${colors.orange('FAIL')}][${key}:${name}] ${response.status}: ${response.headers.get("content-type")}`);
						console.log(text);
					}
				}
			}
			root();
		})
	}

	async function testws(){
		return new Promise(async root=>{
			for (let key in rich) {
				let address = rich[key].address;
				let amount = rich[key].amount;
				
				for (let name of rich[key].names) {
					await new Promise(resolve=>{
						let socket = new WebSocket(`ws://localhost:9000/${key}/${name}/ws`);

						socket.addEventListener("open", event=>{
							socket.send(JSON.stringify({
								jsonrpc: "2.0",
								method: "getBalance",
								params: [address],
								id: 1 
							}))
						});

						socket.addEventListener("message", event=>{
							
							let json = JSON.parse(event.data);
							let balance = json.result / Math.pow(10, rich[key].decimals)

							if (json.error || (balance < amount && amount / balance > 1.2)) {
								console.log(`[${colors.orange('FAIL')}][${key}:${name}] amount is ${parseInt(amount / balance)}x ${balance} or < ${amount}`)
							} else {
								console.log(`[${colors.cyan('PASS')}][${key}:${name}] ${balance} >= ${amount}`)
							}
							resolve()
						})
					})
				}
			}
			root();
		})
	}

	(async ()=>{
		await testpost();
		await testws();
	})()