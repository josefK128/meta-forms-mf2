#!/bin/bash

echo "Running all unit tests (**/*.spec.js) in the test/unit branch"
entry="./node_modules/jasmine-node/bin/jasmine-node --color --verbose --junitreport --output test/unit/@reports "
command=$entry"./test/unit"
$command
