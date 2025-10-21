<template>
  <footer class="vp-raw w-full relative z-30 border-t"
    :style="{ borderColor: 'var(--vp-c-divider)', background: 'var(--vp-c-bg-soft)' }">
    <div class="max-w-7xl mx-auto px-6 py-8 text-[var(--vp-c-text-2)] text-md grid grid-cols-2 md:grid-cols-9 lg:grid-cols-12 gap-row-2 gap-y-10 md:gap-3 mb-6">
      <div class="col-span-2 md:col-span-3 lg:col-span-6 flex flex-col items-start justify-between gap-4">
        <img src="/logo-h.png" alt="Velda Logo" class="h-10" />
        <div class="text-[var(--vp-c-text-3)] text-sm">&copy; {{ currentYear }} Velda. All rights reserved.</div>
      </div>

      <!-- Links block spans two columns on small screens and three on md -->
      <div class="col-span-1 md:col-span-2 lg:col-span-2">
        <ul class="space-y-3">
          <li><a href="/comparison">Plan & Pricing</a></li>
          <li><a href="/slurm-alternative">Velda VS Slurm</a></li>
          <li><a href="/run">Run Workload</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/intro">Documentation</a></li>
        </ul>
      </div>

      <div class="col-span-1 md:col-span-2 lg:col-span-2">
        <ul class="space-y-3">
          <li><a href="/contact">About Us</a></li>
          <li><a href="/privacy">Privacy notice</a></li>
          <li><a href="/eula">Terms of Service</a></li>
          <li><a href="/security">Security Notice</a></li>
          <li><a href="/sitemap">Sitemap</a></li>
        </ul>
      </div>

      <div class="col-span-1 md:col-span-2 lg:col-span-2">
        <ul class="space-y-3 w-full">
          <li><a href="https://calendly.com/velda-io" target="_blank" rel="noopener">Schedule a Call</a></li>
          <li><a href="mailto:contact@velda.io">Send an email</a></li>
        </ul>

        <div class="flex items-center gap-3 mt-3">
          <a aria-label="GitHub" href="https://github.com/velda-io/velda" target="_blank" rel="noopener"
            class="hover:text-[var(--vp-c-brand-1)]">
            <Icon icon="tabler:brand-github" class="w-6 h-6" />
          </a>
          <a aria-label="LinkedIn" href="https://www.linkedin.com/company/velda-io/" target="_blank" rel="noopener"
            class="hover:text-[var(--vp-c-brand-1)]">
            <Icon icon="tabler:brand-linkedin" class="w-6 h-6" />
          </a>
          <a aria-label="X" href="https://x.com/velda_io" target="_blank" rel="noopener"
            class="hover:text-[var(--vp-c-brand-1)]">
            <Icon icon="tabler:brand-x" class="w-6 h-6" />
          </a>
        </div>
      </div>

      <!-- small divider already present by border-t on footer; keep spacing for bottom if needed -->
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
