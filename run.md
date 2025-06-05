---
layout: doc
title: Running Workloads in Velda
---
# Running Workloads in Velda

This guide explains how to run workloads in Velda, including running on different resource pools, reattaching to sessions, and connecting to open ports.

[[toc]]

## Getting Started
To run a workload on a different resource pool or in an ephemeral session, use:

```sh
vrun -P [pool-name] command [args]
```

**Example:**

```sh
vrun -P cpu-large make -j 16
```

> **Note:** If the pool is not specified, the command will run on the `shell` pool by default, which typically provides a single CPU instance.

## Running on the Same VM
If you need to run a workload on the same physical VM (e.g., for debugging or system monitoring), you can assign a custom service name and reattach later using the `-s` flag.

Start your workload in one terminal:

```sh
vrun -s workload --pool my-pool my-workload
```

Reattach a new shell session in another terminal:

```sh
vrun -s workload ps aux
# This should show the process for 'my-workload'.
```

## Connecting to Open Ports
Velda provides several options for connecting to open ports from other sessions.

### 1. Use Session Name as Hostname
The simplest way is to use the service name directly as the hostname to access your workload.
This method works when connecting from a session on the same instance.

```sh
vrun -s web python -m http.server 8000 &
curl web:8000
```

### 2. Port-Forward While Running Workload
This method allows you to forward a port while launching your workload, making it accessible via localhost:

```sh
vrun -p 8000:8000 python -m http.server 8000 &
curl localhost:8000
```

### 3. Port-Forward for Browser or Remote Access
This approach enables access from your local machine to services running in Velda:

Start your workload:

```sh
vrun -s web python -m http.server 8000
```

From your local machine (requires [Velda CLI](connect#download-cli)):

```sh
velda port-forward -s web --port 8000 -l :8000
```

After running this command, you can access the service at `http://localhost:8000` in your local browser.

### 4. Use Proxy (HTTP/HTTPS Only)
Most Velda deployments include a proxy server, allowing you to use a special hostname to access your service.

If your workload is running as:

```sh
vrun -s web python -m http.server 8000
```

And your Velda service is hosted at `velda.example.com`, you can access it at:

```
http://8000-web-[instance-name].i.velda.example.com
```

> **Note:** This URL requires sign-in for security, so access it from your browser.

### 5. Use VS Code (or Your IDE) Port Forwarding
Alternatively, you can use your IDE's built-in port-forwarding feature. Refer to your specific IDE's documentation for details.

## Common Examples

Here are some common usage patterns for running workloads in Velda:

**Run a CPU-intensive compilation job:**
```sh
vrun -P cpu-large make -j 16
```

**Launch a long-running Jupyter notebook server:**
```sh
vrun -s jupyter -p 8888:8888 jupyter notebook --no-browser
```

**Run a GPU-accelerated training job:**
```sh
vrun -P gpu-t4 python train.py --epochs 100
```
