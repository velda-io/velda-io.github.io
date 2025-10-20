<template>
    <div ref="containerRef" class="animation-container xs:aspect-[2/1]">
        <div class="w-full h-full">
            <div class="animation-box">
                <component :is="component" class="auto-animate-child" v-bind="componentProps"
                    :onComplete="handleChildComplete" ref="childRef" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
    pauseThreshold: {
        type: Number,
        default: 0.4
    },
    rootMargin: {
        type: String,
        default: '0px'
    },
    // The component to render (pass the imported component object)
    component: {
        type: [Object, Function, String],
        required: false,
        default: null
    },
    // Optional props to pass to the rendered component
    componentProps: {
        type: Object,
        required: false,
        default: () => ({})
    },
});

const containerRef = ref(null);
const isPlaying = ref(false);
let intersectionObserver = null;

const childRef = ref(null);

const startAnimation = async () => {
    if (!isPlaying.value) {
        isPlaying.value = true;
        // Try to start the child component directly if it exposes startAnimation
        if (childRef.value && childRef.value.startAnimation) {
            try {
                await childRef.value.startAnimation();
            } catch (e) {
                console.error('Error starting child animation:', e);
            }
        }
    }
};

const stopAnimation = () => {
    if (isPlaying.value) {
        isPlaying.value = false;
        // Try to stop the child component directly
        if (childRef.value && childRef.value.stopAnimation) {
            try {
                childRef.value.stopAnimation();
            } catch (e) {
                console.error('Error stopping child animation:', e);
            }
        }
    }
};

/**
 * When the child reports completion via its onComplete prop, restart it.
 * We call the child's startAnimation again to auto-replay.
 */
const handleChildComplete = async (payload) => {
    childRef.value.startAnimation();
};

const setupIntersectionObserver = () => {
    if ('IntersectionObserver' in window && containerRef.value) {
        intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const visibilityRatio = entry.intersectionRatio;

                // Get the element's position relative to the viewport
                const rect = entry.boundingClientRect;
                const windowHeight = window.innerHeight;

                // Determine if the bottom of the element is visible in the viewport
                const bottomInViewport = rect.bottom >= 0 && rect.bottom <= windowHeight;

                if ((visibilityRatio < props.pauseThreshold) && isPlaying.value) {
                    stopAnimation();
                } else if (bottomInViewport && !isPlaying.value) {
                    startAnimation();
                }
            });
        }, {
            threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0], // Watch for different visibility levels
            rootMargin: props.rootMargin
        });

        intersectionObserver.observe(containerRef.value);
    }
};

onMounted(() => {
    setupIntersectionObserver();
});

onBeforeUnmount(() => {
    if (intersectionObserver && containerRef.value) {
        intersectionObserver.unobserve(containerRef.value);
        intersectionObserver.disconnect();
    }

    // Clear the parent-provided animationRef when we unmount so callers
    // don't hold a stale reference.
    if (props.animationRef) {
        try {
            props.animationRef.value = null;
        } catch (e) {
            // Ignore
        }
    }
});

defineExpose({
    startAnimation,
    stopAnimation
});
</script>

<style scoped>

.animation-box {
    overflow: hidden;
    transform-origin: top left;
    transform: scale(var(--scale));
}

.animation-box :deep(p) {
    all: reset;
}
.animation-box {
    --scale: calc(min(100cqw / 400px, 1));
    width: 400px;
}
.animation-container {
    width: 100%;
    max-width: 400px;
    container-type: inline-size;
    background-color: #FAFAFA;
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
</style>