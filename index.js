'use strict';

const MAX_RESOURCES = 200;

class CloudFormationTemplateSize {
    constructor(serverless, options) {
        this.serverless = serverless;
        this.options = options;

        this.provider = this.serverless.getProvider('aws');

        this.hooks = {
            'after:package:finalize': this.countResources.bind(this)
        };
    }

    countResources() {
        let count = 0;
        const countPerType = new Map();

        const template = this.serverless.service.provider.compiledCloudFormationTemplate;
        const resources = template.Resources;
        for (let logicalName in resources) {
            if (resources.hasOwnProperty(logicalName)) {
                const resource = resources[logicalName];

                const typeCount = countPerType.get(resource.Type) || 0;
                countPerType.set(resource.Type, typeCount + 1);

                count++;
            }
        }

        this.serverless.cli.log('Total CloudFormation resources: ' + count);
        countPerType.forEach((typeCount, type) => this.serverless.cli.log(type + ': ' + typeCount));

        // https://serverless.com/blog/serverless-workaround-cloudformation-200-resource-limit/
        // A single function requires at least 4 resources, so warn if at 190 or more
        if (count > MAX_RESOURCES) {
            this.serverless.cli.log('WARNING! This deployment will fail as it is over the CloudFormation resource limit!');
        }
        else if (MAX_RESOURCES - count <= 10) {
            this.serverless.cli.log('WARNING! Getting close to the CloudFormation ' + MAX_RESOURCES + ' resource limit');
        }
    }
}
module.exports = CloudFormationTemplateSize;