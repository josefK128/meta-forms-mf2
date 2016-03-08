System.register(['angular2/testing', '../../../app/modules/mf-config.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, mf_config_js_1;
    function main() {
        console.log('describe mf-config');
        testing_1.describe('mf-config', function () {
            testing_1.beforeEachProviders(function () { return [
                mf_config_js_1.CONFIG
            ]; });
            testing_1.it('should define property hostG', function () {
                testing_1.expect(mf_config_js_1.CONFIG['hostG']).toBeDefined();
            });
            testing_1.it("CONFIG['hostG'] should equal 'localhost'", function () {
                testing_1.expect(mf_config_js_1.CONFIG['hostG']).toEqual('localhost');
            });
        });
    }
    exports_1("main", main);
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (mf_config_js_1_1) {
                mf_config_js_1 = mf_config_js_1_1;
            }],
        execute: function() {
        }
    }
});
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
