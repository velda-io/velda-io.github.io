<template>
  <a :class="['cta', variant]" :href="href"><slot>{{ label }}</slot></a>
</template>

<script setup>
const props = defineProps({
  variant: { type: String, default: 'primary' },
  href: { type: String, required: true },
  label: { type: String, default: '' }
})
</script>

<style scoped>
.cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  min-width: 160px;
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.cta.primary {
  background: #111111;
  color: white;
  box-shadow: 0 6px 18px rgba(17, 17, 17, 0.15);
}

.cta.secondary {
  background: rgba(255, 255, 255, 0.9);
  color: #111111;
  border: 1px solid rgba(17, 17, 17, 0.12);
}

.cta.primary:hover,
.cta.secondary:hover {
  opacity: 0.98;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .cta {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .cta {
    width: 70%;
    min-width: unset;
  }
}
</style>
