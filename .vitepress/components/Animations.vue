<template>
    <div class="animation-carousel">
        <div class="carousel-container">
            <div class="carousel-slides" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
                <div class="carousel-slide" v-for="(animation, index) in animations" :key="index">
                    <h3 class="animation-title">{{ animation.title }}</h3>
                    <p class="animation-description">{{ animation.description }}</p>
                    <component :is="animation.component" :onComplete="handleAnimationComplete"
                        :isActive="currentIndex === index" :ref="el => { if (el) animationRefs[index] = el; }" />
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
import { CancelledError } from '../utils/animationUtils';
import CloningAnimation from './animations/CloningAnimation.vue';
import CustomizeAnimation from './animations/CustomizeAnimation.vue';
import EfficiencyComparison from './animations/EfficiencyComparison.vue';
import MicroserviceAnimation from './animations/MicroserviceAnimation.vue';
import ProvisionAnimation from './animations/ProvisionAnimation.vue';
import RayAnimation from './animations/RayAnimation.vue';


export default {
    components: {
        ProvisionAnimation,
        CloningAnimation,
        CustomizeAnimation,
        MicroserviceAnimation,
        RayAnimation,
        EfficiencyComparison,
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
                    title: 'Provision machines in Seconds',
                    description: 'In a single command, you can spin up a new machine with everything same as your current environment that runs the command.',
                    component: 'ProvisionAnimation',
                },
                {
                    title: 'Easier way to save',
                    description: 'Velda maximizes your resource efficiency by only allocating the resources you need with no overhead on engineering',
                    component: 'EfficiencyComparison',
                },
                {
                    title: 'Onboard in Seconds',
                    description: 'Onboard a new user, or create a new individualized instance in seconds by cloning from a customizable template.',
                    component: 'CloningAnimation',
                },
                {
                    title: 'Change without affecting others',
                    description: 'Change your instance, test new packages, without breaking others. Use any tools you like to manage your environment.',
                    component: 'CustomizeAnimation',
                },
                {
                    title: 'Microservices in Seconds',
                    description: 'Easily spin up new microservices with multiple machines with a single command.',
                    component: 'MicroserviceAnimation',
                },
                {
                    title: 'Easier way to process data',
                    description: 'Setup distributed data pipelines with most frameworks, e.g. Ray, Dask, Spark, or anything you like.',
                    component: 'RayAnimation',
                },
            ],
            interval: null,
            animationRefs: [], // Store references to animation components
        };
    },
    async mounted() {
        // Start the initial animation for the first slide
        await this.$nextTick();
        await this.startCurrentAnimation();
    },
    watch: {
        async currentIndex() {
            // When currentIndex changes, start the animation for the current slide
            await this.$nextTick();
            await this.startCurrentAnimation();
        }
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    methods: {
        async startCurrentAnimation() {
            // Cancel all animations first
            this.animationRefs.forEach(ref => {
                if (ref && ref.stopAnimation) {
                    ref.stopAnimation();
                }
            });

            // Start the current animation
            const currentAnimation = this.animationRefs[this.currentIndex];
            if (currentAnimation && currentAnimation.startAnimation) {
                try {
                    await currentAnimation.startAnimation();
                } catch (error) {
                    if (!(error instanceof CancelledError)) {
                        // Log the error if it's not a cancellation
                        console.error('Error starting animation:', error);
                    }
                }
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
            if (index !== this.currentIndex) {
                this.currentIndex = index;
            }
        },
    },
};
</script>

<style>
.animation-carousel {
    text-align: center;
    margin: 1rem 0;
    padding: 0.5rem;
    background: var(--vp-c-bg);
    border-radius: 10px;
    border: 1px solid var(--vp-c-divider);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.03);
    background-color: var(--vp-c-bg);
    border-radius: 0.75rem;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
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
    margin-top: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    padding: 0 0.5rem;
}

p.animation-description {
    margin: 0.5rem 0 1rem 0;
    color: var(--vp-c-text-2);
    font-size: 0.9rem;
    max-width: 100%;
    padding: 0 1rem;
    margin-left: auto;
    margin-right: auto;
}
</style>
