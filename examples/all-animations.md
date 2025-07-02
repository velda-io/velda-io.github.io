---
layout: false
---
<script setup>
import { ref } from 'vue';
import Animations from '../.vitepress/components/Animations.vue';

const isAnimationRunning = ref(false);
const animationRefs = [];

async function toggleAllAnimations() {
    isAnimationRunning.value = !isAnimationRunning.value;
    console.log(animationRefs);
    await animationRefs.forEach(async ref => {
        const waits = [];
        if (ref) {
            if (isAnimationRunning.value && ref.startAnimation) {
                waits.push(ref.startAnimation());
            } else if (!isAnimationRunning.value && ref.stopAnimation) {
                ref.stopAnimation();
            }
        }
        await Promise.allSettled(waits);
    });
}

function restartAnim(index) {
    return async function() {
        const ref = animationRefs[index];
        if (ref) {
            await ref.startAnimation();
        }
    }
}
const animations = Animations.data();
</script>
<script>
export default {
    components: Animations.components
}
</script>

# All Animations

This page includes all animations one by one for easy reference.

<button @click="toggleAllAnimations" class="animation-toggle-button">
    {{ isAnimationRunning ? 'Stop All Animations' : 'Start All Animations' }}
</button>

<div v-for="(animation, index) in animations.animations" :key="index" class="animation-container">
    <h3 class="animation-title">{{ animation.title }}</h3>
    <p class="animation-description">{{ animation.description }}</p>
    <div class="animation-box">
    <component :is="animation.component" :ref="el => { if (el) animationRefs[index] = el; }" :onComplete="restartAnim(index)"/>
    </div>
</div>

<style>
.animation-toggle-button {
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    color: var(--vp-c-text);
    background-color: var(--vp-c-brand);
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.animation-toggle-button:hover {
    background-color: var(--vp-c-brand-light);
}

.animation-container {
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid var(--vp-c-divider);
    border-radius: 0.5rem;
    background-color: var(--vp-c-bg-secondary);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.animation-box {
    width: 956px;
    height: 448px;
    overflow: hidden;
}

.animation-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.animation-description {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: var(--vp-c-text-2);
}
</style>