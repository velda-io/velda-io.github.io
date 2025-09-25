import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";
import { blogPosts } from './data/blogPosts';

export default withMermaid(defineConfig({
  title: "Velda",
  description: "Cloud development that actually feels local. Run AI workloads, GPU clusters, and data processing without Kubernetes complexity.",
  sitemap: {
    hostname: 'https://velda.io'
  },
  srcExclude: [
    "README.md",
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

    // Context-aware sidebars: blog pages get a blog sidebar; docs pages get the docs sidebar
    sidebar: {
      '/blog/': [
        {
          text: 'Blog',
          items: [{text: "Latest Posts", link: '/blog/'}, ...blogPosts.map(post => ({
            text: post.title,
            link: `/blog/${post.slug}`
          }))]
        }
      ],
      '/': [
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
      ]
    },

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/velda-io/' },
      { icon: 'github', link: 'https://github.com/velda-io/velda' },
      { icon: 'x', link: 'https://x.com/velda_io' }
    ],
  },
  cleanUrls: true,
  transformHead: async ({ pageData }) => {
    const head: any[] = [];
    const fm = pageData.frontmatter;
    if (fm.title) {
      head.push(['meta', { property: 'og:title', content: fm.title }]);
    }
    if (fm.description) {
      head.push(['meta', { property: 'og:description', content: fm.description }]);
      head.push(['meta', { name: 'description', content: fm.description }]);
    }
    if (fm.image) {
      head.push(['meta', { property: 'og:image', content: fm.image }]);
    }
    if (fm.date) {
      head.push(['meta', { property: 'article:published_time', content: new Date(fm.date).toISOString() }]);
    }
    if (fm.author) {
      head.push(['meta', { property: 'article:author', content: fm.author }]);
    }
    if (fm.keywords) {
      head.push(['meta', { name: 'keywords', content: Array.isArray(fm.keywords) ? fm.keywords.join(', ') : fm.keywords }]);
    }
    if (fm.excerpt) {
      head.push(['meta', { property: 'og:description', content: fm.excerpt }]);
    }
    head.push(['meta', { property: 'og:type', content: 'article' }]);
    head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }]);

    // Add canonical link (strip .html or .md suffix if present)
    try {
      const hostname = 'https://velda.io'
      // Prefer VitePress-provided cleaned path when available
      const cleanedPath = (pageData as any).path
      const relPath = pageData.relativePath
      let pagePath = ''

      if (typeof cleanedPath === 'string' && cleanedPath.length) {
        pagePath = cleanedPath
      } else if (typeof relPath === 'string' && relPath.length) {
        // convert 'blog/introducing-velda.md' -> '/blog/introducing-velda'
        pagePath = '/' + relPath.replace(/index\.md$/i, '').replace(/\.md$/i, '')
      }

      // Fallback to root if still empty
      if (!pagePath) pagePath = '/'

      // Strip trailing .html if any (defensive)
      pagePath = pagePath.replace(/\.html$/i, '')

      // Ensure leading slash
      if (!pagePath.startsWith('/')) pagePath = '/' + pagePath

      const canonical = `${hostname}${pagePath}`
      head.push(['link', { rel: 'canonical', href: canonical }])
    } catch (e) {
      // ignore canonical generation errors
    }

    return head;
  },
  markdown: {
    anchor: { permalink: undefined },
  }
}))