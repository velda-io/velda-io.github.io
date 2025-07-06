<template>
    <div class="efficiency-comparison">
        <div class="comparison-container">
            <div class="comparison-header">
                <div class="header-cell scenario"></div>
                <div class="header-cell velda">
                    <div class="logo-container">
                        <span class="logo-text">Velda</span>
                    </div>
                </div>
                <div class="header-cell traditional">
                    <div class="logo-container">
                        <span class="logo-text">Traditional dev machine</span>
                    </div>
                </div>
            </div>

            <!-- 1. Idle / Break Scenario -->
            <div class="comparison-row">
                <div class="scenario-title">
                    <div class="scenario-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <span>Idle / Break</span>
                </div>
                <div class="metric-cell velda">
                    <div class="resource-bar" style="width: 3%;"></div>
                </div>
                <div class="metric-cell traditional">
                    <div class="resource-bar split very-low-utilization" style="width: 60%;">
                    </div>
                </div>
            </div>

            <!-- 2. Coding Scenario -->
            <div class="comparison-row">
                <div class="scenario-title">
                    <div class="scenario-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </div>
                    <span>Coding</span>
                </div>
                <div class="metric-cell velda">
                    <div class="resource-bar" style="width: 10%;"></div>
                </div>
                <div class="metric-cell traditional">
                    <div class="resource-bar split low-utilization" style="width: 60%;">
                    </div>
                </div>
            </div>

            <!-- 3. Running Single-machine Workloads -->
            <div class="comparison-row">
                <div class="scenario-title">
                    <div class="scenario-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                    </div>
                    <span>Debug large binary</span>
                </div>
                <div class="metric-cell velda">
                    <div class="resource-bar" style="width: 10%;">
                    </div>
                    <div class="resource-bar" style="width: 40%;">
                    </div>
                </div>
                <div class="metric-cell traditional">
                    <div class="resource-bar split high-utilization" style="width: 60%;">
                    </div>
                </div>
            </div>

            <!-- 5. Running Large Batch of Jobs with K8s -->
            <div class="comparison-row">
                <div class="scenario-title">
                    <div class="scenario-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 3v4M15 3v4M9 17v4M15 17v4M3 11h18" />
                        </svg>
                    </div>
                    <span>Lightweight dev VM + Large binary on Kubernetes</span>
                </div>
                <div class="metric-cell velda">
                    <div class="resource-bar" style="width: 10%;">
                    </div>
                    <div class="resource-bar" style="width: 40%;">
                    </div>
                </div>
                <div class="metric-cell traditional">
                    <div class="resource-bar" style="width: 10%;">
                    </div>
                    <div class="resource-bar" style="width: 40%;">
                    </div>
                    <div class="efficiency-indicator negative engineering-indicator">
                        <div class="eng-effort more">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-eng" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z">
                                </path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-eng" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z">
                                </path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-eng" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path
                                    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z">
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 4. Running Large Batch of Jobs on a Single Machine -->
            <div class="comparison-row">
                <div class="scenario-title">
                    <div class="scenario-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <rect x="3" y="7" width="18" height="10" rx="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7 7v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M7 17v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 12h8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 8v8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <span>Process data via multi-processing</span>
                </div>
                <div class="metric-cell velda">
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                </div>
                <div class="metric-cell traditional">
                    <div class="resource-bar split high-utilization" style="width: 60%;">
                    </div>
                    <div class="efficiency-indicator negative time-indicator">
                        <div class="time-block longer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-clock" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-clock" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-clock" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 4. Running Large Batch of Jobs on a Single Machine -->
            <div class="comparison-row">
                <div class="scenario-title">
                    <div class="scenario-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h16v4H4v-4zm2-8v2m0 4v2m12-6v2m0 4v2" />
                        </svg>
                    </div>
                    <span>Process large data with a distributed system</span>
                </div>
                <div class="metric-cell velda">
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="efficiency-indicator negative time-indicator">
                        <div class="time-block longer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-clock" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="metric-cell traditional">
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="resource-bar" style="width: 10%;"></div>
                    <div class="efficiency-indicator negative time-indicator">
                        <div class="time-block longer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-clock" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-clock" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon-clock" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { createAnimationTracker } from '../../utils/animationUtils';

// Define props
const props = defineProps({
    onComplete: {
        type: Function,
        required: false,
        default: null
    },
    isActive: {
        type: Boolean,
        default: false
    }
});

