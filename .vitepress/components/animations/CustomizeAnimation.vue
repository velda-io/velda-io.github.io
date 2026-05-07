<template>
    <CloningAnimation
        ref="cloningAnimation"
        :onComplete="props.onComplete"
        :showCustomize="true"
        :speedFactor="props.speedFactor"
        />
</template>

<script setup>
import { ref } from 'vue';
import CloningAnimation from './CloningAnimation.vue';

const cloningAnimation = ref(null);

// Define props
const props = defineProps({
    onComplete: {
        type: Function,
        required: false,
        default: null
    },
    speedFactor: {
        type: Number,
        required: false,
        default: 1
    }
});

async function startAnimation() {
    if (cloningAnimation.value) {
        await cloningAnimation.value.startAnimation();
    }
}

function stopAnimation() {
    if (cloningAnimation.value) {
        cloningAnimation.value.stopAnimation();
    }
}

defineExpose({
    startAnimation, stopAnimation
});

</script>