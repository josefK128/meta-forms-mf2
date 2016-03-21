* __meta-forms-mf2 README-test__


* [1] test/components/producer-component.e2e.spec is a set of 
end-to-end tests exercising the actual running services backend 
(genotype-service and phenotype-service)

  * to run the e2e test:
    * meta-forms-mf2$> ```bash test-e2e.sh```
    * NOTE: the last test run generates a report in ```test/e2e/@reports```




* [2] unit tests for genotype and phenotype
  * genotype unit test uses phenotype-service-mock
  * phenotype unit test uses genotype-service-mock

  * to run the unit tests:
    * meta-forms-mf2$> ```bash test-unit-genotype.sh```
    * NOTE: the last test run generates a report in ```test/unit/@reports```




* [3] Each unit test can also be run separately 
  * [a] unit test for genotype using phenotype-service-mock
    * meta-forms-mf2$> ```bash test-unit-genotype.sh```
    * NOTE: the last test run generates a report in ```test/unit/genotype/@reports```
  * [b] unit test for phenotype-service using genotype-service-mock
    * meta-forms-mf2$> ```bash test-unit-phenotype.sh```
    * NOTE: the last test run generates a report in ```test/unit/phenotype/reports```
