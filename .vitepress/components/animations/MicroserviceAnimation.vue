<template>
    <div ref="animationWrapper" class="animation-wrapper">
        <svg ref="svgContainer" class="connection-svg"></svg>

        <!-- Bottom row: Terminal / Browser -->
        <div ref="userPanel" class="w-full max-w-2xl">
            <div v-if="!isBrowserVisible">
                <Terminal ref="terminal" height="16rem" />
            </div>

            <div v-else ref="browserWindow" class="browser-window">
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
                <div class="browser-content">
                    <p>🚀 Frontend Loaded!</p>
                </div>
            </div>
        </div>

        <!-- Top row: Machines -->
        <div class="machine-stack">
            <div ref="apiServerMachine" class="machine">
                <div class="machine-header">
                    <span class="machine-name">apiserver</span>
                    <div class="status-light"></div>
                </div>
                <div class="machine-content">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
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
                    <p class="font-semibold text-sm">4 CPUs</p>
                    <p class="text-xs">Port: 8000</p>
                </div>
            </div>
            <div ref="frontendMachine" class="machine">
                <div class="machine-header">
                    <span class="machine-name">frontend</span>
                    <div class="status-light"></div>
                </div>
                <div class="machine-content">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
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
                    <p class="font-semibold text-sm">4 CPUs</p>
                    <p class="text-xs">Connects to apiserver:8000</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { cancelAllTrackedPromises, sleep } from '../../utils/animationUtils';
import Terminal from '../../components/Terminal.vue';

// --- Template Refs ---
const animationWrapper = ref(null);
const svgContainer = ref(null);
const apiServerMachine = ref(null);
const frontendMachine = ref(null);
const terminal = ref(null);
const browserWindow = ref(null);
const browserUrl = ref(null);
const userPanel = ref(null);

// --- Reactive State ---
const isBrowserVisible = ref(false);
let resizeObserver = null;

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
    resetState();
    await nextTick();
    for (let i = 0; i < commands.length; i++) {
        const { cmd, action } = commands[i];
        await typeCommand(cmd);
        await action();
    }
    addTerminalOutput('~ $ ', 'text-blue-400', true);
    await sleep(2000);
    if (props.onComplete) {
        props.onComplete();
    }
};

const stopAnimation = () => {
    cancelAllTrackedPromises();
    resetState();
};

function resetState() {
    if (terminal.value) terminal.value.clear();
    if (svgContainer.value) svgContainer.value.innerHTML = '';

    isBrowserVisible.value = false;

    [apiServerMachine.value, frontendMachine.value].forEach(machine => {
        if (machine) machine.classList.remove('active', 'provisioning');
    });
}

async function typeCommand(command) {
    if (terminal.value) {
        await terminal.value.sendCommand(command);
    }
}

function addTerminalOutput(text, className = 'text-gray-400', noNewLine = false) {
    if (terminal.value) {
        terminal.value.sendLine(text, className, noNewLine);
    }
}

async function provisionApiServer() {
    if (!apiServerMachine.value) return;
    apiServerMachine.value.classList.add('provisioning');
    drawLines();
    addTerminalOutput('INFO: Provisioning "apiserver"...', 'text-yellow-400');

    await sleep(1500);
    apiServerMachine.value.classList.remove('provisioning');
    apiServerMachine.value.classList.add('active');
    drawLines();
    addTerminalOutput('SUCCESS: apiserver is listening on port 8000.', 'text-green-400');
}

async function provisionFrontend() {
    if (!frontendMachine.value) return;
    frontendMachine.value.classList.add('provisioning');
    drawLines();
    addTerminalOutput('INFO: Provisioning "frontend"...', 'text-yellow-400');

    await sleep(1500);
    frontendMachine.value.classList.remove('provisioning');
    frontendMachine.value.classList.add('active');
    drawLines();
    addTerminalOutput('SUCCESS: Frontend available.', 'text-green-400');
    showBrowser();
}

async function showBrowser() {
    isBrowserVisible.value = true;
    await nextTick(); // Wait for the DOM to update
    if (browserUrl.value) {
        browserUrl.value.textContent = 'http://80-frontend-alice.velda.internal';
    }
    if (browserWindow.value) {
        browserWindow.value.animate([
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

    [apiServerMachine.value, frontendMachine.value].forEach(machine => {
        if (machine && (machine.classList.contains('active') || machine.classList.contains('provisioning'))) {
            const machineRect = machine.getBoundingClientRect();
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

.terminal-header,
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

.terminal-content,
.browser-content {
    background-color: white;
    border: 2px solid var(--vp-c-border);
    transition: border-color 0.3s;
    overflow-wrap: break-word;
    padding: 0.75rem;
    overflow-y: auto;
    height: 160px;
}

.browser-content {
    height: 5rem;
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
