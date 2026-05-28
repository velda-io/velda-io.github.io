---
layout: page
sidebar: false
title: "ML Workflow Automation"
description: "Machine learning workflow automation with Velda: build scalable ML pipelines using vrun and vbatch, from dependency-based training stages to parallel fan-out processing."
keywords: ["machine learning workflow", "ML workflow automation", "machine learning pipeline", "MLOps workflow", "vbatch", "vrun", "fan-out pattern", "parallel data processing", "model training pipeline"]
image: "https://velda.io/og-preview.png"
markdownStyles: false
---

<script setup>
import CtaButton from './.vitepress/components/CtaButton.vue'
import HomeHeroInfo from './.vitepress/components/HomeHeroInfo.vue'
</script>

:::raw
<HomeHeroInfo
  highlight-text="ML Workflows"
  headline-part1="without"
  headline-part2="orchestration overhead"
  tagline="Build machine learning workflows from process-train-evaluate pipelines to large fan-out jobs with familiar bash and Python commands."
  subline="Use vrun and vbatch to scale cloud training and data processing while keeping your ML workflow reproducible, debuggable, and fast."
  code-snippet="vbatch -P h200-8 --name train --after-success process python train_model.py"
  primary-cta-text="Get Started"
  primary-cta-href="https://cloud.velda.io"
  secondary-cta-text="Book a demo"
  secondary-cta-href="/book"
/>

<div class="mx-auto max-w-6xl px-4 pb-18 sm:px-6 md:px-16">
  <section class="mb-20 rounded-2xl bg-[url('/bg-hm.svg')] bg-cover bg-center bg-no-repeat px-4 py-8 sm:px-6 sm:py-12">
    <div class="mx-auto mb-8 max-w-3xl text-center">
      <h2 class="mb-3 text-3xl font-bold leading-tight sm:text-4xl">Design machine learning pipelines in clear stages</h2>
      <p class="text-base sm:text-lg">Chain tasks with after-success dependencies so each stage in your ML pipeline starts only when the previous stage passes.</p>
    </div>
    <div class="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div class="rounded-xl border border-[var(--vp-c-divider)] bg-white/90 p-5">
        <span class="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--vp-c-brand-1)] font-[Oswald] text-white">01</span>
        <h3 class="mb-2 text-lg font-semibold">Process</h3>
        <p class="m-0 text-[15px]">Run cleaning, feature extraction, and validation on CPU pools.</p>
      </div>
      <div class="rounded-xl border border-[var(--vp-c-divider)] bg-white/90 p-5">
        <span class="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--vp-c-brand-1)] font-[Oswald] text-white">02</span>
        <h3 class="mb-2 text-lg font-semibold">Train</h3>
        <p class="m-0 text-[15px]">Start GPU training only after preprocessing succeeds.</p>
      </div>
      <div class="rounded-xl border border-[var(--vp-c-divider)] bg-white/90 p-5">
        <span class="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--vp-c-brand-1)] font-[Oswald] text-white">03</span>
        <h3 class="mb-2 text-lg font-semibold">Evaluate</h3>
        <p class="m-0 text-[15px]">Gate promotion with evaluation and regression checks.</p>
      </div>
    </div>
    <div class="overflow-x-auto rounded-xl bg-slate-900 px-5 py-4 text-slate-200">
      <pre v-pre class="m-0"><code class="text-sm leading-7 sm:text-[15px]"># Process data
vbatch -P cpu-16 --name process python process_data.py
# Train after processing
vbatch -P h200-8 --name train --after-success process python train_model.py
# Evaluate after training
vbatch -P cpu-8 --name eval --after-success train python evaluate_model.py</code></pre>
    </div>
  </section>
  <section class="mb-20">
    <div class="mx-auto mb-8 max-w-3xl text-center">
      <h2 class="mb-3 text-3xl font-bold leading-tight sm:text-4xl">Scale with fan-out and recursive ML sub-pipelines</h2>
      <p class="text-base sm:text-lg">Process thousands of files in parallel, and nest per-file inference plus evaluation as machine learning workflows become more complex.</p>
    </div>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white p-6 shadow-[0_6px_24px_rgba(17,24,39,0.04)]">
        <h3 class="mb-2 text-xl font-semibold">Fan-out data processing</h3>
        <p class="mb-4 text-base">Use a multiline for loop to dispatch one task per file for parallel data processing in your ML workflow.</p>
        <div class="overflow-x-auto rounded-lg bg-slate-900 p-4 text-slate-200">
          <pre class="m-0"><code class="text-sm">for file in *.csv; do
  vbatch --name "$file" -P cpu-8 python process_file.py "$file"
done</code></pre>
        </div>
      </article>
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white p-6 shadow-[0_6px_24px_rgba(17,24,39,0.04)]">
        <h3 class="mb-2 text-xl font-semibold">Recursive workflow pattern</h3>
        <p class="mb-4 text-base">Create a recursive sub-pipeline for each input item, such as inference followed by evaluation per file.</p>
        <div class="overflow-x-auto rounded-lg bg-slate-900 p-4 text-slate-200">
          <pre class="m-0"><code class="text-sm"># process_movie.sh:
FILE=$1
vbatch --name preprocess -P cpu-8 ./pre-process.sh $FILE
vbatch --name inference -P h100-1 --after-success preprocess ./inference $FILE 
vbatch --name upload-data -P cpu-1 ./upload-data $FILE
# Entry point
for file in *.mp4; do
  vbatch --name "$file" ./process_movie.sh "$file"
done</code></pre>
        </div>
      </article>
    </div>
  </section>
  <div class="bottombg">
  <section class="mb-20">
    <div class="mx-auto mb-8 max-w-3xl text-center">
      <h2 class="mb-3 text-3xl font-bold leading-tight sm:text-4xl">Why this machine learning workflow model works</h2>
      <p class="text-base sm:text-lg">You keep shell-native control while gaining cloud-native scheduling, dependency management, and reproducibility for MLOps pipelines.</p>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-xl border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg-soft)] p-5">
        <div class="mb-2 text-2xl font-bold text-[var(--vp-c-brand-1)]">Simple</div>
        <p class="m-0 text-base">Build pipelines with bash and task names, no heavy orchestration framework required.</p>
      </div>
      <div class="rounded-xl border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg-soft)] p-5">
        <div class="mb-2 text-2xl font-bold text-[var(--vp-c-brand-1)]">Scalable</div>
        <p class="m-0 text-base">Fan out across many files and nodes while retaining one clear parent workflow.</p>
      </div>
      <div class="rounded-xl border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg-soft)] p-5">
        <div class="mb-2 text-2xl font-bold text-[var(--vp-c-brand-1)]">Reproducible</div>
        <p class="m-0 text-base">Consistent environments and explicit dependencies reduce workflow drift over time.</p>
      </div>
      <div class="rounded-xl border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg-soft)] p-5">
        <div class="mb-2 text-2xl font-bold text-[var(--vp-c-brand-1)]">Observable</div>
        <p class="m-0 text-base">Track task status, inspect logs, and troubleshoot failures at each stage quickly.</p>
      </div>
    </div>
  </section>
    <section class="mb-3 mt-40">
      <div class="flex flex-col gap-4 text-center md:flex-row">
        <div class="flex w-full flex-col justify-between gap-6 p-10">
          <div class="gap-5">
            <h2 class="mb-2 text-3xl font-bold">Velda Cloud</h2>
            <p class="m-0">Managed cloud with instant VSCode + GPU access, plus free credit. Perfect for individual and small teams.</p>
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
  background-image: url('/bg-hm.svg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>
:::
