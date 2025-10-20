---
layout: false
---
<script setup>
import { ref, onMounted } from 'vue';
import Animations from '../.vitepress/components/Animations.vue';

const isAnimationRunning = ref(false);
const animationRefs = [];

async function toggleAllAnimations() {
    isAnimationRunning.value = !isAnimationRunning.value;
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

onMounted(toggleAllAnimations);

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

<div style="padding: 0 24px;">
    <div v-for="(animation, index) in animations.animations" :key="index" class="animation-frame">
        <h3 class="animation-title">{{ animation.title }}</h3>
        <p class="animation-description">{{ animation.description }}</p>
        <div class="animation-container xs:aspect-[2/1]">
            <div class="w-full h-full">
                <div class="animation-box">
                    <component :is="animation.component" :ref="el => { if (el) animationRefs[index] = el; }" :onComplete="restartAnim(index)"/>
                </div>
            </div>
        </div>
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

.animation-frame {
    margin: 2rem 0;
    padding: 0.5rem;
    border: 1px solid var(--vp-c-divider);
    border-radius: 0.5rem;
    background-color: var(--vp-c-bg-secondary);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.animation-box {
    overflow: hidden;
    background-color: #FAFAFA;
    transform-origin: top left;
    transform: scale(var(--scale));
}

.animation-box {
    --scale: calc(min(100cqw / 400px, 1));
    width: 400px;
}
.animation-container {
    width: 100%;
    max-width: 400px;
    container-type: inline-size;
}

@media (min-width: 480px) {
    .animation-box {
        width: 800px;
        aspect-ratio: 2 / 1;
        --scale: calc(min(100cqw / 800px, 1));
    }
    .animation-container {
        width: 100%;
        max-width: 800px;
    }
}

.animation-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    padding: 0 0.5rem;
}

.animation-description {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    color: var(--vp-c-text-2);
    padding: 0 0.5rem;
}
</style>