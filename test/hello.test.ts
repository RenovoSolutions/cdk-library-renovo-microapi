import * as path from 'path';
import {
  App,
  Stack,
  aws_ec2 as ec2,
  aws_lambda as lambda,
} from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { MicroApi } from '../src/index';

test('Snapshot', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack', {});

  const vpc = new ec2.Vpc(stack, 'Vpc', {});
  const sg = new ec2.SecurityGroup(stack, 'SecurityGroup', {
    vpc,
  });

  const vpcEndpoint = ec2.InterfaceVpcEndpoint.fromInterfaceVpcEndpointAttributes(stack, 'VpcEndpoint', {
    vpcEndpointId: 'vpce-0f8f8f8f8f8f8f8f8f',
    port: 443,
  });

  const buildCommands = [
    'export DOTNET_CLI_HOME="/tmp/DOTNET_CLI_HOME"',
    'export PATH="$PATH:/tmp/DOTNET_CLI_HOME/.dotnet/tools"',
    'dotnet tool install -g Amazon.Lambda.Tools',
    'dotnet lambda package -o output.zip',
    'unzip -o -d /asset-output output.zip',
  ];

  const code = lambda.Code.fromAsset(path.join(__dirname, 'lambda/src/lambda'), {
    bundling: {
      image: lambda.Runtime.DOTNET_6.bundlingImage,
      command: [
        'bash', '-c', buildCommands.join(' && '),
      ],
    },
  });

  new MicroApi(stack, 'TestMicroApi', {
    vpc,
    code,
    apiName: 'APIExample',
    handler: 'lambda::lambda.Function::FunctionHandler',
    destinationSecurityGroup: sg,
    destinationPort: ec2.Port.tcp(1433),
    allowedOrigins: ['*'],
    vpcEndpoint,
  });

  expect(Template.fromStack(stack)).toMatchSnapshot();
});
