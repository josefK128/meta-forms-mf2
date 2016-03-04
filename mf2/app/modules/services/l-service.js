System.register(['angular2/core', 'socket.io-client'], function(exports_1, context_1) {
    // l-service.js 
    // client of log-service
    'use strict';
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, socket_io_client_1;
    var t, L;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (socket_io_client_1_1) {
                socket_io_client_1 = socket_io_client_1_1;
            }],
        execute: function() {
            t = function () {
                return (new Date().toJSON()).replace(/^.*T/, '').replace(/Z/, '');
            };
            L = (function () {
                function L(_hostL, _portL) {
                    var hostL = _hostL || 'localhost', portL = _portL || 8082, url = "http://" + hostL + ":" + portL;
                    this.log = socket_io_client_1.default.connect(url);
                }
                L.prototype.emit = function (msg) {
                    msg = "<" + t() + "><" + performance.now() + "> " + msg;
                    this.log.emit('log', msg);
                };
                L = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Object, Object])
                ], L);
                return L;
            }());
            exports_1("L", L); // class
        }
    }
});
