System.register(['reflect-metadata', 'angular2/core', 'angular2/platform/browser', './components/producer-component.js', './mf-config.js'], function(exports_1, context_1) {
    "use strict";
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, browser_1, producer_component_js_1, mf_config_js_1;
    var Narrative;
    return {
        setters:[
            function (_1) {},
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (producer_component_js_1_1) {
                producer_component_js_1 = producer_component_js_1_1;
            },
            function (mf_config_js_1_1) {
                mf_config_js_1 = mf_config_js_1_1;
            }],
        execute: function() {
            Narrative = (function () {
                function Narrative(config) {
                    this.name = 'foo';
                    this.config = config;
                    // diagnostics
                    console.log("narrative: config.test = " + config.test);
                    this.producer = new producer_component_js_1.Producer(config);
                    console.log("this.producer.emitG = " + this.producer.emitG);
                }
                Narrative.prototype.getConfig = function () {
                    return this.config;
                };
                Narrative.prototype.cycle = function (period, cbg, cbp) {
                    var _this = this;
                    var axiom1 = { axiom: [2, 4],
                        g_rule: '+',
                        p_rule: .5 }, axiom2 = { axiom: [10, 7],
                        g_rule: '*',
                        p_rule: 2.0 }, msg;
                    // set callbacks if they have been passed in as cycle-args
                    if (cbg) {
                        this.producer.callbackG(cbg);
                    }
                    ;
                    if (cbp) {
                        this.producer.callbackP(cbp);
                    }
                    ;
                    // webkit axiom-production cycle
                    setInterval(function () {
                        msg = (Math.random() < .5) ? axiom1 : axiom2;
                        console.log("\n\n@@@ ****** producer sent to genotype-proxy msg = " + msg);
                        _this.producer.emitG(msg).then(function (o) {
                            console.log("narrative received resolvedG-genotype " + o.genotype);
                            _this.producer.emitP(o).then(function (o) {
                                console.log("narrative received resolvedP-phenotype " + o.phenotype);
                            })
                                .catch(function (e) {
                                console.log("producer.emitP(" + o + ") returned rejectP-error: " + e);
                            });
                        })
                            .catch(function (e) {
                            console.log("producer.emitG(" + msg + ") returned rejectG-error: " + e);
                        });
                    }, period);
                };
                Narrative = __decorate([
                    core_1.Component({
                        selector: 'narrative',
                        providers: [
                            core_1.provide(mf_config_js_1.MF_CONFIG, { useValue: mf_config_js_1.CONFIG })
                        ]
                    }),
                    core_1.View({
                        template: '<input [value]="name" (keyup)="name = $event.target.value"/>My name is {{name}}'
                    }),
                    core_1.Injectable(),
                    __param(0, core_1.Inject(mf_config_js_1.MF_CONFIG)), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof mf_config_js_1.Config !== 'undefined' && mf_config_js_1.Config) === 'function' && _a) || Object])
                ], Narrative);
                return Narrative;
                var _a;
            }());
            exports_1("Narrative", Narrative);
            // bootstrap returns Promise whose resolve returns a ComponentRef
            // with property 'instance' - the instance of class Narrative
            // Therefore the Promise returned by Narrative['instance'] resolves
            // to the bootstrapped instance of class Narrative, the single property
            // of Module narrative-component
            browser_1.bootstrap(Narrative).then(function (component) {
                var narrative = component.instance, cfg = narrative.getConfig(), test, p;
                console.log("@@@@@@@@ bootstrap resolves to componentRef = " + component);
                console.log("@@@@@@@@ cfg = " + cfg);
                for (p in cfg) {
                    console.log("@@@@@@@@ cfg has property " + p);
                }
                for (p in narrative) {
                    console.log("@@@@@@@@ narrative has property " + p);
                }
                // start producer cycle of axiom->genotype->phenotype 
                test = narrative.getConfig()['test'];
                console.log("narrative.getConfig()['test'] = " + narrative.getConfig()['test']);
                console.log("test = " + test);
                if (test === false) {
                    console.log("narrative.cycle period = " + cfg.period);
                    component.instance.cycle(cfg.period, cfg.cbg, cfg.cbp);
                }
            });
        }
    }
});
