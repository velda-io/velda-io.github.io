<template>
    <div ref="terminalWindow" class="terminal-window">
        <div class="terminal-header">
            <div class="header-dots">
                <div class="dot dot-red"></div>
                <div class="dot dot-yellow"></div>
                <div class="dot dot-green"></div>
            </div>
            <div class="flex-grow text-center text-xs text-gray-300">{{ title }}</div>
        </div>
        <div ref="terminalContent"
            class="terminal-font terminal-content rounded-md p-3 text-sm overflow-y-auto"
            :style="{ height: height }"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { sleep } from '../utils/animationUtils';

// --- Template Refs ---
const terminalWindow = ref(null);
const terminalContent = ref(null);

// --- Props ---
const props = defineProps({
    title: {
        type: String,
        default: 'bash'
    },
    height: {
        type: String,
        default: '16rem' // 256px or 16rem
    }
});

// --- Core Terminal Functions ---
/**
 * Types a command character by character with a cursor effect
 * @param {string} command - The command to type
 * @param {number} typingSpeed - Milliseconds between each character
 */
async function sendCommand(command, typingSpeed = 30) {
    if (!terminalContent.value) return;
    
    const prompt = document.createElement('p');
    prompt.className = 'text-green-800';
    prompt.innerHTML = `~ $ <span class="text-green-800"></span><span class="typing-caret"></span>`;
    terminalContent.value.appendChild(prompt);
    scrollToBottom();

    const commandSpan = prompt.querySelector('span');
    const caret = prompt.querySelector('.typing-caret');
    
    for (let i = 0; i < command.length; i++) {
        commandSpan.textContent += command.charAt(i);
        await sleep(typingSpeed);
    }
    
    if (caret) caret.style.display = 'none';
    return true;
}

/**
 * Adds a line of output to the terminal
 * @param {string} text - The text to add
 * @param {string} className - CSS class name for styling the text
 * @param {boolean} noNewLine - If true, doesn't add a newline
 */
function sendLine(text, className = 'text-gray-400', noNewLine = false) {
    if (!terminalContent.value) return;
    
    const p = document.createElement('p');
    p.className = `${className} ${noNewLine ? '' : 'whitespace-pre-wrap'}`;
    p.textContent = text;
    terminalContent.value.appendChild(p);
    scrollToBottom();
    return true;
}

/**
 * Clears the terminal content
 */
function clear() {
    if (terminalContent.value) {
        terminalContent.value.innerHTML = '';
    }
}

/**
 * Scrolls the terminal content to the bottom
 */
function scrollToBottom() {
    if (terminalContent.value) {
        terminalContent.value.scrollTop = terminalContent.value.scrollHeight;
    }
}

/**
 * Gets the bounding client rect of the terminal window
 * @returns {DOMRect|null} - The bounding client rect or null
 */
function getBoundingClientRect() {
    if (terminalWindow.value) {
        return terminalWindow.value.getBoundingClientRect();
    }
    return null;
}

// --- Expose API ---
defineExpose({
    sendCommand,
    sendLine,
    clear,
    getBoundingClientRect
});
</script>

<style scoped>
.terminal-font {
    font-family: 'Fira Code', monospace;
}

.terminal-window {
    background-color: #1F2937;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 42rem;
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

.terminal-header {
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

.terminal-content {
    background-color: white;
    border: 2px solid var(--vp-c-border);
    transition: border-color 0.3s;
    overflow-wrap: break-word;
}

/* Remove default margins for paragraphs to ensure proper terminal display */
.terminal-content :deep(p) {
    margin: 0;
    padding: 0;
    line-height: normal;
    text-align: left;
}
</style>