// Create an animation tracker for this component
const animator = createAnimationTracker();

/**
 * Starts the entire animated sequence
 */
async function startAnimation() {
    // Animation sequence complete, call onComplete if provided
    await animator.sleep(12000); // Allow enough time for chart to be viewed
    if (props.onComplete) {
        props.onComplete();
    }
}

/**
 * Stops any ongoing animation
 */
function stopAnimation() {
    animator.cancelAll();
}

// Expose methods to parent component
defineExpose({
    startAnimation,
    stopAnimation
});

// Start animation when component becomes active
onMounted(() => {
    if (props.isActive) {
        startAnimation();
    }
});
</script>

<style scoped>
.efficiency-comparison {
    text-align: left;
    width: 100%;
    padding: 1rem;
    background-color: var(--vp-c-bg);
    border-radius: 10px;
}

.comparison-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.comparison-header {
    display: grid;
    grid-template-columns: minmax(120px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
    background-color: #111827;
    padding: 1rem 0;
}

@media (max-width: 640px) {
    .comparison-header {
        grid-template-columns: 1fr 1fr;
    }
}

.header-cell {
    padding: 0.5rem 1rem;
    text-align: center;
    font-weight: bold;
    color: #ffffff;
}

.logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo-text {
    font-size: 1rem;
    margin-top: 0.25rem;
}

.header-cell.velda {
    background-color: rgba(16, 185, 129, 0.1);
}

.header-cell.traditional {
    background-color: rgba(239, 68, 68, 0.1);
}

.comparison-row {
    display: grid;
    grid-template-columns: minmax(120px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
    background-color: var(--vp-c-bg-alt);
    border-bottom: 1px solid var(--vp-c-divider);
    transition: background-color 0.3s;
}

@media (max-width: 640px) {
    .comparison-row {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
    }
}

.comparison-row:hover {
    background-color: var(--vp-c-bg-soft);
}

.comparison-row:last-child {
    border-bottom: none;
}

.scenario-title {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    font-weight: 500;
}

@media (max-width: 640px) {
    .scenario-title {
        padding: 0.5rem;
        grid-column: 1 / -1;
    }

    .scenario-title span {
        font-size: 0.8rem;
    }
}

.scenario-icon {
    margin-right: 1rem;
    color: var(--vp-c-brand);
}

.scenario-icon svg {
    width: 1.25rem;
    height: 1.25rem;
}

.metric-cell {
    padding: 1rem;
    text-align: left;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}

@media (max-width: 640px) {
    .metric-cell {
        padding: 0.5rem;
    }
    .header-cell.scenario {
        display: none;
    }
}

.resource-bar {
    height: 24px;
    background-color: #10b981;
    /* Green for Velda */
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: transparent;
    font-weight: bold;
    font-size: 0.9rem;
    transition: width 1s ease-in-out;
    position: relative;
    margin-right: 2%;
}

.resource-bar.split {
    background-color: #ef4444;
    /* Red for VM */
    position: relative;
    overflow: hidden;
}

.resource-bar.split::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #10b981;
    z-index: 1;
}

/* Specific utilization levels for VMs */
.very-low-utilization.resource-bar.split::before {
    /* Idle/Break - show 15% utilized (green), 85% wasted (red) */
    width: 5%;
}

.low-utilization.resource-bar.split::before {
    width: 15%;
}

.medium-utilization.resource-bar.split::before {
    width: 60%;
}

.high-utilization.resource-bar.split::before {
    width: 85%;
}

.full-utilization.resource-bar.split::before {
    width: 85%;
}

.efficiency-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    color: #10b981;
    font-size: 0.75rem;
    font-weight: 500;
}

.efficiency-indicator.negative {
    color: #ef4444;
}

.efficiency-indicator svg {
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
}

.time-indicator,
.engineering-indicator {
    margin-top: 8px;
    display: flex;
    justify-content: center;
}

.time-block {
    display: flex;
    align-items: center;
    justify-content: center;
}

.time-block.shorter {
    color: #10b981;
}

.time-block.longer {
    color: #ef4444;
}

.eng-effort {
    display: flex;
    align-items: center;
}

.eng-effort.less {
    color: #10b981;
}

.eng-effort.more {
    color: #ef4444;
}

.icon-clock,
.icon-eng {
    stroke: currentColor;
}
</style>
