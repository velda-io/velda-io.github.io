<template>
  <div class="pricing-card" :class="{ featured: featured }">
    <div v-if="badge" class="card-badge">
      <span>{{ badge }}</span>
    </div>
    
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
      <div class="card-subtitle" v-if="subtitle">{{ subtitle }}</div>
      <div class="card-price">
        <span class="price-amount">{{ price }}</span>
        <span class="price-period" v-if="period">{{ period }}</span>
      </div>
      <p class="card-description">{{ description }}</p>
    </div>

    <ul class="feature-list">
      <li v-for="(feature, index) in features" :key="index" class="feature-item">
        <CheckIcon class="feature-icon" />
        <span>{{ feature }}</span>
      </li>
    </ul>

    <div class="card-footer">
      <a :href="ctaLink" class="cta-button" :class="ctaClass">
        {{ ctaText }}
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">

import { h, defineComponent } from "vue";
interface Props {
  title: string
  subtitle?: string
  price: string
  period?: string
  description: string
  features: string[]
  ctaText: string
  ctaLink: string
  ctaClass?: string
  badge?: string
  featured?: boolean
}

defineProps<Props>()
const CheckIcon = defineComponent({
  name: "CheckIcon",
  setup() {
    return () =>
      h("svg", { class: "w-5 h-5 text-green-500", fill: "currentColor", viewBox: "0 0 20 20" }, [
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

.pricing-card {
  position: relative;
  padding: 2rem;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-border);
  border-radius: 1.5rem;
  box-shadow: var(--vp-shadow-2);
  transition: all 0.3s ease;
  border-left: 4px solid var(--vp-c-border);
  border-right: 4px solid var(--vp-c-border);
}

.pricing-card.featured {
  border-color: var(--vp-c-brand-1);
  border-left-color: var(--vp-c-brand-1);
  border-right-color: var(--vp-c-brand-1);
  transform: scale(1.02);
  box-shadow: var(--vp-shadow-3);
}

.card-badge {
  position: absolute;
  top: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
}

.card-badge span {
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
}

.pricing-card:not(.featured) .card-badge span {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
}

.card-header {
  text-align: center;
  margin-bottom: 2rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.card-subtitle {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}

.card-price {
  margin-bottom: 1.5rem;
}

.price-amount {
  font-size: 3rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1;
}

/* Handle longer pricing text like "Pay As You Go" */
.price-amount:not([class*="$"]):not([class*="Custom"]) {
  font-size: 2rem;
}

.price-period {
  color: var(--vp-c-text-2);
  margin-left: 0.5rem;
}

.card-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--vp-c-text-2);
}

.feature-icon {
  flex-shrink: 0;
}

.card-footer {
  text-align: center;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid var(--vp-c-border);
  color: var(--vp-c-text-1);
}

.cta-button:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.cta-button.primary {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.cta-button.primary:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}
</style>
