/// <reference types="vite/client" />
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Animations from '../components/Animations.vue'
import PricingCard from '../components/PricingCard.vue'
import FeatureComparison from '../components/FeatureComparison.vue'
import CallToAction from '../components/CallToAction.vue'
import BlogHome from '../components/BlogHome.vue'
import Footer from '../components/Footer.vue'
import ComparisonBanner from '../components/ComparisonBanner.vue'
import CustomLayout from './CustomLayout.vue'
import Comparison from './comparison.vue'
import { Icon } from '@iconify/vue'
import setupGA from './ga'
import ComparisonLayout from './ComparisonLayout.vue'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export default {
  ...DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({ router, app }) {
    app.component('Animations', Animations)
    app.component('PricingCard', PricingCard)
    app.component('FeatureComparison', FeatureComparison)
    app.component('CallToAction', CallToAction)
    app.component('BlogHome', BlogHome)
    app.component('Footer', Footer)
    app.component('ComparisonBanner', ComparisonBanner)
    app.component('comparison', ComparisonLayout)
    app.component('ComparisonDoc', ComparisonLayout)
    app.component('Icon', Icon)
    app.component('Comparison', Comparison)
    setupGA(router)
  }
}