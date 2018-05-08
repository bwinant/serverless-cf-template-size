# Serverless CloudFormation Template Size

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm version](https://badge.fury.io/js/serverless-cf-template-size.svg)](https://badge.fury.io/js/serverless-cf-template-size)
[![downloads](https://img.shields.io/npm/dt/serverless-cf-template-size.svg)](https://www.npmjs.com/package/serverless-cf-template-size)

Serverless plugin that prints the number of resources in the generated CloudFormation template and warns if your project is close to the 200 resource limit.

This plugin is similar to [serverless-cloudformation-resource-counter](https://github.com/drexler/serverless-cloudformation-resource-counter)
except:
 
* It can return the size of the CloudFormation template without first having to deploy to AWS - it inspects the template after the package lifecycle event is complete.
* It outputs the count of each type of CloudFormation resource in the template.
* Prints warnings when the number of resources is close to the maximum limit.

## Setup

* Install via npm:
```
npm install serverless-cf-template-size --save-dev
```

* Update the `plugins` section of your `serverless.yml`:
```yaml
plugins:
    - serverless-cf-template-size