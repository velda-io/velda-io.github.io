import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Velda",
  description: "A VitePress Site",
  srcExclude: [
    "examples/**",
  ],
  themeConfig: {
    logo: "/logos.png",
    siteTitle: 'VELDA',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Contact us', link: '/contact' }
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
    /*

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
    */
  }
})
