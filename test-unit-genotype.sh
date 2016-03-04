#!/bin/bash

echo "Running all tests (**/*.spec.js) in the test/unit branch"
entry="./node_modules/jasmine-node/bin/jasmine-node --color --verbose --junitreport --output test/unit/genotype/@reports "
command=$entry"./test/unit/genotype"
$command
