#!/usr/bin/env node

import fs from 'fs'
import { DOMParser } from 'xmldom'

function validateSitemap() {
  console.log('🔍 Validating sitemap...')
  
  try {
    const sitemapContent = fs.readFileSync('public/sitemap.xml', 'utf-8')
    
    // Parse XML
    const parser = new DOMParser()
    const doc = parser.parseFromString(sitemapContent, 'text/xml')
    
    // Check if parsing was successful
    const parseErrors = doc.getElementsByTagName('parsererror')
    if (parseErrors.length > 0) {
      console.error('❌ XML parsing error:')
      console.error(parseErrors[0].textContent)
      return false
    }
    
    // Get all URLs
    const urls = doc.getElementsByTagName('url')
    console.log(`📊 Found ${urls.length} URLs in sitemap`)
    
    // Validate each URL
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i]
      const loc = url.getElementsByTagName('loc')[0]?.textContent
      const lastmod = url.getElementsByTagName('lastmod')[0]?.textContent
      const changefreq = url.getElementsByTagName('changefreq')[0]?.textContent
      const priority = url.getElementsByTagName('priority')[0]?.textContent
      
      if (!loc) {
        console.error(`❌ URL ${i + 1}: Missing location`)
        continue
      }
      
      if (!loc.startsWith('https://velda.io')) {
        console.error(`❌ URL ${i + 1}: Invalid domain: ${loc}`)
        continue
      }
      
      if (lastmod && !/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
        console.error(`❌ URL ${i + 1}: Invalid lastmod format: ${lastmod}`)
        continue
      }
      
      if (changefreq && !['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'].includes(changefreq)) {
        console.error(`❌ URL ${i + 1}: Invalid changefreq: ${changefreq}`)
        continue
      }
      
      if (priority && (isNaN(priority) || priority < 0 || priority > 1)) {
        console.error(`❌ URL ${i + 1}: Invalid priority: ${priority}`)
        continue
      }
      
      console.log(`✅ ${loc}`)
    }
    
    console.log('✅ Sitemap validation completed successfully!')
    return true
    
  } catch (error) {
    console.error('❌ Error validating sitemap:', error.message)
    return false
  }
}

// Only install xmldom if needed
try {
  validateSitemap()
} catch (error) {
  if (error.message.includes('xmldom')) {
    console.log('📦 Installing xmldom for validation...')
    console.log('Run: npm install --save-dev xmldom')
  } else {
    console.error('❌ Validation error:', error.message)
  }
}
