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
      { text: 'Sign-in', link: 'https://novahub.dev' , noIcon: true },
      { text: 'Getting Started', link: '/comparison' },
      { text: 'Docs', link: '/intro' },
    ],

    sidebar: [
      {
        text: 'Docs',
        items: [
          { text: 'Why Velda', link: '/intro' },
          { text: 'Connect to Velda Instance', link: '/connect' },
          { text: 'Run workloads', link: '/run' }
        ]
      }, {
        text: 'About us',
        link: '/contact',
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/velda-io/velda' }
    ]
  }
})
