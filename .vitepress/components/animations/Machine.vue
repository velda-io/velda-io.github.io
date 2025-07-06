<template>
    <div :class="['machine', status, { 'multi-machine': multiMachine }]"
        :ref="machineRef">
        <div class="machine-header">
            <span>
                <div v-if="status !== 'nostatus'" class="status-light"></div>
                <span class="machine-name text-gray-300">{{ title }}</span>
            </span>
            <span class="machine-hardware text-gray-300">{{ hardware }}</span>
        </div>
        <div class="machine-content">
            <template v-if="status === 'provisioning'">
                <svg class="animate-spin h-12 w-12 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
            </template>
            <template v-else-if="hardware == 'GPU'">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path
                        d="M12 12c0-2.209-1.791-4-4-4s-4 1.791-4 4 1.791 4 4 4 4-1.791 4-4zm0 0c0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z">
                    </path>
                    <path
                        d="M12 12c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 0c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4z">
                    </path>
                </svg>
            </template>

            <template v-else-if="hardware == 'CPU'">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
                    <rect x="7" y="7" width="10" height="10" rx="1" ry="1"></rect>
                    <line x1="9" y1="2" x2="9" y2="6"></line>
                    <line x1="15" y1="2" x2="15" y2="6"></line>
                    <line x1="9" y1="18" x2="9" y2="22"></line>
                    <line x1="15" y1="18" x2="15" y2="22"></line>
                </svg>
            </template>
            <template v-if="hardware">
                <p class="font-semibold text-sm">{{ hardware }}</p>
            </template>
            <slot class="w-full" ></slot>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineExpose, onMounted } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: '',
        validator: (value) => ['', 'active', 'provisioning', 'error', 'inactive', 'nostatus'].includes(value)
    },
    hardware: {
        type: String,
        default: ''
    },
    multiMachine: {
        type: Boolean,
        default: false
    }
});

const machineRef = ref(null);

// Expose machine element to parent components
defineExpose({
    element: machineRef
});
</script>

<style scoped>

.machine.single {
    max-width: 250px;
}
.machine {
    background-color: #1F2937;
    border-radius: 0.5rem;
    padding: 0.75rem;
    width: 100%;
    max-width: 250px;
    @media (max-width: 768px) {
        max-width: calc(50% - 36px); /* Account for 24px padding on each side plus some gap space */
    }
    min-width: 140px;
    height: 170px;
    display: flex;
    flex-direction: column;
    border-top: 3px solid #4B5563;
    transition: all 0.5s ease-in-out;
    opacity: 0;
    transform: scale(0.9);
    z-index: 5;
    position: relative;
}

/* Multi-machine effect with multiple border layers - bottom right only */
.machine.multi-machine {
    position: relative;
}

.machine.multi-machine::after {
    content: '';
    position: absolute;
    bottom: -12px;
    right: -12px;
    width: 80%;
    height: 80%;
    border-right: 2px solid rgba(75, 85, 99, 0.4);
    border-bottom: 2px solid rgba(75, 85, 99, 0.4);
    z-index: -1;
}

.machine.multi-machine::before {
    content: '';
    position: absolute;
    bottom: -6px;
    right: -6px;
    width: 90%;
    height: 90%;
    border-right: 2px solid rgba(75, 85, 99, 0.6);
    border-bottom: 2px solid rgba(75, 85, 99, 0.6);
    z-index: -1;
}


.machine.provisioning {
    opacity: 1;
    transform: scale(1);
    border-top-color: #F59E0B;
}

.machine.nostatus {
    opacity: 1;
    transform: scale(1);
    border-top-color: #4B5563;
}

.machine.active {
    opacity: 1;
    transform: scale(1);
    border-top-color: #10B981;
}

.machine.inactive {
    opacity: 0.7;
    transform: scale(1);
}

.machine.error {
    opacity: 1;
    transform: scale(1);
    border-top-color: #EF4444;
}

.machine-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}

.machine-name {
    font-weight: 700;
    font-size: 0.95rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 10px); /* Allow space for status light */
}

.machine-hardware {
    font-weight: 300;
    font-size: 0.7rem;
}

.status-light {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #4B5563;
    transition: background-color 0.5s, box-shadow 0.5s;
    display: inline-block;
    margin-right: 0.5rem;
}

.machine.provisioning .status-light {
    background-color: #F59E0B;
    animation: pulse 1.5s infinite;
}

.machine.active .status-light {
    background-color: #10B981;
    box-shadow: 0 0 8px #10B981;
}

.machine.error .status-light {
    background-color: #EF4444;
    box-shadow: 0 0 8px #EF4444;
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
    overflow: hidden;
    word-break: break-word;
}

.machine-content svg {
    width: 3.5rem;
    height: 3.5rem;
}

.machine.cloning-effect {
    animation: cloning-pulse 0.5s ease-out;
}

@keyframes cloning-pulse {
    0% {
        box-shadow: 0 0 0 0px rgba(79, 70, 229, 0.7);
    }

    100% {
        box-shadow: 0 0 0 25px rgba(79, 70, 229, 0);
    }
}
</style>
