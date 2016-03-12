// producer-component.spec.ts
import {describe, expect, it, inject} from 'angular2/testing';
import {beforeEach, beforeEachProviders, afterEach} from 'angular2/testing';
import {Injectable, provide} from 'angular2/core';
import promise from 'es6-promise';
import {MF_CONFIG, Config, CONFIG} from '../../mocks/mf-config-mock.js';
import {Producer} from '../../../../app/modules/components/producer-component.js';


var axiom1 = { axiom: [2,4],
            g_rule: '+',
            p_rule: .5,
            genotype: 6},
    axiom2 = { axiom: [3,5],
            g_rule: '*',
            p_rule: 2.0,
            genotype: 15},
    genotype1 = { axiom: [2,4],
            g_rule: '+',
            p_rule: .5,
            genotype: 6,
            phenotype: 3},
    genotype2 = { axiom: [3,5],
            g_rule: '*',
            p_rule: 2.0,
            genotype: 15,
            phenotype: 30},
    expect_genotype1 = 6,
    expect_phenotype1 = 3,
    expect_genotype2 = 15,
    expect_phenotype2 = 30;


export function main() {
  var producer;

  console.log('describe producer-component-spec');
  describe('producer-component-spec', () => {
    beforeEachProviders(() => [
      provide(MF_CONFIG, {useValue: CONFIG})
    ]);

    beforeEach(() => {
      // diagnostics
      console.log(`producer.spec: CONFIG.test = ${CONFIG.test}`);
      producer = new Producer(CONFIG);
    });

    it('should be defined after construction from class Producer', () => {
      expect(producer).toBeDefined();
    });


    it('should correctly g-process axiom1', (done) => {
      producer.emitG(axiom1).then((o) => {
        expect(o.genotype).toEqual(expect_genotype1);
        done();
      });
    });

    it('should correctly g-process axiom2', (done) => {
    producer.emitG(axiom2).then((o) => {
        expect(o.genotype).toEqual(expect_genotype2);
        done();
      });
    });

    it('should correctly p-process genotype1', (done) => {
      producer.emitG(genotype1).then((o) => {
        expect(o.phenotype).toEqual(expect_phenotype1);
        done();
      });
    });

    it('should correctly p-process genotype2', (done) => {
    producer.emitG(genotype2).then((o) => {
        expect(o.phenotype).toEqual(expect_phenotype2);
        done();
      });
    });

    afterEach(() => {
      producer = undefined;
    });
  }); //describe
}
