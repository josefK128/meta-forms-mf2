* __README-test__

* [1] workflow for tests is generally:
* [a] write test in typescript (or javascript - skip [b])
* [b] compile to javascript via 'gulp ts2js-test' (or using tsc directly)
* [c] add the js-file-path to the array arg of Promise.all in test/index.html
* [d] run the tests using the index.html URL or by running test.sh (see next)



* [2] run tests in browser by either:
* [a] browser - request URL in address bar: 'http://<domain>/<pathToApp>/<app>/test/index.html'

  or

* [b] $> bash test.sh (for cygwin - the path will need to be edited)
* Note edit the command to 'xdg-open' for linux 
* Note edit the command to 'open' for mac 
* Note edit the command to 'cmd /c start' for windows 

