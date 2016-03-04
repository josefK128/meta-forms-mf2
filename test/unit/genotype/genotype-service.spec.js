// genotype-service.spec.js
'use strict';

var Producer = require('../../../app/modules_es6/components/producer-component.js'),
    genotype = require('../../../app/modules_es6/services/genotype-service.js'),
    phenotype = require('../../../app/modules_es6/services/phenotype-service.js'),
    axiom1 = {name: '',  axiom: [2,4],
             g_rule: '+',
             p_rule: .5 },
    axiom2 = {name: '',  axiom: [3,5],
             g_rule: '*',
             p_rule: 2.0 },
    expect_genotype1 = 6,
    expect_genotype2 = 15;

    // initialize genotype-service 
    genotype.initialize();
    phenotype.initialize();

describe ("genotype-service existence", () => {
  beforeEach(() => {
  });
  afterEach(() => {
  });

  // existence tests
  it ("genotype singleton is imported", () => {
    expect(genotype).toBeDefined();
  });
});

// e2e tests
describe ("genotype-service genotype generation", () => {

  // axiom1 genotype
  it ("Genotype processes axiom1 genotype correctly", () => {
    var producer;  
    runs(() => {
      producer = new Producer();
    });
    waits(2000);
    runs(() => {
      producer.emitG(axiom1);
    });
    waits(2000);
    runs(() => {
      var o = producer.last_resultG();

      // g
      console.log(`expect_genotype1 = ${expect_genotype1}`)
      console.log(`producer.lastResultG() returns genotype = ${o.genotype}`)
      expect(o.genotype).toEqual(expect_genotype1);
    });
  });


  // axiom2 genotype
  it ("Genotype processes axiom2 genotype correctly", () => {
    var producer;  
    runs(() => {
      producer = new Producer();
    });
    waits(2000);
    runs(() => {
      producer.emitG(axiom2);
    });
    waits(2000);
    runs(() => {
      var o = producer.last_resultG();

      // g
      console.log(`expect_genotype2 = ${expect_genotype2}`)
      console.log(`producer.lastResultG() returns genotype = ${o.genotype}`)
      expect(o.genotype).toEqual(expect_genotype2);
    });
  });
});
