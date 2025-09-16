---
sidebar: false
title: "vrun is All You Need: Revolutionizing Development with One Command"
description: "Discover how Velda's vrun command transforms development by providing instant, scalable cloud compute that feels like local execution. Eliminate inefficient GPU setups and complex orchestration with this game-changing tool."
date: 2025-09-15
author: Chuan Qiu
tags: [cloud-development, dev-tools, machine-learning, developer-productivity, kubernetes, scaling, cloud-native, vrun, velda]
keywords: ["vrun command", "AI research productivity", "machine learning development", "GPU cost optimization", "Velda cloud GPU", "distributed training solutions", "GPU utilization", "ML development workflow", "hyperparameter tuning parallel", "AI infrastructure costs", "cloud development tools"]
image: "https://cdn-images-1.medium.com/max/2400/1*CCI6tS0pnagYS_sYftdVrA.png"
excerpt: "Why vrun is the ultimate solution for AI/ML researchers struggling with inefficient GPU setups. Learn how one command can provide instant scaling, cost efficiency, and seamless development experience."
readingTime: "8 min"
category: "Technical Blog"
---

# **`vrun` is all you need: Revolutionizing Development with One Command**

## **The Cloud Development Dilemma**

Picture this: You're a developer working on a machine learning project. Your local laptop struggles with training models, so you spin up a cloud VM. But now you're spending hours setting up the new environment, and paying for compute power even when you're in meetings or writing documentation. When you actually need serious computational power like multi-node ai training, you're stuck dealing with Kubernetes manifests that feel like learning a foreign language.

Sound familiar? You're not alone. Traditional cloud development tools force developers to choose between expensive always-on instances or complex orchestration platforms that require DevOps expertise just to run a simple training job.

Experiment developing on **Velda sandbox** and its revolutionary `vrun` command - the tool that makes scaling cloud compute as simple as running commands on your local machine.


## **What is vrun?**

`vrun` is Velda's command-line interface that abstracts away all the complexity of cloud resource management. Think of it as your local terminal, but with the superpower to instantly access any amount of compute resources in the cloud.

The syntax is beautifully simple:

```bash
vrun -P [pool] [commands] [args]
```

That's it. One command to rule them all.


## **Starting Simple: Your First Cloud Command**
Let's begin with the most basic use case. Say you have a training script that needs a GPU to run:

```bash
# Scale instantly to run with a GPU machine with T4
vrun -P gpu-t4 ./heavy-computation.py
```

Behind the scenes, Velda:

* On demand access a machine from the `gpu-t4` pool. Pools are customized by every cluster, and abstracted away all the complex details on machine provisioning that the end user doesn't need to be aware of.
* Maintains your exact development environment - same filesystem, libraries, and environment variables
* Streams all input/output back to your terminal in real-time
* Forwards control signals like Ctrl-C

Magic? **It feels exactly like running the command locally**, but with cloud-scale compute power.

## **Level Up: Session Management for Long-Running Tasks**

Real development work isn't just about one-off scripts. You need to monitor jobs, debug issues, and manage long-running processes. This is where `vrun`'s session management shines.


### **Named Sessions**
```bash
# Start a training job in a named session
vrun -s ml-training python train_model.py

# Later, check on your job from anywhere
vrun -s ml-training nvidia-smi
vrun -s ml-training ps aux

# Debug issues without interrupting the main process
vrun -s ml-training pdb-attach [pid]
```

Each session acts like compute node on a shared workspace, and use session name to connect to the node.

### **Keeping Work Alive While Away**

Session will automatically terminate when disconnect to save your cloud cost. If you would like to keep some job persistent, you may utilize `--keep-alive` options.

```bash
# Create a persistent tmux session
vrun --keep-alive -s workspace tmux

# Later, reconnect from any machine
vrun -s workspace tmux attach
```

Pro tip: Add this alias to your `.bashrc` and tmux becomes cloud-native by default:

```bash
alias tmux='vrun --keep-alive -s tmux tmux'
```
Coming soon: Save cloud spend by stop the compute instance and restore when reconnected through check-pointing.


## **Advanced Networking: Connect Everything Seamlessly**

Modern development involves services talking to each other. Velda's networking capabilities make service discovery trivial.


### **DNS-Based Service Discovery**

