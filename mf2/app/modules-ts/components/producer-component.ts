// producer-component.js 
'use strict';

import {Component, Injectable} from 'angular2/core';
import promise from 'es6-promise';
import {Promise} from 'es6-promise';
import {G} from '../services/g-service.js'; // Genotype-proxy class
import {P} from '../services/p-service.js'; // Phenotype-proxy class
import {L} from '../services/l-service.js'; // Log-proxy class


@Component({
  providers: [
    Promise
  ]
})
@Injectable()
export class Producer {
  config; 
  g : G;
  p : P;
  log : L;
  cbg;
  cbp;
  resolveG;
  resolveP;
  timeoutG;
  timeoutP;

  constructor(config) {

    var hostG = config.hostG || 'localhost', // def 'localhost'
        portG = config.portG || 8080,  // default 8080
        hostP = config.hostP || 'localhost', // def 'localhost'
        portP = config.portP || 8081,  // default 8081
        hostL = config.hostL || 'localhost', // def 'localhost'
        portL = config.portL || 8082;  // default 8082

    // diagnostics
    console.log(`&&&&&&&&&&&&&&&&&&&&`);
    console.log(`producer: config.test = ${config.test}`);
    console.log(`&&&&&&&&&&&&&&&&&&&&`);

    // config
    this.config = config;

    // callbacks on receipt of genotype (cbg) and phenotype (cbp)
    // they are set in callbackG, callbackP and default to null
    this.cbg = null;    
    this.cbp = null;    

    // Promise resolve, reject - set in emitG and emitP resp.
    this.resolveG = (o) => {o = o;};
    this.resolveP = (o) => {o = o;};

    // create proxies if !test - else create mocks
    if(this.config.test === false){
      this.g = new G(this, hostG, portG, hostL, portL);  // g-proxy instance 
      this.p = new P(this, hostP, portP, hostL, portL);  // p-proxy instance
      this.log = new L(hostL, portL);  // instance of l-proxy
    }else{
      this.g = {
        emit: (o) => {
          this.timeoutP = setTimeout(() => {
            this.receiveG(o);
          }, 1000);
        }
      };
      this.p = {
        emit: (o) => {
          this.timeoutP = setTimeout(() => {
            this.receiveP(o);
          }, 1000);
        }
      };
      this.log = { 
        emit: (o) => {o = o;}
      };
    }
  }//ctor


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
    console.log('****** Producer.emitG()');
    this.g.emit(o);
    return new Promise((resolve, reject) => {
      this.resolveG = resolve;
      this.timeoutG = setTimeout(() => {
        reject('genotype request timed out!');
      }, 5000);
    });
  }

  // send genotype or phenotype to Phenotype - expect phenotype in return
  // o is object
  emitP(o){
    console.log('****** Producer.emitP()');
    this.p.emit(o);
    return new Promise((resolve, reject) => {
      this.resolveP = resolve;
      this.timeoutP = setTimeout(() => {
        reject('phenotype request timed out!');
      }, 5000);
    });
  }

  // called by g-service on receipt of genotype from Genotype
  // o is object
  receiveG(o){
    // deactivate promise-reject timeout
    clearTimeout(this.timeoutG);

    // resolve promise
    this.resolveG(o);

    // for test and/or subsequent processing
    var msg = `producer ${o.name} received GENOTYPE`;
    console.log(msg);
    this.log.emit(msg);

    // callback
    if(this.config.test === false){
      if(this.cbg){this.cbg(o);};
    }
  }

  // called by p-service on receipt of phenotype from Phenotype
  // o is object
  receiveP(o){
    // deactivate promise-reject timeout
    clearTimeout(this.timeoutP);

    // resolve promise
    this.resolveP(o);

    var msg = `producer ${o.name} received PHENOTYPE`;
    console.log(msg);
    this.log.emit(msg);

    // callback
    if(this.config.test === false){
      if(this.cbp){this.cbp(o);};
    }
  }
}

