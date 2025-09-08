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
  '/book': { priority: '0.5', changefreq: 'monthly' }
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
}

// Run the generator
generateSitemap().catch(console.error)
