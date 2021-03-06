const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const KenquiryAws = require('../lib/kenquiry-aws-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new KenquiryAws.KenquiryAwsStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
