* __mf2 README__

* NOTE: it is necessary to have a file named 'crypto.js' in the mf2 directory,
  even if it is empty?! Without this file the following error occurs ?!:

system.src.js:5036 GET http://turandot/meta-forms-mf2/mf2/crypto.js 404 (Not Found)Z @ system.src.js:5036(anonymous function) @ system.src.js:5036(anonymous function) @ system.src.js:5036(anonymous function) @ system.src.js:5036(anonymous function) @ system.src.js:5036(anonymous function) @ system.src.js:5036(anonymous function) @ system.src.js:5036(anonymous function) @ system.src.js:5036(anonymous function) @ system.src.js:5036(anonymous function) @ system.src.js:5036
(index):43 import of narrative-component caused error: Error: Error: XHR error (404 Not Found) loading http://turandot/meta-forms-mf2/mf2/crypto.js
	Error loading http://turandot/meta-forms-mf2/mf2/crypto.js as "crypto" from http://turandot/meta-forms-mf2/mf2/jspm_packages/npm/reflect-metadata@0.1.3/Reflect.js
