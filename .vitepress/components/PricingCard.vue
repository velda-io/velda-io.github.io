<template>
  <div class="h-full flex flex-col">
    <div v-if="!badge" class="h-12"> </div>
    <div
      :class="[
        'relative bg-white rounded-2xl flex flex-col grow overflow-hidden',
        featured ? 'border-4 border-teal-500 shadow-lg' : 'border border-gray-200 shadow-md',
        badge ? 'pt-12' : ''
      ]"
    >
      <div v-if="badge" class="absolute left-0 right-0 top-0">
        <span class="block w-full text-center bg-teal-500 text-white font-semibold py-3 rounded-t-xl">{{ badge }}</span>
      </div>

      <div class="px-7.5 py-10 flex flex-col gap-y-4 h-83">
        <div>
          <h3 class="text-xl font-bold text-gray-900 mb-1">{{ title }}</h3>
          <div class="text-md text-gray-700" v-if="subtitle">{{ subtitle }}</div>
        </div>

        <div class="grow">
          <div class="mb-4">
            <span class="text-3xl font-bold text-gray-900">{{ price }}</span>
            <span class="text-gray-500 ml-3" v-if="period">{{ period }}</span>
          </div>
          <p class="text-base text-sm text-gray-600">{{ description }}</p>
        </div>

        <div class="flex justify-center">
          <a :href="ctaLink" class="w-full max-w-2xl inline-block text-center rounded-full bg-black text-white font-medium py-2.5">{{ ctaText }}</a>
          </div>
      </div>

      <hr class="border-t border-gray-300 mx-7.5" />

      <ul class="p-7.5 space-y-2.5 grow">
        <li v-for="(feature, index) in features" :key="index" class="flex items-center gap-4 text-black-100">
          <CheckIcon class="w-8 h-8 flex-shrink-0" />
          <span class="text-base">{{ feature }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">

import { h, defineComponent, useAttrs } from 'vue'

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
  name: 'CheckIcon',
  setup() {
    const attrs = useAttrs()
    return () =>
      h(
        'svg',
        { ...attrs, fill: 'none', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
        [
          h('circle', { cx: '12', cy: '12', r: '9', stroke: 'currentColor', 'stroke-width': '1.8', fill: 'white' }),
          h('path', { d: 'M9 12.5l1.8 1.8L15 10', stroke: 'currentColor', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', fill: 'none' }),
        ]
      )
  },
})
</script>
