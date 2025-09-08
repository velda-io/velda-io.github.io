<template>
  <div class="blog-home">
    <div class="blog-header">
      <h1>Velda Blog</h1>
      <p class="blog-description">
        <strong>Stay ahead of the curve in cloud development.</strong> Get the latest insights, tutorials, and product updates about cloud infrastructure, AI development, and the Velda platform.
      </p>
    </div>

    <section class="blog-posts-section">
      <h2>📚 Latest Posts</h2>
      <div class="blog-posts-grid">
        <article 
          v-for="post in blogPosts" 
          :key="post.slug"
          class="blog-post-card"
        >
          <div class="blog-image-container">
            <img 
              :src="post.image" 
              :alt="post.title"
              class="blog-cover-image"
            />
          </div>
          <div class="blog-content">
            <div class="blog-category">{{ post.category }}</div>
            <h3 class="blog-title">
              <a :href="`/blog/${post.slug}`">{{ post.title }}</a>
            </h3>
            <div class="blog-meta">
              <span>{{ post.date }}</span>
              <span>•</span>
              <span>by {{ post.author }}</span>
              <span>•</span>
              <span>{{ post.readingTime }} read</span>
            </div>
            <p class="blog-summary">{{ post.excerpt }}</p>
            <a :href="`/blog/${post.slug}`" class="blog-read-more">
              Read more →
            </a>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { blogPosts } from '../data/blogPosts'
</script>

<style scoped>
.blog-home {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.blog-header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--vp-c-brand-1);
}

.blog-description {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  max-width: 800px;
  margin: 0 auto;
}

.blog-posts-section {
  margin-bottom: 4rem;
}

.blog-posts-section h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--vp-c-text-1);
}

.blog-posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  width: 100%;
}

@media (min-width: 1200px) {
  .blog-posts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
}

.blog-post-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: var(--vp-c-bg-soft);
  min-width: 400px;
  max-width: 600px;
  display: flex;
  flex-direction: column;
}

.blog-post-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand-1);
}

.blog-image-container {
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.blog-cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-post-card:hover .blog-cover-image {
  transform: scale(1.05);
}

.blog-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.blog-category {
  display: inline-block;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 0.5rem 1rem;
  border-radius: 24px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  align-self: flex-start;
}

.blog-title {
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  line-height: 1.3;
  flex-shrink: 0;
}

.blog-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s ease;
}

.blog-title a:hover {
  color: var(--vp-c-brand-1);
}

.blog-meta {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.blog-summary {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 2rem 0;
  flex: 1;
}

.blog-read-more {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  margin-top: auto;
}

.blog-read-more:hover {
  text-decoration: underline;
  transform: translateX(4px);
}

.blog-connect-section {
  background: var(--vp-c-bg-soft);
  padding: 3rem;
  border-radius: 16px;
  text-align: center;
}

.blog-connect-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.social-links {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  text-align: left;
}

.social-links li {
  padding: 0.5rem 0;
}

.social-links a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.social-links a:hover {
  text-decoration: underline;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .blog-home {
    padding: 1rem;
  }
  
  .blog-posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .blog-post-card {
    min-width: unset;
  }
  
  .blog-header h1 {
    font-size: 2.5rem;
  }
  
  .blog-connect-section {
    padding: 2rem 1.5rem;
  }
  
  .social-links {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>
