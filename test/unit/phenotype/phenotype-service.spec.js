// phenotype-service.spec.js
'use strict';

var Producer = require('../../../app/modules_es6/components/producer-component.js'),
    phenotype = require('../../../app/modules_es6/services/phenotype-service.js'),
    genotype1 = {name: '',  axiom: [2,4],
             g_rule: '+',
             p_rule: .5, genotype: 6 },
    genotype2 = {name: '',  axiom: [3,5],
             g_rule: '*',
             p_rule: 2.0, genotype: 15 },
    expect_phenotype1 = 3,
    expect_phenotype2 = 30;

    // initialize genotype-service 
    phenotype.initialize();

describe ("phenotype-service existence", () => {
  beforeEach(() => {
  });
  afterEach(() => {
  });

  // existence tests
  it ("phenotype singleton is imported", () => {
    expect(phenotype).toBeDefined();
  });
});

// e2e tests
describe ("phenotype-service phenotype generation", () => {

  // axiom1 genotype
  it ("Phenotype processes  genotype1 phenotype correctly", () => {
    var producer;  
    runs(() => {
      producer = new Producer();
    });
    waits(2000);
    runs(() => {
      producer.emitP(genotype1);
    });
    waits(2000);
    runs(() => {
      var o = producer.last_resultP();

      // g
      console.log(`expect_phenotype1 = ${expect_phenotype1}`)
      console.log(`producer.lastResultP() returns phenotype = ${o.phenotype}`)
      expect(o.phenotype).toEqual(expect_phenotype1);
    });
  });


  // axiom2 genotype
  it ("Phenotype processes genotype2 phenotype correctly", () => {
    var producer;  
    runs(() => {
      producer = new Producer();
    });
    waits(2000);
    runs(() => {
      producer.emitP(genotype2);
    });
    waits(2000);
    runs(() => {
      var o = producer.last_resultP();

      // g
      console.log(`expect_phenotype2 = ${expect_phenotype2}`)
      console.log(`producer.lastResultP() returns phenotype = ${o.phenotype}`)
      expect(o.phenotype).toEqual(expect_phenotype2);
    });
  });
});
