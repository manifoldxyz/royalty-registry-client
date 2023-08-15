#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { ManifoldAwsFrontendStackLib } from '@manifoldxyz/aws-frontend-stack-lib'

const app = new cdk.App()
new ManifoldAwsFrontendStackLib(app, 'RoyaltyRegistryStack', {
  websiteName: 'RoyaltyRegistry',
  domainName: 'royaltyregistry.xyz',
  env: {
    account: process.env.AWS_ACCOUNT,
    region: 'us-east-1'
  }
})
