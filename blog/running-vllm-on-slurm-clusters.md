---
sidebar: false
title: "Running vLLM on SLURM Clusters: A Complete Guide for HPC Inference"
description: "Deploy OpenAI-compatible LLM endpoints on SLURM with vLLM for research and development."
date: 2026-01-08
author: Chuan Qiu
tags: [vllm, slurm, hpc, inference, velda]
keywords: ["vLLM", "SLURM", "HPC inference", "vllm serve", "SLURM batch script"]
image: "https://substack-post-media.s3.amazonaws.com/public/images/7372e67f-3b90-4b52-a2d0-f2c98f7930e0_1024x559.png"
excerpt: "Guide to run vLLM on SLURM clusters: create batch scripts, submit jobs, access endpoints, and follow best practices for reliable HPC inference."
readingTime: "6 min"
category: "Tutorial"
---

# Running vLLM on SLURM Clusters: A Complete Guide for HPC Inference

Deploy OpenAI-Compatible LLM Endpoints on SLURM with vLLM for Research and Development

SLURM-based HPC clusters offer a practical solution for training and LLM inference workloads, especially when you need to leverage existing GPU infrastructure. Whether you’re training reinforcement learning agents, developing inference optimizations, or testing model deployments before production, vLLM on SLURM provides direct access to powerful compute resources you already have.

<img src="https://substack-post-media.s3.amazonaws.com/public/images/7372e67f-3b90-4b52-a2d0-f2c98f7930e0_1024x559.png" />

## Why Run vLLM on SLURM HPC Clusters?

While typically SLURM clusters weren’t designed to run inference like vLLM, teams still choose SLURM clusters for several key reasons:

- Leverage Existing Infrastructure — Most research institutions and enterprises already have SLURM clusters. Running vLLM here means no new hardware purchases or cloud migrations.

- RL Training & Research — Reinforcement learning workflows often need on-demand model inference for policy evaluation, reward modeling, or environment simulation. SLURM provides the compute you need exactly when you need it.

- Development & Testing — Before deploying models to production, you can prototype and benchmark inference configurations on real GPU hardware without affecting production systems.

- Cost Control — Use shared GPU resources during off-peak hours or allocate specific nodes for inference tasks without dedicated infrastructure.

- Multi-GPU Scaling — Test tensor parallelism and distributed inference patterns on actual multi-GPU nodes.

## Run vLLM inference server in Slurm Cluster

The most straightforward approach is to access vLLM directly from within the cluster. This gives you a stable internal endpoint that any compute job can reach — perfect for training jobs that need inference, batch processing pipelines, or internal tooling.

## Step 1: Create a SLURM Batch Script for vLLM

Rather than running interactively, create a Slurm script for reliable, reproducible deployments. This approach ensures your vLLM server stays running and can be easily restarted.

Create run_vllm.sh:

```
#!/bin/bash
#SBATCH --job-name=vllm-server
#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH --cpus-per-task=8
#SBATCH --mem=32G
#SBATCH --time=12:00:00
#SBATCH --output=vllm-%j.log

# Load environment
module load anaconda cuda/12.1
source activate vllm-env

# Get the node name where this job is running
NODE_NAME=$(hostname)
# Find a random free port
export PORT=$(python -c 'import socket; s=socket.socket(); s.bind("", 0); print(s.getsockname()[1]); s.close()')

echo "=========================================="
echo "vLLM Server Starting"
echo "=========================================="
echo "Node: $NODE_NAME"
echo "Port: $PORT"
echo "Endpoint: http://${NODE_NAME}:${PORT}"
echo "=========================================="
echo ""

# Start vLLM server

vllm serve meta-llama/Llama-3.1-8B-Instruct --port $PORT
```

## Step 2: Submit the vLLM SLURM Job

`sbatch run_vllm.sh`

Check the output log to find your node name:

`tail -f vllm-<job_id>.log`

You’ll see output like:

```
==========================================
vLLM Server Starting
==========================================
Node: gpu-node-042
Port: 8000
Endpoint: http://gpu-node-042:8000
==========================================
```

## Step 3: Access Your vLLM Server Within the Cluster

From any login node or compute job on the same cluster, you can POST to the endpoint:

