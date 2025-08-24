import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Velda",
  description: "Velda site",
  srcExclude: [
    "examples/**",
  ],
  themeConfig: {
    logo: "/logos.png",
    siteTitle: 'VELDA',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/comparison' },
      { text: 'Docs', link: '/intro' },
      { text: 'About us', link: '/contact' }
    ],

    sidebar: [
      {
        text: 'Docs',
        items: [
          { text: 'Why Velda', link: '/intro' },
          { text: 'Connect to Velda Instance', link: '/connect' },
          { text: 'Run workloads', link: '/run' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/velda-io/velda' }
    ]
  }
})
