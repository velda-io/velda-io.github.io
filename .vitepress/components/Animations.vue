<template>
    <div class="animation-carousel">
        <div class="carousel-container">
            <div class="carousel-slides" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                <div class="carousel-slide" v-for="(animation, index) in animations" :key="index">
                    <h3 class="animation-title">{{ animation.title }}</h3>
                    <p class="animation-description">{{ animation.description }}</p>
                    <component :is="animation.component" 
                              :onComplete="handleAnimationComplete"
                              :ref="el => { if (el) animationRefs[index] = el; }" />
                </div>
            </div>
        </div>
        <div class="carousel-dots">
            <span v-for="(animation, index) in animations" :key="index" class="dot"
                :class="{ active: currentIndex === index }" @click="goToSlide(index)"></span>
        </div>
    </div>
</template>

<script>
import CloningAnimation from './animations/CloningAnimation.vue';
import ProvisionAnimation from './animations/ProvisionAnimation.vue';

export default {
    components: {
        ProvisionAnimation,
        CloningAnimation,
    },
    props: {
        onAnimationComplete: {
            type: Function,
            required: false,
            default: null
        }
    },
    data() {
        return {
            currentIndex: 0,
            animations: [
                {
                    title: 'Scale in Seconds',
                    description: 'In a single command, you can spin up a new machine with everything same as your current environment.',
                    component: 'ProvisionAnimation',
                },
                {
                    title: 'Onboard in Seconds',
                    description: 'Onboard a new user, or create a new individualized instance in seconds by cloning from a template.',
                    component: 'CloningAnimation',
                }
            ],
            interval: null,
            animationRefs: [], // Store references to animation components
        };
    },
    mounted() {
        // Start the initial animation for the first slide
        this.$nextTick(() => {
            this.startCurrentAnimation();
        });
    },
    watch: {
        currentIndex() {
            // When currentIndex changes, start the animation for the current slide
            this.$nextTick(() => {
                this.startCurrentAnimation();
            });
        }
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    methods: {
        startCurrentAnimation() {
            const currentAnimation = this.animationRefs[this.currentIndex];
            if (currentAnimation && currentAnimation.startAutomation) {
                currentAnimation.startAutomation();
            }
        },
        handleAnimationComplete() {
            this.nextSlide();
            if (this.onAnimationComplete) {
                this.onAnimationComplete();
            }
        },
        nextSlide() {
            this.currentIndex = (this.currentIndex + 1) % this.animations.length;
        },
        goToSlide(index) {
            this.currentIndex = index;
        },
    },
};
</script>

<style>
.animation-carousel {
    text-align: center;
    margin: 2rem 0;
    background: var(--vp-c-bg);
    border-radius: 10px;
    border: 1px solid var(--vp-c-divider);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.03);

    background-color: var(--vp-c-bg);
    border-radius: 0.75rem;
    border: 1px solid var(--vp-c-divider);
}

.carousel-container {
    overflow: hidden;
    border-radius: 10px;
    border: none;
    background: transparent;
}

.carousel-slides {
    display: flex;
    transition: transform 0.5s ease-in-out;
}

.carousel-slide {
    flex: 0 0 100%;
}

.animation-video {
    width: 100%;
    height: auto;
    display: block;
}

.carousel-dots {
    margin-top: 1rem;
}

.dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--vp-c-divider);
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dot:hover {
    background-color: var(--vp-c-brand-light);
}

.dot.active {
    background-color: var(--vp-c-brand);
}

.animation-title {
    margin-top: 1.5rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.animation-description {
    margin: 0.5rem 0 1.5rem 0;
    color: var(--vp-c-text-2);
    font-size: 1rem;
}
</style>
