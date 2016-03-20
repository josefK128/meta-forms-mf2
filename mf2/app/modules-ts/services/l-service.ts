// l-service.js 
// client of log-service
'use strict';

import {Injectable} from 'angular2/core';
import sio from 'socket.io-client';


var t = () => {
      return (new Date().toJSON()).replace(/^.*T/, '').replace(/Z/, '');
    };


@Injectable()
export class  L {
  log;

  constructor(config) {
    var hostL = config.hostL || 'localhost',
        portL = config.portL || 8082,
        url = `http://${hostL}:${portL}`;

    this.log = sio.connect(url);
  }

  emit(msg){
    msg = `<${t()}><${performance.now()}> ${msg}`;
    this.log.emit('log', msg);
  }
} // class


