// l-service.js 
// client of log-service
'use strict';

var now = require('performance-now'),
    t = () => {
      return (new Date().toJSON()).replace(/^.*T/, '').replace(/Z/, '');
    };


module.exports = class  L {
  constructor(_hostL, _portL) {
    var hostL = _hostL || 'localhost',
        portL = _portL || 8082,
        url = `http://${hostL}:${portL}`;

    this.log = require('socket.io-client').connect(url);
  }

  emit(msg){
    msg = `<${t()}><${now()}> ${msg}`;
    this.log.emit('log', msg);
  }
}; // class


