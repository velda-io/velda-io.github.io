/// <reference types="vite/client" />
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Animations from '../components/Animations.vue'
import PricingCard from '../components/PricingCard.vue'
import FeatureComparison from '../components/FeatureComparison.vue'
import CallToAction from '../components/CallToAction.vue'
import BlogHome from '../components/BlogHome.vue'
import Comparison from './comparison.vue'
import setupGA from './ga'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export default {
  ...DefaultTheme,
  enhanceApp({ router, app }) {
    app.component('Animations', Animations)
    app.component('PricingCard', PricingCard)
    app.component('FeatureComparison', FeatureComparison)
    app.component('CallToAction', CallToAction)
    app.component('BlogHome', BlogHome)
    app.component('Comparison', Comparison)
    setupGA(router)
  }
}