<template>
    <div ref="animationWrapper" class="provisioning-animation-wrapper">
        <svg ref="svgContainer" class="connection-svg"></svg>

        <div class="flex flex-col xs:flex-row w-full gap-4 justify-around">
            <!-- Central Terminal - always at top on mobile, left on desktop -->
            <div class="w-full xs:w-120 self-center">
                <Terminal ref="terminal" height="20rem" />
            </div>

            <!-- Machine Stack - right side on desktop, bottom on mobile -->
            <div class="w-50 xs:w-50 flex flex-row xs:flex-col justify-center self-center gap-3 mb-3">
                <!-- Machine 1 - Ray Head Node -->
                <div class="w-40 self-center">
                    <Machine :style="{ visibility: showHeadNode ? 'visible' : 'hidden' }" ref="machine1"
                        :status="headNodeStatus" hardware="CPU"
                        class="flex-grow flex-shrink-0 transition-all duration-500" :class="{
                            'opacity-0 scale-90': headNodeStatus === ''
                        }">
                        <template v-if="isProvisioningHead">
                            <p class="text-amber-400 text-sm font-semibold mt-2">
                                Provisioning...
                            </p>
                        </template>
                        <template v-else>
                            <p class="text-green-400 text-sm font-semibold mt-2">
                                Head Node
                            </p>
                        </template>
                    </Machine>
                </div>

                <div class="w-40 self-center">
                    <!-- Machine 2 - Ray Worker Node -->
                    <Machine :style="{ visibility: showWorkerNode ? 'visible' : 'hidden' }" ref="machine2"
                        :multi-machine="true" :status="workerNodeStatus" hardware="gpu-h200-1"
                        class="flex-grow flex-shrink-0 transition-all duration-500" :class="{
                            'opacity-0 scale-90': workerNodeStatus === ''
                        }">
                        <template v-if="isProvisioningWorker">
                            <p class="text-amber-400 text-sm font-semibold mt-2">
                                Provisioning...
                            </p>
                        </template>
                        <template v-else>
                            <p class="text-green-400 text-sm font-semibold mt-2">
                                Worker Nodes
                            </p>
                        </template>
                    </Machine>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import Terminal from '../Terminal.vue';
import Machine from './Machine.vue';
import { createAnimationTracker } from '../../utils/animationUtils';

// Define props
const props = defineProps({
    onComplete: {
        type: Function,
        required: false,
        default: null
    }
});

// --- Template Refs ---
const svgContainer = ref(null);
const terminal = ref(null);
const machine1 = ref(null); // Ray Head Node
const machine2 = ref(null); // Ray Worker Node
const animationWrapper = ref(null);

// --- Reactive State ---
const showHeadNode = ref(false);
const showWorkerNode = ref(false);
const isProvisioningHead = ref(false);
const isProvisioningWorker = ref(false);
const isHeadNodeActive = ref(false);
const isWorkerNodeActive = ref(false);
const headNodeStatus = ref(''); // Status for head node
const workerNodeStatus = ref(''); // Status for worker node

// Create an animation tracker for this component
const animator = createAnimationTracker();

// Track all animation timeouts and intervals
let resizeObserver;

/**
 * Draws connecting lines from machines to the terminal.
 */
