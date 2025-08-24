<template>
  <div class="comparison-table-container">
    <h2 class="comparison-title">{{ title }}</h2>
    <p class="comparison-subtitle">{{ subtitle }}</p>
    
    <div class="table-wrapper">
      <table class="comparison-table">
        <thead>
          <tr>
            <th class="feature-column">Feature</th>
            <th v-for="plan in plans" :key="plan" class="plan-column">
              {{ plan }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(feature, index) in features" :key="index">
            <td class="feature-name">{{ feature.name }}</td>
            <td v-for="(value, planIndex) in feature.values" :key="planIndex" class="feature-value">
              <CheckIcon v-if="value === true" class="check-icon" />
              <CrossIcon v-else-if="value === false" class="cross-icon" />
              <span v-else>{{ value }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Feature {
  name: string
  values: (string | boolean)[]
}

interface Props {
  title: string
  subtitle: string
  plans: string[]
  features: Feature[]
}

defineProps<Props>()

// Icon components
const CheckIcon = {
  template: `
    <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
    </svg>
  `
}

const CrossIcon = {
  template: `
    <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
    </svg>
  `
}
</script>

<style scoped>
.comparison-table-container {
  margin: 3rem 0;
}

.comparison-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
  text-align: center;
  font-family: 'Oswald', Arial, sans-serif;
}

.comparison-subtitle {
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 0.75rem;
  border: 1px solid var(--vp-c-border);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--vp-c-bg);
  table-layout: fixed;
}

.comparison-table th {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-weight: 600;
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-border);
  vertical-align: middle;
}

.feature-column {
  width: 40%;
  text-align: left;
}

.plan-column {
  width: 20%;
  text-align: center;
}

.comparison-table td {
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  vertical-align: middle;
}

.feature-name {
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-align: left;
}

.feature-value {
  text-align: center;
  word-wrap: break-word;
}

.check-icon,
.cross-icon {
  margin: 0 auto;
  display: block;
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.comparison-table tr:hover {
  background: var(--vp-c-bg-soft);
}

@media (max-width: 768px) {
  .comparison-title {
    font-size: 1.5rem;
  }
  
  .comparison-table th,
  .comparison-table td {
    padding: 0.75rem 0.5rem;
  }
  
  .feature-column {
    min-width: 150px;
  }
}
</style>
