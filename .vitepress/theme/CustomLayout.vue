<template>
  <Layout>
    <template #layout-bottom>
      <Footer />
    </template>
    <template #home-hero-info>
      <HomeHeroInfo />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Footer from '../components/Footer.vue'
import HomeHeroInfo from '../components/HomeHeroInfo.vue'

const { Layout } = DefaultTheme
</script>