async function drawLines() {
    return;
    // Wait for the next DOM update to ensure elements are rendered
    await nextTick();
    if (!svgContainer.value || !terminal.value || !animationWrapper.value) return;

    svgContainer.value.innerHTML = ''; // Clear existing lines
    const wrapperRect = animationWrapper.value.getBoundingClientRect();
    const terminalRect = terminal.value.$el.getBoundingClientRect();
    const terminalEl = terminal.value.$el;
    const isLargeScreen = window.innerWidth >= 480;

    // Calculate terminal connection point - on large screens it's right side, on small screens it's bottom
    let termX, termY;

    if (isLargeScreen) {
        // On large screens, connect from the right side of terminal
        termX = terminalRect.left - wrapperRect.left + terminalRect.width;
        termY = terminalRect.top - wrapperRect.top + terminalRect.height / 2;
    } else {
        // On small screens, connect from the bottom of terminal
        termX = terminalRect.left - wrapperRect.left + terminalRect.width / 2;
        termY = terminalRect.top - wrapperRect.top + terminalRect.height;
    }

    // Draw connection for head node if active
    if (machine1.value && isHeadNodeActive.value) {
        const m1Rect = machine1.value.$el.getBoundingClientRect();
        let m1X, m1Y;

        if (isLargeScreen) {
            // On large screens, connect to the left side of machines
            m1X = m1Rect.left - wrapperRect.left;
            m1Y = m1Rect.top - wrapperRect.top + m1Rect.height / 2;
        } else {
            // On small screens, connect to the top of machines
            m1X = m1Rect.left - wrapperRect.left + m1Rect.width / 2;
            m1Y = m1Rect.top - wrapperRect.top;
        }

        svgContainer.value.innerHTML += `<line class="connection-line" x1="${m1X}" y1="${m1Y}" x2="${termX}" y2="${termY}" stroke-dasharray="5, 5" />`;
    }

    // Check for machine2's ref and if it's active
    if (machine2.value && isWorkerNodeActive.value) {
        const m2Rect = machine2.value.$el.getBoundingClientRect();
        let m2X, m2Y;

        if (isLargeScreen) {
            // On large screens, connect to the left side of machines
            m2X = m2Rect.left - wrapperRect.left;
            m2Y = m2Rect.top - wrapperRect.top + m2Rect.height / 2;
        } else {
            // On small screens, connect to the top of machines
            m2X = m2Rect.left - wrapperRect.left + m2Rect.width / 2;
            m2Y = m2Rect.top - wrapperRect.top;
        }

        svgContainer.value.innerHTML += `<line class="connection-line" x1="${m2X}" y1="${m2Y}" x2="${termX}" y2="${termY}" stroke-dasharray="5, 5" />`;

        // If both nodes are active, draw a connection between head and worker node
        if (isHeadNodeActive.value && machine1.value) {
            const m1Rect = machine1.value.$el.getBoundingClientRect();
            let m1X, m1Y;

            if (isLargeScreen) {
                m1X = m1Rect.left - wrapperRect.left + m1Rect.width / 2;
                m1Y = m1Rect.top - wrapperRect.top + m1Rect.height;
                m2X = m2Rect.left - wrapperRect.left + m2Rect.width / 2;
                m2Y = m2Rect.top - wrapperRect.top;
            } else {
                m1X = m1Rect.left - wrapperRect.left + m1Rect.width;
                m1Y = m1Rect.top - wrapperRect.top + m1Rect.height / 2;
                m2X = m2Rect.left - wrapperRect.left;
                m2Y = m2Rect.top - wrapperRect.top + m2Rect.height / 2;
            }

            svgContainer.value.innerHTML += `<line class="connection-line ray-connection" x1="${m1X}" y1="${m1Y}" x2="${m2X}" y2="${m2Y}" />`;
        }
    }
}

/**
 * Starts the entire automated animation sequence.
 */
async function startAnimation() {
    // Cancel any ongoing animation first
    stopAnimation();
    resetAnimation();

    if (!terminal.value) return;

    // Start with ray head node creation
    await createHeadNode();

    // Wait and then create worker node
    await animator.sleep(1500);
    await createWorkerNode();
    await animator.sleep(500);
    await runRayWorkload();

    // Animation has completed, call onComplete if provided
    await animator.sleep(2000);
    if (props.onComplete) {
        props.onComplete();
    }
}

/**
 * Creates the Ray head node.
 */
async function createHeadNode() {
    const command = "vrun -s ray-head ray start --head";
    await terminal.value.sendCommand(animator, command);

    showHeadNode.value = true;

    await nextTick();
    // Use nextTick to ensure the element is in the DOM before we try to animate it
    isProvisioningHead.value = true;
    headNodeStatus.value = 'provisioning';

    await animator.sleep(1000);

    // Output head node creation messages
    const headNodeOutput = [
        "Starting Ray head",
        "Head node initialized",
    ];

    await streamOutputToTerminal(headNodeOutput);

    isProvisioningHead.value = false;
    isHeadNodeActive.value = true;
    headNodeStatus.value = 'active';
    await drawLines();
}

