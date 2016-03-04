// * log-service.js
// * writes a log-file entry via a message on socket.io channel 'log' 
// * writes an action-file entry via msg on socket.io channel 'axtion' 
"use strict";


// Setup file operations and Singleton instance
// via private closure vars
var fs = require('fs'),
    today = (new Date().toJSON()).replace(/T.*/, ''),
    p = function(){
      return (new Date().toJSON()).replace(/^.*T/, '').replace(/Z/,
      '').replace(/\..+$/, '').replace(/:/g,'-');
    },
    t = function(){
      return (new Date().toJSON()).replace(/^.*T/, '').replace(/Z/, '');
    },
    q,    
    now, 
    logfile,
    actionsfile, 
    logfile0, 
    actionsfile0,
    index = 0,
    log,
    initialized = false;


class Log {
  constructor(){
    // write GMT-today directory (if needed)
    try {
      fs.mkdirSync('../logs/' + today);
    } catch(e) {
      if ( e.code !== 'EEXIST' ){
        throw e;
      }
    }

    // files
    now = p(); 
    logfile = '../logs/' + today + '/' + now + '.log';
    actionsfile = '../logs/' + today + '/' + now + '.actions';
    logfile0 = '../logs/' + today + '/' + now + '.log0';
    actionsfile0 = '../logs/' + today + '/' + now + '.actions0';
    
    // diagnostics
    console.log("\nclient connects to log index = " + index++);
    console.log("logfile = " + logfile);
    console.log("actionsfile = " + actionsfile);
    console.log("logfile0 = " + logfile0);          // no timestamp
    console.log("actionsfile0 = " + actionsfile0); // no timestamp
    console.log("today = " + today);
    console.log("p() = " + p());
    console.log("t() = " + t());
  }

  initialize(_portL){
    var portL = _portL || 8082,  // default 8082
        action,
        message,
        o,
        Rx = require('rx'),
        async = require('async');

    if(!initialized){

      // begin listening on port for client connections
      log = require('socket.io').listen(portL);
      console.log(`log-service listening on port ${portL} channels 'log'/'action'`);
  
      // log-service connect event-handler
      log.on('connection', function (socket) {
  
        // RX: incoming-actions-handler for log
        const actions_stream = Rx.Observable.fromEvent(socket, 'actions')
          .subscribe((_action) => {
          
          async.series([
            () => {
              action = _action;
              fs.appendFile(actionsfile0, JSON.stringify(action) + ",\n", function(err) {
                if(err) {
                  return console.log(err);
                }
              });
              fs.appendFile(actionsfile, "[" + t() + "] " + JSON.stringify(action) + ",\n", function(err) {
                if(err) {
                  return console.log(err);
                }
                if(action.t){
                  console.log("t: " + action.t);
                }else{
                  console.log("id: " + action.id);
                }
                console.log("f: " + action.f);
                for(q of action.a){
                  console.log("a: a[" + q + "] = " + action.a[q]);
                }
              }); 
            }],
            (error) => {
              message = `${action} generated log-action error = ${error}`;
              log.emit('log', message);
            }
          ); // series
        });  // on-actions


        // RX: log-entry-handler for log (object)
        const log_stream = Rx.Observable.fromEvent(socket, 'log')
          .subscribe((_o) => {

          async.series([
            () => {
              o = _o;
              fs.appendFile(logfile0, JSON.stringify(o) + ",\n", function(err) {
                if(err) {
                  return console.log(err);
                }
              });
              fs.appendFile(logfile, "[" + t() + "] " + JSON.stringify(o) + ",\n", function(err) {
                if(err) {
                  return console.log(err);
                }
              }); 
            }],
            (error) => {
              message = `${o} generated log-msg-object error = ${error}`;
              log.emit('log', message);
            }
          ); // series
        }); // on-log
      });  // on-connection
    }// if(!initialized)
    initialized = true;
  } // initialize
} // class Log

// maintenance of Singleton
if(!log){
  log = new Log();  // create Log singleton instance once
}
module.exports = log;         // return Log singleton instance
