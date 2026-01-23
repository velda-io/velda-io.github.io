<template>
  <div class="home-hero">
    <div class="hero-content">
      <h1 class="hero-headline">
        Scale like <span class="highlight">your local machine</span><br/>in the cloud
      </h1>
      <p class="hero-tagline">
        A cloud OS for <strong>AI/ML</strong> workloads
      </p>
      <p class="hero-subline">
        Launch distributed AI and batch jobs on any cloud directly from your dev environment. No Docker images, no Kubernetes manifests: just add a command prefix. 
      </p>
      <div class="hero-ctas">
        <CtaButton variant="primary" href="/github">Self-host Velda</CtaButton>
        <CtaButton variant="secondary" href="https://velda.cloud">Use Velda Cloud</CtaButton>
      </div>
      <div class="hero-code">
        <code>vrun -P gpu-h200-8 python train.py</code>
      </div>
      <p class="hero-code-caption">
        Same experience locally or in the cloud.
      </p>
    </div>
  </div>
</template>

<script setup>
import CtaButton from './CtaButton.vue'
</script>

<style scoped>

.home-hero {
  margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 24px 48px;
}

@media (min-width: 640px) {
  .home-hero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 48px 64px;
  }
}

@media (min-width: 960px) {
  .home-hero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 64px 64px;
  }
}

.hero-content {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1152px;
}

@media (min-width: 960px) {
  .hero-content {
    flex-direction: row;
  }
}

.home-hero::before {
  /* background artwork */
  display: block;
  background-image: url('/hero.svg');
  opacity: 0.7;
  background-repeat: no-repeat;
  background-position: center center;
  content: "";

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  position: absolute;
}
.home-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* span the full viewport width so the background covers edge-to-edge */
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  margin-bottom: 100px;
  box-sizing: border-box;
  /* place the hero behind the header and allow it to extend into the header area */
  position: relative;
  z-index: 0;
  /* pull the hero up to overlap the header; use the VitePress nav height variable when available */
}

.hero-content {
  max-width: 1100px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.hero-headline {
  font-size: 60px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.highlight {
  background: linear-gradient(90deg, #ff2da6 0%, #7b5cff 60%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
}

.hero-tagline {
  font-size: 24px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  font-weight: 400;
}

.hero-tagline strong {
  font-weight: 700;
}

.hero-subline {
  font-size: 18px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.hero-code {
  margin-top: 50px;
  margin-bottom: 1rem;
}

.hero-code code {
  background: rgba(30, 41, 59, 0.9);
  color: #e2e8f0;
  padding: 18px 32px;
  border-radius: 12px;
  font-size: 18px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  display: inline-block;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.hero-code code::before {
  content: '$ ';
  color: #94a3b8;
}

.hero-code-caption {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
}

.hero-kicker {
  display: none;
  font-size: 0.75rem;
  font-family: 'Oswald', ui-sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--vp-c-brand-2);
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.hero-ctas {
  display: flex;
  width: 100%;
  max-width: 520px;
  margin: 1.5rem auto 0;
  gap: 30px;
  align-items: center;
  justify-content: center;
}

/* Responsive design */
@media (max-width: 1024px) {

  .hero-content {
    padding: 0 10px;
  }

  .hero-headline {
    font-size: 48px;
  }

  .hero-tagline {
    font-size: 20px;
  }

  .hero-subline {
    font-size: 1rem;
    max-width: 85%;
  }

  .hero-code code {
    font-size: 16px;
    padding: 16px 28px;
  }

  .cta {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .hero-headline {
    font-size: 35px;
  }

  .hero-tagline {
    font-size: 18px;
  }

  .hero-subline {
    font-size: 16px;
    max-width: 90%;
  }

  .hero-code code {
    font-size: 14px;
    padding: 14px 24px;
  }

  .hero-code-caption {
    font-size: 14px;
  }

  .hero-ctas {
    flex-direction: column;
    max-width: 320px;
    gap: 0.75rem;
  }

  .cta {
    width: 70%;
    min-width: unset;
  }
}

@media (max-width: 480px) {

  .hero-headline {
    font-size: 30px;
  }

  .hero-tagline {
    font-size: 16px;
  }

  .hero-subline {
    font-size: 14px;
  }

  .hero-code code {
    font-size: 13px;
    padding: 12px 20px;
  }

  .hero-code-caption {
    font-size: 13px;
  }

}
</style>