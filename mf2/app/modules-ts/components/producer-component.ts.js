// producer-component.js 
'use strict';

import {Injectable} from 'angular2/core';
import {G} from '../services/g-service.js'; // Genotype-proxy class
import {P} from '../services/p-service.js'; // Phenotype-proxy class
import {L} from '../services/l-service.js'; // Log-proxy class


@Injectable()
export class Producer {
  g : G;
  p : P;
  log : L;
  resultG : Object;
  resultP : Object;
  cbg;
  cbp;

  constructor(_hostG, _portG, _hostP, _portP, _hostL, _portL) {
    var hostG = _hostG || 'localhost', // def 'localhost'
        portG = _portG || 8080,  // default 8080
        hostP = _hostP || 'localhost', // def 'localhost'
        portP = _portP || 8081,  // default 8081
        hostL = _hostL || 'localhost', // def 'localhost'
        portL = _portL || 8082;  // default 8082

    // create proxies
    this.g = new G(this, hostG, portG, hostL, portL);  // g-proxy instance 
    this.p = new P(this, hostP, portP, hostL, portL);  // p-proxy instance
    this.log = new L(hostL, portL);  // instance of l-proxy

    // callbacks on receipt of genotype (cbg) and phenotype (cbp)
    // they are set in callbackG, callbackP and default to null
    this.cbg = null;    
    this.cbp = null;    

    this.resultG = 'foo';  // for test
    this.resultP = 'foo';  // for test
  }


  // set cbg - genotype callback
  callbackG(_cbg){
    if(!_cbg){
      return this.cbg;
    }
    this.cbg = _cbg;
  }

  // set cbp - phenotype callback
  callbackP(_cbp){
    if(!_cbp){
      return this.cbp;
    }
    this.cbp = _cbp;
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

    // callback
    if(this.cbg){this.cbg(o)};

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

    // callback
    if(this.cbp){this.cbp(o)};
  }

  // for test and/or subsequent processing
  last_resultG(){
    return this.resultG;
  }

  // for test and/or subsequent processing
  last_resultP(){
    return this.resultP;
  }
}

