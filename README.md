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
meta-forms-mf2/app$>
  ```node index 0```

* [4] NOTE: can optionally launch two node test clients via:
  * meta-forms-mf2/app$>```node index [emit period - default 10000ms]```
  * exp: meta-forms-mf2/app$>```node index 2000``` 
     * runs a producer emit every second (two producers)

* [5] run browser ng2-client by requesting URL:
```http://<domain>/<pathto-app>/<app>/app/index.html```

