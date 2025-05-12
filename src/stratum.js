
import express from 'express';
import ws from 'express-ws';
import cors from 'cors';

import { PrivateKey, decrypt, encrypt } from "eciesjs";

export function server(port) {
	var app = express();
	app.use(cors());
	ws(app);

	app.ws('/', function(ws, req) {

    const context = new PrivateKey();
    ws.send(context.publicKey);

    let onmsg = function firstMessage(text) {
      const decrypted = JSON.parse(Buffer.from(decrypt(context.secret, text)).toString());
      context.clientKey = decrypted.public;

      context.stratum = net.createConnection({ host: decrypted.host, port: decrypted.port }, () => {
        stratum.on('data', (data) => {
          ws.send(encrypt(context.clientKey.toBytes(), Buffer.from(data)));
        });
      });

      onmsg = text=>context.stratum.send(Buffer.from(decrypt(context.secret, text)).toString());
    }

		ws.on('message', onmsg);
    ws.on("close", stratum.close);
	});


  app.listen(port);
}

export function client(server, host, port){
  const socket = new WebSocket(server);
  const context = new PrivateKey();

  socket.addEventListener("open", (event) => {
    let onmsg = function first(text) {
      context.serverKey = text
      let message = {
        public: context.publicKey,
        host,
        port
      }
      socket.send(encrypt(context.serverKey.toBytes(), Buffer.from(data)));
      onmsg = text=>Buffer.from(decrypt(context.secret, text)).toString();
    }
  })
}

const max = Number("0xFFFFFFFF")

export class NONCE {
  constructor() {
    this.value = 0;
  
    this.randomize = ()=>{
      this.nonces = (h=>{for (let i=1; i<=max; i++) h.push(i); return h})([]);
      this.nonces.sort(function(){
        return Math.random()<0.5?1:-1
      });
      console.log(this.nonces);
    }
  }
}

let n = new NONCE();
n.randomize();