// p-service.js 
// client-proxy of Phenotype-service

'use strict';


module.exports = class  P {
  constructor(client, _hostP, _portP, _hostL, _portL) {
    var hostP = _hostP || 'localhost',
        portP = _portP || process.env.PORTP || 8081, // default 8081
        hostL = _hostL || process.env.HOSTL || 'localhost', 
        portL = _portL || process.env.PORTL || 8082,  // default 8082
        urlP = `http://${hostP}:${portP}`,
        L = require('./l-service.js');

    this.client = client;
    this.name = 'p';
    this.phenotype = require('socket.io-client').connect(urlP);
    this.log = new L(hostL, portL);

    // from Phenotype service - name is string
    this.phenotype.on('name', (name) => {
      console.log(`p-proxy receives from Phenotype name = ${name}`);
      this.name = name;
    });
  
    // from Phenotype service - _msg is JSON
    // sends object to client
    this.phenotype.on('p', (_msg) => {
      var msg = `p-proxy ${this.name} receives Phenotype p-ch msg ${_msg}`;
      this.log.emit(msg);
      console.log(msg);
      this.client.receiveP(JSON.parse(_msg));
    });
  }


  // send axiom/genotype to Phenotype service as JSON
  // o is object
  emit(o){
    var msg;
    o['name'] = this.name;
    msg = JSON.stringify(o);
    this.phenotype.emit('p', msg);
    msg = `%%% p-proxy ${this.name} sends to Phenotype p-ch msg ${msg}`;
    console.log(msg);
    this.log.emit(msg);
  }
}; // class

