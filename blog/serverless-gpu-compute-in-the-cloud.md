---
sidebar: false
title: "Serverless GPU Compute in the Cloud | ML Team Comparison"
description: "A practical comparison of serverless GPU platforms for ML teams, from SDK-first and container-first stacks to Velda's environment-first model."
date: 2026-04-02
author: Chuan Qiu
tags: [serverless-gpu, machine-learning, cloud-native-mlops, modal, runpod, sagemaker, velda]
keywords: ["serverless GPU", "ML infrastructure", "Modal vs RunPod", "SageMaker alternatives", "cloud GPU comparison", "distributed training", "Velda"]
image: "https://substackcdn.com/image/fetch/$s_!6g3G!,w_1200,h_400,c_pad,f_auto,q_auto:best,fl_progressive:steep,b_auto:border,b_rgb:FFFFFF/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb72cf057-8031-42a1-a292-e4f7dae4e2f8_1280x1280.png"
excerpt: "A practical framework for choosing between SDK-first, container-first, and environment-first serverless GPU platforms for ML workloads."
readingTime: "5 min"
category: "Technical Overview"
---

# Serverless GPU Compute in the Cloud

A practical comparison for ML teams.

If you're running machine learning workloads in the cloud, the options have never been better or more confusing. Serverless GPU platforms differ significantly in their architectural assumptions, and the right choice depends less on which platform is "best" and more on which tradeoffs you're willing to make.

This post maps out three distinct architectural paths: SDK-first, container-first, and environment-first, to help you make an informed decision.

## Path A: Environment-First - Velda

Velda shifts the focus from the container to the development environment. Rather than asking you to package your workload into an image and push it to a registry, Velda starts with a hosted development environment - accessible in one click from a curated set of templates - that behaves like your local machine. You set it up the same way, write code the same way, and run commands the same way. It's a virtual sandbox that eliminates the "it worked on my machine" problem at the team level, not just the individual level.

From there, scaling is a command prefix. Add `vrun` to any command and Velda executes it with additional cloud compute - GPUs, large memory instances, whatever the job requires - without building or pushing a container image. For distributed workloads, `vbatch -N [n]` launches sharded jobs across N nodes with any framework. You do not manually manage master and worker IP addresses, configure NCCL, or distribute SSH keys. Velda treats a 16-node cluster as a single logical resource. Compare that to RunPod, where multi-node coordination is largely manual, or Modal, which requires custom integration work to distribute jobs at all.

HTTP services are handled the same way. Point Velda at a command and an exposed port, and it deploys and auto-scales your service without separate serving infrastructure.

Multi-cloud support is built in. You can target AWS, GCP, Azure, or other providers from the same interface, route workloads based on availability or cost, and use your existing cloud credits and discounts.

The tradeoff is an upfront setup cost if you want to self-host or bring your own cloud. Connecting Velda to your AWS, GCP, or Azure account requires some initial configuration and light DevOps work - think IAM roles, credentials, and network settings rather than cluster management, plus possible Velda cluster upgrades if you're self-hosting. It's a one-time cost, not a per-workload one. Once your cloud is connected, individual jobs and experiments require no additional infrastructure configuration. For most teams this is a worthwhile investment; for very small teams with no DevOps familiarity at all, it's worth factoring into the onboarding timeline.

Best fit: Research teams and ML engineers who need to move between experimentation and large-scale distributed training without a dedicated DevOps hire, and who view infrastructure management as a distraction rather than a core competency.

## Path B: SDK-First - Modal

Modal is designed around a simple idea: define GPU tasks in Python, and the platform handles everything else. No Dockerfiles, no YAML, no cluster management. You annotate functions with resource requirements, and Modal spins up containers with the right GPUs on demand.

It scales to zero when idle and can expand to hundreds of GPUs under load, making it well-suited for inference APIs and batch pipelines with variable traffic. Cold starts are generally low, often just a few seconds.

The tradeoffs are real. Pricing runs slightly higher than comparable raw compute options. More significantly, workloads are defined using Modal's own Python SDK, which means switching to another platform later requires meaningful rework. Your compute logic becomes coupled to Modal's abstractions. For teams building fast and comfortable staying in that ecosystem, this is an acceptable bargain. For teams that value portability, it's worth weighing carefully upfront.

Distributed jobs are possible but require custom integration work. Modal does not treat multi-node execution as a first-class primitive.

Best fit: Python-first teams building serverless inference endpoints or scheduled batch jobs who don't mind vendor lock-in and want to move fast with minimal infrastructure overhead.

## Path C: Container-First - RunPod, AWS Fargate, GCP Cloud Run, AWS SageMaker

This category covers platforms where you bring a container image and the platform runs it at scale. The general model is the same across providers: package your workload, define a handler or entry point, and let the platform manage execution.

The moment you want to move from a notebook to a 10-node cluster, though, you have to stop coding and start plumbing. That usually means writing YAML, configuring NCCL, or rebuilding images. This context-switching tax is an invisible drag on ML velocity that compounds across experiments.

RunPod is the most GPU-focused option here. Bring any Docker container, and RunPod runs it with per-second billing on hardware ranging from consumer-grade cards up through A100s and H100s. It also offers persistent GPU pods for workloads that don't fit a request-response model. The flexibility is real, but so is the operational overhead. Multi-node distributed jobs require manual coordination - managing worker IPs, SSH keys, and inter-node communication yourself. GPU availability under high load has also been a variability point reported by some users.

AWS Fargate and GCP Cloud Run extend the same container-centric model into hyperscaler infrastructure. Cloud Run in particular has added GPU support, making it viable for lighter inference workloads. Both benefit from tight integration with their respective cloud ecosystems, though that integration also deepens vendor dependency. Neither is optimized for ML-specific workflows out of the box.

AWS SageMaker is Amazon's managed ML platform, covering training, fine-tuning, hosted endpoints, and pipelines. For teams already deep in AWS, it can reduce some infrastructure work. However, it comes with a steep learning curve, significant proprietary abstractions, and strong vendor lock-in. You'll need to adapt your code to SageMaker's conventions, maintain container images for custom workloads, and navigate pricing that can become complex quickly. It's powerful, but the overhead it introduces often rivals the overhead it claims to remove.

Best fit: Teams comfortable with containers who need fine-grained runtime control, want to mix serverless and persistent GPU workloads, or are already heavily invested in a specific cloud provider's ecosystem. Expect to maintain container images and absorb some context-switching cost as workloads scale.

## Choosing Your Path

These are three valid architectural choices, each with real tradeoffs.

Choose Path A (Velda) if your team views infrastructure as a distraction. If your goal is to iterate on models rather than manage a fleet of Docker images, and especially if you need to scale across clouds without accumulating DevOps complexity, Velda's environment-first approach solves the portability problem at the workflow level rather than the container level.

Choose Path B (Modal) if you're a Python-first team building inference APIs or batch jobs, want auto-scaling with minimal setup, and are comfortable staying within Modal's SDK ecosystem long-term.

Choose Path C (RunPod / Cloud Run / SageMaker) if you need full container-level control, want to leverage an existing cloud provider relationship, or have workloads with complex runtime requirements that demand a custom-built image.

Explore Velda today on [Velda Cloud](http://cloud.velda.io/) with H100/H200 immediately available, or self-host with [open source](https://github.com/velda-io/velda).