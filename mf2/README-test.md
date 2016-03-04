* __metaforms README-test__
<br>Assumes cygwin bash console on windows.


* [1] test/components/producer-component.e2e.spec is a set of 
end-to-end tests exercising the actual running services backend 
(genotype-service and phenotype-service)

mf$> ```bash test-e2e.sh```
NOTE: the last test run generates a report in ```test/e2e/reports```
<br>



* [2] unit tests for genotype and phenotype
mf$> ```bash test-unit.sh```
NOTE: the last test run generates a report in ```test/unit/reports```
<br>



