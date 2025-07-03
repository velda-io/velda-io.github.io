<template>
    <div ref="animationWrapper" class="animation-wrapper">
        <svg ref="svgContainer" class="connection-svg"></svg>

        <!-- Bottom row: Terminal / Browser -->
        <div ref="userPanel" class="w-full max-w-2xl">
            <div v-if="!isBrowserVisible">
                <Terminal ref="terminal" height="16rem" />
            </div>

            <div v-else class="browser-window">
                <div class="browser-header">
                    <div class="header-dots">
                        <div class="dot dot-red"></div>
                        <div class="dot dot-yellow"></div>
                        <div class="dot dot-green"></div>
                    </div>
                </div>
                <div class="browser-address-bar">
                    <span ref="browserUrl"></span>
                </div>
                <div ref="browserPage" class="browser-content">
                    <p v-if="browserPageVisible">🚀 Frontend Loaded!</p>
                </div>
            </div>
        </div>

        <!-- Top row: Machines -->
        <div class="machine-stack">
            <Machine ref="apiServerMachine" title="apiserver" hardware="4 CPUs" :status="apiServerStatus">
                <p class="text-xs">Port: 8000</p>
            </Machine>

            <Machine ref="frontendMachine" title="frontend" hardware="4 CPUs" :status="frontendStatus">
                <p class="text-xs">Connected to apiserver:8000</p>
            </Machine>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { createAnimationTracker } from '../../utils/animationUtils';
import Terminal from '../../components/Terminal.vue';
import Machine from './Machine.vue';

// --- Template Refs ---
const animationWrapper = ref(null);
const svgContainer = ref(null);
const apiServerMachine = ref(null);
const frontendMachine = ref(null);
const terminal = ref(null);
const browserPage = ref(null);
const browserUrl = ref(null);
const userPanel = ref(null);
const browserPageVisible = ref(false);

// --- Reactive State ---
const isBrowserVisible = ref(false);
const apiServerStatus = ref('');
const frontendStatus = ref('');
let resizeObserver = null;

// Create an animation tracker for this component
const animator = createAnimationTracker();

const commands = [
    { cmd: "vrun -P cpu-4 -s apiserver ./start-apiserver.sh --port 8000 &", action: provisionApiServer },
    { cmd: "vrun -P cpu-4 -s frontend ./start-frontend.sh --apiserver=apiserver:8000 &", action: provisionFrontend }
];

// --- Core Animation Functions ---

const props = defineProps({
    onComplete: {
        type: Function,
        required: false,
        default: null
    },
});
async function startAnimation() {
    stopAnimation();
    resetState();
    await nextTick();
    for (let i = 0; i < commands.length; i++) {
        const { cmd, action } = commands[i];
        await typeCommand(cmd);
        await action();
    }
    addTerminalOutput('~ $ ', 'input', true);
    await animator.sleep(2000);
    if (props.onComplete) {
        props.onComplete();
    }
};

function stopAnimation() {
    animator.cancelAll();
};

function resetState() {
    if (terminal.value) terminal.value.clear();
    if (svgContainer.value) svgContainer.value.innerHTML = '';
    if (browserUrl.value) browserUrl.value.textContent = '';

    isBrowserVisible.value = false;
    apiServerStatus.value = '';
    frontendStatus.value = '';
    browserPageVisible.value = false;
}

async function typeCommand(command) {
    if (terminal.value) {
        await terminal.value.sendCommand(animator, command);
    }
}

function addTerminalOutput(text, type=null, noNewLine = false) {
    if (terminal.value) {
        terminal.value.sendLine(text, type, noNewLine=noNewLine);
    }
}

async function provisionApiServer() {
    if (!apiServerMachine.value) return;
    apiServerStatus.value = 'provisioning';
    drawLines();
    addTerminalOutput('INFO: Provisioning "apiserver"...', 'system');

    await animator.sleep(1500);
    apiServerStatus.value = 'active';
    drawLines();
    addTerminalOutput('Apiserver is listening on port 8000.', 'app-info');
}

async function provisionFrontend() {
    if (!frontendMachine.value) return;
    frontendStatus.value = 'provisioning';
    drawLines();
    addTerminalOutput('INFO: Provisioning "frontend"...', 'system');

    await animator.sleep(1500);
    frontendStatus.value = 'active';
    drawLines();
    addTerminalOutput('Frontend is available on port 80.', 'app-info');
    await animator.sleep(500);
    await showBrowser();
}

async function showBrowser() {
    isBrowserVisible.value = true;
    await nextTick(); // Wait for the DOM to update
    if (browserUrl.value) {
        const url = 'https://80-frontend-alice.velda.internal';
        for (let i = 0; i < url.length; i++) {
            browserUrl.value.textContent += url.charAt(i);
            await animator.sleep(30); // Simulate typing effect
        }
    }
    await animator.sleep(300);
    browserPageVisible.value = true;
    if (browserPage.value) {
        browserPage.value.animate([
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 400, easing: 'ease-out' });
    }
}

