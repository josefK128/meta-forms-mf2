* __mf2 README__
* [1] clone the repo - call it, say, 'mf2' - cd to 'mf'
* [2] run (as admin):
```npm install```
* [3] run (as admin):
```jspm install```
* [4] in another terminal (or in bg) run server from meta-forms:
meta-forms$>```node index 0```
* [5] modify index.html
  * replace <base href= 'path to client-root'>
  * For example: suppose the repo is at $DOCUMENT_ROOT/k/meta-forms-mf2
  * then use:  <base href="/k/meta-forms-mf2/mf2/"> for the index.html
  * request URL= "http://<domain>/k/meta-forms-mf2/mf2/app/index.html"
* [6] run in browser URL = http://<domain>/<pathToDist>/mf2/app/index.html
