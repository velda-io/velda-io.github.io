---
sidebar: false
title: "CLI vs Decorators for ML Pipelines | Best Practices"
description: "How CLI-based orchestration solves the hidden problems of decorator frameworks in production ML pipelines."
date: 2026-01-27
author: Chuan Qiu
tags: [ml, orchestration, cli, workflows, dagster, prefect, airflow]
keywords: ["decorator frameworks", "CLI", "orchestration", "dependency bloom", "pickle trap"]
image: "https://substack-post-media.s3.amazonaws.com/public/images/f13a76b4-ce8c-4394-bc99-bfa87c503508_1024x559.png"
excerpt: "Why decorator-heavy Python orchestrators introduce hidden operational costs, and how CLI-first tooling restores reproducibility and simplicity."
readingTime: "5 min"
category: "Technical Overview"
---

# The hidden cost in Pythonic workflows

How CLI-based orchestration solves the hidden problems of decorator frameworks in production ML pipelines

It usually starts with a single line of code. You’ve finished a promising experiment in a notebook, and it’s time to turn it into a production pipeline. A colleague suggests a modern orchestration framework. “Just add this decorator,” they say. “It handles everything.”

You add `@task` to your training function. Suddenly, you have a UI. You have a DAG. It feels like magic—until it doesn’t.

As machine learning matures, we’re witnessing a quiet revolution. Senior engineers are stripping away the complex decorators and returning to where they started: the Command Line Interface. This isn’t nostalgia—it’s about solving the architectural friction that modern “Pythonic” orchestrators inadvertently create.

<img src="https://substack-post-media.s3.amazonaws.com/public/images/f13a76b4-ce8c-4394-bc99-bfa87c503508_1024x559.png" />

## The Honeymoon Phase: Why We Fell for Decorators

The appeal of annotation-heavy frameworks like Airflow, Prefect, or Dagster is obvious. They promise to handle the “boring stuff”—retries, scheduling, and infrastructure—so you can focus on the math.

But as your project grows from a single script to a distributed system, that convenience begins to look like technical debt. By wrapping your research logic in proprietary SDKs, you’ve made a trade-off that affects every stage of the lifecycle: from the dependencies you install to the way you debug a 3:00 AM crash.

## The Hidden Costs: Three Challenges You Can’t Ignore

### 1. The Infrastructure Tax

Most frameworks promise to handle “workers,” but they rarely manage the lifecycle of those workers. Because Kubernetes is a beast of its own, many tools stop at the code level.

This leaves engineers in a frustrating middle ground. You have a fancy `@task` decorator, but you’re still responsible for:

- Writing and maintaining 200-line K8s YAML files
- Building, tagging, and pushing container images for every minor bug fix
- Managing per-job deployments to ensure the remote worker has the right CUDA version

The framework gives you the steering wheel, but you’re still building the engine.

## The Hidden Costs: Three Challenges You Can’t Ignore

### 2. Dependency Bloom and Cache Corruption

In a decorator-based world, your “orchestrator” script often needs to import your “worker” scripts to understand the pipeline structure.

This creates dependency bloom. If your training script requires PyTorch and CUDA, your orchestrator—which might just be a simple scheduler—now needs those heavy libraries too. This leads to corrupted test caches: a tiny change in a utility function can invalidate the cache for your entire training step, simply because the orchestrator sees the whole project as one giant, interconnected import tree.

### 3. The Pickle Trap: Silent Serialization Failures

When you move data between decorated tasks, the framework usually relies on implicit pickling to pass objects.

This is the source of the most maddening bugs in ML. If your local machine runs Python 3.10 and your remote worker runs 3.9, or if there’s a slight mismatch in NumPy versions, serialization breaks. You don’t get a clear “Version Mismatch” error—you get a cryptic `AttributeError` or `ModuleNotFoundError` that makes you question your own code.

## The Turning Point: Reproducibility as a First Principle

When an experiment fails at scale, how long does it take you to reproduce that failure locally?

In an annotated framework, you’re debugging a black box. You aren’t just running code, you’re running a hidden interaction between your code and the orchestrator’s state-capture logic. Reproducing a failure often requires mocking the entire framework.

When a model training job fails at 3:00 AM, the first thing you need is the logs. In many ML platforms, logs are buried under layers of UI menus or lost in a centralized logging service.

The CLI alternative changes the game. By keeping your scripts pure like standard scripts that take arguments, and using the terminal to manage the sequence, reproducibility becomes a copy-paste operation.

If a remote job fails, you take the exact command: `python train.py --lr 0.01` and run it locally.

## A New Path: The Prefix Model for Scaling

If the CLI is so efficient, why did we ever leave it? Usually, it was for the cloud. We needed a way to get that local command onto a massive H100 cluster.

Modern tools like Velda suggest a middle path: the CLI prefix. Instead of rewriting your code to be “cloud-compatible,” you use the terminal as the bridge.

Native Observability: You get a structured command ledger and a DAG view. Unlike mixed-log environments where multiple tasks bleed into one stream, every log line is strictly attributed to the command that generated it.

Worker Automation: Instead of wrestling with K8s YAMLs, the framework “clones” itself. It takes your local environment and spawns the remote worker automatically.

Add-on Scaling: You write a local bash script to define your workflow. When you want to scale, you just add a prefix: `vrun --pool gpu-h100 python train.py`.

## Choosing Your Battle: The Granularity Trade-off

Is the CLI always better? Not necessarily. We have to acknowledge the granularity gap.

The Case for Decorators: If you’re processing billions of data rows where each “task” is a millisecond-long transform, the overhead of a CLI command (spawning a process) is too high. Here, in-process tools like Spark or Ray are king. But even here, you can use Velda to manage the workers themselves—letting the CLI handle infrastructure while your chosen framework handles the fine-grained parallelism.

The Case for CLI: For the core of the ML lifecycle: data prep, training, and evaluation, where tasks take minutes or hours, the stability and isolation of the CLI-first approach are unmatched.

## Conclusion: Take Back the Terminal

Machine learning is a discipline of iteration. The more “magic” you put between your fingers and the hardware, the harder it is to move fast.

If you’re feeling the weight of your orchestrator—if you’re spending more time on YAML than on your model—it might be time to simplify. Keep your Python pure. Use the CLI to define your journey. And when you need the power of the cloud, don’t reach for a decorator. Reach for a prefix.

Start Velda with open-source: https://github.com/velda-io/velda
