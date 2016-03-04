// producer-component.js 
'use strict';

// Observables, Singleton instance, subscribers
var Rx = require('rx');

  // exercise Rx
  Rx.Observable.just('\nhello Producer Rx').subscribe(function(v){
    //console.log(v);
  });


module.exports = class Producer {
  constructor(_hostG, _portG, _hostP, _portP, _hostL, _portL) {
    var hostG = _hostG || process.env.HOSTG || 'localhost', // def 'localhost'
        portG = _portG || process.env.PORTG || 8080,  // default 8080
        hostP = _hostP || process.env.HOSTL || 'localhost', // def 'localhost'
        portP = _portP || process.env.PORTL || 8081,  // default 8081
        hostL = _hostL || process.env.HOSTL || 'localhost', // def 'localhost'
        portL = _portL || process.env.PORTL || 8082,  // default 8082
        G = require('../services/g-service.js'), // Genotype-proxy class
        P = require('../services/p-service.js'), // Phenotype-proxy class
        L = require('../services/l-service.js'); // Log-proxy class

    this.g = new G(this, hostG, portG, hostL, portL);  // g-proxy instance 
    this.p = new P(this, hostP, portP, hostL, portL);  // p-proxy instance
    this.log = new L(hostL, portL);  // instance of l-proxy
    this.resultG = 'foo';  // for test
    this.resultP = 'foo';  // for test
  }


  // send axiom or genotype to Genotype - expect genotype in return
  // o is object 
  emitG(o){
    this.g.emit(o);
  }

  // send genotype or phenotype to Phenotype - expect phenotype in return
  // o is object
  emitP(o){
    this.p.emit(o);
  }

  // called by g-service on receipt of genotype from Genotype
  // o is object
  receiveG(o){
    // for test and/or subsequent processing
    var msg = `producer ${o.name} received GENOTYPE`;
    console.log(msg);
    this.log.emit(msg);
    this.resultG = o;

    // test framework ONLY
    this.p.emit(this.resultG);
  }

  // called by p-service on receipt of phenotype from Phenotype
  // o is object
  receiveP(o){
    var msg = `producer ${o.name} received PHENOTYPE`;
    console.log(msg);
    this.log.emit(msg);
    this.resultP = o;
  }

  // for test and/or subsequent processing
  last_resultG(){
    return this.resultG;
  }

  // for test and/or subsequent processing
  last_resultP(){
    return this.resultP;
  }
}; //class

