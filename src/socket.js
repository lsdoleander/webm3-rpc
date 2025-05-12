import express from 'express';
import ws from 'express-ws';
import cors from 'cors';

export default function(app, { symbol, mod }) {

  app.post(`/${symbol}/${mod.name}/jsonrpc`, function(req, res){
      let rpc = req.body;
      doRPC(rpc).then(data=>{
        res.json(data);
      });
  });

  app.ws(`/${symbol}/${mod.name}/ws`, function(ws, req) {
    ws.on('message', function(msg) {
      let rpc = JSON.parse(msg);
      doRPC(rpc).then(data=>{
        let out = JSON.stringify(data);
        console.log(out);
        ws.send(out)
      });
    });
  });

  async function doRPC(rpc) {
      let output = {
        result: null,
        error: null,
        id: rpc.id || 0
      }

      if (!parseFloat(rpc.jsonrpc) >= 2) {
        output.error = 400
        return resolve(output)
      }
      if (rpc.method !== "getBalance") {
        output.error = 404
        return resolve(output)
      }
      if (!(rpc.params instanceof Array && rpc.params.length >= 1)) {
        output.error = 400
        return resolve(output)
      }

      let address = rpc.params[0];
      return mod.balance(address);
  }

  console.log(`jsonrpc 2.0 getBalance wrapper: /${symbol}/${mod.name}/jsonrpc websocket: /${symbol}/${mod.name}/ws`)
}