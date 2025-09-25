<template>
    <slot name="comparison-banner" />
    <div class="vp-doc comparison-table">
        <slot name="comparison-table" />
    </div>
    <div class="vp-doc container">
        <slot />
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 184px 0; background-color: var(--vp-c-bg-soft);;">
        <h2 style="font-size: 2rem; margin-bottom: 2rem; text-align: center;">
            Begin your Velda journey today
        </h2>
        <a
            href="/get-started"
            class="get-started-btn"
        >
            Get Started
        </a>
    </div>
</template>

<style scoped>
/* Override VitePress default content container for full-width elements */
.container {
    max-width: 720px;
    padding: 0 1rem;
    margin: 0 auto;
}

.comparison-table {
    margin: 2rem 0;
    max-width: 800px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
}

.container.vp-doc ::v-deep h1 {
    text-align: center;
}
.comparison-table ::v-deep > table {
    width: 100%;
    table-layout: fixed;
    display: table;
}
.comparison-table ::v-deep > table > thead > tr > th:nth-child(1),
.comparison-table ::v-deep > table > tbody > tr > td:nth-child(1) {
    width: 50%;
}

.comparison-table ::v-deep > table > thead > tr > th:nth-child(2),
.comparison-table ::v-deep > table > tbody > tr > td:nth-child(2) {
    width: 25%;
}

.comparison-table ::v-deep > table > thead > tr > th:nth-child(3),
.comparison-table ::v-deep > table > tbody > tr > td:nth-child(3) {
    width: 25%;
}

.get-started-btn {
    background-color: var(--vp-c-brand);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.3s ease;
}

</style>