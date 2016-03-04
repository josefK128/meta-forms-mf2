System.register(['angular2/core', '../services/g-service.js', '../services/p-service.js', '../services/l-service.js'], function(exports_1, context_1) {
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
    var core_1, g_service_js_1, p_service_js_1, l_service_js_1;
    var Producer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
                function Producer(_hostG, _portG, _hostP, _portP, _hostL, _portL) {
                    var hostG = _hostG || 'localhost', // def 'localhost'
                    portG = _portG || 8080, // default 8080
                    hostP = _hostP || 'localhost', // def 'localhost'
                    portP = _portP || 8081, // default 8081
                    hostL = _hostL || 'localhost', // def 'localhost'
                    portL = _portL || 8082; // default 8082
                    // create proxies
                    this.g = new g_service_js_1.G(this, hostG, portG, hostL, portL); // g-proxy instance 
                    this.p = new p_service_js_1.P(this, hostP, portP, hostL, portL); // p-proxy instance
                    this.log = new l_service_js_1.L(hostL, portL); // instance of l-proxy
                    // callbacks on receipt of genotype (cbg) and phenotype (cbp)
                    // they are set in callbackG, callbackP and default to null
                    this.cbg = null;
                    this.cbp = null;
                    this.resultG = 'foo'; // for test
                    this.resultP = 'foo'; // for test
                }
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
                    this.g.emit(o);
                };
                // send genotype or phenotype to Phenotype - expect phenotype in return
                // o is object
                Producer.prototype.emitP = function (o) {
                    this.p.emit(o);
                };
                // called by g-service on receipt of genotype from Genotype
                // o is object
                Producer.prototype.receiveG = function (o) {
                    // for test and/or subsequent processing
                    var msg = "producer " + o.name + " received GENOTYPE";
                    console.log(msg);
                    this.log.emit(msg);
                    this.resultG = o;
                    // callback
                    if (this.cbg) {
                        this.cbg(o);
                    }
                    ;
                    // test framework ONLY
                    this.p.emit(this.resultG);
                };
                // called by p-service on receipt of phenotype from Phenotype
                // o is object
                Producer.prototype.receiveP = function (o) {
                    var msg = "producer " + o.name + " received PHENOTYPE";
                    console.log(msg);
                    this.log.emit(msg);
                    this.resultP = o;
                    // callback
                    if (this.cbp) {
                        this.cbp(o);
                    }
                    ;
                };
                // for test and/or subsequent processing
                Producer.prototype.last_resultG = function () {
                    return this.resultG;
                };
                // for test and/or subsequent processing
                Producer.prototype.last_resultP = function () {
                    return this.resultP;
                };
                Producer = __decorate([
                    // Log-proxy class
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Object, Object, Object, Object, Object, Object])
                ], Producer);
                return Producer;
            }());
            exports_1("Producer", Producer);
        }
    }
});