function drawLines() {
    if (!svgContainer.value || !userPanel.value) return;

    svgContainer.value.innerHTML = '';
    const termRect = userPanel.value.getBoundingClientRect();
    const wrapperRect = animationWrapper.value.getBoundingClientRect();

    const termX = termRect.left - wrapperRect.left + termRect.width;
    const termY = termRect.top - wrapperRect.top + termRect.height / 2;

    const machines = [
        { ref: apiServerMachine.value, status: apiServerStatus.value },
        { ref: frontendMachine.value, status: frontendStatus.value }
    ];

    machines.forEach(({ ref, status }) => {
        if (ref && (status === 'active' || status === 'provisioning')) {
            const machineRect = ref.$el.getBoundingClientRect();
            const machineX = machineRect.left - wrapperRect.left;
            const machineY = machineRect.top - wrapperRect.top + machineRect.height / 2;

            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('class', 'connection-line');
            line.setAttribute('x1', machineX);
            line.setAttribute('y1', machineY);
            line.setAttribute('x2', termX);
            line.setAttribute('y2', termY);
            svgContainer.value.appendChild(line);
        }
    });
}

function scrollToBottom() {
    if (terminal.value) {
        terminal.value.scrollTop = terminal.value.scrollHeight;
    }
}

// --- Lifecycle Hooks ---
onMounted(() => {
    if (animationWrapper.value) {
        resizeObserver = new ResizeObserver(() => {
            setTimeout(drawLines, 50);
        });
        resizeObserver.observe(animationWrapper.value);
    }
});

onBeforeUnmount(() => {
    if (resizeObserver && animationWrapper.value) {
        resizeObserver.unobserve(animationWrapper.value);
    }
    stopAnimation();
});

// --- Expose API ---
defineExpose({
    startAnimation,
    stopAnimation
});
</script>

<style scoped>
.animation-wrapper :deep(p),
:deep(ul) {
    margin: 0;
    padding: 0;
    line-height: normal;
    text-align: left;
    list-style: none;
}

.terminal-font {
    font-family: 'Fira Code', monospace;
}


.terminal-window,
.browser-window {
    background-color: #1F2937;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 700px;
    z-index: 10;
    flex-shrink: 0;
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

.animation-wrapper {
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
    overflow: hidden;
}

.browser-header {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    background-color: #374151;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}

.header-dots {
    display: flex;
    gap: 0.5rem;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 9999px;
}

.dot-red {
    background-color: #EF4444;
}

.dot-yellow {
    background-color: #F59E0B;
}

.dot-green {
    background-color: #10B981;
}

.terminal-window.active .terminal-content {
    border-color: var(--vp-c-brand);
}

.browser-content {
    background-color: white;
    border: 2px solid var(--vp-c-border);
    transition: border-color 0.3s;
    overflow-wrap: break-word;
    padding: 0.75rem;
    overflow-y: auto;
}

.browser-content {
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    color: #9CA3AF;
}

.browser-address-bar {
    background-color: #374151;
    padding: 0.5rem 0.75rem;
    margin: 0.5rem;
    border-radius: 0.25rem;
    color: #E5E7EB;
    font-size: 0.875rem;
}

.machine-stack {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    width: 100%;
    margin-bottom: 1rem;
}

.machine {
    background-color: #1F2937;
    border-radius: 0.5rem;
    padding: 0.75rem;
    width: 240px;
    height: 150px;
    display: flex;
    flex-direction: column;
    border-top: 3px solid #4B5563;
    transition: all 0.5s ease-in-out;
    opacity: 0;
    transform: scale(0.9);
    z-index: 5;
}

.machine.provisioning {
    opacity: 1;
    transform: scale(1);
    border-top-color: #F59E0B;
}

.machine.active {
    opacity: 1;
    transform: scale(1);
    border-top-color: #10B981;
}

.machine-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.machine-name {
    font-weight: 700;
    font-size: 1rem;
}

.status-light {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #4B5563;
    transition: background-color 0.5s, box-shadow 0.5s;
}

.machine.provisioning .status-light {
    background-color: #F59E0B;
    animation: pulse 1.5s infinite;
}

.machine.active .status-light {
    background-color: #10B981;
    box-shadow: 0 0 8px #10B981;
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

.machine-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    color: #9CA3AF;
}

.machine-content svg {
    width: 3.5rem;
    height: 3.5rem;
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
    stroke: #4B5563;
    stroke-width: 2;
    stroke-dasharray: 5, 5;
    transition: all 0.5s ease-in-out;
}
</style>
