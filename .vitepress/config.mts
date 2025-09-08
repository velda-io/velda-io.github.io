import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Velda",
  description: "Cloud development that actually feels local. Run AI workloads, GPU clusters, and data processing without Kubernetes complexity.",
  sitemap: {
    hostname: 'https://velda.io'
  },
  srcExclude: [
    "examples/**",
    "blog/README.md",
    "blog/_template.md"
  ],
  themeConfig: {
    logo: "/logos.png",
    siteTitle: 'VELDA',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      { text: 'Getting Started', link: '/comparison' },
      { text: 'Docs', link: '/intro' },
    ],

    sidebar: [
      {
        text: 'Blog',
        items: [
          { text: 'Latest Posts', link: '/blog/' },
          { text: 'Introducing Velda', link: '/blog/introducing-velda' }
        ]
      },
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
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/velda-io/' },
      { icon: 'github', link: 'https://github.com/velda-io/velda' },
      { icon: 'x', link: 'https://x.com/velda_io' }
    ],
    footer: {
      copyright: 'Copyright © 2025 Velda Inc'
    }
  },
  cleanUrls: true,
})
