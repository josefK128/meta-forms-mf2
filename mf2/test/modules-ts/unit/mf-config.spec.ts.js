// mf-config.spec.ts
import {describe, expect, it, inject, beforeEachProviders} from
'angular2/testing';
import {CONFIG} from '../../../app/modules/mf-config.js';

export function main() {
  console.log('describe mf-config');
  describe('mf-config', () => {
    beforeEachProviders(() => [
      CONFIG
    ]);

    it('should define property hostG', () => {
      expect(CONFIG['hostG']).toBeDefined();
    });
    it("CONFIG['hostG'] should equal 'localhost'", () => {
      expect(CONFIG['hostG']).toEqual('localhost');
    });
  });
}  



//export interface Config {
//  hostG: string,
//  portG: number,
//  hostP: string,
//  portP: number,
//  hostL: string,
//  portL: number,
//  period: number,
//  cbg: Function,
//  cbp: Function
//};


