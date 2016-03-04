// phenotype-service.js 
'use strict';

// Singleton instance, subscribers
var phenotype,
    log,
    subscribers = {},
    index = 1,
    initialized = false;


class  Phenotype {
  constructor() {
  }

  initialize(_portP, _hostL, _portL){
    var portP = _portP || 8081,  // default 8081
        hostL = _hostL || 'localhost',  // def 'localhost'
        portL = _portL || 8082,  // default 8082
        L = require('./l-service.js'),
        Rx = require('rx'),
        async = require('async');

    // initialize exactly once
    if(!initialized){

      // begin listening on port for client connections
      console.log(`creating Phenotype-service on portP = ${portP}`);
      phenotype = require('socket.io').listen(portP);
      console.log(`phenotype-service listening on port ${portP} channel 'p'`);
  
      // log-proxy instance
      log = new L(hostL, portL);
  
      // connection-handler
      phenotype.on('connection', function (socket) {
        var name = 's' + index++;
        console.log(`subscriber connected to phenotype with name = ${name}`);
        socket.emit('name', name);
        subscribers[name] = socket;

        // RX: msg-handler for phenotype
        const p_stream = Rx.Observable.fromEvent(socket, 'p')
          .subscribe((_msg) => {
   
          var mesg = _msg;
          async.series([
            () => {
              var msg = _msg,
                  o = JSON.parse(_msg),                
                  client = subscribers[o.name];
  
              // log received msg
              msg = `Phenotype received from ${o.name} ${msg}`,
              console.log(msg);
              log.emit(msg);
  
              // phenotype
              o['phenotype'] = o['genotype'] * o.p_rule;  
  
              msg = JSON.stringify(o);
              client.emit('p', msg);
              msg = `Phenotype sends to ${o.name} generated phenotype ${msg}`;
              console.log(msg);
              log.emit(msg);
            }],
            (error) => {
              mesg = `${mesg} generated Phenotype error = ${error}`;
              log.emit(mesg);
            }
          ); // series
        });
      });
    }// if(!initialized)
    initialized = true;
  } // initialize
} // class

// maintenance of Singleton
if(!phenotype){
  phenotype = new Phenotype();  // create Phenotype singleton instance once
}
module.exports = phenotype;     // return Phenotype singleton instance
