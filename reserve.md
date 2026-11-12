---
title: Reserve GPU Capacity - B300, H200, H100 | Flexible Terms & Usage Credits | Velda
description: Reserve NVIDIA B300, GB300, H200, and H100 GPU capacity for AI training, inference, and batch workloads. Flexible terms from 1-60 months with credits for unused capacity. Guaranteed availability.
keywords: reserve GPU capacity, B300 reservation, H200 reservation, H100 reservation, GPU capacity planning, Blackwell GPU
sidebar: false
outline: false
layout: page
head:
  - - meta
    - name: description
      content: Reserve NVIDIA B300, GB300, H200, and H100 GPU capacity for AI training, model inference, and batch processing. Flexible 1-60 month terms with guaranteed availability and credits.
  - - meta
    - name: keywords
      content: B300 GPU reservation, reserve B300 GPU, Blackwell GPU reservation, NVIDIA B300, GB300 GPU, H200 reservation, reserve GPU capacity, AI GPU cloud, serverless GPU reservation, GPU capacity planning, B300 pricing
  - - meta
    - property: og:title
      content: Reserve B300 & Blackwell GPU Capacity | Velda Serverless Cloud
  - - meta
    - property: og:description
      content: Reserve NVIDIA B300, GB300, H200, and H100 GPU capacity. Flexible terms, credits for unused capacity, and instant deployment on serverless infrastructure.
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
      content: Reserve NVIDIA B300, GB300, H200 GPU capacity with flexible terms. Get credits for unused capacity.
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
          "description": "Reserve NVIDIA B300, GB300, H200, and H100 GPU capacity for AI workloads with flexible terms and credits for unused capacity",
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
        Lock in access to B300, GB300, H200, and H100 GPUs for your AI workloads with predictable pricing and zero waste.
      </p>
      <div class="flex gap-4 justify-center flex-wrap text-sm">
        <a href="/b300-gpu-reservation" class="text-[#0b63f6] hover:underline font-medium">Learn about B300 Blackwell GPUs →</a>
        <span class="text-[#d8d8d8]">•</span>
        <a href="/serverless-gpu" class="text-[#0b63f6] hover:underline font-medium">Serverless GPU Training →</a>
        <span class="text-[#d8d8d8]">•</span>
        <a href="/pricing" class="text-[#0b63f6] hover:underline font-medium">View Pricing →</a>
      </div>
    </div>
    <div class="grid gap-8 grid-cols-1 lg:grid-cols-[2fr_3fr] items-start">
      <!-- Form Section - shows first on mobile -->
      <div class="lg:sticky lg:top-8 lg:order-2">
        <ReserveCapacityForm />
      </div>
      <!-- Benefits Section - shows after form on mobile, left side on desktop -->
      <div class="space-y-6 lg:order-1">
        <h2 class="text-xl font-normal mb-4 text-color-[#6b6b6b]">Why Reserve with Velda?</h2>
        <div class="space-y-5">
          <div>
            <h3 class="font-normal mb-2 text-base flex items-start gap-2 text-color-[#6b6b6b]">
              <span class="text-xl opacity-60">✅</span>
              <span>Guaranteed & Instant</span>
            </h3>
            <p class="text-color-[#8b8b8b] ml-7 text-sm">Skip waitlists. Deploy instantly with <code class="bg-[#f0f0f0] px-2 py-1 rounded text-sm">vrun</code>—no container builds or cluster management.</p>
          </div>
          <div>
            <h3 class="font-normal mb-2 text-base flex items-start gap-2 text-color-[#6b6b6b]">
              <span class="text-xl opacity-60">💰</span>
              <span>Zero Waste with Usage Credits</span>
            </h3>
            <p class="text-color-[#8b8b8b] ml-7 text-sm">Automatically receive credits for reserved capacity you don't use. Pay only for what you consume.</p>
          </div>
          <div>
            <h3 class="font-normal mb-2 text-base flex items-start gap-2 text-color-[#6b6b6b]">
              <span class="text-xl opacity-60">🔧</span>
              <span>Flexible Terms & Pricing</span>
            </h3>
            <p class="text-color-[#8b8b8b] ml-7 text-sm">Choose from 1-60 month terms. Lock in rates and get significant savings over on-demand pricing.</p>
          </div>
        </div>
        <div class="mt-6 pt-6 border-t border-[#e8e8e8]">
          <p class="text-sm text-color-[#8b8b8b]">
            <span class="font-normal">Questions?</span> <a href="/contact" class="text-[#0b63f6] hover:underline">Contact our team</a> or 
            <a href="https://calendly.com/velda-io/30min" class="text-[#0b63f6] hover:underline">schedule a call</a> to discuss your GPU requirements.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
:::
