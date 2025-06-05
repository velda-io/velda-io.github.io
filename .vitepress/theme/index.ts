/// <reference types="vite/client" />
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { inBrowser } from 'vitepress'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export default {
  ...DefaultTheme,
  enhanceApp({ router }) {
    if (inBrowser && import.meta.env.PROD) {
      // Inject GA script
      const gaId = 'G-JY86KL8PQD'
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
      // Track SPA navigation
      router.onAfterRouteChanged = (to) => {
        if (window.gtag) {
          window.gtag('config', gaId, { page_path: to })
        }
      }
    }
  }
}