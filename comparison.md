---
layout: Comparison
sidebar: false
title: "Deployment options"
description: "Choose the right plan for your team. From open-source to enterprise-grade solutions."
---

# Start developoing on Velda

Choose the plan for your team's needs. Start free and scale as you grow.

<div class="pricing-grid">
  <PricingCard 
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
    cta-text="Get Started"
    cta-link="https://github.com/velda-io/velda"
    badge="OPEN SOURCE"
  />

  <PricingCard 
    title="Individual"
    subtitle="Hosted"
    price="Pay As You Go"
    period=""
    description="Managed cloud with free tier and pay-as-you-scale pricing. Perfect for individual and small teams. "
    :features="[
      'Free studio (4-hour session limit)',
      'Pay-as-you-go pricing',
      'No cloud setup required',
      'Single US region',
      'Email support',
    ]"
    cta-text="Start for free"
    cta-link="https://novahub.dev"
    cta-class="primary"
    badge="MOST POPULAR"
    :featured="true"
  />

  <PricingCard 
    title="Enterprise"
    subtitle="Dedicated"
    price="Custom"
    period="pricing"
    description="Self hosted or dedicated infrastructure, premium support, for organizations of any size."
    :features="[
      'RBAC User management',
      'SSO / SAML integration',
      'Multiple hosting options',
      'Observability',
      'Priority support',
    ]"
    cta-text="Book a demo"
    cta-link="https://calendly.com/velda-io/30min"
    badge="ENTERPRISE"
  />
</div>

<CallToAction 
  title="Still deciding?"
  description="Our experts can help you make the right choice."
  :buttons="[
    { text: 'Book a free consultation', link: 'https://calendly.com/velda-io/30min', variant: 'primary' },
  ]"
/>

<style scoped>

h1 {
  font-family: 'Oswald', Arial, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 1.5rem;
}
/* Pricing Grid Layout */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

@media (min-width: 768px) {
  .pricing-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

/* Enhanced card shadows */
.pricing-card:not(.featured):hover {
  transform: translateY(-2px);
  box-shadow: var(--vp-shadow-3);
}

/* Better responsive handling for pricing cards */
@media (max-width: 767px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .pricing-card.featured {
    transform: none;
  }
}

h2 {
  font-family: 'Oswald', Arial, sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 1rem;
}

/* Styling for list items */
.faq ol {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.faq li {
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  margin-bottom: 0.5rem;
}
</style>