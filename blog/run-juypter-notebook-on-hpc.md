---
sidebar: false
title: "How to Run Jupyter Notebook on an HPC Cluster: SLURM & Velda Guide"
description: "Master running Jupyter Notebooks on HPC clusters with SLURM or simplify the process with Velda. Learn SSH tunneling, port forwarding, and streamlined alternatives for interactive data science workflows on remote compute resources."
date: 2025-12-01
author: Chuan Qiu
tags: [jupyter, hpc, slurm, data-science, remote-computing, velda, ssh-tunneling, interactive-development]
keywords: ["Jupyter Notebook HPC", "SLURM Jupyter setup", "SSH tunnel Jupyter", "remote Jupyter notebook", "HPC data science", "Velda Jupyter", "port forwarding Jupyter", "interactive computing cluster", "GPU Jupyter notebook", "remote development workflow"]
image: "https://cdn-images-1.medium.com/max/2400/1*plZPR9YMdDmyc1KXsShkJQ.png"
excerpt: "Learn how to run Jupyter Notebooks on HPC clusters using SLURM with SSH tunneling, or discover how Velda simplifies the entire process to a single command for seamless interactive data science workflows."
readingTime: "7 min"
category: "Technical Blog"
---

# **How to Run Jupyter Notebook on an HPC Cluster: SLURM & Velda Guide**

Launch, Tunnel, and Access Interactive Sessions on Remote Machines

## **Why Run Jupyter Notebooks on HPC Clusters?**

Jupyter Notebooks have become the de facto standard for interactive data analysis, visualization, and collaborative research in the data science community. However, as datasets grow in size and complexity, the computational demands often exceed the capabilities of a local machine. This is where High-Performance Computing (HPC) clusters, managed by systems like SLURM, become essential.

**HPC clusters provide critical advantages for data scientists:**

* **Massive Parallel Processing**: Access to hundreds of CPU cores and multiple GPUs
* **Extensive Memory**: Handle datasets that exceed local machine limitations
* **Dedicated Resources**: Run long-running experiments without tying up your laptop
* **Cost Efficiency**: Share expensive computational resources across teams

Using Jupyter Notebooks on an HPC cluster is therefore a critical skill for data scientists and machine learning engineers working with large-scale data processing, deep learning models, or computationally intensive simulations.

Unlike running code on a local machine, working on a remote HPC cluster requires specific steps to manage resources and connectivity. This guide explains how to start an interactive Jupyter server on a compute node, configure SSH tunneling for your network setup, and access your notebook in your local browser.

## **1. The Standard SLURM Method for Running Jupyter Notebooks**

Most SLURM cluster environments require you to allocate compute resources, launch the Jupyter server, and manually configure SSH tunneling for connectivity. Here's the complete workflow:

### **Step 1: Allocate a Compute Node with SLURM**

It's almost never recommended to run heavy processing on the login node, and you cannot access GPU in that way. Instead, request an interactive job on a dedicated compute node using the `srun` command.

```bash
srun -p gpu --gres=gpu:1 --time=02:00:00 --cpus-per-task=4 --mem=32G --pty bash
```

Result: The scheduler moves you from the login node to a gpu node (e.g., `node123`).

**Pro tip:** Adjust the `--time`, `--cpus-per-task`, and `--mem` parameters based on your workload requirements. For deep learning tasks, request GPU resources using `--gres=gpu:1` or more.

### **Step 2: Launch Jupyter Notebook on the Compute Node**

Once logged into the compute node, load your Python environment (e.g., using conda environment or module load) and launch Jupyter. You must use the `--no-browser` flag because the remote terminal has no display.

```bash
module load anaconda
conda activate myenv

# Run Jupyter without opening a browser window
jupyter notebook --no-browser --port=8888
```

Note: The terminal will output a URL containing a token (e.g., `http://localhost:8888/?token=...`). Keep this terminal open and save the token for later use.

### **Step 3: Configure SSH Tunnel for Remote Access**

Because compute nodes are typically on a private network, you cannot access them directly from your laptop. You must create an SSH tunnel to forward the Jupyter port. Choose the option below that matches your HPC cluster's network configuration:

#### Option A: Double Tunneling (Standard for most HPCs)

