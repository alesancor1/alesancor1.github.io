---
title: "Helm fundamentals: The package manager for Kubernetes"
path: "/helm-fundamentals"
tags: ["Technologies", "Mid-level", "Helm", "Kubernetes"]
featuredImage: "./cover.png"
excerpt: "Discovering the basics of Helm: Templating kubernetes manifests and deploying charts"
created: 2022-02-13
updated: 2022-02-13
---

<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }
    td, th {
        border: 1px solid #dddddd;
        padding: 8px;
    }
    th {
        text-align: center;
        background-color: #dddddd;
    }
    tr:nth-child(even) {
        background-color: #ffffff;
    }
    tr:nth-child(odd) {
        background-color: #efefef;
    }
    summary {
        cursor: pointer;
    }
</style>

> **NOTE:** This post is about the Helm package manager for Kubernetes, if you don't know about Kubernetes, please read the [Kubernetes fundamentals](/kubernetes-fundamentals) post first.

## Introduction
Helm is the package manager for kubernetes. Just like npm to node, Helm provides an easy way to install and manage software deployments inside a Kubernetes cluster. Helm is template-based, meaning that it can be used to deploy any kind of software, from microservices to complex applications.

Helm main object is called **Chart**, consisting of a set of **templates**, which are used along side a set of default values to generate valid **kubernetes manifests**. Helm charts support dependencies, allowing to create child charts that can be used to create complex applications.

