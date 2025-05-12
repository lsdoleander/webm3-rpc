
	
	export default function(symbol, name) {
		return {
			name,
			balance(address, id) {
				return new Promise((resolve, reject) => {
					let data = {
					    "command": "account_info",
					    "api_version": 1,
					    "account": address,
					    "ledger_index": "validated",
					    "signer_lists": true,
					    "id": {
					        "_WsClient": 2
					    }
					};

					const ws = new WebSocket(`wss://s2.ripple.com:51233/`);

					ws.addEventListener('open', function open() {
						ws.send(JSON.stringify(data));
					});

					ws.addEventListener('message', function message(response) {
						let r = JSON.parse(response.data);
						if (r.error) {
							ws.close();
							if (r.error === "actNotFound") resolve({ result: 0, id });
							if (r.error === "actNotFound") resolve({ error: r.error, id });
							
						} else {
							let bal = r?.result?.account_data?.Balance;
							ws.close();

						    resolve({ result: bal, id });
						}
					});
				})
			}
		}
	} 