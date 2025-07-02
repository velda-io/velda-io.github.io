<template>
    <div ref="animationWrapper" class="provisioning-animation-wrapper">
        <svg ref="svgContainer" class="connection-svg"></svg>

        <!-- Central Terminal -->
        <Terminal ref="terminal" class="w-full" height="16rem" />

        <!-- Machine Stack -->
        <div class="flex flex-row w-full md:flex-col md:w-auto md:justify-start gap-8">
            <!-- Machine 1 -->
            <div ref="machine1" class="machine active w-full max-w-xs md:max-w-none md:w-52">
                <div class="machine-chassis rounded-lg p-4 flex flex-col">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-lg font-bold">Primary</span>
                        <div class="status-light"></div>
                    </div>
                    <div class="machine-content flex-grow flex flex-col items-center justify-center">
                        <!-- CPU Icon -->
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
                            <rect x="7" y="7" width="10" height="10" rx="1" ry="1"></rect>
                            <line x1="9" y1="2" x2="9" y2="6"></line>
                            <line x1="15" y1="2" x2="15" y2="6"></line>
                            <line x1="9" y1="18" x2="9" y2="22"></line>
                            <line x1="15" y1="18" x2="15" y2="22"></line>
                            <line x1="2" y1="9" x2="6" y2="9"></line>
                            <line x1="2" y1="15" x2="6" y2="15"></line>
                            <line x1="18" y1="9" x2="22" y2="9"></line>
                            <line x1="18" y1="15" x2="22" y2="15"></line>
                        </svg>
                        <p class="text-sm font-semibold mt-2">CPU</p>
                    </div>
                </div>
            </div>

            <!-- Machine 2 -->
            <div v-if="showTrainingMachine" ref="machine2"
                class="machine w-full max-w-xs md:max-w-none md:w-52 transition-all duration-500" :class="{
                    'active': isTrainingActive,
                    'provisioning': isProvisioning,
                    'deactivated': isTrainingDeactivated,
                    'opacity-0 scale-90': !isProvisioning && !isTrainingActive && !isTrainingDeactivated,
                }">
                <div class="machine-chassis rounded-lg p-4 flex flex-col">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-lg font-bold">Training</span>
                        <div class="status-light"></div>
                    </div>
                    <div class="machine-content flex-grow flex flex-col items-center justify-center">
                        <!-- Provisioning State -->
                        <template v-if="isProvisioning">
                            <svg class="animate-spin h-12 w-12 text-amber-400" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            <p class="text-amber-400 text-sm font-semibold mt-2">Provisioning...</p>
                        </template>
                        <template v-else-if="isTrainingDeactivated">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    d="M12 12c0-2.209-1.791-4-4-4s-4 1.791-4 4 1.791 4 4 4 4-1.791 4-4zm0 0c0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z">
                                </path>
                                <path
                                    d="M12 12c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 0c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z">
                                </path>
                            </svg>
                            <p class="text-sm font-semibold mt-2">Deactivated</p>
                        </template>
                        <!-- Active/Inactive State -->
                        <template v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path
                                    d="M12 12c0-2.209-1.791-4-4-4s-4 1.791-4 4 1.791 4 4 4 4-1.791 4-4zm0 0c0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z">
                                </path>
                                <path
                                    d="M12 12c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 0c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z">
                                </path>
                            </svg>
                            <p class="text-sm font-semibold mt-2">GPU</p>
                        </template>
                    </div>
                </div>
            </div>

            <!-- Placeholder for layout consistency when machine 2 is hidden -->
            <div v-else class="w-full max-w-xs md:max-w-none md:w-52 h-[160px]"></div>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import Terminal from '../Terminal.vue';
import { sleep, cancelAllTrackedPromises } from '../../utils/animationUtils';

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
    const terminalRect = terminal.value.getBoundingClientRect();

    const termX = terminalRect.left - wrapperRect.left + terminalRect.width / 2;
    const termY = terminalRect.top - wrapperRect.top + terminalRect.height / 2;

    const m1Rect = machine1.value.getBoundingClientRect();
    const m1X = m1Rect.left - wrapperRect.left + m1Rect.width / 2;
    const m1Y = m1Rect.top - wrapperRect.top + m1Rect.height / 2;
    svgContainer.value.innerHTML += `<line class="connection-line" x1="${m1X}" y1="${m1Y}" x2="${termX}" y2="${termY}" stroke-dasharray="5, 5" />`;

    // Check for machine2's ref and if it's active
    if (machine2.value && isTrainingActive.value) {
        const m2Rect = machine2.value.getBoundingClientRect();
        const m2X = m2Rect.left - wrapperRect.left + m2Rect.width / 2;
        const m2Y = m2Rect.top - wrapperRect.top + m2Rect.height / 2;
        svgContainer.value.innerHTML += `<line class="connection-line" x1="${m2X}" y1="${m2Y}" x2="${termX}" y2="${termY}" stroke-dasharray="5, 5" />`;
    }
}

