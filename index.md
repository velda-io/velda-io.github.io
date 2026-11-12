---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

title: Velda - Serverless GPU Cloud | H100, H200, B300 for AI Training & Inference
description: Serverless GPU cloud for AI training, inference, and batch workloads. Run ML models on H100, H200, and B300 GPUs instantly. No containers, no cluster management. Reserve capacity or pay-as-you-go.
keywords: ["serverless GPU", "GPU cloud", "H100", "H200", "B300", "AI training", "AI inference", "GPU reservation"]
# SEO and LinkedIn/Social media preview metadata
head:
  - - meta
    - name: description
      content: Serverless GPU cloud without container or cluster management overhead. Run AI training, inference, and batch jobs on H100, H200, and B300 GPUs instantly. Reserve capacity or pay-as-you-go.
  - - meta
    - name: keywords
      content: serverless GPU, GPU cloud, H100, H200, B300, AI training, AI inference, distributed training, GPU reservation
  - - meta
    - property: og:title
      content: Velda - Serverless GPU Cloud for AI Training & Inference
  - - meta
    - property: og:description
      content: Run AI training, inference, and batch jobs on H100, H200, and B300 GPUs without containers or cluster management. Reserve capacity or pay-as-you-go.
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
      content: Velda - Serverless GPU Cloud | H100, H200, B300
  - - meta
    - name: twitter:description
      content: Serverless GPU cloud for AI training and inference. H100, H200, B300 GPUs without container overhead. Reserve or pay-as-you-go.
  - - meta
    - name: twitter:image
      content: https://velda.io/og-preview.png
  - - link
    - rel: canonical
      href: https://velda.io
  - - script
    - type: application/ld+json
      innerHTML: >
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Velda",
          "url": "https://velda.io",
          "logo": "https://velda.io/logo-h.png",
          "description": "Serverless GPU cloud for AI and ML workloads without container or cluster management overhead",
          "foundingDate": "2024",
          "sameAs": [
            "https://github.com/velda-io/velda",
            "https://www.linkedin.com/company/velda-io/",
            "https://x.com/velda_io"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Sales",
            "url": "https://velda.io/contact"
          }
        }
  - - script
    - type: application/ld+json
      innerHTML: >
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Velda",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Cloud",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free tier available with monthly credits"
          },
          "description": "Serverless GPU cloud platform for AI training, model inference, and batch processing on H100, H200, and B300 GPUs",
          "url": "https://velda.io",
          "screenshot": "https://velda.io/og-preview.png"
        }
  - - script
    - type: application/ld+json
      innerHTML: >
        {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": "Velda in Action Demo",
          "description": "See how Velda enables instant GPU access for AI workloads without container builds or cluster management",
          "thumbnailUrl": "https://velda.io/video.jpg",
          "uploadDate": "2024-09-01",
          "contentUrl": "https://www.youtube.com/watch?v=fr58LREZ6vQ",
          "embedUrl": "https://www.youtube.com/embed/fr58LREZ6vQ"
        }
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
    :componentProps="{speedFactor: 3}"
  />
</LeftRightLayout>

<LeftRightLayout title="Develop on Velda" direction="right">
  <template #subtitle>
    <p>Launch VS Code in your browser — or connect with your favorite IDE. </p>
    <p>Start instantly with prebuilt templates, then tailor everything to your workflow.</p>
  </template>
  <AutoAnimationWrapper
    :component="CloningAnimation"
    :componentProps="{speedFactor: 3}"
  />
</LeftRightLayout>

<LeftRightLayout title="Scale in Seconds">
  <template #subtitle>
    <p>Develop and scale — all in one platform. </p>
    <p>Run training, serving, or data pipelines with a simple  <code>vrun</code> prefix, for any workload.</p>
  </template>
  <AutoAnimationWrapper
    :component="RayAnimation"
    :componentProps="{speedFactor: 3}"
  />
</LeftRightLayout>

<div>
<div class="vp-doc">
<h2> Save on Compute </h2>
<p>Access powerful compute on demand — no need for high-end workstations.</p>
<p>Provision the compute resource when the jobs are running, not during coding, with no setup overhead.</p>
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
      <h2>Velda Cloud</h2>
      <p>Managed cloud with instant VSCode + GPU access, plus free monthly credit. Perfect for individual and small teams</p>
    </div>
    <div>
      <CtaButton href="https://cloud.velda.io">Get Started</CtaButton>
    </div>
  </div>
  <div class="w-full flex flex-col justify-between p-10 gap-6 bg-white/40">
    <div class="gap-5">
      <h2>Reserve GPU Capacity</h2>
      <p>Secure B300, H200, or H100 GPU capacity. Flexible terms with spot credits for unused compute.</p>
    </div>
    <div>
      <CtaButton href="reserve" variant="secondary">Reserve GPUs</CtaButton>
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