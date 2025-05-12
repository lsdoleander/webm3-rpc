
    const TIMEOUT = 1000 /* MS */ * 60 /* S */ * 60 /* M */ * 1 // HRS;

    let cache;

	function api(URI) {
        return new Promise(resolve => {
            if (!cache || !cache[URI] || (new Date().getTime() - cache[URI].timer) > TIMEOUT) {
				
				fetch(URI).then(async response=>{

					if (response.status === 200) {
						let data = await response.json();
						if (!cache) cache = {};
						cache[URI] = {
							pools: {},
							timer: new Date().getTime()
						}
		
						for (let idx in data) {
							let pool = data[idx]; 
		                    cache[URI].pools[pool.name] = {
		                    	score: parseFloat(pool.estimate_current),
		                    	port: pool.port
		                    }
		                }
					}
					resolve(cache[URI].pools);
				}).catch(e=>{
					console.log(e)
				})

            } else {
                resolve(cache[URI].pools);
            }
		})
	}

	
	export function zergpool(){ return api('https://zergpool.com/api/status') }
	export function zpool(){ return api('https://www.zpool.ca/api/status') }
	export default {
		zergpool,
		zpool
	}