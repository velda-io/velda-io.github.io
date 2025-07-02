<template>
  <div ref="animationWrapper" class="cloning-animation-wrapper">
    <!-- Animated Mouse Cursor -->
    <div ref="cursor" class="mouse-cursor" :style="{ top: cursorPosition.y + 'px', left: cursorPosition.x + 'px' }">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.789 0l-7 14a1 1 0 001.169 1.409l5-1.428a1 1 0 00.475 0l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
    </div>

    <div class="flex flex-col lg:flex-row justify-center items-center w-full gap-16">
      
      <!-- Template Machine -->
      <div class="flex flex-col items-center gap-4">
        <div ref="templateMachine" class="machine active w-full max-w-xs md:max-w-none md:w-72" :class="{ 'cloning-effect': isCloning }">
          <div class="machine-chassis rounded-lg p-4 flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <span class="text-lg font-bold text-white">Pytorch ML Template</span>
              <div class="status-light"></div>
            </div>
            <div class="machine-content flex-grow flex flex-col text-left p-2 bg-black/20 rounded-md">
                <p class="text-gray-300 text-sm font-semibold min-h-[2rem]">Base Dependencies:</p>
                <ul class="text-xs text-gray-400 list-disc list-inside mt-1">
                    <li>torch==1.12.1</li>
                    <li>pandas==1.4.2</li>
                    <li>matplotlib==3.5.2</li>
                </ul>
            </div>
          </div>
        </div>
        <button ref="cloneButton" class="clone-button" style="cursor: default;" tabindex="-1" aria-disabled="true">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M7 6a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"></path><path fill-rule="evenodd" d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V4a1 1 0 00-1-1H5z" clip-rule="evenodd"></path></svg>
            <span>Clone Environment</span>
        </button>
      </div>

      <!-- Cloned Instances Stack -->
      <div class="flex flex-col w-full lg:w-auto justify-around lg:justify-start gap-8">
        <!-- Instance 1 (Alice) -->
        <div v-if="clones.alice.visible" ref="instance1" class="machine w-full max-w-xs md:max-w-none md:w-80 transition-all duration-500" :class="{ 'active': clones.alice.active }">
          <div class="machine-chassis rounded-lg p-4 flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <span class="text-lg font-bold text-white">Data Analysis (Alice)</span>
              <div class="status-light"></div>
            </div>
            <div class="machine-content flex-grow flex flex-col text-left p-2 bg-black/20 rounded-md">
                <p class="terminal-font text-xs text-green-400 mb-1 min-h-[2rem]">{{ clones.alice.command }}</p>
                <ul class="text-xs text-gray-400 list-disc list-inside min-h-[5.5rem]">
                    <li v-for="dep in clones.alice.deps" :key="dep" :class="{'text-yellow-400 font-bold': dep.includes('scikit-learn')}">{{ dep }}</li>
                </ul>
            </div>
          </div>
        </div>
        <div v-else class="w-full max-w-xs md:max-w-none md:w-80" style="min-height: 188px;"></div>

        <!-- Instance 2 (Bob) -->
        <div v-if="clones.bob.visible" ref="instance2" class="machine w-full max-w-xs md:max-w-none md:w-80 transition-all duration-500" :class="{ 'active': clones.bob.active }">
          <div class="machine-chassis rounded-lg p-4 flex flex-col">
            <div class="flex items-center justify-between mb-3">
              <span class="text-lg font-bold text-white">PyTorch Research (Bob)</span>
              <div class="status-light"></div>
            </div>
            <div class="machine-content flex-grow flex flex-col text-left p-2 bg-black/20 rounded-md">
                <p class="terminal-font text-xs text-green-400 mb-1 min-h-[2rem]">{{ clones.bob.command }}</p>
                <ul class="text-xs text-gray-400 list-disc list-inside">
                    <li v-for="dep in clones.bob.deps" :key="dep" :class="{'text-yellow-400 font-bold': dep.includes('torch==2.0.0')}">{{ dep }}</li>
                </ul>
            </div>
          </div>
        </div>
        <div v-else class="w-full max-w-xs md:max-w-none md:w-80" style="min-height: 188px;"></div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue';

// --- Template Refs ---
const templateMachine = ref(null);
const instance1 = ref(null);
const instance2 = ref(null);
const animationWrapper = ref(null);
const cloneButton = ref(null);
const cursor = ref(null);

// --- Reactive State ---
const isCloning = ref(false);
const clones = reactive({
    alice: { visible: false, active: false, command: '', deps: [] },
    bob: { visible: false, active: false, command: '', deps: [] }
});
const baseDeps = ['torch==1.12.1', 'pandas==1.4.2', 'matplotlib==3.5.2'];
const cursorPosition = ref({ x: -100, y: -100 }); // Start off-screen

let animationTimeout;
let animationStage = 'cloneBob'; // 'cloneBob', 'modifyAll', 'reset'

/**
 * Handles the logic for the simulated click.
 */
