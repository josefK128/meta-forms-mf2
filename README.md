* __meta-forms-mf2 README__

* Node es6-server and ng2-ts-jspm client
* [1] clone the repo to, say, meta-forms-mf2

* [2] setup (as admin):
  * ```npm install```
  * ```cd mf2```
  * ```npm install```
  * ```jspm install```
  * ```cd ../app```

* [3] run:
  meta-forms-mf2/app$>```node index 0```
  * use argv[2] = 0 which causes no node producers to be created
  * ```metaforms$> node index 0```
  * (Otherwise argv[2] is the send period for two Node producers with default period=10000ms, so a combined emit rate of 2 requests per second)


* [4] run browser ng2-client by 
  * replacing index.html <base href= 'path to client-root'>
  * For example: suppose the repo is at $DOCUMENT_ROOT/k/meta-forms-mf2
  * then use:  <base href="/k/meta-forms-mf2/mf2/"> for the base href.
  * request URL= "http://<domain>/k/meta-forms-mf2/mf2/app/index.html"

* [5] NOTE: can optionally launch two node test clients via:
  * meta-forms-mf2/app$>```node index [emit period - default 10000ms]```
  * exp: meta-forms-mf2/app$>```node index 2000``` 
     * runs a producer emit every second (two producers)

