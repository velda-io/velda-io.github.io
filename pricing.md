---
layout: page
sidebar: false
title: "Pricing"
description: "Pay-as-you-go GPU pricing."
---

:::raw

<div
  aria-hidden="true"
  class="pointer-events-none -z-10 absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] h-[420px] bg-top bg-center bg-no-repeat"
  style="background-image: url('/bg-blog.svg'); background-size: cover; background-attachment: fixed;"
></div>
<div class="mx-auto max-w-300 px-8 flex flex-col gap-y-12.5">
<div class="px-6 flex flex-col justify-center mx-auto w-full max-w-[var(--vp-layout-max-width)]">
<div class="mt-12.5 mb-12 text-center items-center flex flex-col gap-y-4">
  <h1 class="text-4xl xl:text-5xl font-bold max-w-120 md:max-w-none lg:max-w-140">Pricing</h1>
</div>

<div class="mb-12 rounded-xl border border-[#d8d8d8] bg-[#f7f9fb] p-6">
  <h2 class="text-2xl font-semibold mb-2">All Inclusive Pricing</h2>
  <p class="text-color-[#575858]">No subscription or hidden fees. You only pay for compute when your workload is running with vrun/vbatch. All prices include GPU, CPU, memory, and ephemeral disk. </p>
</div>

<div class="mb-12">
  <h2 class="text-3xl font-bold mb-4">Standard pools</h2>
  <p class="mb-4 text-color-[#575858]">Standard Pools from our preferred provider. Co-locate in the same data center as your storage, faster job launch and better IO performance.</p>
  <div class="overflow-x-auto rounded-xl border border-[#d8d8d8]">
    <table class="w-full text-left text-sm">
      <thead class="bg-[#f4f6f8] text-[#222]">
        <tr>
          <th class="px-4 py-3">Pool name</th>
          <th class="px-4 py-3">Price per hour</th>
          <th class="px-4 py-3"><a href="#spot-anote" class="underline decoration-dotted underline-offset-2">Spot price*</a></th>
          <th class="px-4 py-3">GPU</th>
          <th class="px-4 py-3">CPU</th>
          <th class="px-4 py-3">RAM</th>
          <th class="px-4 py-3">Disk</th>
          <th class="px-4 py-3">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-t border-[#ececec]">
          <td class="px-4 py-3 font-medium">h100-1</td>
          <td class="px-4 py-3" title="h100-1">$4.40</td>
          <td class="px-4 py-3" title="h100-1s">$2.50</td>
          <td class="px-4 py-3">1x H100 80 GB</td>
          <td class="px-4 py-3">16 vCPU</td>
          <td class="px-4 py-3">200 GiB</td>
          <td class="px-4 py-3">~150 GIB</td>
          <td class="px-4 py-3">Nebius H100x1 instances</td>
        </tr>
        <tr class="border-t border-[#ececec]">
          <td class="px-4 py-3 font-medium">h100-8</td>
          <td class="px-4 py-3" title="h100-8">$35.20</td>
          <td class="px-4 py-3" title="h100-8s">$20.00</td>
          <td class="px-4 py-3">8x H100 80 GB</td>
          <td class="px-4 py-3">128 vCPU</td>
          <td class="px-4 py-3">1600 GiB</td>
          <td class="px-4 py-3">1 TIB</td>
          <td class="px-4 py-3">Nebius H100x8 instances</td>
        </tr>
        <tr class="border-t border-[#ececec]">
          <td class="px-4 py-3 font-medium">h200-1</td>
          <td class="px-4 py-3" title="h200-1">$5.20</td>
          <td class="px-4 py-3" title="h200-1s">$2.80</td>
          <td class="px-4 py-3">1x H200 141 GB</td>
          <td class="px-4 py-3">16 vCPU</td>
          <td class="px-4 py-3">200 GIB</td>
          <td class="px-4 py-3">~150 GIB</td>
          <td class="px-4 py-3">Nebius H200x1 instances</td>
        </tr>
        <tr class="border-t border-[#ececec]">
          <td class="px-4 py-3 font-medium">h200-8</td>
          <td class="px-4 py-3" title="h200-8">$41.60</td>
          <td class="px-4 py-3" title="h200-8s">$22.40</td>
          <td class="px-4 py-3">8x H200 141 GB</td>
          <td class="px-4 py-3">128 vCPU</td>
          <td class="px-4 py-3">1600 GIB</td>
          <td class="px-4 py-3">~1 TIB</td>
          <td class="px-4 py-3">Nebius H200x8 instances</td>
        </tr>
        <tr class="border-t border-[#ececec]">
          <td class="px-4 py-3 font-medium">l40s-1-16d</td>
          <td class="px-4 py-3" title="l40s-1-16d">$2.10</td>
          <td class="px-4 py-3" title="l40s-1-16ds">$1.20</td>
          <td class="px-4 py-3">1x L40s 48GB</td>
          <td class="px-4 py-3">16 vCPU</td>
          <td class="px-4 py-3">96 GIB</td>
          <td class="px-4 py-3">~150 GIB</td>
          <td class="px-4 py-3">Nebius L40s x1 instances with AMD CPUs</td>
        </tr>
        <tr class="border-t border-[#ececec]">
          <td class="px-4 py-3 font-medium">shell</td>
          <td class="px-4 py-3" title="shell">$0.30</td>
          <td class="px-4 py-3">N/A</td>
          <td class="px-4 py-3">-</td>
          <td class="px-4 py-3">4 vCPU</td>
          <td class="px-4 py-3">16 GB</td>
          <td class="px-4 py-3">~50 GIB</td>
          <td class="px-4 py-3">Nebius CPU instance. Default worker when you connect.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="mb-12 rounded-xl border border-[#d8d8d8] bg-[#f7f9fb] p-6">
  <h2 class="text-2xl font-semibold mb-2">Storage pricing</h2>
  <p class="text-color-[#575858]">We do not charge for storage at this moment. Your instance currently have a storage limit of 50 GiB.</p>
</div>

<div class="grid gap-6 mb-12 grid-cols-1 md:grid-cols-2">
  <div class="rounded-xl border border-[#d8d8d8] p-6">
    <h2 class="text-2xl font-semibold mb-2">Self-hosted OSS</h2>
    <p class="text-color-[#575858] mb-4">Run open-source Velda on your own infrastructure for full control and no license fee.</p>
    <a class="text-[#0b63f6] font-semibold" href="https://github.com/velda-io/velda">Get started on GitHub</a>
  </div>
  <div class="rounded-xl border border-[#d8d8d8] p-6">
    <h2 class="text-2xl font-semibold mb-2">BYOC / Enterprise</h2>
    <p class="text-color-[#575858] mb-4">Bring your own cloud account and keep compute in your environment with enterprise features and support.</p>
    <a class="text-[#0b63f6] font-semibold" href="https://calendly.com/velda-io/30min">Talk to sales</a>
  </div>
</div>
</div>
</div>
:::
