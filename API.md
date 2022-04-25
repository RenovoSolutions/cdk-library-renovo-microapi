# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### MicroApi <a name="MicroApi" id="@renovosolutions/cdk-library-renovo-microapi.MicroApi"></a>

A CDK construct that creates an API Gateway and Lambda function that can be used to expose a Micro API project for RenovoLive.

#### Initializers <a name="Initializers" id="@renovosolutions/cdk-library-renovo-microapi.MicroApi.Initializer"></a>

```typescript
import { MicroApi } from '@renovosolutions/cdk-library-renovo-microapi'

new MicroApi(scope: Construct, id: string, props: MicroApiProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApi.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApi.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApi.Initializer.parameter.props">props</a></code> | <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApiProps">MicroApiProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@renovosolutions/cdk-library-renovo-microapi.MicroApi.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@renovosolutions/cdk-library-renovo-microapi.MicroApi.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@renovosolutions/cdk-library-renovo-microapi.MicroApi.Initializer.parameter.props"></a>

- *Type:* <a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApiProps">MicroApiProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApi.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@renovosolutions/cdk-library-renovo-microapi.MicroApi.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApi.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@renovosolutions/cdk-library-renovo-microapi.MicroApi.isConstruct"></a>

```typescript
import { MicroApi } from '@renovosolutions/cdk-library-renovo-microapi'

MicroApi.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@renovosolutions/cdk-library-renovo-microapi.MicroApi.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApi.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="@renovosolutions/cdk-library-renovo-microapi.MicroApi.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### MicroApiProps <a name="MicroApiProps" id="@renovosolutions/cdk-library-renovo-microapi.MicroApiProps"></a>

#### Initializer <a name="Initializer" id="@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.Initializer"></a>

```typescript
import { MicroApiProps } from '@renovosolutions/cdk-library-renovo-microapi'

const microApiProps: MicroApiProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.allowedOrigins">allowedOrigins</a></code> | <code>string[]</code> | The allowed origins for CORS policy on the API Gateway. |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.apiName">apiName</a></code> | <code>string</code> | The name of the project this Micro API is for. |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.code">code</a></code> | <code>aws-cdk-lib.aws_lambda.Code</code> | The lambda code to use for this Micro API. |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.handler">handler</a></code> | <code>string</code> | The name of the method within your code that Lambda calls to execute your function. |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.vpc">vpc</a></code> | <code>aws-cdk-lib.aws_ec2.IVpc</code> | The vpc where the Lambda function will run. |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.vpcEndpoint">vpcEndpoint</a></code> | <code>aws-cdk-lib.aws_ec2.IInterfaceVpcEndpoint</code> | The vpc endpoint to associate the API with. |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.authorizationType">authorizationType</a></code> | <code>aws-cdk-lib.aws_apigateway.AuthorizationType</code> | The type of authorization to use for the API. |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.environment">environment</a></code> | <code>{[ key: string ]: string}</code> | The environment variables the Lambda function will use. |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.ephemeralStorageSize">ephemeralStorageSize</a></code> | <code>aws-cdk-lib.Size</code> | The size of the functions `/tmp` directory in MB. |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.memorySize">memorySize</a></code> | <code>number</code> | The amount of memory, in MB, that is allocated to your Lambda function. |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.runtime">runtime</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime</code> | The runtime to use for this Micro API. |
| <code><a href="#@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | The lambda function timeout. |

---

##### `allowedOrigins`<sup>Required</sup> <a name="allowedOrigins" id="@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.allowedOrigins"></a>

```typescript
public readonly allowedOrigins: string[];
```

- *Type:* string[]

The allowed origins for CORS policy on the API Gateway.

---

##### `apiName`<sup>Required</sup> <a name="apiName" id="@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.apiName"></a>

```typescript
public readonly apiName: string;
```

- *Type:* string

The name of the project this Micro API is for.

---

##### `code`<sup>Required</sup> <a name="code" id="@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.code"></a>

```typescript
public readonly code: Code;
```

- *Type:* aws-cdk-lib.aws_lambda.Code

The lambda code to use for this Micro API.

---

##### `handler`<sup>Required</sup> <a name="handler" id="@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.handler"></a>

```typescript
public readonly handler: string;
```

- *Type:* string

The name of the method within your code that Lambda calls to execute your function.

The format includes the file name. It can also include namespaces and other qualifiers, depending on the runtime. For more information:

> [https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-features.html#gettingstarted-features-programmingmodel

Use `Handler.FROM_IMAGE` when defining a function from a Docker image.

NOTE: If you specify your source code as inline text by specifying the ZipFile property within the Code property, specify index.function_name as the handler.](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-features.html#gettingstarted-features-programmingmodel

Use `Handler.FROM_IMAGE` when defining a function from a Docker image.

NOTE: If you specify your source code as inline text by specifying the ZipFile property within the Code property, specify index.function_name as the handler.)

---

##### `vpc`<sup>Required</sup> <a name="vpc" id="@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.vpc"></a>

```typescript
public readonly vpc: IVpc;
```

- *Type:* aws-cdk-lib.aws_ec2.IVpc

The vpc where the Lambda function will run.

---

##### `vpcEndpoint`<sup>Required</sup> <a name="vpcEndpoint" id="@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.vpcEndpoint"></a>

```typescript
public readonly vpcEndpoint: IInterfaceVpcEndpoint;
```

- *Type:* aws-cdk-lib.aws_ec2.IInterfaceVpcEndpoint

The vpc endpoint to associate the API with.

---

##### `authorizationType`<sup>Optional</sup> <a name="authorizationType" id="@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.authorizationType"></a>

```typescript
public readonly authorizationType: AuthorizationType;
```

- *Type:* aws-cdk-lib.aws_apigateway.AuthorizationType
- *Default:* apigateway.AuthorizationType.IAM

The type of authorization to use for the API.

---

##### `environment`<sup>Optional</sup> <a name="environment" id="@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.environment"></a>

```typescript
public readonly environment: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

The environment variables the Lambda function will use.

---

##### `ephemeralStorageSize`<sup>Optional</sup> <a name="ephemeralStorageSize" id="@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.ephemeralStorageSize"></a>

```typescript
public readonly ephemeralStorageSize: Size;
```

- *Type:* aws-cdk-lib.Size
- *Default:* Size.mebibytes(512)

The size of the functions `/tmp` directory in MB.

---

##### `memorySize`<sup>Optional</sup> <a name="memorySize" id="@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.memorySize"></a>

```typescript
public readonly memorySize: number;
```

- *Type:* number
- *Default:* 128

The amount of memory, in MB, that is allocated to your Lambda function.

Lambda uses this value to proportionally allocate the amount of CPU power.

> [https://docs.aws.amazon.com/lambda/latest/dg/configuration-function-common.html#configuration-memory-console](https://docs.aws.amazon.com/lambda/latest/dg/configuration-function-common.html#configuration-memory-console)

---

##### `runtime`<sup>Optional</sup> <a name="runtime" id="@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.runtime"></a>

```typescript
public readonly runtime: Runtime;
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime
- *Default:* lambda.Runtime.DOTNET_6

The runtime to use for this Micro API.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@renovosolutions/cdk-library-renovo-microapi.MicroApiProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* Duration.seconds(30)

The lambda function timeout.

---



