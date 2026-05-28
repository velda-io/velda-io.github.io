---
layout: page
sidebar: false
title: "Serverless GPU Compute"
description: "Ship ML training, batch inference, and model services faster with Velda's environment-first serverless GPU platform."
keywords: ["serverless GPU", "GPU compute", "ML infrastructure", "distributed training", "cloud GPU"]
image: "https://velda.io/og-preview.png"
markdownStyles: false
---

<script setup>
import CtaButton from './.vitepress/components/CtaButton.vue'
import HomeHeroInfo from './.vitepress/components/HomeHeroInfo.vue'
</script>

:::raw
<HomeHeroInfo />

<div class="mx-auto max-w-6xl px-4 pb-18 sm:px-6 md:px-16">
  <section class="mb-18 mt-2">
    <div class="mx-auto mb-8 max-w-3xl text-center">
      <h2 class="mb-3 text-3xl leading-tight font-bold sm:text-4xl">Built for teams shipping models every week</h2>
      <p class="text-base sm:text-lg">Everything you need to go from experiment to production inference without switching platforms.</p>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-xl border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg-soft)] p-5">
        <div class="mb-2.5 text-2xl font-bold text-[var(--vp-c-brand-1)]">1 command</div>
        <p class="m-0 text-base">Scale any local command to cloud GPUs with <code class="vrun">vrun</code>.</p>
      </div>
      <div class="rounded-xl border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg-soft)] p-5">
        <div class="mb-2.5 text-2xl font-bold text-[var(--vp-c-brand-1)]">H100 / H200</div>
        <p class="m-0 text-base">High-end accelerators available on demand for training and evaluation.</p>
      </div>
      <div class="rounded-xl border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg-soft)] p-5">
        <div class="mb-2.5 text-2xl font-bold text-[var(--vp-c-brand-1)]">Multi-cloud</div>
        <p class="m-0 text-base">Run on AWS, GCP, Azure, or your own infrastructure from one workflow.</p>
      </div>
      <div class="rounded-xl border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg-soft)] p-5">
        <div class="mb-2.5 text-2xl font-bold text-[var(--vp-c-brand-1)]">No manifests</div>
        <p class="m-0 text-base">No Kubernetes YAML, no Docker image pipeline for every experiment.</p>
      </div>
    </div>
  </section>
  <section class="mb-18">
    <div class="mx-auto mb-8 max-w-3xl text-center">
      <h2 class="mb-3 text-3xl leading-tight font-bold sm:text-4xl">Why ML teams pick Velda</h2>
      <p class="text-base sm:text-lg">Keep developer velocity high while workloads scale from single-GPU prototyping to distributed training.</p>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white p-5.5 shadow-[0_6px_24px_rgba(17,24,39,0.04)]">
        <h3 class="mb-2 text-xl font-semibold">Environment-first workflow</h3>
        <p class="m-0 text-base">Develop in a real cloud dev environment that behaves like your local machine, then scale from the same terminal.</p>
      </article>
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white p-5.5 shadow-[0_6px_24px_rgba(17,24,39,0.04)]">
        <h3 class="mb-2 text-xl font-semibold">Distributed training without cluster plumbing</h3>
        <p class="m-0 text-base">Launch multi-node jobs with <code class="vrun">vbatch -N [n]</code> and skip manual NCCL, worker IP, and SSH-key setup.</p>
      </article>
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white p-5.5 shadow-[0_6px_24px_rgba(17,24,39,0.04)]">
        <h3 class="mb-2 text-xl font-semibold">Portable by design</h3>
        <p class="m-0 text-base">No proprietary SDK lock-in. Your commands stay framework-native across PyTorch, Ray, JAX, and custom stacks.</p>
      </article>
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white p-5.5 shadow-[0_6px_24px_rgba(17,24,39,0.04)]">
        <h3 class="mb-2 text-xl font-semibold">Serving and batch in one platform</h3>
        <p class="m-0 text-base">Run batch pipelines and deploy auto-scaling HTTP services without maintaining a separate serving stack.</p>
      </article>
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white p-5.5 shadow-[0_6px_24px_rgba(17,24,39,0.04)]">
        <h3 class="mb-2 text-xl font-semibold">Snapshot and reproduce</h3>
        <p class="m-0 text-base">Snapshot the full environment before job submission so queued and rerun jobs stay reproducible.</p>
      </article>
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white p-5.5 shadow-[0_6px_24px_rgba(17,24,39,0.04)]">
        <h3 class="mb-2 text-xl font-semibold">Cloud cost control</h3>
        <p class="m-0 text-base">Use your existing cloud credits, reserved capacity, and enterprise discounts from connected providers.</p>
      </article>
    </div>
  </section>
  <section class="mb-18 rounded-2xl bg-[url('/bg-hm.svg')] bg-cover bg-center bg-no-repeat px-4 py-7 sm:px-6 sm:py-12">
    <div class="mx-auto mb-8 max-w-3xl text-center">
      <h2 class="mb-3 text-3xl leading-tight font-bold sm:text-4xl">From code to production, no context switching</h2>
      <p class="text-base sm:text-lg">A simple path for modern ML teams that need speed and reliability.</p>
    </div>
    <div class="mb-6 grid grid-cols-1 gap-3.5 xl:grid-cols-3">
      <div class="rounded-xl border border-[var(--vp-c-divider)] bg-white/90 p-4.5">
        <span class="mb-2.5 inline-flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[var(--vp-c-brand-1)] font-[Oswald] text-white">01</span>
        <h3 class="mb-2 text-lg font-semibold">Start in a template</h3>
        <p class="m-0 text-[15px]">Clone a team template and begin coding immediately in browser VS Code or your local IDE.</p>
      </div>
      <div class="rounded-xl border border-[var(--vp-c-divider)] bg-white/90 p-4.5">
        <span class="mb-2.5 inline-flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[var(--vp-c-brand-1)] font-[Oswald] text-white">02</span>
        <h3 class="mb-2 text-lg font-semibold">Scale with command prefixes</h3>
        <p class="m-0 text-[15px]">Use <code class="vrun">vrun</code> for bigger instances and <code class="vrun">vbatch</code> for distributed jobs.</p>
      </div>
      <div class="rounded-xl border border-[var(--vp-c-divider)] bg-white/90 p-4.5">
        <span class="mb-2.5 inline-flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[var(--vp-c-brand-1)] font-[Oswald] text-white">03</span>
        <h3 class="mb-2 text-lg font-semibold">Deploy services instantly</h3>
        <p class="m-0 text-[15px]">Point Velda to your command and port, then auto-scale the service with built-in routing.</p>
      </div>
    </div>
    <div class="overflow-x-auto rounded-xl bg-slate-900 px-4.5 py-4 text-slate-200">
      <pre class="m-0"><code class="text-[15px] leading-[1.7]">$ vrun -P h200-1 python train.py --dataset imagenet
