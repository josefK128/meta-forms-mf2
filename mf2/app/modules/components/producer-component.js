System.register(['angular2/core', 'es6-promise', '../services/g-service.js', '../services/p-service.js', '../services/l-service.js'], function(exports_1, context_1) {
    // producer-component.js 
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
    var core_1, es6_promise_1, g_service_js_1, p_service_js_1, l_service_js_1;
    var Producer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (es6_promise_1_1) {
                es6_promise_1 = es6_promise_1_1;
            },
            function (g_service_js_1_1) {
                g_service_js_1 = g_service_js_1_1;
            },
            function (p_service_js_1_1) {
                p_service_js_1 = p_service_js_1_1;
            },
            function (l_service_js_1_1) {
                l_service_js_1 = l_service_js_1_1;
            }],
        execute: function() {
            Producer = (function () {
                function Producer(config) {
                    var _this = this;
                    var hostG = config.hostG || 'localhost', // def 'localhost'
                    portG = config.portG || 8080, // default 8080
                    hostP = config.hostP || 'localhost', // def 'localhost'
                    portP = config.portP || 8081, // default 8081
                    hostL = config.hostL || 'localhost', // def 'localhost'
                    portL = config.portL || 8082; // default 8082
                    // diagnostics
                    console.log("&&&&&&&&&&&&&&&&&&&&");
                    console.log("producer: config.test = " + config.test);
                    console.log("&&&&&&&&&&&&&&&&&&&&");
                    // config
                    this.config = config;
                    // callbacks on receipt of genotype (cbg) and phenotype (cbp)
                    // they are set in callbackG, callbackP and default to null
                    this.cbg = null;
                    this.cbp = null;
                    // Promise resolve, reject - set in emitG and emitP resp.
                    this.resolveG = function (o) { o = o; };
                    this.resolveP = function (o) { o = o; };
                    // create proxies if !test - else create mocks
                    if (this.config.test === false) {
                        this.g = new g_service_js_1.G(this, hostG, portG, hostL, portL); // g-proxy instance 
                        this.p = new p_service_js_1.P(this, hostP, portP, hostL, portL); // p-proxy instance
                        this.log = new l_service_js_1.L(hostL, portL); // instance of l-proxy
                    }
                    else {
                        this.g = {
                            emit: function (o) {
                                _this.timeoutP = setTimeout(function () {
                                    _this.receiveG(o);
                                }, 1000);
                            }
                        };
                        this.p = {
                            emit: function (o) {
                                _this.timeoutP = setTimeout(function () {
                                    _this.receiveP(o);
                                }, 1000);
                            }
                        };
                        this.log = {
                            emit: function (o) { o = o; }
                        };
                    }
                } //ctor
                // set cbg - genotype callback
                Producer.prototype.callbackG = function (_cbg) {
                    if (!_cbg) {
                        return this.cbg;
                    }
                    this.cbg = _cbg;
                };
                // set cbp - phenotype callback
                Producer.prototype.callbackP = function (_cbp) {
                    if (!_cbp) {
                        return this.cbp;
                    }
                    this.cbp = _cbp;
                };
                // send axiom or genotype to Genotype - expect genotype in return
                // o is object 
                Producer.prototype.emitG = function (o) {
                    var _this = this;
                    console.log('****** Producer.emitG()');
                    this.g.emit(o);
                    return new es6_promise_1.Promise(function (resolve, reject) {
                        _this.resolveG = resolve;
                        _this.timeoutG = setTimeout(function () {
                            reject('genotype request timed out!');
                        }, 5000);
                    });
                };
                // send genotype or phenotype to Phenotype - expect phenotype in return
                // o is object
                Producer.prototype.emitP = function (o) {
                    var _this = this;
                    console.log('****** Producer.emitP()');
                    this.p.emit(o);
                    return new es6_promise_1.Promise(function (resolve, reject) {
                        _this.resolveP = resolve;
                        _this.timeoutP = setTimeout(function () {
                            reject('phenotype request timed out!');
                        }, 5000);
                    });
                };
                // called by g-service on receipt of genotype from Genotype
                // o is object
                Producer.prototype.receiveG = function (o) {
                    // deactivate promise-reject timeout
                    clearTimeout(this.timeoutG);
                    // resolve promise
                    this.resolveG(o);
                    // for test and/or subsequent processing
                    var msg = "producer " + o.name + " received GENOTYPE";
                    console.log(msg);
                    this.log.emit(msg);
                    // callback
                    if (this.config.test === false) {
                        if (this.cbg) {
                            this.cbg(o);
                        }
                        ;
                    }
                };
                // called by p-service on receipt of phenotype from Phenotype
                // o is object
                Producer.prototype.receiveP = function (o) {
                    // deactivate promise-reject timeout
                    clearTimeout(this.timeoutP);
                    // resolve promise
                    this.resolveP(o);
                    var msg = "producer " + o.name + " received PHENOTYPE";
                    console.log(msg);
                    this.log.emit(msg);
                    // callback
                    if (this.config.test === false) {
                        if (this.cbp) {
                            this.cbp(o);
                        }
                        ;
                    }
                };
                Producer = __decorate([
                    // Log-proxy class
                    core_1.Component({
                        providers: [
                            es6_promise_1.Promise
                        ]
                    }),
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Object])
                ], Producer);
                return Producer;
            }());
            exports_1("Producer", Producer);
        }
    }
});
