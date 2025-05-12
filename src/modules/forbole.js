
	export default function() {
		return function (address) {
			return new Promise(resolve=>{		
				const host = 'wss://ws-json-mainnet-kaspa-fullnode.forbole.com'

				const json = JSON.stringify({
					jsonrpc: "2.0",
					method: "getBalance",
					params: [address],
					id: 1 
				});

				const socket = new WebSocket(host);
				const WAIT = 10;
				let handled = false;
				let timeout;

				// Connection opened
				socket.addEventListener("open", (event) => {
				  socket.send(json);
				  timeout = setTimeout(function(){
				  	if (!handled) {
				  		handled = true;
				  		resolve({ error: `WebSocket timeout after ${WAIT}`, id: 1 })

					  socket.close();
					}
				  }, WAIT*1000)
				});

				// Listen for messages
				socket.addEventListener("message", (event) => {
					if (!handled) {
					  handled = true;
					  clearTimeout(timeout);
					  let message = event.data;
					  socket.close();
					  resolve(JSON.parse(message));
					}
				});
			});
		}
	}