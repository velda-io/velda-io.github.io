<template>
    <div ref="animationWrapper" class="provisioning-animation-wrapper">
        <svg ref="svgContainer" class="connection-svg"></svg>

        <div class="flex flex-col lg:flex-row w-full gap-4 justify-between">
            <!-- Central Terminal - always at top on mobile, left on desktop -->
            <Terminal ref="terminal" class="w-full lg:w-1/2 self-center" height="16rem" />

            <!-- Machine Stack - right side on desktop, bottom on mobile -->
            <div class="machine-stack w-full lg:w-1/2 flex flex-row flex-wrap justify-center items-center gap-3">
                <!-- Machine 1 -->
                <Machine ref="machine1" title="IDE" status="active" hardware="CPU"
                    class="flex-grow flex-shrink-0" />

                <!-- Machine 2 -->
                <Machine :style="{ visibility: showTrainingMachine ? 'visible' : 'hidden' }" ref="machine2" title="Training"
                    :status="trainingMachineStatus" hardware="GPU"
                    class="flex-grow flex-shrink-0 transition-all duration-500" :class="{
                        'opacity-0 scale-90': trainingMachineStatus === ''
                    }">
                    <template v-if="isProvisioning">
                        <p class="text-amber-400 text-sm font-semibold mt-2">Provisioning...</p>
                    </template>
                    <template v-else-if="isTrainingDeactivated">
                        <p class="text-sm font-semibold mt-2">Deactivated</p>
                    </template>
                </Machine>
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
const machine1 = ref(null);
const machine2 = ref(null); // Ref for the second machine
const animationWrapper = ref(null);

// --- Reactive State ---
const showTrainingMachine = ref(false);
const isProvisioning = ref(false);
const isTrainingActive = ref(false);
const isTrainingDeactivated = ref(false);
const trainingMachineStatus = ref(''); // New reactive state for machine status

// Create an animation tracker for this component
const animator = createAnimationTracker();

// Track all animation timeouts and intervals
let resizeObserver;

/**
 * Draws connecting lines from machines to the terminal.
 */
async function drawLines() {
    // Wait for the next DOM update to ensure elements are rendered
    await nextTick();
    if (!svgContainer.value || !terminal.value || !machine1.value || !animationWrapper.value) return;

    svgContainer.value.innerHTML = ''; // Clear existing lines
    const wrapperRect = animationWrapper.value.getBoundingClientRect();
    const terminalRect = terminal.value.$el.getBoundingClientRect();
    const terminalEl = terminal.value.$el;
    const isLargeScreen = window.innerWidth >= 1024; // lg breakpoint in Tailwind is 1024px

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

    // Access the $el property to get the actual DOM element
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

    // Check for machine2's ref and if it's active
    if (machine2.value && isTrainingActive.value) {
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
    const command = "vrun -P gpu ./train_model.sh";
    await terminal.value.sendCommand(animator, command);

    showTrainingMachine.value = true;

    await nextTick();
    // Use nextTick to ensure the element is in the DOM before we try to animate it
    isProvisioning.value = true;
    trainingMachineStatus.value = 'provisioning';

    await animator.sleep(1000);
    isProvisioning.value = false;
    isTrainingActive.value = true;
    trainingMachineStatus.value = 'active';
    await drawLines();
    await runCommandInTerminal();
}

/**
 * Deactivates the training machine visually.
 */
async function deactivateTrainingMachine() {
    isTrainingActive.value = false;
    isTrainingDeactivated.value = true;
    trainingMachineStatus.value = 'inactive';
    await drawLines();
}

/**
 * Simulates running the command output in the central terminal.
 */
async function runCommandInTerminal() {
    const outputLines = [
        "Initializing GPU... OK",
        "Found 1 compatible device: NVIDIA A100",
        "Starting training process...",
        "Epoch   1/100 - Loss: 0.245, Acc: 0.89",
        "Epoch   2/100 - Loss: 0.187, Acc: 0.91",
        "Epoch   3/100 - Loss: 0.152, Acc: 0.92",
        "Epoch   4/100 - Loss: 0.131, Acc: 0.93",
        "Epoch   5/100 - Loss: 0.115, Acc: 0.94",
    ];

    let lineIndex = 0;

    async function streamLine() {
        if (lineIndex < outputLines.length) {
            const line = outputLines[lineIndex];
            const className = line.startsWith('Epoch') ? 'app-info' : 'system';
            terminal.value.sendLine(line, className);
            lineIndex++;

            const delay = lineIndex < 3 ? 200 : 350;
            await animator.sleep(Math.random() * 200 + delay);
            await streamLine();
        } else {
            await animator.sleep(400);
            terminal.value.sendLine('Training complete. Releasing GPU instance...', 'system');
            deactivateTrainingMachine();
            await animator.sleep(500);
            terminal.value.sendLine('$ ready', 'input');

            // Animation has completed, call onComplete if provided
            await animator.sleep(2000);
            if (props.onComplete) {
                props.onComplete();
            }
        }
    }

    await animator.sleep(100);
    await streamLine();
}

function stopAnimation() {
    animator.cancelAll(); // Cancel all tracked promises for this component

}

function resetAnimation() {
    // Reset state
    showTrainingMachine.value = false;
    isProvisioning.value = false;
    isTrainingActive.value = false;
    isTrainingDeactivated.value = false;
    trainingMachineStatus.value = '';

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

.machine-stack {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 16px;
    padding: 1rem 0;
}
</style>
