
const F = data => data.balance;

export default function factory (getURI, filterResult=F, headers={}) {
  return function(symbol, name) {
    return {
      name,
      balance(address) {
        return new Promise(resolve=>{
          let output = {};
          try{  
            const uri = getURI(address, symbol);
            fetch(uri, {
              method: "GET",
              headers

            }).catch(ex=>{
              output.error = ex.message
              resolve(output);

            }).then(response=>{
              const type = response.headers.get("content-type");
              if (response.status === 200) {
                let method = (/\/json/.test(type)) ? "json" : "text";
                response[method]().then(data=>{
                  output.result = parseFloat(filterResult(data, symbol));
                  resolve(output)
                })
              } else {
                output.error = response.status + ": " + response.headers.get("content-type")
                resolve(output);
              }
            });

          } catch(ex) {
              output.error = ex.message
              resolve(output);
          }
        })
      }
    }
  }
}
