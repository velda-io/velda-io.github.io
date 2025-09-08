# Velda Blog

This directory contains the blog posts for the Velda website.

## Structure

- `index.md` - Main blog landing page with list of posts
- `introducing-velda.md` - First blog post imported from Medium
- `_template.md` - Template for creating new blog posts (not published)

## Adding New Blog Posts

1. Create a new `.md` file in this directory
2. Use the frontmatter format from `_template.md`
3. Add the new post to the `index.md` file
4. Update the sidebar in `.vitepress/config.mts` if needed

## Frontmatter Fields

- `title`: The blog post title
- `description`: SEO description and social media preview
- `date`: Publication date (YYYY-MM-DD format)
- `author`: Author name
- `tags`: Array of relevant tags

## Development

Run `npm run dev` from the root directory to start the development server and preview changes.