Each session is accessible with their session name as DNS name, enabling seamless service-to-service communication. You can spin up multiple sessions with the same name for load balancing.
```bash
# Start a web service
vrun -s api-server python app.py --port 8080
# Start the second instance.
vrun -s api-server --new-session python app.py --port 8080

# Connect from current session using DNS
curl api-server:8080/health
```

### **Port Forwarding for Local Development**

Need to access your cloud services locally? Multiple options:
```bash
# Forward to localhost
velda port-forward -p 8080 -L 8080 -s api-server
curl localhost:8080

# Or access directly via browser
# https://8000-notebook-3.i.dev.company
```
This flexibility means you can develop locally while leveraging cloud compute for heavy lifting.

## **Enterprise-Grade Pipeline Orchestration**

Here's where `vrun` truly shines - complex pipeline management without the Kubernetes overhead.

```bash
# Create a sophisticated CI/CD pipeline in job.sh
vbatch -P cpu-32 --name build ./build.sh
vbatch --name test1 --after-success build ./test1.sh
vbatch -P cpu-64 --name test2 --after-success build ./test2.sh  
vbatch --name deploy --after-success test1,test2 ./deploy.sh

# Execute the entire pipeline
JOB_ID=$(vbatch ./job.sh)

# Check the status of the job
velda task get ${JOB_ID}
```
<small>Note: `vbatch` is a variant of `vrun` where the execution happens in the background.</small>

This creates a dependency graph where:

* Build runs on a 32-CPU machine
* Tests run in parallel after successful build (test2 gets more resources)
* Deploy only runs after both tests pass

No YAML files, no container registries, no manifest management - just intuitive dependency declarations.

## **Why vrun Changes Everything**

### **Compared to Traditional Cloud VMs**

* **Cost Efficiency**: Pay only when actively computing
* **Zero Setup Time**: No provisioning delays or configuration drift
* **Automatic Scaling**: Resources appear instantly when needed

### **Compared to Kubernetes**

* **No Learning Curve**: Use familiar command-line tools
* **Fast Iteration**: No image building, manifest updates, or scheduling delays
* **Direct Development**: No separate development environment needed

### **Compared to Slurm**

* **Cloud-Native**: Built-in auto-scaling and resource elasticity
* **Flexible Environments**: Customizable without rigid system requirements
* **Better Resource Sharing**: Efficient multi-tenancy without node monopolization

## **Real-World Scenarios**
### **Data Scientists**
```bash
# Quick model training
vrun -P gpu-v100 python train.py --epochs 100

# Jupyter notebook with serious compute
vrun -s notebook --keep-alive jupyter lab --allow-root
```

### **DevOps Engineers**
```bash
# Load testing with auto-scaling
vrun -P cpu-32 ./load-test.sh production-api

# CI/CD pipeline deployment
vbatch ./deploy-pipeline.sh
```

### **ML Engineers**
```bash
# Distributed training across multiple GPUs
vrun -P gpu-cluster -N 40 torchrun --nproc_per_node=8 train.py

# Background hyperparameter sweeps using vbatch
vbatch -P gpu-v100 --name sweep-lr-001 python train.py --lr 0.01
vbatch -P gpu-v100 --name sweep-lr-0001 python train.py --lr 0.001  
vbatch -P gpu-v100 --name sweep-lr-00001 python train.py --lr 0.0001

# Monitor all experiments
velda task ls | grep sweep-
```

## **Getting Started Today**

Ready to simplify your cloud development workflow?

1. [**Open Source**](https://github.com/velda-io/velda): Try Velda's open-source edition
2. [**Enterprise**](https://velda.io/book): Deploy with SSO, RBAC, and advanced observability
3. **Hosted(Coming soon)**: Immediately scale with Velda's managed platform

The beauty of `vrun` is its simplicity - you can start with basic commands and gradually adopt more advanced features as your needs grow. No massive platform migration required.

## **The Future of Development is Here**

`vrun` represents a fundamental shift in how we think about cloud development. Instead of learning complex orchestration platforms or managing infrastructure, developers can focus on what they do best - building amazing software.

Whether you're running a simple script or orchestrating complex ML pipelines, `vrun` scales with you. **Because sometimes, one command really is all you need.**

---

*Want to experience the power of <code>vrun</code> firsthand?[ Try Velda today](https://velda.io/comparison) and join the thousands of developers who've already simplified their cloud workflows.*
