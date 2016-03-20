// g-service.js 
// client-proxy of Genotype-service
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
    var G;
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
            G = (function () {
                function G(client, config) {
                    var _this = this;
                    var hostG = config.hostG || 'localhost', portG = config.portG || 8080, // default 8080
                    hostL = config.hostL || 'localhost', portL = config.portL || 8082, // default 8082
                    urlG = "http://" + hostG + ":" + portG;
                    // instance properties 
                    this.client = client;
                    this.name = 'g';
                    this.genotype = socket_io_client_1.default.connect(urlG);
                    this.log = new l_service_js_1.L(config);
                    // Rx: from Genotype service - name is string
                    var name_stream = rx_1.Rx.Observable.fromEvent(this.genotype, 'name')
                        .subscribe(function (name) {
                        console.log("g-proxy receives from Genotype name = " + name);
                        _this.name = name;
                    });
                    // Rx: genotype from Genotype service - _msg is JSON
                    // sends object to client
                    var g_stream = rx_1.Rx.Observable.fromEvent(this.genotype, 'g')
                        .subscribe(function (_msg) {
                        var msg = "g-proxy " + _this.name + " receives Genotype g-ch msg = " + _msg;
                        _this.log.emit(msg);
                        console.log(msg);
                        _this.client.receiveG(JSON.parse(_msg));
                    });
                }
                // send axiom/genotype to Genotype service as JSON
                // o is object
                G.prototype.emit = function (o) {
                    var msg;
                    o['name'] = this.name;
                    msg = JSON.stringify(o);
                    this.genotype.emit('g', msg);
                    msg = "\n%%% g-proxy " + this.name + " sends to Genotype g-ch msg " + msg;
                    console.log(msg);
                    this.log.emit(msg);
                };
                G = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Object, Object])
                ], G);
                return G;
            }());
            exports_1("G", G);
            ; // class
        }
    }
});
