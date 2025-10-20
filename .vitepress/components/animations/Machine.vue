<template>
    <div :class="['machine', status, { 'multi-machine': multiMachine }]" :ref="machineRef">
        <div class="machine-header">
            <span>
                <div v-if="status !== 'nostatus'" class="status-light"></div>
                <span class="machine-name text-gray-300">{{ title || hardware }}</span>
            </span>
            <template v-if="title">
                <span class="machine-hardware text-gray-300">{{ hardware }}</span>
            </template>
        </div>
        <div class="machine-content">
            <div class="w-10 h-10 mt-4 self-center">
                <template v-if="status === 'provisioning'">
                    <svg class="animate-spin h-10 w-10 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" width="40" height="40">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor"
                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                </template>
                <template v-else-if="hardware == 'GPU' || hardware == 'gpu-h200-1' || hardware == 'nvidia-H200'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gpu-icon lucide-gpu"><path d="M2 21V3"/><path d="M2 5h18a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2.26"/><path d="M7 17v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3"/><circle cx="16" cy="11" r="2"/><circle cx="8" cy="11" r="2"/></svg>
                </template>

                <template v-else-if="hardware == 'CPU'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-cpu-icon lucide-cpu">
                        <path d="M12 20v2" />
                        <path d="M12 2v2" />
                        <path d="M17 20v2" />
                        <path d="M17 2v2" />
                        <path d="M2 12h2" />
                        <path d="M2 17h2" />
                        <path d="M2 7h2" />
                        <path d="M20 12h2" />
                        <path d="M20 17h2" />
                        <path d="M20 7h2" />
                        <path d="M7 20v2" />
                        <path d="M7 2v2" />
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <rect x="8" y="8" width="8" height="8" rx="1" />
                    </svg>
                </template>
            </div>
            <slot class="w-full"></slot>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineExpose, onMounted } from 'vue';

const props = defineProps({
    title: {
        type: String,
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

    @media (max-width: 480px) {
        max-width: calc(50% - 36px);
        /* Account for 24px padding on each side plus some gap space */
    }

    min-width: 140px;
    height: 140px;
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
    max-width: calc(100% - 10px);
    /* Allow space for status light */
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