```
import requests
response = requests.post(
    "http://gpu-node-042:8000/v1/completions",
    headers={"Content-Type": "application/json"},
    json={
        "model": "meta-llama/Llama-3.1-8B-Instruct",
        "prompt": "Explain reinforcement learning in simple terms:",
        "max_tokens": 100
    }
)
print(response.json()["choices"][0]["text"])
```

### Using vLLM on SLURM for RL Training Workflows

Example integration for an RL reward model:

```
# In your RL training script
import requests

class VLLMRewardModel:

    def __init__(self, endpoint):
        self.endpoint = endpoint

    def score_trajectory(self, trajectory):
        response = requests.post(
            f"{self.endpoint}/v1/completions",
            json={
                "model": "meta-llama/Llama-3.1-8B-Instruct",
                "prompt": f"Rate this action: {trajectory}",
                "max_tokens": 10
            }
        )
        return parse_score(response.json())

# Initialize with your vLLM endpoint
reward_model = VLLMRewardModel("http://gpu-node-042:8000")
```

## Step 4: Finding Your Running vLLM Server on SLURM

If you forget which node your job is on:

```
# Check running jobs
squeue -u $USER

# SSH to the allocated node
ssh gpu-node-042

# Verify vLLM is running
ps aux | grep vllm
curl http://localhost:8000/v1/models
```

## Monitoring and Managing vLLM on SLURM

Check GPU Usage:

```
ssh gpu-node-042
watch -n 1 nvidia-smi
```

View Server Logs:

`tail -f vllm-<job_id>.log`

Cancel the Server:

`scancel <job_id>`

Restart After Failure:

`sbatch run_vllm.sh`

## Optional: External Access via SSH Tunneling

If you need to access vLLM from your local machine (for development or debugging), you can set up SSH tunneling. However, this is less stable and should be secondary to in-cluster usage.

Basic Tunnel:

```
# Forward from login node to compute node, then to your machine
ssh -L 8000:gpu-node-042:8000 user@cluster-login.edu
```

In a separate terminal, use the local endpoint:

```
import requests
response = requests.post(
    "http://localhost:8000/v1/completions",
    json={
        "model": "meta-llama/Llama-3.1-8B-Instruct",
        "prompt": "Hello world"
    }
)
print(response.json())
```

## Understanding the Limitations of vLLM on SLURM

While vLLM on SLURM is powerful for research and development, be aware of these constraints:

- No Load Balancing — A single vLLM instance can’t automatically scale across requests. High traffic will queue or timeout.

- Unstable Endpoints — Node names change between jobs. You must update endpoints each time you restart.

- Preemption — Preemptible or low-priority partitions may terminate inference jobs unexpectedly, requiring manual restarts.

- No High Availability — If the job crashes or the node fails, your service goes down. No automatic restart or failover.

- Manual Resource Management — You must monitor GPU memory, adjust batch sizes, and handle OOM errors yourself.

- Firewall Restrictions — Most clusters don’t expose compute nodes externally. SSH tunneling is fragile and blocked by many corporate networks.

## Best Practices for Running vLLM on SLURM

1. Use batch scripts, not interactive sessions — Ensures reproducibility and proper logging
2. Set realistic time limits — Balance job priority with runtime needs
3. Monitor resource usage — Watch GPU memory and adjust --gpu-memory-utilization
4. Version your environment — Pin vLLM, PyTorch, and CUDA versions
5. Document node endpoints — Keep a log of which nodes are running which models
6. Plan for restarts — Jobs will end; have restart procedures ready
7. Coordinate ports — Check with team members to avoid port conflicts

## Alternative: The Velda Approach for Simplified vLLM on SLURM

If you’re using Velda to manage your cluster, you can skip most of this guide:

```
vrun -P gpu-h100-1 -s vllm \
  vllm serve meta-llama/Llama-3.1-8B-Instruct \
  --port 8000
```

Velda automatically handles GPU allocation, environment setup, and provides a stable service name vllm:8000 that you can access from anywhere in the cluster — no node discovery, no port conflicts, no manual setup. Multiple users can run their own vLLM instances without endpoint collisions, and can only access their own vllm service unless exposed.

Learn more about [how Velda compares with SLURM](https://velda.io/slurm-alternative)