---
sidebar: false
title: "What Is a Velda Pool? Autoscaling Compute Pools for Cloud, Kubernetes, and VMs"
description: "The hidden worker layer that makes vrun feel local while scaling across cloud, Kubernetes, and data centers."
date: 2026-01-20
author: Chuan Qiu
tags: [velda, pool, autoscaling, kubernetes, cloud, workers]
keywords: ["velda pool", "autoscaling", "compute pool", "workers", "vrun"]
image: "https://substack-post-media.s3.amazonaws.com/public/images/09fb360c-6d66-4fa5-afdf-34291d44f675_1024x559.png"
excerpt: "A Velda pool manages worker lifecycle (create, verify, retire) so `vrun` can scale compute across clouds, Kubernetes, and data centers without manual VM provisioning."
readingTime: "6 min"
category: "Technical Overview"
orig_url: https://veldaio.substack.com/p/69f953e4-a57c-45e0-8617-03bdc60433c7
---

# What Is a Velda Pool? Autoscaling Compute Pools for Cloud, Kubernetes, and VMs

The hidden worker layer that makes `vrun` feel local while scaling across cloud, Kubernetes, and data centers.

If you’re familiar with Velda’s `vrun`, you may notice that `pool` is the most important parameter that captures everything needed about what compute it is. What’s the magic behind that?

From a user’s point of view, a Velda pool is simply a source of compute workers that appear when needed and disappear when they’re no longer useful. You don’t provision cloud VMs manually, you don’t manage Kubernetes nodes, and you don’t track which machine is alive. You just run work — and the pool takes care of the rest.

Behind the scenes, a Velda pool is an autoscaling compute pool that manages how compute capacity is created, reused, and retired across cloud infrastructure, Kubernetes clusters, or data centers.

This article explains what a Velda pool is, how autoscaling works, and why Velda uses pool-based scheduling.

<img src="https://substackcdn.com/image/fetch/$s_!KkNk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F09fb360c-6d66-4fa5-afdf-34291d44f675_1024x559.png" />

## The Core Idea: Compute Pools Manage Workers, Not Jobs

Velda pools can operate in two modes:

- Autoscaling pools — workers are created and removed dynamically based on demand and policy
- Fixed-size pools — a predefined number of workers are created and kept running

Most of this document focuses on autoscaling pools, since they power the on-demand, cost-efficient experience behind `vrun`. Fixed-size pools follow the same lifecycle model, but without automatic scale-up or scale-down decisions.

A Velda pool is responsible for workers, not jobs.

- A worker is a compute unit (VM, container, node, or machine)
- Each worker runs a small background service called the `velda-agent`
- The agent connects back to Velda and waits for work

The pool’s job is to:

- Bring workers up when more capacity is needed
- Shut workers down when they’re idle
- Detect and clean up broken or abandoned workers

This separation is important: jobs come and go frequently, but workers are longer‑lived and need careful lifecycle management.

## Generic Autoscaling: The Minimum Pool Contract

At its simplest, a pool only needs to answer three questions:

1. Can you give me one more worker? When Velda needs capacity, it asks the pool to create a new worker.
2. Can you remove this worker? When a worker is no longer needed, Velda asks the pool to delete it.
3. What workers exist right now? Periodically, Velda asks the pool for a list of workers it believes are alive.

This minimal contract is what allows Velda to work with any infrastructure:

- Cloud virtual machines
- Kubernetes nodes or pods
- On‑prem servers
- Bare‑metal racks
- Even custom scripts that shell out to an internal system

As long as the pool can create, delete, and list workers, Velda can manage it.

## What Happens When a Worker Is Created

When a pool creates a worker, it is expected to do three things:

1. Provision compute — this could be a VM, a container, or a node — Velda doesn’t care.
2. Start the `velda-agent` daemon — the agent is what connects the worker back to Velda.
3. Return the expected worker name — this name is important. Velda uses it to verify that the worker which connects is the one it asked for.

If a worker never connects, or a different name shows up, Velda treats that as a problem and cleans it up.

## Continuous Drift Detection

Infrastructure drifts. Machines crash, cloud APIs fail, and humans interfere.

