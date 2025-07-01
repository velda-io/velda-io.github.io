/// <reference types="vite/client" />
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { inBrowser } from 'vitepress'
import CookieBanner from './CookieBanner.tsx'
import { h } from 'vue'
import Animations from '../components/Animations.vue'

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
    if (inBrowser) {
      app.component('CookieBanner', CookieBanner)
    }
    if (inBrowser && import.meta.env.PROD) {
      // Cookie consent logic
      const consent = localStorage.getItem('cookie_consent')
      const gaId = 'G-JY86KL8PQD'
      if (consent === 'accepted') {
        if (!document.getElementById('ga-script')) {
          const script = document.createElement('script')
          script.id = 'ga-script'
          script.async = true
          script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
          document.head.appendChild(script)

          const inline = document.createElement('script')
          inline.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`
          document.head.appendChild(inline)
        }
        router.onAfterRouteChanged = (to) => {
          if (window.gtag) {
            window.gtag('config', gaId, { page_path: to })
          }
        }
      } else {
        // Anonymous mode: inject GA with anonymize_ip and no cookies
        if (!document.getElementById('ga-script')) {
          const script = document.createElement('script')
          script.id = 'ga-script'
          script.async = true
          script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
          document.head.appendChild(script)

          const inline = document.createElement('script')
          inline.innerHTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { 'anonymize_ip': true, 'allow_ad_personalization_signals': false, 'allow_google_signals': false, 'client_storage': 'none' });`
          document.head.appendChild(inline)
        }
        router.onAfterRouteChanged = (to) => {
          if (window.gtag) {
            window.gtag('config', gaId, { page_path: to, anonymize_ip: true, allow_ad_personalization_signals: false, allow_google_signals: false, client_storage: 'none' })
          }
        }
      }
    }
  }
}