// genotype-service.js 
'use strict';

// Observables, Singleton instance, subscribers
var Rx = require('rx'),
    async = require('async'),
    genotype,
    log,
    subscribers = {},
    index = 1,
    initialized = false;

  // exercise Rx
  Rx.Observable.just('\nhello Genotype Rx').subscribe((v) => {
    //console.log(v);
  });


class  Genotype {
  constructor() {
  }

  initialize(_portG, _hostL, _portL) {
    var portG = _portG || 8080,  // default 8080
        hostL = _hostL || 'localhost', // def 'localhost'
        portL = _portL || 8082,  // default 8082
        L = require('./l-service.js');

    // initialize exactly once
    if(!initialized){

      // begin listening on port for client connections
      console.log(`creating Genotype-service on portG = ${portG}`);
      genotype = require('socket.io').listen(portG);
      console.log(`genotype-service listening on port ${portG} channel 'g'`);
  
      // log-proxy instance
      log = new L(hostL, portL);
  
      // connection-handler
      genotype.on('connection', (socket) => {
        var name = 's' + index++;
        console.log(`subscriber connected to genotype with name = ${name}`);
        socket.emit('name', name);
        subscribers[name] = socket;
      
        // msg-handler for genotype
        socket.on("g", (_msg) => {
          var mesg = _msg;

          async.series([
            () => {
              var msg = _msg,                  
                  o = JSON.parse(_msg),
                  client = subscribers[o.name];
                    
              // log received msg
              msg =  `\nGenotype received from ${o.name} ${msg}`;
              console.log(msg);
              log.emit(msg);
  
              // genetype
              switch(o.g_rule) {
                case '+':
                  o['genotype'] = o.axiom[0] + o.axiom[1];
                  break;
                case '*':
                  o['genotype'] = o.axiom[0] * o.axiom[1];
                  break;
                default:
                  o['genotype'] = 0;
                  console.log(`unrecognized g_rule ${o.g_rule}`);
              }
        
              msg = JSON.stringify(o);
              client.emit('g', msg);
              msg = `Genotype sends to ${o.name} generated genotype ${msg}`;
              console.log(msg);
              log.emit(msg);
            }],
            (error) => {
              mesg = `${mesg} generated Genotype error = ${error}`;
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
if(!genotype){
  genotype = new Genotype();  // create Genotype singleton instance once
}
module.exports = genotype;     // return Genotype singleton instance
