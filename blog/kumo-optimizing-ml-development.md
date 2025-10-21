---
sidebar: false
title: "Optimizing ML Development at Kumo.ai with Velda"
description: "A case study: how Kumo.ai reduced iteration time, improved GPU utilization, and sped up onboarding by using Velda for development and experimentation."
date: 2025-10-21
author: Hema Raghavan
tags: [machine-learning, ml-workflow, cloud-computing, gpu-computing, developer-productivity, velda]
keywords: ["ML development", "GPU utilization", "Velda", "cloud development", "developer productivity", "MLOps"]
excerpt: "How Kumo.ai used Velda to accelerate experiments, cut dependency update times, and increase GPU utilization across the team."
image: "https://cdn-images-1.medium.com/max/2600/1*rpcliNv433Ui4NBb7yejSg.png"
readingTime: "6 min"
category: "Case Study"
---

# Optimizing ML Development at Kumo.ai with Velda

## Background and Challenges

At [Kumo.ai](https://kumo.ai), our ML engineers originally developed on **per-developer AWS GPU VMs (T4)**. That setup worked in the early stages but became a bottleneck as [**KumoRFM**](https://kumorfm.ai/), our relational foundation model, grew in scale and complexity.

* Training required **L40S, A100 and sometimes multi-GPU nodes**, quickly increasing costs.

* Many GPUs sat idle between runs, leading to low utilization.

* Our **production Kubernetes cluster** was designed for **end-to-end (E2E) pipelines**, not iterative development. Running just one step meant repeating full data-prep and orchestration each time.

* Our dependency stack—custom pip packages, private builds, and internal resolvers—made Docker rebuilds slow, often taking **10 minutes or more** for minor updates.

We needed a way to **iterate faster** and **experiment flexibly** with GPUs, without disturbing production or waiting on heavy image builds.


## The Solution: A Developer Journey with Velda

### Onboarding & Environment Setup

With Velda, onboarding became instant. Each engineer received a **pre-configured development environment** ready to run out of the box—no image builds or manual setup.

We reused our internal upgrade script, originally meant for local installs, which now runs directly in Velda. There’s no need to build a separate docker image just to run jobs in the cluster. The only change was forcing GPU-enabled setup, even if started from a CPU node.

This meant dependency updates that once took over ten minutes could now complete in under one.

### IDE Integration

Most of our engineers use **VS Code**, and several use **Cursor**, and some use direct SSH. Velda’s IDE plugin & CLI connects these editors directly to each developer’s Velda instance, with **no change to existing workflows**.

We continue coding, running, and debugging exactly as before—just with on-demand GPUs available whenever needed.

### Experimentation

When training, we prefix commands with `vrun`, select the GPU type (T4, L4, L40S, A100, or multi-GPU), and start. Everything happens just within a few seconds. With the logs streamed, it’s hardly noticeable that the command is actually running remotely.

```diff
- python train.py
+ vrun -P gpu-a100-8 python train.py
```

Running multiple experiments in parallel is as simple as running the command multiple times with different flags, and we often do that to find the best hyperparameters. This accelerates our development significantly.

### Keeping Production Separate

Our **production pipeline remains on Kubernetes** because it’s **customer-facing** and built around **many existing integrations**—data ingestion, observability, and internal orchestration systems.

We continue to rely on that cluster for end-to-end jobs, while **Velda powers development and experimentation**.
This separation allows rapid iteration without touching production, while maintaining reliability for customer workloads.

---

## Key Highlights

* Development environments ready in minutes—no manual setup or image builds.
* Existing dependency scripts run natively inside Velda.
* Full IDE integration for VS Code and Cursor; no workflow change.
* GPU types selected per run for maximum flexibility.
* Production workloads stay on Kubernetes for stability and customer integration.

## Impact

| Metric | Before Velda | With Velda |
|---|---|---|
| Environment setup | Manual VM / container build | Instant, pre-configured |
| Dependency updates | Docker rebuilds (10–15 min) | Direct install (< 1 min) |
| GPU utilization | ~15% | ~90% |
| Experiment throughput | 1–2 runs/day | 10+ runs/day |
| Production infrastructure | K8s E2E pipelines | Still K8s (customer-facing) |

## Improvements Identified & Ongoing Collaboration

During the proof-of-concept period, Velda and Kumo.ai collaborated closely to enhance reliability, performance, and enterprise readiness.

The following examples highlight improvements implemented during the process.

### Performance Improvements

1. **Worker Startup Optimization**

   Reduced the time to start workload on a new on-demand GPU instance to **approximately 20 seconds**, significantly improving responsiveness during development.

2. **Health and Reliability Enhancements** 

   Automated **instance health checks** and **reset session commands** were introduced to detect and recover from non-responsive sessions, improving overall stability for development workloads.

### Enterprise & DevOps Readiness

1. **Custom Security Configuration**

   Velda environments now support **data encryption, IAM integration and firewall customization** aligned with Kumo’s internal compliance and network requirements.

2. **Infrastructure as Code**
   An **easy-to-use Terraform module** was developed to allow ML engineers and DevOps teams to provision and adjust GPU pools independently, simplifying scaling and configuration management.

3. **Usage Tracking and Audit Integration**
   To align with enterprise governance requirements, **usage tracking and audit logging** were added. This enables visibility into resource usage and session history for cost monitoring and compliance.

### Ongoing Exploration

1. **Batch Mode for Long-Running Jobs**

   A new **batch execution mode** with live log streaming is under active testing.
   This allows jobs to continue running even if a session disconnects, enabling developers to detach and later reattach to view logs or results.

2. **Extended Use Cases**

   Both teams are exploring how Velda can support **CI/CD integration and pipeline automation**, extending its capabilities beyond interactive experimentation.

## Conclusion

The proof-of-concept process between Kumo.ai and Velda has been an ongoing, collaborative effort focused on improving reliability, security, and developer productivity.

The work to date has already delivered tangible results—faster iteration, higher GPU utilization, and smoother onboarding—while preserving Kumo’s existing production setup and integrations.

Both teams continue to collaborate on new capabilities and deployment patterns, using practical feedback from daily use to guide Velda’s evolution into a more flexible and enterprise-ready development platform.
