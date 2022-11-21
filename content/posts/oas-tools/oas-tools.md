---
title: "OAS Tools v3 release"
path: "/oas-tools-v3/"
tags: ["NodeJS", "Technologies"]
featuredImage: "./cover.png"
excerpt: Announcing OAS Tools v3 release. An API-first approach to build backend services based on the OpenAPI specification.
created: 2022-11-21T23:12:00.000Z
updated: 2022-11-21
---

# OAS Tools v3 is out!

After a period of inactivity without major releases, OAS Tools v3 is finally out. The project has been resumed after being discontinued for more than a year.

You may find that the project has suffered many changes, including the creation of a GitHub organization where the repositories created by the team are found. This change comes mainly due to the huge refactorization task that has been done within the core library of the system.

The old OAS Tools library has been splitted in multiple packages, including a command line interface tool and a commons library. The core package contains the main functionality that helps implementing OpenAPI 3.X features, whereas the Commons Library and the CLI helps creating new modules and services.

## Extensible through external modules
The Commons library provides useful functionality that has helped developing the OAS Tools core library itself, and also helps developing new modules that can extend OAS Tools functionality.

Those new packages are integrated inside the execution flow, opening up the range of possibilities when initializing a server based on the OpenAPI specification. Thanks to this feature, it is possible to create validators for new standards, complex authentication modules or even telemetry packages.

Although it may seem hard to develop a complete new module for OAS Tools, it turns out to be a really easy task. Thanks to the new command line interface that is capable of generate the code scaffolding for creating any type of module!

## Interactive Command Line Tool
The new command line tool relies on the [inquirer](https://www.npmjs.com/package/inquirer) library to provide easy and interactive menus that guide you through the creation of many resources.

```sh
? Select a resource to initialize (Use arrow keys)
  Server
  Module
  Development environment
> OpenAPI File
```

You prefer inserting commands the traditional way? Don't worry, OAS Tools CLI allows using commands with many options that lets you configure your project in many ways! Just have a look at the [CLI documentation](../../docs/cli).

## OpenAPI 3.1 support
After some time OAS Tools is finally 100% compatible with OpenAPI 3.1, the latest OpenAPI version. Giving support to this new version of the OpenAPI specification has been a complicated achievement, but thanks to the [AJV](https://ajv.js.org/) the new JSON Schema draft 2020-12 can be validated and so does the OpenAPI 3.1 declaration.

Update your OpenAPI declaration and discover the new OAS Tools framework by setting a simple line to your OpenAPI document!
```yaml
openapi: 3.1.0
info:
...
```

## And more...
After many months of development, the new OAS Tools has been released, but there's definetly more to come! Stay tuned by activating notification for [GitHub Discussions](https://github.com/orgs/oas-tools/discussions) and check this new version [docs](../../docs/getting-started/overview)! .