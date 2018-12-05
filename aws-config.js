// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.

// Copyright 2017-2018 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.

// AWS Mobile Hub Project Constants
var aws_app_analytics = 'enable';
var aws_cognito_identity_pool_id = 'us-east-1:9ca13ab0-3d28-4dda-8aa4-88bb8cf7ba4d';
var aws_cognito_region = 'us-east-1';
var aws_mobile_analytics_app_id = '5555eb2cd7d7476abacd08c09192dc3f';
var aws_mobile_analytics_app_region = 'us-east-1';
var aws_project_id = '2ec4713b-7f1b-4617-a2e9-7f35844a983c';
var aws_project_name = 'Alfred';
var aws_project_region = 'us-east-1';
var aws_resource_name_prefix = 'alfred-mobilehub-1760917209';

AWS.config.region = aws_project_region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: aws_cognito_identity_pool_id
  }, {
    region: aws_cognito_region
  });
AWS.config.update({customUserAgent: 'MobileHub v0.1'});