// g-service.js 
// client-proxy of Genotype-service

'use strict';

import {Injectable} from 'angular2/core';
import {Producer} from '../components/producer-component.js';
import {L} from './l-service.js';
import {Rx} from 'rx';
import sio from 'socket.io-client';


@Injectable()
export class G {
  client : Producer;
  name : String;
  log : L;
  genotype;

  constructor(client, config) {
    var hostG = config.hostG || 'localhost',
        portG = config.portG || 8080, // default 8080
        hostL = config.hostL || 'localhost', 
        portL = config.portL || 8082,  // default 8082
        urlG = `http://${hostG}:${portG}`;

    // instance properties 
    this.client = client;
    this.name = 'g';
    this.genotype = sio.connect(urlG);
    this.log = new L(config);

    // Rx: from Genotype service - name is string
    const name_stream = Rx.Observable.fromEvent(this.genotype, 'name')
          .subscribe((name) => {
            console.log(`g-proxy receives from Genotype name = ${name}`);
            this.name = name;
          });

    // Rx: genotype from Genotype service - _msg is JSON
    // sends object to client
    const g_stream = Rx.Observable.fromEvent(this.genotype, 'g')
          .subscribe((_msg) => {
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


