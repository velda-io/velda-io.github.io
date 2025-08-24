<template>
  <div class="cta-section">
    <div class="cta-content">
      <h2 class="cta-title">{{ title }}</h2>
      <p class="cta-description">{{ description }}</p>
      <div class="cta-buttons">
        <a 
          v-for="(button, index) in buttons" 
          :key="index"
          :href="button.link" 
          class="cta-button"
          :class="[button.variant || 'secondary']"
        >
          {{ button.text }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Button {
  text: string
  link: string
  variant?: 'primary' | 'secondary'
}

interface Props {
  title: string
  description: string
  buttons: Button[]
}

defineProps<Props>()
</script>

<style scoped>
.cta-section {
  margin: 4rem 0;
  padding: 3rem 2rem;
  background: var(--vp-c-bg-alt);
  border-radius: 1rem;
  text-align: center;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.cta-description {
  font-size: 1.125rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  font-weight: 600;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.2s ease;
  min-width: 140px;
}

.cta-button.primary {
  background: var(--vp-c-brand-1);
  color: white;
  border: 2px solid var(--vp-c-brand-1);
}

.cta-button.primary:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.cta-button.secondary {
  background: transparent;
  color: var(--vp-c-text-1);
  border: 2px solid var(--vp-c-border);
}

.cta-button.secondary:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .cta-section {
    padding: 2rem 1rem;
  }
  
  .cta-title {
    font-size: 1.5rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button {
    width: 100%;
    max-width: 280px;
  }
}
</style>
