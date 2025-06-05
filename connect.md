---
layout: doc
title: Connecting to Velda Instances
---

# Connecting to a Velda Instance

This guide explains the various methods available for connecting to your Velda instances, from browser-based options to command-line interfaces and IDE integrations.

**Table of Contents:**
[[toc]]

## 1. Connect via VS Code Web
If your instance has VS Code Server preinstalled (the default for Velda images), simply click the **Connect** button after logging in. This will open your instance directly in VS Code Web.

## 2. Connect via VS Code Extension
Use the [Velda VS Code extension](https://marketplace.visualstudio.com/items?itemName=velda-io.velda) for seamless integration:

1. Install the Velda extension and the [Remote - SSH extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) in VS Code
2. Open the Velda extension panel to view available instances
3. Select the instance you wish to connect to

## 3. Connect via Velda CLI
1. [Download the Velda CLI](#downloading-the-velda-cli) and ensure it is executable and in your `PATH`
2. Log in using the CLI
3. Run the following command to connect:

```sh
velda run --instance=[instance-name]
```

## 4. Connect via Custom SSH Client or IDE
1. [Download the Velda CLI](#downloading-the-velda-cli) and log in
2. Add the following entry to your SSH config file (typically `~/.ssh/config`):

```sh
cat << EOF >> ~/.ssh/config
Host [InstanceName]
  HostName [InstanceName]
  Port 2222
  User user
  ProxyCommand velda port-forward -W -p %p --instance %h -s ssh
  StrictHostKeyChecking no
  UserKnownHostsFile /dev/null
  User user
EOF
```

3. Connect using your preferred SSH client or configure your IDE to use this SSH configuration:

```sh
ssh [InstanceName]
```

**Note:** Replace `[InstanceName]` with your actual Velda instance name.

## Downloading the Velda CLI

Download the Velda CLI for your platform:

| Platform | Download Link |
|----------|---------------|
| Linux | [Download](https://storage.cloud.google.com/novahub-release/linux_client_amd64) |
| macOS (ARM) | [Download](https://storage.cloud.google.com/novahub-release/mac_client_arm64) |
| macOS (x86-64) | [Download](https://storage.cloud.google.com/novahub-release/mac_client_amd64) |

After downloading, make the CLI executable and add it to your `PATH`:

```sh
chmod +x velda
mv velda /usr/local/bin/  # Or another directory in your PATH
```

## Logging In and Setting Up Your Instance

Log in to Velda using the CLI:

```sh
velda auth login
```

Follow the prompts to complete authentication. Once authenticated, you can create, manage, and connect to your Velda instances.