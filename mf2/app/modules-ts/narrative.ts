// narrative.ts
import 'reflect-metadata';
import {Component, View, Injectable, Inject, provide} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {Producer} from './components/producer-component.js';
import {MF_CONFIG, Config, CONFIG} from './mf-config.js';
import promise from 'es6-promise';


@Component({
  selector: 'narrative',
  providers: [
    provide(MF_CONFIG, {useValue: CONFIG})
  ]
})
@View({
  template: '<input [value]="name" (keyup)="name = $event.target.value"/>My name is {{name}}'
})

@Injectable()
export class Narrative {
    name : string;
    count : number;
    producer : Producer;
    config : Object;

    constructor(@Inject(MF_CONFIG) config:Config) {
      this.name = 'foo';
      this.config = config;
      console.log(`Producer = ${Producer}`);
      this.producer = new Producer(config.hostG, config.portG, 
                                   config.hostP, config.portP, 
                                   config.hostL, config.portL); 
      console.log(`this.producer.emitG = ${this.producer.emitG}`);
    }


    getConfig(){
      return this.config;
    }

    cycle(period, cbg, cbp){
      var axiom1 = { axiom: [2,4],
            g_rule: '+',
            p_rule: .5 },
          axiom2 = { axiom: [3,5],
            g_rule: '*',
            p_rule: 2.0 },
            msg;

      // set callbacks if they have been passed in as cycle-args
      if(cbg){this.producer.callbackG(cbg)};
      if(cbp){this.producer.callbackP(cbp)};

      // webkit axiom-production cycle
      setInterval(() => {
        msg = (Math.random() < .5) ? axiom1 : axiom2;
        console.log(`\n\n@@@ producer sent to genotype-proxy msg = ${msg}`);
        this.producer.emitG(msg);
      }, period);
    }
}


// bootstrap returns Promise whose resolve returns a ComponentRef
// with property 'instance' - the instance of class Narrative
// Therefore the Promise returned by Narrative['instance'] resolves
// to the bootstrapped instance of class Narrative, the single property
// of Module narrative-component
bootstrap(Narrative).then((component) => {
  var narrative = component.instance,
      cfg = narrative.getConfig(),
      p;
  console.log(`@@@@@@@@ bootstrap resolves to componentRef = ${component}`);
  console.log(`@@@@@@@@ cfg = ${cfg}`);
  for(p in cfg){
    console.log(`@@@@@@@@ cfg has property ${p}`);
  }
  for(p in narrative){
    console.log(`@@@@@@@@ narrative has property ${p}`);
  }

  // start producer cycle of axiom->genotype->phenotype  
  component.instance.cycle(cfg.period, cfg.cbg, cfg.cbp);
});