/**
 * Starts the entire automated animation sequence.
 */
async function startAnimation() {
    // Cancel any ongoing animation first
    cancelAnimation();

    if (!terminal.value) return;
    const command = "vrun -P gpu ./train_model.sh";
    await terminal.value.sendCommand(command);

    showTrainingMachine.value = true;

    await nextTick();
    // Use nextTick to ensure the element is in the DOM before we try to animate it
    isProvisioning.value = true;

    await sleep(1000);
    isProvisioning.value = false;
    isTrainingActive.value = true;
    await drawLines();
    await runCommandInTerminal();
}

/**
 * Deactivates the training machine visually.
 */
async function deactivateTrainingMachine() {
    isTrainingActive.value = false;
    isTrainingDeactivated.value = true;
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
            const className = line.startsWith('Epoch') ? 'text-blue-400' : 'text-yellow-800';
            terminal.value.sendLine(line, className);
            lineIndex++;

            const delay = lineIndex < 3 ? 200 : 350;
            await sleep(Math.random() * 200 + delay);
            await streamLine();
        } else {
            await sleep(400);
            terminal.value.sendLine('Training complete. Releasing GPU instance...', 'text-yellow-800 mt-2');
            deactivateTrainingMachine();
            await sleep(500);
            terminal.value.sendLine('$ ready', 'text-green-800 mt-2');

            // Animation has completed, call onComplete if provided
            await sleep(2000);
            if (props.onComplete) {
                props.onComplete();
            }
        }
    }

    await sleep(100);
    await streamLine();
}

function cancelAnimation() {

    // Reset state
    showTrainingMachine.value = false;
    isProvisioning.value = false;
    isTrainingActive.value = false;
    isTrainingDeactivated.value = false;

    terminal.value?.clear(); // Clear terminal content

    // Redraw lines to remove any existing connections
    drawLines();
}
/**
 * Resets the animation state
 */
function resetAnimation() {
    cancelAnimation();
}

// Watch for isActive prop changes and cancel animation when slide is no longer active
watch(() => props.isActive, (isActive) => {
    if (!isActive) {
        cancelAnimation();
    }
}, { immediate: true });

onMounted(() => {
    // Initial setup
    drawLines();

    // Redraw lines on window resize
    resizeObserver = new ResizeObserver(drawLines);
    if (animationWrapper.value) {
        resizeObserver.observe(animationWrapper.value);
    }
});

onBeforeUnmount(() => {
    if (resizeObserver && animationWrapper.value) {
        resizeObserver.unobserve(animationWrapper.value);
    }
    cancelAnimation();
});

defineExpose({ startAnimation, cancelAnimation });
</script>

<style scoped>
.provisioning-animation-wrapper {
    font-family: 'Inter', sans-serif;
    color: var(--vp-c-text);
    padding: 2rem;
    padding-bottom: 0;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    position: relative;
    width: 100%;
    min-height: 480px;
    margin: auto;
    display: flex;
    align-items: center;
}

.provisioning-animation-wrapper :deep(p) {
    margin: 0;
    padding: 0;
    line-height: normal;
    text-align: left;
}

.machine {
    transition: all 0.5s ease-in-out;
    z-index: 10;
    position: relative;
}

.machine-chassis {
    background-color: var(--vp-c-bg-alt);
    border-top: 2px solid var(--vp-c-border);
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
    height: 160px;
}

.status-light {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #4B5563;
    transition: background-color 0.5s, box-shadow 0.5s;
}

.machine.active .status-light {
    background-color: #10B981;
    box-shadow: 0 0 8px #10B981;
}

.machine.provisioning .status-light {
    background-color: #F59E0B;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {

    0%,
    100% {
        box-shadow: 0 0 5px #F59E0B;
    }

    50% {
        box-shadow: 0 0 15px #F59E0B;
    }
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
</style>
