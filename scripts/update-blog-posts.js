#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Simple YAML front matter parser for our use case
function parseFrontMatter(content) {
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontMatterMatch) return null;

  const frontMatter = frontMatterMatch[1];
  const body = frontMatterMatch[2];

  const metadata = {};
  const lines = frontMatter.split('\n');

  for (const line of lines) {
    // Skip empty lines and lines that don't contain ':'
    if (!line.trim() || !line.includes(':')) continue;

    const colonIndex = line.indexOf(':');
    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Skip if key is empty or value is empty
    if (!key || !value) continue;

    // Handle arrays (tags, keywords)
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        // Handle YAML array format: [item1, item2, "item with spaces"]
        const arrayContent = value.slice(1, -1); // Remove brackets
        const items = [];
        let currentItem = '';
        let inQuotes = false;
        let quoteChar = '';

        for (let i = 0; i < arrayContent.length; i++) {
          const char = arrayContent[i];

          if (!inQuotes && (char === '"' || char === "'")) {
            inQuotes = true;
            quoteChar = char;
          } else if (inQuotes && char === quoteChar) {
            inQuotes = false;
            quoteChar = '';
          } else if (!inQuotes && char === ',') {
            if (currentItem.trim()) {
              items.push(currentItem.trim());
            }
            currentItem = '';
          } else {
            currentItem += char;
          }
        }

        if (currentItem.trim()) {
          items.push(currentItem.trim());
        }

        value = items;
      } catch (e) {
        console.warn(`Failed to parse array for ${key}: ${value}`);
        value = [];
      }
    } else if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    metadata[key] = value;
  }

  return { metadata, body };
}

// Generate slug from filename
function generateSlug(filename) {
  return path.basename(filename, '.md');
}

// Main function
async function updateBlogPosts() {
  try {
    // Find all .md files in blog directory
    const blogDir = path.join(__dirname, '..', 'blog');
    const mdFiles = await glob('*.md', { cwd: blogDir });

    console.log(`Found ${mdFiles.length} blog post files`);

    const blogPosts = [];

    for (const file of mdFiles) {
      // Skip template files (starting with _) and README files
      if (file.startsWith('_') || file.toLowerCase() === 'readme.md' || file.toLowerCase() === 'index.md') {
        console.log(`Skipping ${file}: Template or README file`);
        continue;
      }

      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');

      const parsed = parseFrontMatter(content);
      if (!parsed) {
        console.warn(`Skipping ${file}: No valid front matter found`);
        continue;
      }

      const { metadata } = parsed;

      // Create blog post object
      const blogPost = {
        title: metadata.title || 'Untitled',
        slug: generateSlug(file),
        description: metadata.description || '',
        excerpt: metadata.excerpt || '',
        date: metadata.date || '',
        author: metadata.author || '',
        readingTime: metadata.readingTime || '',
        category: metadata.category || '',
        image: metadata.image || '',
        tags: Array.isArray(metadata.tags) ? metadata.tags : []
      };

      blogPosts.push(blogPost);
      console.log(`Processed: ${blogPost.title}`);
    }

    // Sort by date (newest first)
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Generate TypeScript code
    const tsCode = `export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  date: string;
  author: string;
  readingTime: string;
  category: string;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = ${JSON.stringify(blogPosts, null, 2)};
`;

    // Write to file
    const outputPath = path.join(__dirname, '..', '.vitepress', 'data', 'blogPosts.ts');
    fs.writeFileSync(outputPath, tsCode, 'utf-8');

    console.log(`✅ Updated blogPosts.ts with ${blogPosts.length} posts`);

  } catch (error) {
    console.error('❌ Error updating blog posts:', error);
    process.exit(1);
  }
}

// Run the script
updateBlogPosts();
