#!/bin/bash

echo "Running all unit tests (**/*.spec.js) in the test/modules branch"
entry="cygstart http://localhost/mf2t/test/index.html"
command=$entry
$command