* Scenario: Compute nodes are firewall-protected and only reachable via the login node.
* Action: Open a new terminal on your local machine and run: \
```bash
# Syntax: ssh -t -L [LocalPort]:localhost:[RemotePort] user@login ssh -L [RemotePort]:localhost:[RemotePort] node_name
ssh -t -L 8888:localhost:8888 username@login \
    ssh -L 8888:localhost:8888 node123
```
* (Replace <code>node123</code> with the **node name** found via <code>hostname</code> in your Slurm session).
<img src="https://cdn-images-1.medium.com/max/1600/1*6t1-JDyMKvbWAC-qAgBPgg.png" />

#### Option B: Internal Network Forwarding (Restricted Access)

* Scenario: You cannot SSH into compute nodes at all (even from the login node), but the login node can "see" the compute node on the internal network.
* Action: Start notebook with `--ip=0.0.0.0` and run this on your local machine:
```bash
ssh -N -L 8888:node123:8888 username@login
```
<img src="https://cdn-images-1.medium.com/max/1600/1*2kjh3fo2m322oErKG6-m9A.png" />

#### Option C: Direct Tunneling

* Scenario: Your institution allows direct SSH access to compute nodes (rare).
* Action: Run this on your local machine \
```bash
ssh -N -L 8888:localhost:8888 username@node123
```
* Alternatively, you can directly access the notebook with node123:8888 if you start jupyter notebook with public ip & port.

### **Step 4: Open in Local Browser**

Now that the tunnel is active, your local machine can communicate with the Jupyter server running on the HPC cluster.

1. Open your web browser.
2. Navigate to `http://localhost:8888`.
3. Paste the token generated in Step 2.
4. You should see the jupyter dashboard in your browser.

**Troubleshooting Common Issues:**
* **Port already in use:** Change the port number (e.g., use 8889 instead of 8888)
* **Connection refused:** Verify the SSH connection is still active

## **2. The Alternative: Simplified Cloud-Native Jupyter Access with Velda**

Managing SSH sessions, tracking node names, and dealing with firewall restrictions is complex and error prone. Velda offers a modern, cloud-native alternative, so your browser can access to Jupyter Notebooks without manual port forwarding or complex networking configuration.

### **Step 1: Launch Jupyter with Velda's vrun Command**

Use the `vrun` command to allocate a compute instance and start the Jupyter Notebook service simultaneously:

```bash
vrun -P gpu-h200-1 -s notebook jupyter notebook --no-browser --port=8888
```

* **`-P gpu-h200-1`**: Specifies the required resources (GPU node with 1 nvidia H200)
* **`-s notebook`**: Names the session for easy identification and proxy access.

**Key advantages:**
* No manual resource allocation or node tracking
* Automatic environment synchronization
* Isolate with other workload on the node
* Built-in security and authentication

### **Step 2: Access Your Notebook Instantly**

Instead of configuring SSH tunnels, simply open the automatically-generated secure URL in your browser:

**URL Format:** `https://8888-notebook-[instance-id].velda.cloud`

*(Or use your custom domain in your self-hosted Velda deployment).*

This method immediately connects your local browser to the remote Jupyter Notebook session with enterprise-grade security, even if you're behind a strict corporate firewall or VPN.

Regardless of which method you choose, follow these best practices:

1. **Always use compute nodes**, never use login nodes for Jupyter sessions
2. **Request appropriate resources** - don't over-allocate GPUs or memory
3. **Use environment management** (conda/venv) for reproducibility
4. **Save work frequently** - HPC sessions can timeout
5. **Monitor resource usage** with tools like `nvidia-smi` for GPUs
6. **Clean up sessions** when finished to free resources for others

## **Ready to Simplify Your HPC Jupyter Workflow?**

Stop wrestling with SSH tunnels and complex HPC configurations. Velda makes running Jupyter Notebooks on cloud and HPC resources as simple as running them locally.

**Experience the difference:** One command to launch, instant browser access, and zero networking headaches.  Learn more about how [Velda compares Slurm](/slurm-alternative).Join data scientists and ML engineers who've already streamlined their workflows with Velda.

**Get started today:**

* [**Try hosted Velda cloud**](https://velda.cloud/): Immediately access cloud compute with one click
* [**Velda Open Source**](https://github.com/velda-io/velda): Deploy on your own infrastructure
* [**Enterprise Edition**](https://velda.io/book): Get SSO, RBAC, and advanced features