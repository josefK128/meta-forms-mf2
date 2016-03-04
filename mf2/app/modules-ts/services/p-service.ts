// p-service.js 
// client-proxy of Phenotype-service

'use strict';

import {Injectable} from 'angular2/core';
import {Producer} from '../components/producer-component.js';
import {L} from './l-service.js';
import {Rx} from 'rx';
import sio from 'socket.io-client';


@Injectable()
export class P {
  name : String;
  client : Producer;
  log : L;
  phenotype;

  constructor(client, _hostP, _portP, _hostL, _portL) {
    var hostP = _hostP || 'localhost',
        portP = _portP || 8081, // default 8081
        hostL = _hostL || 'localhost', 
        portL = _portL || 8082,  // default 8082
        urlP = `http://${hostP}:${portP}`;

    this.client = client;
    this.name = 'p';
    this.phenotype = sio.connect(urlP);
    this.log = new L(hostL, portL);

    // Rx: from Phenotype service - name is string
    const name_stream = Rx.Observable.fromEvent(this.phenotype, 'name')
          .subscribe((name) => {
            console.log(`p-proxy receives from Phenotype name = ${name}`);
            this.name = name;
          });
  
    // Rx: phenotype from Phenotype service - _msg is JSON
    // sends object to client
    const p_stream = Rx.Observable.fromEvent(this.phenotype, 'p')
          .subscribe((_msg) => {
            var msg = `p-proxy ${this.name} receives Phenotype p-ch msg = ${_msg}`;
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

