<template>
  <div
    aria-hidden="true"
    class="pointer-events-none -z-10 absolute left-1/2 top-0 -translate-x-1/2 w-[120vw] h-[420px] bg-top bg-center bg-no-repeat"
    style="background-image: url('/bg-blog.svg'); background-size: cover; background-attachment: fixed;"
  ></div>
  <div class="mx-auto max-w-300 px-8 pb-8 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-12.5 md:gap-y-20 gap-x-5">
    <div class="h-75 pt-20 flex flex-col col-span-6 gap-y-12.5">
      <h1 class="text-[40px] font-bold">Velda Blog</h1>
      <p class="text-md leading-relaxed text-[var(--vp-c-text-2)]">
        Stay ahead of the curve in cloud development. Get the latest insights, tutorials, and product updates about cloud infrastructure, AI development, and the Velda platform.
      </p>
    </div>
    <div aria-hidden="true" class="md:col-span-2 lg:col-span-6"></div>
    <article
      v-for="post in blogPosts"
      :key="post.slug"
      class="group border col-span-4 rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl border-[var(--vp-c-divider)] bg-[var(--vp-c-bg-soft)]"
    >
      <a :href="`/blog/${post.slug}`" class="flex flex-col w-full h-full" :aria-label="`Read ${post.title}`">
        <div class="w-full aspect-video overflow-hidden">
          <img
            :src="post.image"
            :alt="post.title"
            class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div class="p-6 flex-1 flex flex-col gap-y-4 grow">
          <div class="inline-block p-2.5 rounded-lg text-md mb-4 self-start border border-[#81DACA] text-[var(--vp-c-brand-1)] bg-[#FAFDFD]">{{ post.category }}</div>

          <h3 class="text-xl font-bold leading-normal">
            <span class="text-[var(--vp-c-text-1)] no-underline group-hover:text-[var(--vp-c-brand-1)]">{{ post.title }}</span>
          </h3>

          <div class="flex items-center gap-1.25 text-md text-[var(--vp-c-text-2)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[var(--vp-c-text-2)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>by {{ post.author }}</span>
          </div>

          <p class="text-[var(--vp-c-text-2)] leading-relaxed flex-1 grow-1">{{ post.excerpt }}</p>

          <!-- bottom metadata: date (left) and reading time (right) with icons -->
          <div class="flex items-center justify-between text-sm text-[var(--vp-c-text-2)] mt-4">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[var(--vp-c-text-2)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <path d="M16 2v4M8 2v4M3 10h18" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>{{ post.date }}</span>
            </div>

            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[var(--vp-c-text-2)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="9" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 7v5l3 3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span>{{ post.readingTime }} read</span>
            </div>
          </div>
        </div>
      </a>
    </article>
  </div>
</template>

<script setup lang="ts">
import { blogPosts } from '../data/blogPosts'
</script>

