// producer-component.e2e.spec.js
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
    expect_phenotype1 = 3,
    expect_genotype2 = 15,
    expect_phenotype2 = 30;

    // initialize genotype-service phenotype-service
    genotype.initialize();
    phenotype.initialize();


describe ("producer-component existence", () => {
  var producer;
  beforeEach(() => {
    producer = new Producer();
  });
  afterEach(() => {
    producer = undefined;
  });

  // existence tests
  it ("Producer class is imported", () => {
    expect(Producer).toBeDefined();
  });
  it ("producer instance is created", () => {
    expect(producer).toBeDefined();
  });
  it ("Producer creates genotype-service-proxy", () => {
    expect(producer.g).toBeDefined();
  });
  it ("Producer creates phenotype-service-proxy", () => {
    expect(producer.p).toBeDefined();
  });
  it ("Producer creates log-service-proxy", () => {
    expect(producer.log).toBeDefined();
  });
});

// e2e tests
describe ("producer-component end-to-end", () => {

  // axiom1 genotype
  it ("Metaforms processes axiom1 genotype correctly", () => {
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
      var o = producer.last_resultP();

      // g
      console.log(`expect_genotype1 = ${expect_genotype1}`)
      console.log(`producer.lastResultP() returns genotype = ${o.genotype}`)
      expect(o.genotype).toEqual(expect_genotype1);
    });
  });
  // axiom1 phenotype
  it ("Metaforms processes axiom1 phenotype correctly", () => {
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
      var o = producer.last_resultP();

      // p
      console.log(`expect_phenotype1 = ${expect_phenotype1}`)
      console.log(`producer.lastResultP() returns phenotype =  ${o.phenotype}`)
      expect(o.phenotype).toEqual(expect_phenotype1);
    });
  });


  // axiom2 genotype
  it ("Metaforms processes axiom2 genotype correctly", () => {
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
      var o = producer.last_resultP();

      // g
      console.log(`expect_genotype2 = ${expect_genotype2}`)
      console.log(`producer.lastResultP() returns genotype = ${o.genotype}`)
      expect(o.genotype).toEqual(expect_genotype2);
    });
  });
  // axiom2 phenotype
  it ("Metaforms processes axiom2 phenotype correctly", () => {
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
      var o = producer.last_resultP();

      // p
      console.log(`expect_phenotype1 = ${expect_phenotype2}`)
      console.log(`producer.lastResultP() returns phenotype =  ${o.phenotype}`)
      expect(o.phenotype).toEqual(expect_phenotype2);
    });
  });
});
