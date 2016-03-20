// p-service.js 
// client-proxy of Phenotype-service
System.register(['angular2/core', './l-service.js', 'rx', 'socket.io-client'], function(exports_1, context_1) {
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
    var core_1, l_service_js_1, rx_1, socket_io_client_1;
    var P;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (l_service_js_1_1) {
                l_service_js_1 = l_service_js_1_1;
            },
            function (rx_1_1) {
                rx_1 = rx_1_1;
            },
            function (socket_io_client_1_1) {
                socket_io_client_1 = socket_io_client_1_1;
            }],
        execute: function() {
            P = (function () {
                function P(client, config) {
                    var _this = this;
                    var hostP = config.hostP || 'localhost', portP = config.portP || 8081, // default 8081
                    hostL = config.hostL || 'localhost', portL = config.portL || 8082, // default 8082
                    urlP = "http://" + hostP + ":" + portP;
                    this.client = client;
                    this.name = 'p';
                    this.phenotype = socket_io_client_1.default.connect(urlP);
                    this.log = new l_service_js_1.L(config);
                    // Rx: from Phenotype service - name is string
                    var name_stream = rx_1.Rx.Observable.fromEvent(this.phenotype, 'name')
                        .subscribe(function (name) {
                        console.log("p-proxy receives from Phenotype name = " + name);
                        _this.name = name;
                    });
                    // Rx: phenotype from Phenotype service - _msg is JSON
                    // sends object to client
                    var p_stream = rx_1.Rx.Observable.fromEvent(this.phenotype, 'p')
                        .subscribe(function (_msg) {
                        var msg = "p-proxy " + _this.name + " receives Phenotype p-ch msg = " + _msg;
                        _this.log.emit(msg);
                        console.log(msg);
                        _this.client.receiveP(JSON.parse(_msg));
                    });
                }
                // send axiom/genotype to Phenotype service as JSON
                // o is object
                P.prototype.emit = function (o) {
                    var msg;
                    o['name'] = this.name;
                    msg = JSON.stringify(o);
                    this.phenotype.emit('p', msg);
                    msg = "%%% p-proxy " + this.name + " sends to Phenotype p-ch msg " + msg;
                    console.log(msg);
                    this.log.emit(msg);
                };
                P = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Object, Object])
                ], P);
                return P;
            }());
            exports_1("P", P);
            ; // class
        }
    }
});
