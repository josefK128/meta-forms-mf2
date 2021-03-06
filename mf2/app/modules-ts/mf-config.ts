// mf-config.ts
// use OpaqueToken MF_CONFIG in provide(MF_CONFIG, {useValue: CONFIG})
// where CONFIG is the const implementation of the interface Config

import {OpaqueToken, Injectable} from 'angular2/core';

export let MF_CONFIG = new OpaqueToken('mf-config');

export interface Config {
  test: boolean;
  hostG: string;
  portG: number;
  hostP: string;
  portP: number;
  hostL: string;
  portL: number;
  period: number;
  cbg: Function;
  cbp: Function;
};

export const CONFIG:Config = {
  test: false,
  hostG: 'localhost',
  portG: 8080,
  hostP: 'localhost',
  portP: 8081,
  hostL: 'localhost',
  portL: 8082,
  period: 5000,
  cbg: (o) => {document.getElementById('display_g').innerHTML = `genotype = ${o.genotype}`;},
  cbp: (o) => {document.getElementById('display_p').innerHTML = `phenotype = ${o.phenotype}`;} 
};

