---
title: "Creating a Helm Chart for a simple NodeJS App"
path: "/simple-app-helm"
tags: ["Guide", "Mid-level", "Helm", "Kubernetes"]
featuredImage: "./cover.png"
excerpt: Steps on how to create a chart for a simple NodeJS app, connected to a MongoDB host and exposing its endpoints through a Kubernetes service templated with Helm.
created: 2022-02-13T04:12:00.000Z
updated: 2022-02-13
---

> **NOTE**: This guide will assume you have a basic understanding of Helm and Kubernetes and know how to run and manage a cluster. If you haven't already read my post about [Helm fundamentals](/helm-fundamentals), I encourage you to read it first.
>
> All the code in this guide is available on [GitHub](https://github.com/alesancor1/Blog-Projects/tree/main/guides/simple-app-helm)

## Introduction

For this guide, we will be deploying the simple NodeJS we build in a previous post, feel free to go [check it out](/create-simple-app) first. We will go through all the steps to set up our simple NodeJS app inside a Kubernetes cluster.

> This guide is parallel to the [Deploying a simple NodeJS App in kubernetes](/simple-app-kubernetes) guide, so you can open both posts and compare them, since both posts will follow the same exact structure.

## Creating the Database manifests

### Service

### Persistent Volume Claim

### Deployment

## Creating the App manifests

### Service

### Deployment

## Running locally on a single node cluster

## Production environments: DNS and TLS configuration

### Httpproxy

### TLS certificates

### Issuer and ClusterIssuer

## Conclusions