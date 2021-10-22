#!/usr/bin/env node
import 'source-map-support/register';
import { App } from '@aws-cdk/core';
import { ManifoldAwsFrontendStackLib } from '@manifoldxyz/manifold-aws-frontend-stack-lib'

const app = new App();
new ManifoldAwsFrontendStackLib(app, 'RoyaltyRegistryStack', {
  websiteName: 'RoyaltyRegistry',
  domainName: 'royaltyregistry.xyz',
  alternativeDomains: ['www.royaltyregistry.xyz', '*.royaltyregistry.xyz'],
  env: {
    account: '743799374440',
    region: 'us-east-1'
  }
})
