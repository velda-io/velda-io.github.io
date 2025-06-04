import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Velda",
  description: "A VitePress Site",
  themeConfig: {
    logo: "/logos.png",
    siteTitle: 'VELDA',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Contact us', link: '/contact' }
    ],
  }
})