$ vbatch -N 16 -- python pretrain.py --epochs 90
$ vrun --service --port 8000 python serve.py</code></pre>
    </div>
  </section>
  <div class="bottombg">
  <section class="mb-18">
    <div class="mx-auto mb-8 max-w-3xl text-center">
      <h2 class="mb-3 text-3xl leading-tight font-bold sm:text-4xl">How Velda compares</h2>
      <p class="text-base sm:text-lg">Different platforms optimize for different workflows. Velda is designed for full-lifecycle ML development.</p>
    </div>
    <div class="overflow-x-auto rounded-xl border border-[var(--vp-c-divider)] bg-white">
      <table class="w-full min-w-[720px] border-collapse">
        <thead>
          <tr>
            <th class="w-[36%] border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-left text-[15px]">Capability</th>
            <th class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">Modal</th>
            <th class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">RunPod</th>
            <th class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">SageMaker</th>
            <th class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">Velda</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-left text-[15px]">No SDK rewrite required</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">❌</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">✅</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">❌</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">✅</td>
          </tr>
          <tr>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-left text-[15px]">Container-free GPU execution</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">✅</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">❌</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">❌</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">✅</td>
          </tr>
          <tr>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-left text-[15px]">First-class distributed training primitive</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">❌</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">❌</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">Limited</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">✅</td>
          </tr>
          <tr>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-left text-[15px]">Interactive cloud dev environment</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">❌</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">❌</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">❌</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-center text-[15px]">✅</td>
          </tr>
          <tr>
            <td class="px-3.5 py-3 text-left text-[15px]">Multi-cloud scheduling with BYOC</td>
            <td class="px-3.5 py-3 text-center text-[15px]">❌</td>
            <td class="px-3.5 py-3 text-center text-[15px]">❌</td>
            <td class="px-3.5 py-3 text-center text-[15px]">AWS-only</td>
            <td class="px-3.5 py-3 text-center text-[15px]">✅</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <section class="mb-3 mt-40">
    <div class="flex flex-col gap-4 text-center md:flex-row">
      <div class="flex w-full flex-col justify-between gap-6 p-10">
        <div class="gap-5">
          <h2 class="mb-2 text-3xl font-bold">Velda Cloud</h2>
          <p class="m-0">Managed cloud with instant VSCode + GPU access, plus free monthly credit. Perfect for individual and small teams.</p>
        </div>
        <div>
          <CtaButton href="https://cloud.velda.io">Get Started</CtaButton>
        </div>
      </div>
      <div class="flex w-full flex-col justify-between gap-6 bg-white/40 p-10">
        <div class="gap-5">
          <h2 class="mb-2 text-3xl font-bold">Enterprise</h2>
          <p class="m-0">Self hosted or dedicated infrastructure, premium support for organizations of any size.</p>
        </div>
        <div>
          <CtaButton href="/book" variant="secondary">Book a demo</CtaButton>
        </div>
      </div>
    </div>
  </section>
  </div>
</div>


<style scoped>

.bottombg {
  position: relative;
}

.bottombg::before {
  content: "";
  position: absolute;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  height: 100%;
  z-index: -1;
  box-sizing: border-box;
  background-image: url("/bg-hm.svg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>
:::
