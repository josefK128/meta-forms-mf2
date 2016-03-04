// g-service.js 
// client-proxy of Genotype-service

'use strict';


module.exports = class  G {
  constructor(client, _hostG, _portG, _hostL, _portL) {
    var hostG = _hostG || 'localhost',
        portG = _portG || process.env.PORTG || 8080, // default 8080
        hostL = _hostL || process.env.HOSTL || 'localhost', 
        portL = _portL || process.env.PORTL || 8082,  // default 8082
        urlG = `http://${hostG}:${portG}`,
        L = require('./l-service.js');

    this.client = client;
    this.name = 'g';
    this.genotype = require('socket.io-client').connect(urlG);
    this.log = new L(hostL, portL);

    // from Genotype service - name is string
    this.genotype.on('name', (name) => {
      console.log(`g-proxy receives from Genotype name = ${name}`);
      this.name = name;
    });
  
    // from Genotype service - _msg is JSON
    // sends object to client
    this.genotype.on('g', (_msg) => {
      var msg = `g-proxy ${this.name} receives Genotype g-ch msg = ${_msg}`;
      this.log.emit(msg);
      console.log(msg);
      this.client.receiveG(JSON.parse(_msg));
    });
  }


  // send axiom/genotype to Genotype service as JSON
  // o is object
  emit(o){
    var msg;
    o['name'] = this.name;
    msg = JSON.stringify(o);
    this.genotype.emit('g', msg);
    msg = `\n%%% g-proxy ${this.name} sends to Genotype g-ch msg ${msg}`;
    console.log(msg);
    this.log.emit(msg);
  }
}; // class


