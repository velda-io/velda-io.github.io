---
title: Reserve GPU Capacity - B300, H200, H100 | Flexible Terms & Spot Credits | Velda
description: Reserve NVIDIA B300, GB300, H200, and H100 GPU capacity for AI training, inference, and batch workloads. Flexible terms from 1-60 months with spot credits for unused capacity. Guaranteed availability.
keywords: reserve GPU capacity, B300 reservation, H200 reservation, H100 reservation, GPU capacity planning, Blackwell GPU
sidebar: false
outline: false
layout: page
head:
  - - meta
    - name: description
      content: Reserve NVIDIA B300, GB300, H200, and H100 GPU capacity for AI training, model inference, and batch processing. Flexible 1-60 month terms with guaranteed availability and spot credits.
  - - meta
    - name: keywords
      content: B300 GPU reservation, reserve B300 GPU, Blackwell GPU reservation, NVIDIA B300, GB300 GPU, H200 reservation, reserve GPU capacity, AI GPU cloud, serverless GPU reservation, GPU capacity planning, B300 pricing
  - - meta
    - property: og:title
      content: Reserve B300 & Blackwell GPU Capacity | Velda Serverless Cloud
  - - meta
    - property: og:description
      content: Reserve NVIDIA B300, GB300, H200, and H100 GPU capacity. Flexible terms, spot credits for unused capacity, and instant deployment on serverless infrastructure.
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:url
      content: https://velda.io/reserve
  - - meta
    - property: og:image
      content: https://velda.io/og-preview.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Reserve B300 & Blackwell GPU Capacity | Velda
  - - meta
    - name: twitter:description
      content: Reserve NVIDIA B300, GB300, H200 GPU capacity with flexible terms. Get spot credits for unused capacity.
  - - meta
    - name: twitter:image
      content: https://velda.io/og-preview.png
  - - link
    - rel: canonical
      href: https://velda.io/reserve
  - - script
    - type: application/ld+json
      innerHTML: >
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "GPU Capacity Reservation",
          "name": "Velda GPU Reservation Service",
          "description": "Reserve NVIDIA B300, GB300, H200, and H100 GPU capacity for AI workloads with flexible terms and spot credits for unused capacity",
          "provider": {
            "@type": "Organization",
            "name": "Velda",
            "url": "https://velda.io",
            "logo": "https://velda.io/logo-h.png"
          },
          "areaServed": "Worldwide",
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://velda.io/reserve"
          },
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "itemOffered": {
              "@type": "Product",
              "name": "GPU Capacity Reservation",
              "description": "Reserve B300, GB300, H200, H100 GPU capacity"
            }
          }
        }
---

<script setup>
import ReserveCapacityForm from './.vitepress/components/ReserveCapacityForm.vue'
</script>

:::raw
<div
  aria-hidden="true"
  class="pointer-events-none -z-10 absolute left-1/2 top-0 -translate-x-1/2 w-[100vw] h-[420px] bg-top bg-center bg-no-repeat"
  style="background-image: url('/bg-blog.svg'); background-size: cover; background-attachment: fixed;"
></div>

<div class="mx-auto max-w-300 px-8 pb-12">
  <div class="px-6 mx-auto w-full max-w-[var(--vp-layout-max-width)]">
    <div class="mt-12 mb-10 text-center">
      <h1 class="text-4xl xl:text-5xl font-bold mb-4">Reserve GPU Capacity</h1>
      <p class="text-xl text-color-[#575858] max-w-200 mx-auto mb-6">
        Secure guaranteed access to B300, GB300, H200, and H100 GPUs for AI training, inference, and batch workloads. 
        Flexible reservation terms with spot credits for unused capacity—no waste, maximum flexibility.
      </p>
      <div class="flex gap-4 justify-center flex-wrap text-sm">
        <a href="/b300-gpu-reservation" class="text-[#0b63f6] hover:underline font-medium">Learn about B300 Blackwell GPUs →</a>
        <span class="text-[#d8d8d8]">•</span>
        <a href="/serverless-gpu" class="text-[#0b63f6] hover:underline font-medium">Serverless GPU Training →</a>
        <span class="text-[#d8d8d8]">•</span>
        <a href="/pricing" class="text-[#0b63f6] hover:underline font-medium">View Pricing →</a>
      </div>
    </div>
    <div class="mb-10 grid gap-4 grid-cols-1 md:grid-cols-3">
      <div class="rounded-xl border border-[#d8d8d8] bg-white p-6 text-center">
        <div class="text-3xl mb-2">✅</div>
        <h3 class="text-lg font-semibold mb-2">Guaranteed Availability</h3>
        <p class="text-sm text-color-[#575858]">Skip the waitlist. Your reserved capacity is always ready when you need it.</p>
      </div>
      <div class="rounded-xl border border-[#d8d8d8] bg-white p-6 text-center">
        <div class="text-3xl mb-2">💰</div>
        <h3 class="text-lg font-semibold mb-2">Spot Credits</h3>
        <p class="text-sm text-color-[#575858]">Automatically receive spot credits for reserved capacity you don't use. Zero waste.</p>
      </div>
      <div class="rounded-xl border border-[#d8d8d8] bg-white p-6 text-center">
        <div class="text-3xl mb-2">🔧</div>
        <h3 class="text-lg font-semibold mb-2">Flexible Terms</h3>
        <p class="text-sm text-color-[#575858]">Choose terms from 1 month to 5 years. Scale with your needs.</p>
      </div>
    </div>
    <ReserveCapacityForm />
    <div class="mt-12 rounded-xl border border-[#d8d8d8] bg-[#f7f9fb] p-8">
      <h2 class="text-2xl font-bold mb-6">Why Reserve GPU Capacity with Velda?</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <div>
          <h3 class="font-semibold mb-2 text-lg">🚀 Instant Deployment</h3>
          <p class="text-color-[#575858]">Deploy workloads instantly with <code class="bg-white px-2 py-1 rounded text-sm">vrun</code>. No container builds, no cluster management. Just run.</p>
        </div>
        <div>
          <h3 class="font-semibold mb-2 text-lg">📊 Cost Predictability</h3>
          <p class="text-color-[#575858]">Lock in rates with reserved capacity. Get significant savings over on-demand pricing for consistent workloads.</p>
        </div>
        <div>
          <h3 class="font-semibold mb-2 text-lg">🎯 Priority Access</h3>
          <p class="text-color-[#575858]">Get early access to new GPU generations like B300 Blackwell. Reserve now to be first in line.</p>
        </div>
        <div>
          <h3 class="font-semibold mb-2 text-lg">🛡️ Enterprise Support</h3>
          <p class="text-color-[#575858]">Premium support included with all reservations. Dedicated account management for large deployments.</p>
        </div>
      </div>
      <div class="mt-6 pt-6 border-t border-[#d8d8d8]">
        <p class="text-sm text-color-[#575858]">
          <strong>Questions?</strong> <a href="/contact" class="text-[#0b63f6] hover:underline">Contact our team</a> or 
          <a href="https://calendly.com/velda-io/30min" class="text-[#0b63f6] hover:underline">schedule a call</a> to discuss your GPU requirements.
        </p>
      </div>
    </div>
  </div>
</div>
:::
