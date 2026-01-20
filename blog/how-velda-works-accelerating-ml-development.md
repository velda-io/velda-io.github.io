---
sidebar: false
title: "How Velda Works: Accelerating ML Development Without Container Overhead"
description: "Velda provides instant, reproducible ML development environments by mounting a remote root filesystem and fetching files on demand."
date: 2026-01-05
author: Chuan Qiu
tags: [velda, ml, containers, gpu, productivity]
keywords: ["velda", "remote filesystem", "lazy loading", "ML development", "container tax", "GPU"]
image: "https://substack-post-media.s3.amazonaws.com/public/images/38ae9435-cf2c-4fd8-8eb0-40e34cab4dd8_1024x572.png"
excerpt: "Velda replaces OCI images with a remotely mounted root filesystem and demand-driven file fetching, prioritizing rapid iteration for ML development."
readingTime: "4 min"
category: "Technical Overview"
---


# How Velda Works: Accelerating ML Development Without Container Overhead

A faster way to iterate on models, experiments, and GPUs—designed for ML developer productivity.

Velda provides cloud compute that feels local: instant startup, reproducible environments, and on-demand GPUs—without forcing ML engineers to build, pull, and rebuild container images.

This post explains where Velda fits, how it works under the hood, and why it’s optimized for accelerating machine learning development and research workflows.

<img src="https://substack-post-media.s3.amazonaws.com/public/images/38ae9435-cf2c-4fd8-8eb0-40e34cab4dd8_1024x572.png" />
## Containers Are Great — Just Not for This Job

OCI containers (typically built with Dockerfiles) are one of the most successful abstractions in cloud computing. They excel at what they were designed for:

- Shipping immutable, auditable artifacts
- Running long-lived production services
- Supporting security scanning and compliance workflows
- Powering large-scale orchestration systems like Kubernetes

For production systems, containers are the gold standard.

But interactive development and ML research have very different constraints:

- You iterate rapidly and change dependencies oftenG
- You spin up short-lived compute just to test ideas
- You need GPUs now, not after a long setup cycle
- You switch constantly between local and remote environments

In this context, containers impose a container tax—overhead that slows down iteration without improving correctness. Velda is built specifically for this niche.

## Quantifying the Container Tax

Consider a common setup:

- PyTorch
- CUDA 12.4
- cuDNN
- A standard Linux base image

A typical container image for this stack is ~15GB.

Over a 500 Mbps connection:

- Pulling the image alone takes ~4 minutes
- That’s before your script even starts
- You might discover a syntax error in the first line

With Velda:

- Your process starts immediately
- The GPU is available in seconds
- Most workflows reach Epoch 0 in under 30 seconds
- You can optionally snapshot your development environment for reproducibility

You pay only for the files you actually touch—not for everything that might be needed.

## What Containers Actually Provide

Under the hood, containers are composed of standard Linux primitives:

- Namespaces for isolation (PID, mount, network, user)
- cgroups for resource control (CPU, memory, GPU)
- A root filesystem defining the visible environment

OCI images are just one way of delivering that filesystem.

Velda keeps the isolation model—but replaces the filesystem delivery mechanism.

## Velda’s Core Idea: A Remote Root Filesystem

Instead of starting from an OCI image, Velda uses your existing development environment to set up your job:

1. Creates a Linux-isolated environment using namespaces and cgroups
2. Mounts a remote root filesystem as / (via NFS or FUSE)
3. Starts your process immediately
4. Fetches files only when they are accessed

From your application’s perspective, nothing changes. It sees a normal Linux filesystem.

Behind the scenes, the filesystem is lazy-loaded and demand-driven.

## On-Demand File Fetching

When your code accesses a file:

1. Velda intercepts the filesystem operation
2. Checks whether the file exists in the local cache (keyed by the file content hash)
3. Fetches it from remote storage on a cache miss
4. Stores it locally for future access

This is transparent to your application.

### About First-Access Latency

Yes—on first access, there is network latency.

For example:

- The first `import torch` might take ~10 seconds instead of 100 ms, as it also loads CUDA libraries

But compare that to:

- A 4–5 minute container image pull
- Repeated every time you rebuild or change environments

Velda makes the trade-off explicit and favorable: seconds of first-access latency instead of minutes of upfront waiting.

## Faster Startup Than Containers

Container startup typically requires:

- Pulling multi-GB image layers
- Extracting and mounting the filesystem
- Initializing the runtime
- Finally starting the process

Velda startup:

- Boot the instance from your cloud provider
- Mount the remote root filesystem
- Start the process immediately
- Fetch files as needed

GPUs become usable almost instantly.

## The Same Command, Local or Cloud

Velda preserves local-to-cloud parity.

```bash
# Local
python train.py

# Cloud GPU
vrun -P gpu-h100-1 -- python train.py
```

No Dockerfiles. No image builds. No registry pushes.

The filesystem your code accesses is identical—same Python environment, same library versions, same model checkpoints. The only difference is the compute location.

This eliminates an entire class of “works locally but fails in the cloud” debugging.

## Reproducibility Without Rebuilds

Containers enforce reproducibility through rebuilds: change a dependency, rebuild the image.

Velda separates environment definition from execution:

- The remote root filesystem defines the environment
- Developers configure the environment exactly as they do locally, using their preferred package managers
- Execution happens on any machine that mounts the filesystem

This guarantees:

- Zero drift between local and cloud environments (the same filesystem)
- No rebuild latency when changing code or dependencies
- No separate containerization or CI/CD image pipeline

## GPUs Without the Bloat

CUDA-enabled container images routinely exceed 10–15GB, most of which goes unused by any single workload.

Velda fetches GPU libraries on demand:

- Only the CUDA components your code actually uses are transferred
- Unused libraries are never downloaded
- Subsequent runs hit the local cache
- Cache entries are keyed by file content hash and can be reused across workloads

This makes GPU access feel closer to a local workstation than a deployment artifact.

## The Trade-offs: When Velda Isn’t the Best Fit

Velda is optimized for interactive development and research workflows. It is not a universal replacement for containers.

Traditional OCI containers are still the right choice when:

- You deploy long-running, stateful production services
- You operate in air-gapped environments isolated from developers
- You require pre-execution security scanning for compliance
- You run highly regulated workloads (finance, healthcare, government) that access production data

Additional trade-offs to consider:

- Network dependency: First-access performance depends on storage-to-compute bandwidth
- Cold caches: Fresh instances incur first-access latency
- Read-heavy optimization: Velda is optimized for read-heavy workloads, typical of ML

Velda is purpose-built for fast iteration, not compliance-driven deployment pipelines.

## Summary: The Right Abstraction for the Right Work

Velda combines:

1. Linux isolation using namespaces and cgroups
2. A remotely mounted root filesystem
3. Lazy, on-demand file fetching with local caching
4. Zero dependency on OCI images

Containers remain the best abstraction for production services.

Velda is the right abstraction for thinking, experimenting, and iterating with GPUs—where startup speed and environment parity matter more than artifact immutability.

[Try Velda Open Source](https://github.com/velda-io/velda/blob/main/docs/cluster_setup.md)