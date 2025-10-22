---
layout: page
sidebar: false
title: "Velda plans & Deployment options"
description: "Choose the right plan for your team. From open-source to enterprise-grade solutions."
---

:::raw
<div class="px-6 flex flex-col justify-center mx-auto w-full max-w-[var(--vp-layout-max-width)]">
<div class="mt-12.5 mb-25 text-center items-center flex flex-col gap-y-4">
  <h1 class="text-4xl xl:text-5xl font-bold max-w-120 md:max-w-none lg:max-w-120"> Help your whole team work smarter</h1>
  <p class="text-lg line-relaxed text-color-[#575858]">Start free and scale as you grow.</p>
</div>

<div class="pricing-grid grid gap-8 mb-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
  <PricingCard class="order-3 md:order-3 xl:order-1"
    title="Open source"
    subtitle="Self-hosted"
    price="$0"
    period="forever"
    description="For developers who want full control and don't mind managing infrastructure."
    :features="[
      'Completely free',
      'Unlimited GPUs',
      'Run in your own cloud',
      'All data in your control',
      'Community support',
    ]"
    cta-text="Go to GitHub"
    cta-link="https://github.com/velda-io/velda"
  />

  <PricingCard class="order-1 md:order-1 xl:order-2"
    title="Velda Cloud"
    subtitle="Hosted"
    price="From $0"
    period=""
    description="Managed cloud with free tier and pay-as-you-scale pricing. Perfect for individual and small teams. "
    :features="[
      'Immediate GPU access',
      'Free points every month',
      'Pay-as-you-go pricing',
      'Email support',
    ]"
    cta-link="https://velda.cloud"
    cta-text="Get Free GPU now"
    badge="Bonus Welcome Credits For Limited Time"
    :featured="true"
  />

  <PricingCard class="order-2 md:order-2 xl:order-3"
    title="Enterprise"
    subtitle="Dedicated"
    price="Custom"
    period="pricing"
    description="Self hosted or dedicated infrastructure, premium support, for organizations of any size."
    :features="[
      'RBAC User management',
      'SSO / SAML integration',
      'Multiple hosting options',
      'Advanced Observability',
      'Priority support',
    ]"
    cta-text="Book a demo"
    cta-link="https://calendly.com/velda-io/30min"
  />
</div>

<CallToAction
  title="Still deciding?"
  description="Our experts can help you make the right choice."
  :buttons="[
    { text: 'Book a free consultation', link: 'https://calendly.com/velda-io/30min', variant: 'primary' },
  ]"
/>
</div>
:::
