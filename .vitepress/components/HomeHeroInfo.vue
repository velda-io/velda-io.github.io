<template>
  <div class="home-hero">
    <div class="hero-content">
      <h1 class="hero-headline">
        The developer platform for ML and HPC workloads that scale instantly
      </h1>
      <p class="hero-subline">
        Instantly run workflows and scale your workloads across your cluster or cloud with a simple
        <code class="vrun">vrun</code> command prefix. No image rebuilds, no dependency drift, no manifests, no waiting, cut cloud bill.
      </p>
      <div class="hero-kicker">
        vrun is all you need
      </div>
      <div class="hero-ctas">
        <a class="cta primary" href="/comparison">Get started</a>
        <a class="cta secondary" href="/book">Book a demo</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-hero {
  display: flex;
  align-items: center;
  padding-top: 15vh;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-headline {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  /* tighten spacing under headline */
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.hero-subline {
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
  margin-bottom: 0;
}

.hero-kicker {
  font-size: 0.75rem;
  font-family: 'Oswald', ui-sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--vp-c-brand-2);
  margin-top: 2.2rem;
  margin-bottom: 2rem;
}

.hero-ctas {
  display: flex;
  /* constrain CTA row so buttons aren't too wide on large screens */
  width: 100%;
  max-width: 420px;
  margin: 0.75rem auto 0;
  gap: 1rem;
  align-items: stretch;
}

.cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.1rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  /* make CTAs equal width */
  flex: 1 1 0;
  min-width: 120px;
}

.cta.primary {
  background: var(--vp-button-brand-bg, var(--vp-c-brand-1));
  color: white;
}

.cta.secondary {
  background: transparent;
  color: var(--vp-c-brand-1);
  border: 2px solid var(--vp-c-brand-1);
}

.cta.primary:hover, .cta.secondary:hover {
  opacity: 0.95;
  transform: translateY(-1px);
}

/* Responsive design */
@media (max-width: 768px) {
  .home-hero {
    padding: 3rem 1.5rem;
  }

  .hero-headline {
    font-size: 2.25rem;
  }

  .hero-subline {
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .home-hero {
    padding: 2rem 1rem;
  }

  .hero-headline {
    font-size: 1.875rem;
  }

  .hero-subline {
    font-size: 1rem;
  }

  .hero-ctas {
    flex-direction: column;
    max-width: 320px;
    gap: 0.75rem;
  }
  .cta { width: 100%; }
}
</style>