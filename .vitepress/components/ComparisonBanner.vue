<template>
  <div class="comparison-banner">
    <div class="banner-content">
      <!-- Left Side: Verdict and CTA -->
      <div class="verdict-section">
        <div class="verdict-content">
          <h2 class="verdict-title">{{ verdictTitle }}</h2>
          <p class="verdict-description">{{ verdictDescription }}</p>
          <div class="cta-buttons">
            <a 
              v-for="(button, index) in ctaButtons" 
              :key="index"
              :href="button.link" 
              class="cta-button"
              :class="[button.variant || 'primary']"
            >
              {{ button.text }}
            </a>
          </div>
        </div>
      </div>

      <!-- Right Side: VS Comparison with Logos -->
      <div class="comparison-section">
        <div class="vs-container">
          <div class="competitor-item">
            <div class="competitor-logo">
              <img :src="competitorA.logo" :alt="competitorA.name" />
            </div>
            <span class="competitor-name">{{ competitorA.name }}</span>
          </div>
          
          <div class="vs-divider">
            <span class="vs-text">VS</span>
          </div>
          
          <div class="competitor-item winner" :class="{ highlight: highlightWinner }">
            <div class="competitor-logo">
              <img :src="competitorB.logo" :alt="competitorB.name" />
            </div>
            <span class="competitor-name">{{ competitorB.name }}</span>
            <div v-if="showWinnerBadge" class="winner-badge">
              <CheckIcon class="check-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, defineComponent } from "vue";

interface Button {
  text: string
  link: string
  variant?: 'primary' | 'secondary'
}

interface Competitor {
  name: string
  logo: string
}

interface Props {
  verdictTitle: string
  verdictDescription: string
  ctaButtons: Button[]
  competitorA: Competitor
  competitorB: Competitor
  highlightWinner?: boolean
  showWinnerBadge?: boolean
}

defineProps<Props>()

const CheckIcon = defineComponent({
  name: "CheckIcon",
  setup() {
    return () =>
      h("svg", { 
        class: "w-6 h-6", 
        fill: "currentColor", 
        viewBox: "0 0 20 20",
        xmlns: "http://www.w3.org/2000/svg"
      }, [
        h("path", {
          "fill-rule": "evenodd",
          d: "M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z",
          "clip-rule": "evenodd",
        }),
      ]);
  },
});
</script>

<style scoped>
.comparison-banner {
  margin: 0;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, var(--vp-c-bg-alt) 0%, var(--vp-c-bg) 100%);
  border-top: 1px solid var(--vp-c-border);
  border-bottom: 1px solid var(--vp-c-border);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.comparison-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 50%, rgba(var(--vp-c-brand-rgb, 59, 130, 246), 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(var(--vp-c-brand-rgb, 59, 130, 246), 0.03) 0%, transparent 50%);
  pointer-events: none;
}

.banner-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Left Side - Verdict Section */
.verdict-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.verdict-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.verdict-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 0 2rem 0;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.cta-button.primary {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}

.cta-button.primary:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: var(--vp-shadow-3);
}

.cta-button.secondary {
  background: transparent;
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.cta-button.secondary:hover {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  transform: translateY(-2px);
}

/* Right Side - Comparison Section */
.comparison-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vs-container {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.competitor-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  position: relative;
  padding: 1.5rem;
  border-radius: 1rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  transition: all 0.3s ease;
}

.competitor-item.winner.highlight {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 20px rgba(var(--vp-c-brand-1), 0.2);
  transform: scale(1.05);
}

.competitor-logo {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vp-c-bg-alt);
  border-radius: 50%;
  padding: 1rem;
}

.competitor-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.competitor-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
  text-align: center;
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  border-radius: 50%;
  font-weight: 700;
  font-size: 1.2rem;
  box-shadow: var(--vp-shadow-2);
}

.winner-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  background: var(--vp-c-green-1, #10b981);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--vp-shadow-2);
}

.check-icon {
  width: 18px;
  height: 18px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .banner-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .verdict-title {
    font-size: 2rem;
  }
  
  .verdict-description {
    font-size: 1.1rem;
  }
  
  .vs-container {
    gap: 1rem;
  }
  
  .competitor-item {
    padding: 1rem;
  }
  
  .competitor-logo {
    width: 60px;
    height: 60px;
  }
  
  .vs-divider {
    width: 50px;
    height: 50px;
    font-size: 1rem;
  }
  
  .cta-buttons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .comparison-banner {
    padding: 3rem 1rem;
  }
  
  .vs-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .vs-divider {
    transform: rotate(90deg);
  }
  
  .cta-button {
    width: 100%;
    justify-content: center;
  }
}
</style>