function handleCloneClick() {
    isCloning.value = true;

    if (animationStage === 'cloneBob') {
        // Show Bob's instance
        clones.bob.visible = true;
        clones.bob.deps = [...baseDeps];
        setTimeout(() => {
            clones.bob.active = true;
            isCloning.value = false;
            animationStage = 'modifyAll';
            animationTimeout = setTimeout(modifyInstances, 2000); // Wait before modifying
        }, 500);

    }
}

/**
 * Modifies the dependencies of the cloned instances.
 */
function modifyInstances() {
    // Modify Alice's instance
    clones.alice.command = '$ pip install scikit-learn';
    setTimeout(() => {
        clones.alice.deps.push('scikit-learn==1.0.2');
    }, 800);

    // Modify Bob's instance
    setTimeout(() => {
        clones.bob.command = '$ pip install --upgrade torch';
        setTimeout(() => {
            const tfIndex = clones.bob.deps.findIndex(d => d.startsWith('torch=='));
            if (tfIndex !== -1) {
                clones.bob.deps[tfIndex] = 'torch==2.0.0';
            }
        }, 800);
    }, 1500);

    // Finish and reset
    animationTimeout = setTimeout(() => {
        animationStage = 'reset';
        animationTimeout = setTimeout(runFullAutomation, 3000); // Wait before resetting
    }, 3500);
}

/**
 * Resets the animation to its initial state.
 */
function resetAnimation() {
    clones.alice = { visible: true, active: true, command: '', deps: [...baseDeps] };
    clones.bob = { visible: false, active: false, command: '', deps: [] };
    animationStage = 'cloneBob';
}

/**
 * Simulates a user clicking the clone button.
 */
async function runFullAutomation() {
    if (!cloneButton.value || !animationWrapper.value || !cursor.value) return;

    if (animationStage === 'reset') {
        resetAnimation();
    }
    
    await nextTick(); // Ensure DOM is updated before getting positions

    const wrapperRect = animationWrapper.value.getBoundingClientRect();
    
    // Set initial cursor position to bottom left without transition
    cursor.value.style.transition = 'none';
    cursorPosition.value = { x: 80, y: wrapperRect.height - 80 };
    
    // Make cursor visible after a brief delay and re-enable transition
    setTimeout(() => {
      if(cursor.value) {
        cursor.value.style.transition = 'top 1s ease-in-out, left 1s ease-in-out, transform 0.1s ease-in-out';
        cursor.value.style.opacity = '1';
      }
    }, 100);


    // Get button position relative to the wrapper
    const buttonRect = cloneButton.value.getBoundingClientRect();
    const targetX = buttonRect.left - wrapperRect.left + buttonRect.width / 2;
    const targetY = buttonRect.top - wrapperRect.top + buttonRect.height / 2;

    // Animate cursor to button
    animationTimeout = setTimeout(() => {
        cursorPosition.value = { x: targetX, y: targetY };

        // Wait for cursor to arrive
        animationTimeout = setTimeout(() => {
            // Add click effect
            cursor.value.style.transform = 'scale(0.8)';
            cloneButton.value.style.transform = 'scale(0.95)';
            
            // Remove click effect and trigger the main logic
            setTimeout(() => {
                cursor.value.style.transform = 'scale(1)';
                cloneButton.value.style.transform = 'scale(1)';
                handleCloneClick();
            }, 150);

            // Hide cursor after a delay
            setTimeout(() => {
                if(cursor.value) cursor.value.style.opacity = '0';
                // Reset position for next loop
                setTimeout(() => {
                     cursorPosition.value = { x: -100, y: -100 };
                }, 500);
            }, 1000);

        }, 1000); // Time for cursor to move
    }, 500); // Time to wait before moving cursor
}

onMounted(() => {
    resetAnimation(); // Set initial state
    // Start the animation automatically
    animationTimeout = setTimeout(runFullAutomation, 2000);
});

onBeforeUnmount(() => {
    clearTimeout(animationTimeout);
});
</script>

<style scoped>
.cloning-animation-wrapper {
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
    overflow: hidden; /* Hide cursor when it's outside */
}
.cloning-animation-wrapper :deep(p),:deep(ul) {
    margin: 0;
    padding: 0;
    line-height: normal;
    text-align: left;
    list-style: none;
}
.terminal-font {
    font-family: 'Fira Code', monospace;
    word-break: break-all; /* Ensure long commands wrap */
}
.machine {
    transition: all 0.5s ease-in-out;
    z-index: 10;
    position: relative;
}
.machine-chassis {
    background-color: #374151;
    border-top: 2px solid #4b5563;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
    min-height: 188px; /* Pre-allocate space for 4th dependency */
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
.clone-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    background-color: #4f46e5;
    color: white;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: transform 0.1s ease-in-out;
    border: none;
}
.machine.cloning-effect {
  animation: cloning-pulse 0.5s ease-out;
}
@keyframes cloning-pulse {
  0% { box-shadow: 0 0 0 0px rgba(79, 70, 229, 0.7); }
  100% { box-shadow: 0 0 0 25px rgba(79, 70, 229, 0); }
}
.mouse-cursor {
    position: absolute;
    z-index: 999;
    color: white;
    transition: top 1s ease-in-out, left 1s ease-in-out, transform 0.1s ease-in-out;
    opacity: 0;
    pointer-events: none;
    filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5));
}
</style>
