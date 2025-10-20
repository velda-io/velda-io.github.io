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
    badge="Free"
  />

  <PricingCard
    title="Individual"
    subtitle="Hosted"
    price="Coming Soon"
    period=""
    description="Managed cloud with free tier and pay-as-you-scale pricing. Perfect for individual and small teams. "
    :features="[
      'Immediate GPU access',
      'Free usage every month',
      'Pay-as-you-go pricing',
      'No cloud setup required',
      'Email support',
    ]"
    cta-link="https://velda.app"
    cta-text="Get Free GPU now"
    badge="Extra welcome credits"
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
      'Advanced Observability',
      'Priority support',
    ]"
    cta-text="Book a demo"
    cta-link="https://calendly.com/velda-io/30min"
    badge="Free setup & trial"
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

/* Two-column layout between 768px and 1279px: place Individual (2nd) and Enterprise (3rd) on top row */
@media (min-width: 768px) and (max-width: 1279px) {
  .pricing-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  /* Reset any explicit spanning so items lay out predictably */
  .pricing-grid > * {
    grid-column: auto;
    grid-row: auto;
  }

  /* Individual (2nd card) on top-left */
  .pricing-grid > :nth-child(2) {
    grid-column: 1;
    grid-row: 1;
  }

  /* Enterprise (3rd card) on top-right */
  .pricing-grid > :nth-child(3) {
    grid-column: 2;
    grid-row: 1;
  }

  /* Open source (1st card) occupies the left column on the second row */
  .pricing-grid > :nth-child(1) {
    grid-column: 1;
    grid-row: 2;
    justify-self: start; /* ensure it aligns to the left column */
  }
}

/* Three-column layout at large screens (1280px and up) */
@media (min-width: 1280px) {
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

/* Better responsive handling for pricing cards - single column ordering */
@media (max-width: 767px) {
  .pricing-grid {
    /* use flex for easy re-ordering on narrow screens */
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* Order items so single-column reads: Individual (2), Enterprise (3), Open source (1) */
  .pricing-grid > :nth-child(2) { order: 1; }
  .pricing-grid > :nth-child(3) { order: 2; }
  .pricing-grid > :nth-child(1) { order: 3; }

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