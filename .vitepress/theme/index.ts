/// <reference types="vite/client" />
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { inBrowser } from 'vitepress'
import CookieBanner from './CookieBanner.tsx'
import { h } from 'vue'
import Animations from '../components/Animations.vue'
import PricingCard from '../components/PricingCard.vue'
import FeatureComparison from '../components/FeatureComparison.vue'
import CallToAction from '../components/CallToAction.vue'
import Comparison from './comparison.vue'
import setupGA from './ga'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export default {
  ...DefaultTheme,
  Layout: () => {
        return h(DefaultTheme.Layout, null, {
          'layout-bottom': () => h(CookieBanner)
        })
  },
  enhanceApp({ router, app }) {
    app.component('Animations', Animations)
    app.component('PricingCard', PricingCard)
    app.component('FeatureComparison', FeatureComparison)
    app.component('CallToAction', CallToAction)
    if (inBrowser) {
      app.component('CookieBanner', CookieBanner)
    }
    app.component('Comparison', Comparison)
    setupGA(router)
  }
}