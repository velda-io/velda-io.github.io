/// <reference types="vite/client" />
import { inBrowser } from 'vitepress'

function setupGA(router) {
  if (inBrowser && import.meta.env.PROD) {
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
    router.onAfterRouteChanged = (to) => {
      if (window.gtag) {
        window.gtag('config', gaId, { page_path: to })
      }
    }
  }
}

export default setupGA