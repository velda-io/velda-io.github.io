<div class="example-container">
    <h2>Terminal Component Example</h2>
    <Terminal ref="terminalExample" height="12rem" />
    <div class="controls">
        <button @click="runDemoCommand" class="btn">Run Command</button>
        <button @click="addOutput" class="btn">Add Output</button>
        <button @click="clearTerminal" class="btn">Clear</button>
    </div>
</div>

<script setup>
import { ref, onMounted } from 'vue';
import Terminal from '../.vitepress/components/Terminal.vue';

const terminalExample = ref(null);

async function runDemoCommand() {
    if (terminalExample.value) {
        await terminalExample.value.sendCommand('ls -la');
        terminalExample.value.sendLine('total 68', 'text-blue-400');
        terminalExample.value.sendLine('drwxr-xr-x  14 user  staff   448 Jul  2 14:22 .', 'text-blue-400');
        terminalExample.value.sendLine('drwxr-xr-x   5 user  staff   160 Jul  2 14:20 ..', 'text-blue-400');
        terminalExample.value.sendLine('-rw-r--r--   1 user  staff   423 Jul  2 14:21 README.md', 'text-green-500');
        terminalExample.value.sendLine('-rw-r--r--   1 user  staff   876 Jul  2 14:21 package.json', 'text-green-500');
    }
}

function addOutput() {
    if (terminalExample.value) {
        terminalExample.value.sendLine('This is a sample output line', 'text-yellow-400');
        terminalExample.value.sendLine('And another one with different styling', 'text-purple-500');
        terminalExample.value.sendLine('> Process completed successfully', 'text-green-600');
    }
}

function clearTerminal() {
    if (terminalExample.value) {
        terminalExample.value.clear();
    }
}

onMounted(async () => {
    if (terminalExample.value) {
        terminalExample.value.sendLine('Terminal component loaded!', 'text-green-600');
        terminalExample.value.sendLine('Try clicking the buttons below to see it in action.', 'text-gray-500');
    }
});
</script>

<style scoped>
.example-container {
    max-width: 700px;
    margin: 2rem auto;
    padding: 1rem;
}

.controls {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    justify-content: center;
}

.btn {
    padding: 0.5rem 1rem;
    background-color: #4B5563;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #374151;
}
</style>
