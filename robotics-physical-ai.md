---
layout: page
sidebar: false
title: "GPU Infrastructure for Robotics and Physical AI Development"
description: "Run NVIDIA Isaac Sim and Isaac Lab workflows in the browser with on-demand GPUs for simulation, policy training, synthetic data generation, and hardware iteration."
keywords: ["robotics GPU", "physical AI", "NVIDIA Isaac Sim", "Isaac Lab", "OpenUSD", "robot policy training", "synthetic data generation", "browser-based simulation", "H100 on demand"]
image: "https://velda.io/og-preview.png"
markdownStyles: false
---

<script setup>
import CtaButton from './.vitepress/components/CtaButton.vue'
import HomeHeroInfo from './.vitepress/components/HomeHeroInfo.vue'
</script>

:::raw
<HomeHeroInfo
  highlight-text="Physical AI"
  headline-part1="GPU workflows"
  headline-part2="Without Overhead"
  tagline="The ultimate serverless GPU platform to run simulation, training, viz and batch pipelines"
  subline="Velda supports every phase of physical AI development: scene visualization, policy training, physics simulation, synthetic data generation, and iteration before hardware deployment, including pipelines across heterogeneous hardware pools."
  code-snippet="vrun -P h100-1 python train_policy_with_isaac.py"
/>

<div class="mx-auto max-w-6xl px-4 pb-18 sm:px-6 md:px-16">
  <section class="mb-18 rounded-2xl bg-[url('/bg-hm.svg')] bg-cover bg-center bg-no-repeat px-4 py-8 sm:px-6 sm:py-12">
    <div class="mx-auto mb-8 max-w-3xl text-center">
      <h2 class="mb-3 text-3xl font-bold leading-tight sm:text-4xl">A practical workflow for robotics teams</h2>
      <p class="text-base sm:text-lg">Robotics development spans simulation, training, data generation, and real-world validation. This page outlines how Velda maps compute to each stage while keeping environments consistent.</p>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white/90 p-5">
        <span class="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--vp-c-brand-1)] font-[Oswald] text-white">01</span>
        <h3 class="mb-2 text-lg font-semibold">Visualize</h3>
        <p class="m-0 text-[15px]">Stream Isaac Sim in the browser with NVIDIA rendering and OpenUSD scenes, without local installation.</p>
      </article>
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white/90 p-5">
        <span class="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--vp-c-brand-1)] font-[Oswald] text-white">02</span>
        <h3 class="mb-2 text-lg font-semibold">Simulate</h3>
        <p class="m-0 text-[15px]">Run physics-accurate scenario tests and edge-case validation before hardware trials.</p>
      </article>
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white/90 p-5">
        <span class="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--vp-c-brand-1)] font-[Oswald] text-white">03</span>
        <h3 class="mb-2 text-lg font-semibold">Train</h3>
        <p class="m-0 text-[15px]">Launch Isaac Lab policy training on H100 GPUs on demand and shut down capacity when runs complete.</p>
      </article>
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white/90 p-5">
        <span class="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--vp-c-brand-1)] font-[Oswald] text-white">04</span>
        <h3 class="mb-2 text-lg font-semibold">Batch</h3>
        <p class="m-0 text-[15px]">Scale synthetic data generation and parallel scenario execution with elastic batch jobs.</p>
      </article>
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white/90 p-5">
        <span class="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--vp-c-brand-1)] font-[Oswald] text-white">05</span>
        <h3 class="mb-2 text-lg font-semibold">Iterate</h3>
        <p class="m-0 text-[15px]">Feed simulation and training outputs into hardware testing cycles with reproducible runtime environments.</p>
      </article>
    </div>
  </section>

  <section class="mb-18">
    <div class="mx-auto mb-8 max-w-3xl text-center">
      <h2 class="mb-3 text-3xl font-bold leading-tight sm:text-4xl">NVIDIA Isaac Sim and Isaac Lab in one platform</h2>
      <p class="text-base sm:text-lg">Use the same project workspace for simulation authoring, policy training, and data workflows, then scale compute only when needed.</p>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg-soft)] p-6">
        <h3 class="mb-3 text-xl font-semibold">Batch simulation with fan-out scheduling</h3>
        <p class="mb-4 text-base">Run many Isaac Sim scenarios in parallel with a fan-out pattern. This is useful for synthetic data generation and edge-case sweeps across large parameter spaces.</p>
        <div class="overflow-x-auto rounded-lg bg-slate-900 p-4 text-slate-200">
          <pre class="m-0"><code class="text-sm"># Example: fan-out batch simulation runs
for scenario in scenarios/*.usd; do
  vbatch --name "sim-${scenario##*/}" -P l40s-1 -- \
    python run_isaac_sim.py --scene "$scenario" --headless
done</code></pre>
        </div>
      </article>
      <article class="rounded-xl border border-[var(--vp-c-divider)] bg-[var(--vp-c-bg-soft)] p-6">
        <h3 class="mb-3 text-xl font-semibold">On-demand policy training</h3>
        <p class="mb-4 text-base">Run reinforcement learning and robot policy experiments with Isaac Lab on H100 pools. Training pipelines can schedule preprocessing, simulation, and learning stages across heterogeneous hardware such as CPU, L40S, and H100 resources.</p>
        <div class="overflow-x-auto rounded-lg bg-slate-900 p-4 text-slate-200">
          <pre class="m-0"><code class="text-sm"># Example: train a policy after CPU preprocessing
