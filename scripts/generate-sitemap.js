#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { glob } from 'glob'

const SITE_URL = 'https://velda.io'
const CURRENT_DATE = new Date().toISOString().split('T')[0]

// Page priorities and change frequencies
const pageConfig = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/blog/': { priority: '0.9', changefreq: 'weekly' },
  '/comparison': { priority: '0.8', changefreq: 'monthly' },
  '/intro': { priority: '0.8', changefreq: 'monthly' },
  '/connect': { priority: '0.7', changefreq: 'monthly' },
  '/run': { priority: '0.7', changefreq: 'monthly' },
  '/contact': { priority: '0.6', changefreq: 'monthly' },
  '/book': { priority: '0.1', changefreq: 'monthly' },
  '/eula': { priority: '0.5', changefreq: 'monthly' },
  '/security': { priority: '0.5', changefreq: 'monthly' },
  '/privacy': { priority: '0.5', changefreq: 'monthly' }
}

// Blog post configuration
const blogConfig = {
  priority: '0.8',
  changefreq: 'monthly'
}

async function generateSitemap() {
  console.log('🗺️  Generating sitemap...')
  
  // Find all markdown files
  const markdownFiles = await glob('**/*.md', {
    ignore: [
      'node_modules/**',
      'examples/**',
      'blog/README.md',
      'blog/_template.md',
      'README.md'
    ]
  })

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  // Process each markdown file
  for (const file of markdownFiles) {
    let urlPath = '/' + file.replace('.md', '')
    
    // Handle index files
    if (urlPath.endsWith('/index')) {
      urlPath = urlPath.replace('/index', '/')
    } else if (urlPath === '/index') {
      urlPath = '/'
    }
    
    // Ensure trailing slash for directories
    if (urlPath !== '/' && urlPath.endsWith('/')) {
      // Keep as is
    } else if (urlPath !== '/' && !urlPath.includes('.')) {
      // Add trailing slash for clean URLs if not already present
      // urlPath += '/'  // Commented out to match VitePress clean URLs
    }
    
    // Get page configuration or use defaults
    const config = pageConfig[urlPath] || 
                  (urlPath.startsWith('/blog/') && urlPath !== '/blog/' ? blogConfig : 
                   pageConfig[urlPath] || { priority: '0.5', changefreq: 'monthly' })
    
    // Get last modified date from file
    const filePath = path.resolve(file)
    const stats = fs.statSync(filePath)
    const lastmod = stats.mtime.toISOString().split('T')[0]

    sitemap += `  <url>
    <loc>${SITE_URL}${urlPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${config.changefreq}</changefreq>
    <priority>${config.priority}</priority>
  </url>
`
  }

  sitemap += `</urlset>`

  // Write sitemap to public directory
  fs.writeFileSync('public/sitemap.xml', sitemap)
  console.log('✅ Sitemap generated successfully!')
  console.log(`📍 Found ${markdownFiles.length} pages`)
  console.log('📄 Sitemap saved to public/sitemap.xml')

  // --- Generate sitemap.md (human-readable) ---
  try {
    console.log('📝 Generating sitemap.md...')

    // Helper: parse YAML frontmatter for title and date
    function parseFrontmatter(content) {
      if (!content.startsWith('---')) return {}
      const end = content.indexOf('\n---', 3)
      if (end === -1) return {}
      const fm = content.slice(3, end + 1)
      const res = {}
      const titleMatch = fm.match(/title:\s*(?:"([^"]+)"|'([^']+)'|([^\n]+))/i)
      const dateMatch = fm.match(/date:\s*(?:"([^"]+)"|'([^']+)'|([^\n]+))/i)
      if (titleMatch) res.title = titleMatch[1] || titleMatch[2] || titleMatch[3].trim()
      if (dateMatch) res.date = (dateMatch[1] || dateMatch[2] || dateMatch[3]).trim()
      return res
    }

    // Define user-facing main pages (label, path, short description)
    const mainPages = [
      { label: 'Home', path: '/' , desc: 'Welcome to Velda' },
      { label: 'Documentation', path: 'https://docs.velda.io', desc: 'Getting started with Velda' },
      { label: 'EULA', path: '/eula', desc: 'End User License Agreement' },
      { label: 'Privacy', path: '/privacy', desc: 'Privacy Notice' },
      { label: 'Security', path: '/security', desc: 'Security practices and policies' },
      { label: 'Getting Started', path: '/comparison', desc: 'Compare Velda with other solutions' },
      { label: 'Contact', path: '/contact', desc: 'Get in touch with the Velda team' },
      { label: 'Book a Demo', path: '/book', desc: 'Schedule a demonstration' }
    ]

    // Collect blog posts (exclude README and template)
    const blogFiles = markdownFiles.filter(f => f.startsWith('blog/') && !f.endsWith('README.md') && !f.endsWith('_template.md'))

    const blogPosts = blogFiles.map(f => {
      const content = fs.readFileSync(f, 'utf8')
      const fm = parseFrontmatter(content)
      const urlPath = '/' + f.replace('.md', '')
      const displayPath = urlPath.endsWith('/index') ? urlPath.replace('/index','/') : urlPath
      const stats = fs.statSync(path.resolve(f))
      const fallbackDate = stats.mtime.toISOString().split('T')[0]
      return {
        file: f,
        path: displayPath,
        title: fm.title || path.basename(f, '.md').replace(/[-_]/g, ' '),
        date: fm.date || fallbackDate
      }
    })

    // Sort blog posts by date descending
    blogPosts.sort((a,b) => (b.date || '') .localeCompare(a.date || ''))

    // Build markdown content similar to existing sitemap.md
    let md = `---\nsidebar: false\ntitle: Sitemap\ndescription: Complete site navigation for Velda - find all pages, blog posts, and documentation\n---\n\n# Sitemap\n\n## 🏠 Main Pages\n`

    for (const p of mainPages) {
      md += `- [${p.label}](${p.path}) - ${p.desc}\n`
    }

    md += `\n## 📰 Blog\n- [Blog Home](/blog/) - Latest posts and updates\n`
    for (const post of blogPosts) {
      // Format date as Month D, YYYY if ISO-like, otherwise keep original
      let displayDate = post.date
      try {
        const dt = new Date(post.date)
        if (!Number.isNaN(dt.getTime())) {
          displayDate = dt.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        }
      } catch (e) {}
      md += `- [${post.title}](${post.path}) - *${displayDate}*\n`
    }

    md += `\n## 🔗 External Links\n- [GitHub Repository](https://github.com/velda-io/velda) - Open source code\n- [LinkedIn](https://www.linkedin.com/company/velda-io/) - Company updates\n- [Twitter/X](https://x.com/velda_io) - Latest announcements\n\n---\n\n*Last updated: ${CURRENT_DATE}*\n`

    fs.writeFileSync('sitemap.md', md)
    console.log('✅ sitemap.md written to project root')
  } catch (err) {
    console.error('Failed to generate sitemap.md', err)
  }
}

// Run the generator
generateSitemap().catch(console.error)
