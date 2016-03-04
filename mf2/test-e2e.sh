#!/bin/bash

echo "Running all e2e tests (**/*.spec.js) in the test/e2e branch"
entry="./node_modules/jasmine-node/bin/jasmine-node --color --verbose --junitreport --output test/e2e/@reports "
command=$entry"./test/e2e"
$command