vbatch -P cpu-16 --name prep -- python prepare_dataset.py
vbatch -P h100-8 --name policy-train --after-success prep -- \
  python train.py --framework isaac-lab</code></pre>
        </div>
      </article>
    </div>
  </section>

  <section class="mb-18">
    <div class="mx-auto mb-8 max-w-3xl text-center">
      <h2 class="mb-3 text-3xl font-bold leading-tight sm:text-4xl">Interactive Isaac Sim from browser</h2>
      <p class="text-base sm:text-lg">No local hardware or installation required. Access Isaac Sim, or any GUI editing tools, directly from your browser, with NVIDIA accelerated rendering. Start building in just one click, and only pay for GPUs when active.</p>
    </div>
    <div class="grid grid-cols-1 gap-4">
        <img src="https://assets.velda.io/isaac.jpg" alt="Interactive Isaac Sim streamed in browser" class="mb-4 w-full rounded-lg object-cover" loading="lazy" />
    </div>
  </section>
  <section class="mb-18">
    <div class="mx-auto mb-8 max-w-3xl text-center">
      <h2 class="mb-3 text-3xl font-bold leading-tight sm:text-4xl">Compute model by development phase</h2>
      <p class="text-base sm:text-lg">Different physical AI stages need different resource profiles. Velda keeps those stages connected without requiring separate infrastructure stacks, and supports one pipeline that spans heterogeneous hardware pools.</p>
    </div>
    <div class="overflow-x-auto rounded-xl border border-[var(--vp-c-divider)] bg-white">
      <table class="w-full min-w-[760px] border-collapse">
        <thead>
          <tr>
            <th class="w-[24%] border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-left text-[15px]">Phase</th>
            <th class="w-[30%] border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-left text-[15px]">Typical Workload</th>
            <th class="w-[22%] border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-left text-[15px]">Compute Pattern</th>
            <th class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-left text-[15px]">How Velda Supports It</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-[15px]">Scene authoring</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-[15px]">Isaac Sim visualization and debugging</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-[15px]">Interactive GPU session</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-[15px]">Browser-streamed GPU workspace with persistent project state</td>
          </tr>
          <tr>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-[15px]">Policy training</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-[15px]">Isaac Lab RL training</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-[15px]">Scheduled multi-GPU jobs</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-[15px]">On-demand H100 pools and queue-based batch execution</td>
          </tr>
          <tr>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-[15px]">Synthetic data</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-[15px]">Parallel render and labeling scenarios</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-[15px]">Fan-out batch runs</td>
            <td class="border-b border-[var(--vp-c-divider)] px-3.5 py-3 text-[15px]">Elastic parallel tasks that scale to zero after completion</td>
          </tr>
          <tr>
            <td class="px-3.5 py-3 text-[15px]">Hardware iteration</td>
            <td class="px-3.5 py-3 text-[15px]">Regression validation and edge-case replay</td>
            <td class="px-3.5 py-3 text-[15px]">Mixed interactive + batch</td>
            <td class="px-3.5 py-3 text-[15px]">Reproducible environments across simulation and deployment checks</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <div class="bottombg">
    <section class="mb-18">
      <div class="mx-auto mb-8 max-w-3xl text-center">
        <h2 class="mb-3 text-3xl font-bold leading-tight sm:text-4xl">Frequently asked questions</h2>
        <p class="text-base sm:text-lg">Common questions from robotics and physical AI teams evaluating browser-accessible GPU infrastructure.</p>
      </div>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white p-5.5 shadow-[0_6px_24px_rgba(17,24,39,0.04)]">
          <h3 class="mb-2 text-lg font-semibold">Can Isaac Sim run without local installation?</h3>
          <p class="m-0 text-base">Yes. Isaac Sim sessions can run on remote GPUs and stream into the browser, which removes local workstation dependency for most simulation tasks.</p>
        </article>
        <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white p-5.5 shadow-[0_6px_24px_rgba(17,24,39,0.04)]">
          <h3 class="mb-2 text-lg font-semibold">How does this help with physical AI development?</h3>
          <p class="m-0 text-base">It keeps simulation, training, and data generation in one operational path so teams can move from virtual testing to hardware validation with fewer environment changes.</p>
        </article>
        <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white p-5.5 shadow-[0_6px_24px_rgba(17,24,39,0.04)]">
          <h3 class="mb-2 text-lg font-semibold">What happens when jobs are idle?</h3>
          <p class="m-0 text-base">Batch and training compute can be released when workloads finish, so capacity is aligned to active simulation and training windows.</p>
        </article>
        <article class="rounded-xl border border-[var(--vp-c-divider)] bg-white p-5.5 shadow-[0_6px_24px_rgba(17,24,39,0.04)]">
          <h3 class="mb-2 text-lg font-semibold">Is this only for simulation workloads?</h3>
          <p class="m-0 text-base">No. The same environment can be used for model training, synthetic data generation, evaluation pipelines, and pre-deployment checks.</p>
        </article>
      </div>
    </section>
    <section class="mb-3 mt-40">
      <div class="flex flex-col gap-4 text-center md:flex-row">
        <div class="flex w-full flex-col justify-between gap-6 p-10">
          <div class="gap-5">
            <h2 class="mb-2 text-3xl font-bold">Velda Cloud</h2>
            <p class="m-0">Browser-accessible cloud workspace with on-demand GPU capacity for robotics and physical AI development.</p>
          </div>
          <div>
            <CtaButton href="https://cloud.velda.io">Open Workspace</CtaButton>
          </div>
        </div>
        <div class="flex w-full flex-col justify-between gap-6 bg-white/40 p-10">
          <div class="gap-5">
            <h2 class="mb-2 text-3xl font-bold">Deployment Options</h2>
            <p class="m-0">Use managed cloud or discuss dedicated infrastructure options for team-scale robotics workflows.</p>
          </div>
          <div>
            <CtaButton href="/book" variant="secondary">Discuss Setup</CtaButton>
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