/**
 * Creates the Ray worker node.
 */
async function createWorkerNode() {
    const command = "vbatch -N 5 -P gpu-h200-1 \\\n  ray start --address=ray-head:6379";
    await terminal.value.sendCommand(animator, command);

    showWorkerNode.value = true;

    await nextTick();
    isProvisioningWorker.value = true;
    workerNodeStatus.value = 'provisioning';

    await animator.sleep(1000);

    // Output worker node creation messages
    const workerNodeOutput = [
        "Starting Ray workers",
        "...",
        "Ray workers started.",
    ];

    await streamOutputToTerminal(workerNodeOutput);

    isProvisioningWorker.value = false;
    isWorkerNodeActive.value = true;
    workerNodeStatus.value = 'active';
    await drawLines();

    // Show cluster ready
    await animator.sleep(400);
}

/**
 * Runs a sample Ray workload.
 */
async function runRayWorkload() {
    await terminal.value.sendCommand(animator, "export RAY_ADDRESS=ray://ray-head:10001");
    await terminal.value.sendCommand(animator, "./ray_workload.py");
    const workloadOutput = [
        "Running Ray workload ...",
        "Processed 50,000 tasks",
        "Result: 1234567890",
    ];

    await streamOutputToTerminal(workloadOutput);
}

/**
 * Streams output lines to the terminal with random delays.
 */
async function streamOutputToTerminal(outputLines) {
    for (let i = 0; i < outputLines.length; i++) {
        const line = outputLines[i];
        const className = line.includes('Ray cluster ready') ? 'success' : 'system';
        terminal.value.sendLine(line, className);

        const delay = Math.random() * 200 + 200;
        await animator.sleep(delay);
    }
}

function stopAnimation() {
    animator.cancelAll(); // Cancel all tracked promises for this component
}

function resetAnimation() {
    // Reset state
    showHeadNode.value = false;
    showWorkerNode.value = false;
    isProvisioningHead.value = false;
    isProvisioningWorker.value = false;
    isHeadNodeActive.value = false;
    isWorkerNodeActive.value = false;
    headNodeStatus.value = '';
    workerNodeStatus.value = '';

    terminal.value?.clear(); // Clear terminal content

    // Redraw lines to remove any existing connections
    drawLines();
}

onMounted(() => {
    // Initial setup
    drawLines();

    // Redraw lines on window resize
    resizeObserver = new ResizeObserver(drawLines);
    if (animationWrapper.value) {
        resizeObserver.observe(animationWrapper.value);
    }

    // Also listen for window resize events to handle breakpoint changes
    window.addEventListener('resize', drawLines);
});

onBeforeUnmount(() => {
    if (resizeObserver && animationWrapper.value) {
        resizeObserver.unobserve(animationWrapper.value);
    }
    window.removeEventListener('resize', drawLines);
    stopAnimation();
});

defineExpose({ startAnimation, stopAnimation });
</script>

<style scoped>
.provisioning-animation-wrapper {
    font-family: 'Inter', sans-serif;
    color: var(--vp-c-text);
    padding: 0.75rem;
    padding-bottom: 0;
    position: relative;
    width: 100%;
    min-height: 480px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
}

.provisioning-animation-wrapper :deep(p) {
    margin: 0;
    padding: 0;
    line-height: normal;
    text-align: left;
}

.typing-caret {
    display: inline-block;
    width: 8px;
    height: 1.2em;
    background-color: #A5B4FC;
    animation: blink 1s step-end infinite;
    vertical-align: bottom;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}

.connection-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
}

.connection-svg :deep(.connection-line) {
    stroke: #6B7280;
    /* Changed to gray-500 for better visibility */
    stroke-width: 2;
    transition: all 0.5s ease-in-out;
}

.connection-svg :deep(.ray-connection) {
    stroke: #3B82F6;
    /* Blue for ray connection */
    stroke-width: 2.5;
}
</style>
