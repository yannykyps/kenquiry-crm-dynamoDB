#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { KenquiryAwsStack } = require('../lib/kenquiry-aws-stack');

const app = new cdk.App();
new KenquiryAwsStack(app, 'KenquiryAwsStack');