> Helm templates are written in a language result of combining the **Go template language**, some extra functions and a variety of wrappers to epose certain objects to templates. Many resources on [Go templates docs](https://pkg.go.dev/text/template) may be helpful when templating with Helm.

### Helm Charts
A Chart is a collection of files that describe a related set of Kubernetes resources. A single chart might be used to deploy something simple, like a memcached pod, or something complex, like a full web app stack with HTTP servers, databases, caches, and so on. 

Charts are created as files laid out in a particular directory tree. They can be packaged into versioned archives to be deployed.

## Helm CLI

> Helm provides a command line interface for managing our Helm installation. Below is a list of commands that can be used to interact with Helm, think of it as a quick reference cheat sheet. The complete documentation on Helm CLI can be found [here](https://helm.sh/docs/helm/).

### Helm create
Creates a new chart. Running this command will create a directory named after the chart name, containing the basic [chart file structure](#chart-file-structure).

    $ helm create my-chart

### Helm list
List all of the releases for a specified namespace (uses current namespace context if not defined).

    $ helm list [flags]

<details>
<summary>Commonly used flags</summary><div style="margin-left:20px; margin-top: 15px">

| **Flag**  	| **Shortcut** 	| **Description**                             	| **Exampe**                                 	|
|-------------	|:------------:	|---------------------------------------------	|--------------------------------------------	|
| --all      	|      -a      	| Show all releases without any filters      	| ```helm list -a``` 	                        |
| --short    	|      -q      	| Short (quiet) format                          | ```helm list -q```      	                    |
| --filter    	|            	| Filter by Perl-compatible regex               | ```helm list --filter 'ara[a-z]+'```      	|

</div></details>

### Helm dependency list
List all of the dependencies for a specified chart.

    $ helm dependency list CHART [flags]

### Helm dependency update
Update the dependencies for a specified chart.

    $ helm dependency update CHART [flags]

> **NOTE:** This command is commonly used as `helm dep up`

### Helm repo add
Adds a repository containing installable helm charts. When installing a chart, dependencies repositories is automatically added.

    $ helm repo add NAME URL [flags]

<details>
<summary>Commonly used flags</summary><div style="margin-left:20px; margin-top: 15px">

| **Flag**  	                    | **Shortcut** 	| **Description**                             	
|-----------------------------------|:-------------:|--------------------------------------------- |
| --allow-deprecated-repos      	|            	| Set to true to allow adding deprecated repos |
| --username \<string\>         	|            	| Repository username                          |
| --password \<string\>  	        |            	| Repository password                          |
| --password-stdin       	        |            	| Prompts an input for the password            |

> **Warning**: Always try to use --password-stdin flag iover --password flag to avoid your password being storaged in the shell history.

</div></details>

### Helm install
Installs a new chart. The install argument must be a chart reference, a path to a packaged chart, a path to an unpacked chart directory or a URL.
    
        $ helm install NAME CHART [flags]

There are five different ways you can express the chart you want to install:

- **By chart reference:** `helm install mymaria example/mariadb`
- **By path to a packaged chart:** `helm install mynginx ./nginx-1.2.3.tgz`
- **By path to an unpacked chart directory:** `helm install mynginx ./nginx`
- **By absolute URL:** `helm install mynginx https://example.com/charts/nginx-1.2.3.tgz`
- **By chart reference and repo url:** `helm install --repo https://example.com/charts/ mynginx nginx`

<details>
<summary>Commonly used flags</summary><div style="margin-left:20px; margin-top: 15px">

| **Flag**  	      | **Shortcut** | **Description**                             	| **Exampe**                                 	     |
|-------------	      |:------------:|---------------------------------------------	|--------------------------------------------	     |
| --dependency-update |              | Show all releases without any filters      	| ```helm install example example --depency-update```|
| --dry-run    	      |              | simulate install                             | ```helm install example example --dry-run```       |
| --set     	      |            	 | set values from command line                 | ```helm install example example --set key=val```   |
| --values     	      |      -f   	 | Specify user defined YAML values file        | ```helm install example example --f values.yml```  |


</div></details>

## Creating Charts
For creating a Chart, we use the `helm create NAME` command. This command will generate the **directory structure** for a new chart.

### Chart File Structure
A chart is organized as a collection of files inside of a directory. The directory name is the name of the chart (without versioning information). Thus, a chart describing WordPress would be stored in a wordpress/ directory.

Inside of this directory, Helm will expect a structure that matches this:

    wordpress/
    Chart.yaml              # A YAML file containing information about the chart
    LICENSE                 # OPTIONAL: A plain text file containing the license for the chart
    README.md               # OPTIONAL: A human-readable README file
    values.yaml             # The default configuration values for this chart
    values.schema.json      # OPTIONAL: A JSON Schema for imposing a structure on the values.yaml file
    charts/                 # A directory containing any charts upon which this chart depends.
    crds/                   # Custom Resource Definitions
    templates/              # A directory of templates that, when combined with values,
                            # will generate valid Kubernetes manifest files.
    templates/NOTES.txt     # OPTIONAL: A plain text file containing short usage notes

Helm reserves use of the charts/, crds/, and templates/ directories, and of the listed file names. Other files will be left as they are.

### The Chart.yaml file
The chart file is required for a chart. It contains metdadta about the chart, including the name, version, description, and other information. Since Helm v3, the Chart.yaml file also contains a list of the chart dependencies. 

```yaml
apiVersion: The chart API version (required)
name: The name of the chart (required)
version: A SemVer 2 version (required)
kubeVersion: A SemVer range of compatible Kubernetes versions (optional)
description: A single-sentence description of this project (optional)
type: The type of the chart (optional)
keywords:
  - A list of keywords about this project (optional)
home: The URL of this projects home page (optional)
sources:
  - A list of URLs to source code for this project (optional)
dependencies: # A list of the chart requirements (optional)
  - name: The name of the chart (nginx)
    version: The version of the chart ("1.2.3")
    repository: (optional) The repository URL ("https://example.com/charts") or alias ("@repo-name")
    condition: (optional) A yaml path that resolves to a boolean, used for enabling/disabling charts (e.g. subchart1.enabled )
    tags: # (optional)
      - Tags can be used to group charts for enabling/disabling together
    import-values: # (optional)
      - ImportValues holds the mapping of source values to parent key to be imported. Each item can be a string or pair of child/parent sublist items.
    alias: (optional) Alias to be used for the chart. Useful when you have to add the same chart multiple times
maintainers: # (optional)
  - name: The maintainers name (required for each maintainer)
    email: The maintainers email (optional for each maintainer)
    url: A URL for the maintainer (optional for each maintainer)
icon: A URL to an SVG or PNG image to be used as an icon (optional).
appVersion: The version of the app that this contains (optional). Needn't be SemVer. Quotes recommended.
deprecated: Whether this chart is deprecated (optional, boolean)
annotations:
  example: A list of annotations keyed by name (optional).
```

### Templating
When it comes to templates, Helm will use the `{{}}` syntax to substitute values into the template. Everything we need to do is take **kubernetes manifests** and substitute values into them. Defaults values will be written to the values.yaml file, and users will be able to override them through their own values.yaml file or command line flags.

Helm provides **flow control** support and some **Built-in Objects** that makes templating generic manifests easier. Since charts can be installed multiple times with different values, we should try to make manifests as generic as possible, and use values to control the behavior of the chart.

#### Built-in Objects
The following built-in objects are available for use in templates:
* **Release**: Describes the release itself, contains the following fields:
    - *Release.Name*: The release name
    - *Release.Namespace*: The namespace to be released into (if the manifest doesn’t override)
    - *Release.IsUpgrade*: This is set to true if the current operation is an upgrade or rollback.
    - *Release.IsInstall*: This is set to true if the current operation is an install.
    - *Release.Revision*: The revision number for this release.It is incremented with each upgrade and rollback.
    - *Release.Service*: The service that is rendering the present template. On Helm, this is always Helm.

* **Values**: Values passed into the template from the *values.yaml* file and from user-supplied files. By default, Values is empty.
* **Chart**: The contents of the *Chart.yaml* file. All data is accessible through the `{{ .Chart.<Field> }}` syntax.

* **Template**: Contains information about the current template that is being executed
    - *Template.Name*: A namespaced file path to the current template *(e.g. mychart/templates/mytemplate.yaml)*
    - *Template.BasePath*: The namespaced path to the templates directory of the current chart *(e.g. mychart/templates)*

These are the most common objects, there are other ones like **Files** for access non-special files, or **Capabilities**, which provides information about the capabilities of the Kubernetes cluster.

Below is an example of a template that uses the `{{ .Values.key }}` syntax to create a service manifest by accessing the values in the Values object, appart from Built-in Objects and conditionals.

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: {{ .Chart.Name }}
  name: {{ .Chart.Name }}
  namespace: {{ .Release.Namespace }}
spec:
  {{- if eq .Values.node_env "development" }}
  type: NodePort
  {{- end }}
  ports:
    - name: {{ .Chart.Name }}
      port: {{ .Values.port }}
      protocol: TCP
      targetPort: {{ .Values.port }}
      {{- if eq .Values.node_env "development" }}
      nodePort: {{ .Values.port }}
      {{- end }}
  selector:
    app: {{ .Chart.Name }}
```

## Conclusion
Helm simplifies the creation of kubernetes manifests a lot. It may be a little confusing at the start because of Go Template syntax, but once you get used to it, templating complex manifests becomes really easy. Flow control and Dependency support brings on the capacity of generating one template for many different manifests. Besides, Helm automatically installs Kubernetes resources in order, so you don't need to worry about installing a resource before installing another one.

> **Tip**: Charts are usually uploaded to [Artifact Hub](https://artifacthub.io/), take a look at some of the most rated charts on the site.