To stay correct, Velda regularly asks the pool: “What workers do you believe exist right now?”

This periodic check allows Velda to:

- Detect zombie workers that exist but aren’t connected
- Detect ghost connections from workers that shouldn’t exist
- Reconcile mismatches automatically

If something looks wrong, Velda can safely terminate and replace workers without user involvement.

## Pools Define What Compute Resources a Workload Can Use

A pool doesn’t just decide when to scale — it also defines what kind of compute a workload is allowed to run on.

Even in a fixed-size cluster, you may still define multiple pools to partition resources:

- Different hardware types (CPU vs GPU, large memory nodes, etc.)
- Different performance or cost tiers
- Different isolation or quota requirements

Autoscaling pools are simply the most dynamic version of this idea.

## Why Velda Doesn’t Expose Per-Job CPU and Memory Settings

Velda intentionally avoids exposing verbose CPU and memory settings on individual jobs. This is a deliberate design choice.

Instead of tuning resources per job, you select a pool — and the pool defines the shape of compute you get.

This approach has several advantages:

- A simpler mental model — use Velda like your development machine; a small set of predefined pool sizes covers most cases.
- Versatile resource options — fractional GPUs or automatic vertical adjustments are possible behind the pool abstraction.
- Avoiding pathological scheduling — per-job resource sliders can produce monopolization and underutilization; pool-based sizing sidesteps these edge cases.
- Efficient worker reuse and massive scale — pool-based scheduling allows Velda to reuse workers efficiently and scale to hundreds of thousands of workers using fast matching instead of complex bin‑packing logic.
- Cloud portability — pools abstract away differing resource combinations across clouds.

This design keeps the default experience simple and predictable, while still leaving room for advanced scenarios.

## Batch Pools for Advanced Scheduling

For most workloads, workers are created one at a time. That’s enough for:

- Single‑node jobs
- Ad‑hoc tasks
- Development workflows

Some workloads, such as distributed training, need coordinated workers. They need features like gang scheduling (all nodes must start together) and topology‑aware placement.

For these cases, a pool can optionally support batch creation.

With batch creation:

- Velda asks for N workers at once
- All workers are tagged with a job‑specific label
- The job will start when all workers are ready

Even then, deletion remains simple: each worker is still removed individually using the same deletion mechanism.

## Pool Backends: Cloud VMs, Kubernetes, Terraform, and Custom Infrastructure

Velda ships with built-in pools for common environments:

- Cloud virtual machines
- Kubernetes clusters

But pools are intentionally open-ended.

A backend can be:

- A native SDK integration with a cloud provider
- A Kubernetes-based implementation managed through a Custom Resource Definition (CRD)
- A wrapper around `kubectl` or other cluster tooling
- A shell or command-based interface that talks to an internal system
- A lightweight integration for private datacenters or bespoke infrastructure

In Kubernetes environments, pools can be fully declarative. A CRD defines how workers should be created, scaled, and cleaned up, and Velda reconciles desired state with actual state in the cluster.

For cloud VM–based pools, Velda can also integrate with Terraform / CloudFormation. In this model:

- Terraform defines how virtual machines should be created using all available options
- Terraform outputs pool and worker configuration and exports that to config storage
- Velda automatically syncs against this configuration
- Drift between declared infrastructure and live workers is detected and reconciled

This allows infrastructure teams to keep infrastructure-as-code as the source of truth, while Velda handles runtime scaling and worker lifecycle.

This flexibility is what lets Velda adapt to real-world infrastructure instead of forcing infrastructure to adapt to Velda.

## Summary: Why Velda Pools Enable Simple, Scalable Compute

A Velda pool is not a scheduler, and it’s not a job queue. It is a worker lifecycle manager:

- Creating compute when needed
- Verifying that compute is healthy
- Removing compute when it’s no longer useful

By keeping the contract small and the policy configurable, Velda makes pools:

- Easy to reason about
- Easy to extend
- Safe to operate at scale

That’s what allows Velda to run anywhere — and still feel simple.

Get started with [Velda open source](https://github.com/velda-io/velda/)