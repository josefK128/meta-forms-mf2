// mf-config.ts
import {OpaqueToken} from 'angular2/core';

export let MF_CONFIG = new OpaqueToken('mf-config');

export interface Config {
  hostG: string,
  portG: number,
  hostP: string,
  portP: number,
  hostL: string,
  portL: number
};

export const CONFIG:Config = {
  hostG: 'localhost',
  portG: 8080,
  hostP: 'localhost',
  portP: 8081,
  hostL: 'localhost',
  portL: 8082
};

