---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

# SEO and LinkedIn/Social media preview metadata
head:
  - - meta
    - name: description
      content: Velda - Develop platform that can instantly scale, built for ML, HPC and automation workloads.
  - - meta
    - property: og:title
      content: VELDA - Develop platform that can instantly scale
  - - meta
    - property: og:image
      content: https://velda.io/og-preview.png
  - - meta
    - property: og:url
      content: https://velda.io/
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: VELDA - Supercharge your development
  - - meta
    - name: twitter:description
      content: Experience the development platform that leading teams are already using to ship faster.
  - - meta
    - name: twitter:image
      content: https://velda.io/logos.png
  - - link
    - rel: canonical
      href: https://velda.io
markdownStyles: false
---
<style scoped>
h2 {
  font-size: 30px;
}
</style>
<script setup>
import { ref, onBeforeUnmount } from 'vue';
import CloningAnimation from '.vitepress/components/animations/CloningAnimation.vue';
import CustomizeAnimation from '.vitepress/components/animations/CustomizeAnimation.vue';
import EfficiencyComparison from '.vitepress/components/animations/EfficiencyComparison.vue';
import MicroserviceAnimation from '.vitepress/components/animations/MicroserviceAnimation.vue';
import ProvisionAnimation from '.vitepress/components/animations/ProvisionAnimation.vue';
import RayAnimation from '.vitepress/components/animations/RayAnimation.vue';
import AutoAnimationWrapper from '.vitepress/components/AutoAnimationWrapper.vue';
import CtaButton from '.vitepress/components/CtaButton.vue';
import HomeHeroInfo from '.vitepress/components/HomeHeroInfo.vue';

// Video cover state: show cover by default. On user click we hide the cover and enable autoplay.
const videoCoverVisible = ref(true);
// Start with embed URL without autoplay so it doesn't attempt to play until user interacts.
const videoSrc = ref('https://www.youtube.com/embed/fr58LREZ6vQ?rel=0&enablejsapi=1');

function playVideo() {
  // Add autoplay param (safe to append since initial src already contains ?rel=0...)
  if (!videoSrc.value.includes('autoplay=1')) {
    videoSrc.value = videoSrc.value + '&autoplay=1';
  }
  videoCoverVisible.value = false;
}

// Optional: if the user navigates away, stop showing cover again on remounts is default behavior.
</script>

<HomeHeroInfo />
<div class="container">
<LeftRightLayout title="<code>vrun</code> is all you need">
  <template #subtitle>
    <p>Prefix <code>vrun</code> with any command to instantly run from your cloud or cluster.</p>
    <p>No image builds. No manifests. No dependency drift.
Just your local dev experience — with unbounded power.</p>
  </template>
  <AutoAnimationWrapper
    :component="ProvisionAnimation"
  />
</LeftRightLayout>

<LeftRightLayout title="Develop on Velda" direction="right">
  <template #subtitle>
    <p>Launch VS Code in your browser — or connect with your favorite IDE. </p>
    <p>Start instantly with prebuilt templates, then tailor everything to your workflow.</p>
  </template>
  <AutoAnimationWrapper
    :component="CloningAnimation"
  />
</LeftRightLayout>

<LeftRightLayout title="Scale in Seconds">
  <template #subtitle>
    <p>Develop and scale — all in one platform. </p>
    <p>Run training, serving, or data pipelines with a simple  <code>vrun</code> prefix, for any workload.</p>
  </template>
  <AutoAnimationWrapper
    :component="RayAnimation"
  />
</LeftRightLayout>

<div>
<div class="vp-doc">
<h2> Save on Compute </h2>
<p>Access powerful compute on demand — no need for high-end workstations.</p>
<p>Only provision the compute resource that is needed, with no overhead.</p>
</div>
<EfficiencyComparison />
</div>

<div class="bottombg">
<div class="vp-doc text-center justify-items-center">
<h2>How Velda Act in Action</h2>
  <div class="w-full mt-12.5" style="max-width: 720px; box-sizing: border-box;">
    <div class="video-wrap" style="position: relative; width: 100%;">
      <iframe
        width="100%"
        :src="videoSrc"
        title="Velda Demo"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        style="display: block; border: none; aspect-ratio: 16/9;"
      ></iframe>
      <button
        v-if="videoCoverVisible"
        class="video-cover"
        @click="playVideo"
        aria-label="Play video"
      >
        <img src="/video.jpg" alt="Video cover" style="width:100%; height:100%; object-fit:cover; display:block;" />
        <div class="play-button" aria-hidden="true"></div>
      </button>
  </div>
</div>
<div class="flex flex-col md:flex-row mt-40 mb-3 gap-4 text-center">
  <div class="w-full flex flex-col justify-between p-10 gap-6">
    <div class="gap-5">
      <h2>Individual</h2>
      <p>Managed cloud with free monthly credit and pay-as-you-go pricing. Perfect for individual and small teams</p>
    </div>
    <div>
      <CtaButton href="https://velda.cloud">Velda Cloud</CtaButton>
    </div>
  </div>
  <div class="w-full flex flex-col justify-between p-10 gap-6 bg-white/40">
    <div class="gap-5">
      <h2>Enterprise</h2>
      <p>Self hosted or dedicated infrastructure, premium support for organizations of any size.</p>
    </div>
    <div>
      <CtaButton href="book" variant="secondary">Book a demo</CtaButton>
    </div>
  </div>
</div>
</div>
</div>

</div>

<style scoped>
.container {
  margin: auto;
  width: 100%;
  max-width: 1280px;
  padding: 0 24px;
  gap: 160px;
  display: flex;
  flex-direction: column;
}

.bottombg {
  position: relative;
}

.bottombg::before {
  content: "";
  position: absolute;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  height: 100%;
  z-index: -1;
  box-sizing: border-box;
  background-image: url("/bg-hm.svg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

/* keep inner content aligned with the container's padding */
.bottombg > .vp-doc {
  padding-left: 24px;
  padding-right: 24px;
  box-sizing: border-box;
}

@media (min-width: 640px) {
  .bottombg > .vp-doc {
    padding-left: 48px;
    padding-right: 48px;
  }
}

@media (min-width: 960px) {
  .bottombg > .vp-doc {
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media (min-width: 640px) {
  .container {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .container {
    width: 100%;
    padding: 0 64px;
  }
}

/* Video cover overlay styles */
.video-wrap { position: relative; }
.video-cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: url("/video.jpg");
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-cover img { pointer-events: none; }
.play-button {
  position: absolute;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0,0,0,0.35);
}
.play-button::after {
  content: '';
  display: block;
  margin-left: 6px;
  width: 0;
  height: 0;
  border-left: 18px solid white;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
}


</style>