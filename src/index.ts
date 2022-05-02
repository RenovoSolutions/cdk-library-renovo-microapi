import {
  aws_lambda as lambda,
  aws_apigateway as apigateway,
  aws_ec2 as ec2,
  aws_sqs as sqs,
  aws_iam as iam,
  aws_lambda_destinations as destinations,
  aws_logs as logs,
  // aws_certificatemanager as acm,
  Duration,
  Size,
  CfnOutput,
  Stack,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface MicroApiProps {
  /**
   * The name of the project this Micro API is for
   */
  readonly apiName: string;

  /**
   * The stage name to use for the deployment
   *
   * @default 'dev'
   */
  readonly stageName?: string;

  /**
   * The runtime to use for this Micro API
   *
   * @default lambda.Runtime.DOTNET_6
   */
  readonly runtime?: lambda.Runtime;

  /**
   * The lambda code to use for this Micro API
   */
  readonly code: lambda.Code;

  /**
   * The name of the method within your code that Lambda calls to execute your function.
   *
   * The format includes the file name. It can also include namespaces and other qualifiers, depending on the runtime. For more information:
   *
   * @see https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-features.html#gettingstarted-features-programmingmodel
   *
   * Use `Handler.FROM_IMAGE` when defining a function from a Docker image.
   *
   * NOTE: If you specify your source code as inline text by specifying the ZipFile property within the Code property, specify index.function_name as the handler.
   */
  readonly handler: string;

  /**
   * The environment variables the Lambda function will use.
   */
  readonly environment?: { [key: string]: string };

  /**
   * The vpc where the Lambda function will run.
   */
  readonly vpc: ec2.IVpc;

  /**
   * The lambda function timeout.
   *
   * @default Duration.seconds(30)
   */
  readonly timeout?: Duration;

  /**
   * The amount of memory, in MB, that is allocated to your Lambda function.
   *
   * Lambda uses this value to proportionally allocate the amount of CPU power.
   *
   * @see https://docs.aws.amazon.com/lambda/latest/dg/configuration-function-common.html#configuration-memory-console
   *
   * @default 128
   */
  readonly memorySize?: number;

  /**
   * The size of the functions `/tmp` directory in MB
   *
   * @default Size.mebibytes(512)
   */
  readonly ephemeralStorageSize?: Size;

  /**
   * The allowed origins for CORS policy on the API Gateway
   */
  readonly allowedOrigins: string[];

  /**
   * The vpc endpoint to associate the API with
   */
  readonly vpcEndpoint: ec2.IInterfaceVpcEndpoint;

  /**
   * The type of authorization to use for the API
   *
   * @default apigateway.AuthorizationType.IAM
   */
  readonly authorizationType?: apigateway.AuthorizationType;
};

/**
 * A CDK construct that creates an API Gateway and Lambda function that can be used to expose
 * a Micro API project for RenovoLive.
 */
export class MicroApi extends Construct {
  constructor(scope: Construct, id: string, props: MicroApiProps) {
    super(scope, id);

    const environment = props.environment ?? undefined;
    const stageName = props.stageName ?? 'dev';

    const deadLetterQueue = new sqs.Queue(this, 'DeadLetterQueue');

    const role = new iam.Role(this, 'ExecutionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaVPCAccessExecutionRole'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLambdaInsightsExecutionRolePolicy'),
      ],
    });

    const handlerSg = new ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc: props.vpc,
    });

    const handler = new lambda.Function(this, `handler${props.apiName}`, {
      runtime: lambda.Runtime.DOTNET_6,
      code: props.code,
      handler: props.handler,
      description: `${props.apiName} Micro API`,
      environment,
      vpc: props.vpc,
      timeout: props.timeout ?? Duration.seconds(30),
      memorySize: props.memorySize ?? 128,
      deadLetterQueue,
      ephemeralStorageSize: props.ephemeralStorageSize ?? Size.mebibytes(512),
      insightsVersion: lambda.LambdaInsightsVersion.VERSION_1_0_119_0,
      onFailure: new destinations.SqsDestination(deadLetterQueue),
      role,
      securityGroups: [
        handlerSg,
      ],
    });

    const logGroup = new logs.LogGroup(this, `LogGroup${props.apiName}`);

    const authorizationType = props.authorizationType ?? apigateway.AuthorizationType.IAM;

    const api = new apigateway.LambdaRestApi(this, `api${props.apiName}`, {
      handler,
      proxy: true,
      defaultCorsPreflightOptions: {
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowOrigins: props.allowedOrigins,
      },
      endpointConfiguration: {
        types: [apigateway.EndpointType.PRIVATE],
        vpcEndpoints: [props.vpcEndpoint],
      },
      deployOptions: {
        accessLogDestination: new apigateway.LogGroupLogDestination(logGroup),
        accessLogFormat: apigateway.AccessLogFormat.jsonWithStandardFields({
          caller: true,
          httpMethod: true,
          ip: true,
          protocol: true,
          requestTime: true,
          resourcePath: true,
          responseLength: true,
          status: true,
          user: true,
        }),
        stageName,
      },
      defaultMethodOptions: {
        authorizationType,
      },

      // https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-resource-policies-examples.html#apigateway-resource-policies-source-vpc-example
      policy: new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            principals: [new iam.AnyPrincipal()],
            actions: [
              'execute-api:Invoke',
            ],
            resources: [
              'execute-api:/*',
            ],
          }),
          new iam.PolicyStatement({
            effect: iam.Effect.DENY,
            principals: [new iam.AnyPrincipal()],
            actions: [
              'execute-api:Invoke',
            ],
            resources: [
              'execute-api:/*',
            ],
            conditions: {
              StringNotEquals: {
                'aws:SourceVpce': props.vpcEndpoint.vpcEndpointId,
              },
            },
          }),
        ],
      }),
    });

    new CfnOutput(this, 'PrivateExecuteUrl', {
      value: `https://${api.restApiId}-${props.vpcEndpoint.vpcEndpointId}.execute-api.${Stack.of(this).region}.${Stack.of(this).urlSuffix}/${api.deploymentStage.stageName}/`,
    });

    new CfnOutput(this, 'LambdaName', {
      value: handler.functionName,
    });
  }
}
