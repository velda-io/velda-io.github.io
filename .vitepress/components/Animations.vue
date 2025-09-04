<template>
    <div class="animation-carousel">
        <div class="carousel-container" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
            @touchend="handleTouchEnd">
            <div class="carousel-slides"
                :style="{ transform: `translateX(calc(-${currentIndex * 100}% + ${swipeOffset}px))` }">
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
            touchStartX: 0,
            touchCurrentX: 0,
            swipeOffset: 0,
            isSwiping: false,
            animations: [
                {
                    title: 'Get compute, no setup',
                    description: 'Access powerful compute resources instantly with consistent environments, all in a single command.',
                    component: 'ProvisionAnimation',
                },
                {
                    title: 'Maximize your savings',
                    description: 'Eliminate wasted compute resources while maintaining productivity. Allocate only what you need.',
                    component: 'EfficiencyComparison',
                },
                {
                    title: 'Onboard in seconds',
                    description: 'Bring new users or create instances in seconds with customizable templates.',
                    component: 'CloningAnimation',
                },
                {
                    title: 'Change without disruption',
                    description: 'Test new packages or make changes without impacting others. Use your favorite tools to manage environments.',
                    component: 'CustomizeAnimation',
                },
                {
                    title: 'Microservices made easy',
                    description: 'Launch new microservices across multiple machines effortlessly with just a few commands.',
                    component: 'MicroserviceAnimation',
                },
                {
                    title: 'Simplify data processing',
                    description: 'Set up distributed data pipelines with popular frameworks like Ray, Dask, Spark, and more.',
                    component: 'RayAnimation',
                },
            ],
            interval: null,
            animationRefs: [], // Store references to animation components
            isVisible: false, // Track visibility state
            intersectionObserver: null, // Store the observer instance
        };
    },
    async mounted() {
        // Set up intersection observer to track visibility
        this.setupIntersectionObserver();

        // Start the initial animation for the first slide only if visible
        await this.$nextTick();
        if (this.isVisible) {
            await this.startCurrentAnimation();
        }
    },
    watch: {
        async currentIndex(newIndex, oldIndex) {
            if (newIndex !== oldIndex && window.gtag) {
                const slideTitle = this.animations[newIndex].title;
                window.gtag('event', 'view_slide', {
                    'slide_title': slideTitle,
                });
            }
            // When currentIndex changes, start the animation for the current slide only if visible
            await this.$nextTick();
            if (this.isVisible) {
                await this.startCurrentAnimation();
            }
        }
    },
    beforeDestroy() {
        clearInterval(this.interval);
        // Clean up intersection observer
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
    },
    methods: {
        setupIntersectionObserver() {
            // Create intersection observer with different thresholds
            this.intersectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const visibilityRatio = entry.intersectionRatio;

                    // Start animation when at least 50% visible
                    if (visibilityRatio >= 0.5 && !this.isVisible) {
                        this.isVisible = true;
                        this.startCurrentAnimation();
                    }
                    // Stop animation when less than 10% visible
                    else if (visibilityRatio < 0.1 && this.isVisible) {
                        this.isVisible = false;
                        this.stopAllAnimations();
                    }
                });
            }, {
                threshold: [0, 0.1, 0.5, 1.0] // Watch for different visibility levels
            });

            // Start observing the component
            this.intersectionObserver.observe(this.$el);
        },

        stopAllAnimations() {
            // Stop all currently running animations
            this.animationRefs.forEach(ref => {
                if (ref && ref.stopAnimation) {
                    ref.stopAnimation();
                }
            });
        },

        handleTouchStart(event) {
            this.touchStartX = event.touches[0].clientX;
            this.touchCurrentX = this.touchStartX;
            this.isSwiping = true;
        },

        handleTouchMove(event) {
            if (!this.isSwiping) return;

            this.touchCurrentX = event.touches[0].clientX;
            const deltaX = this.touchCurrentX - this.touchStartX;

            // Limit the swipe distance
            const maxSwipe = window.innerWidth * 0.5;
            if (Math.abs(deltaX) <= maxSwipe) {
                this.swipeOffset = deltaX;
            }
        },

        handleTouchEnd() {
            if (!this.isSwiping) return;

            const deltaX = this.touchCurrentX - this.touchStartX;
            const threshold = window.innerWidth * 0.2; // 20% of screen width

            if (deltaX < -threshold) {
                // Swipe left - go to next slide
                this.nextSlide();
            } else if (deltaX > threshold) {
                // Swipe right - go to previous slide
                const prevIndex = (this.currentIndex - 1 + this.animations.length) % this.animations.length;
                this.goToSlide(prevIndex);
            }

            // Reset swipe state
            this.isSwiping = false;
            this.swipeOffset = 0;
        },

        async startCurrentAnimation() {
            // Only start animation if the component is visible
            if (!this.isVisible) {
                return;
            }

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
            const nextIndex = (this.currentIndex + 1) % this.animations.length;
            if (window.gtag) {
                window.gtag('event', 'autoplay_slide', {
                    'slide_title': this.animations[nextIndex].title
                });
            }
            this.currentIndex = nextIndex;
        },
        goToSlide(index) {
            if (index !== this.currentIndex) {
                if (window.gtag) {
                    window.gtag('event', 'select_slide', {
                        'slide_title': this.animations[index].title
                    });
                }
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
    overflow: hidden;
    max-width: 956px;
}

.carousel-container {
    overflow: hidden;
    border-radius: 10px;
    border: none;
    background: transparent;
}

.carousel-slides {
    display: flex;
    transition: transform 0.3s ease-out;
    will-change: transform;
    touch-action: pan-y;
}

.carousel-slide {
    flex: 0 0 100%;
    user-select: none;
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
    line-height: normal;
    margin: 0.5rem 0 1rem 0;
    color: var(--vp-c-text-2);
    font-size: 0.9rem;
    max-width: 100%;
    padding: 0 1rem;
    margin-left: auto;
    margin-right: auto;
}

@media (max-width: 640px) {
    p.animation-description {
        color: var(--vp-c-text-2);
        font-size: 0.9rem;
        max-width: 100%;
        padding: 0 1rem;
        margin-left: auto;
        margin-right: auto;
    }
}
</style>
