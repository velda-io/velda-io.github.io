<template>
    <div class="lr-grid" :class="{ 'direction-right': direction === 'right' }">
        <div class="lr-title">
            <h2 v-if="title" class="lr-title-heading" v-html="title"></h2>
            <template v-if="$slots.subtitle">
                <p class="lr-title-sub">
                    <slot name="subtitle" />
                </p>
            </template>
            <p v-else-if="subtitle" class="lr-title-sub" v-html="subtitle"></p>
        </div>

        <div class="lr-content">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
    direction: {
        type: String as () => 'left' | 'right',
        default: 'left'
    },
    title: {
        type: String,
        default: ''
    },
    subtitle: {
        type: String,
        default: ''
    }
})

// expose for templates
const direction = props.direction
const title = props.title
const subtitle = props.subtitle
</script>

<style scoped>
.lr-layout {
    width: 100%;
    justify-items: center;
}

.lr-container {
    max-width: 1280px;
    /* requirement */
    margin: 32px 64px;
    box-sizing: border-box;
}

.lr-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: top;
}

.lr-title {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
    justify-content: center;
}

.lr-title-heading {
    font-size: 30px;
    font-family: bold;
    font-weight: 700;
    margin: 0;
    line-height: 1.5;
    font-family: 'Inter', sans-serif;
}

.lr-title-sub {
    font-size: 18px;
    line-height: 1.5;
    color: var(--vp-c-text-2);
    margin: 0;
}

/* Desktop layout: 12-column grid. Title uses 5 cols, 1 col gap, content uses 6 cols. */
@media (min-width: 1024px) {
    .lr-grid {
        grid-template-columns: repeat(12, 1fr);
        gap: 1rem;
    }

    /* Default: title on the left */
    .lr-grid .lr-title {
        grid-column: 1 / span 4;
    }

    .lr-grid .lr-content {
        grid-column: 6 / span 7;
    }

    /* When direction is right, swap positions */
    .lr-grid.direction-right .lr-title {
        grid-column: 8 / span 4;
        grid-row: 1;
        /* title on the right */
    }

    .lr-grid.direction-right .lr-content {
        grid-column: 1 / span 7;
        grid-row: 1;
        /* content on the left */
    }

    .lr-title-inner {
        padding: 2rem 1rem 0 0;
    }

    .lr-content {
        padding-top: 5rem;
    }
}

/* Mobile: always title/subtitle first, stacking above content (default grid handles this) */
</style>
