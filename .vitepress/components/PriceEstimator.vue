<template>
  <div class="price-estimator">
    <div class="bg-gradient" aria-hidden="true"></div>

    <div class="mx-auto max-w-300 px-8 flex flex-col gap-y-12.5">
      <div class="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 md:gap-y-20 gap-x-5">
        <div class="h-75 pt-20 flex flex-col col-span-6 gap-y-12.5">
          <h1 class="text-[40px] font-bold">Price Estimator</h1>
          <p class="text-md leading-relaxed text-[var(--vp-c-text-2)]">
            Calculate the effective rental cost of buying GPU infrastructure. See your total cost broken down as equivalent rent and down payment.
          </p>
        </div>
      </div>

      <div class="px-6 flex flex-col justify-center mx-auto w-full max-w-[var(--vp-layout-max-width)]">
        <div class="space-y-8">
          <!-- Node Type Selection -->
          <div class="rounded-xl border border-[#d8d8d8] bg-white p-6">
            <h2 class="text-2xl font-semibold mb-4">Node Type</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div v-for="(node, key) in nodeTypes" :key="key"
                @click="selectNodeType(key)"
                :class="['node-type-box', { 'selected': selectedNodeType === key }]">
                <div class="font-semibold text-lg">{{ node.name }}</div>
                <div class="text-xs text-color-[#575858] mt-1">{{ formatCurrency(node.price) }}</div>
                <div class="text-xs text-color-[#575858]">{{ (node.watts / 1000).toFixed(1) }}kW</div>
              </div>
              <div @click="selectNodeType('custom')"
                :class="['node-type-box', { 'selected': selectedNodeType === 'custom' }]">
                <div class="font-semibold text-lg">Custom</div>
                <div class="text-xs text-color-[#575858] mt-1">Custom config</div>
              </div>
            </div>
          </div>

          <!-- Configuration and Operating Costs Side by Side -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Hardware Configuration -->
            <div class="rounded-xl border border-[#d8d8d8] bg-white p-6">
              <h2 class="text-2xl font-semibold mb-6">Configuration</h2>
              <div class="space-y-4">
                <div>
                  <label class="flex justify-between text-sm font-medium mb-2">
                    <span>Turn-key Price per Node</span>
                    <input type="number" v-model.number="unitPrice"
                      class="text-sm font-medium text-right border rounded px-2 py-1 w-32" />
                  </label>
                  <div class="slider-container">
                    <input type="range" v-model.number="unitPrice" min="100000" max="2000000" step="10000"
                      class="slider" />
                  </div>
                  <div class="text-xs text-color-[#575858] mt-1">Includes hardware, switches, installation, etc.</div>
                </div>

                <div>
                  <label class="flex justify-between text-sm font-medium mb-2">
                    <span>Number of GPUs</span>
                    <span class="text-sm font-medium">{{ numCards }}</span>
                  </label>
                  <div class="slider-container">
                    <input type="range" v-model.number="gpuCountIndex" :min="0" :max="validGpuCounts.length - 1" step="1"
                      class="slider" />
                  </div>
                  <div class="text-xs text-color-[#575858] mt-1">{{ formatDecimal(numNodes, 0) }} nodes (8 GPUs per node)</div>
                </div>

                <div>
                  <label class="flex justify-between text-sm font-medium mb-2">
                    <span>Watts per Node</span>
                    <input type="number" v-model.number="wattsPerNode"
                      class="text-sm font-medium text-right border rounded px-2 py-1 w-24" />
                  </label>
                  <div class="slider-container">
                    <input type="range" v-model.number="wattsPerNode" min="0" max="100000" step="100"
                      class="slider" />
                  </div>
                </div>

                <div>
                  <label class="flex justify-between text-sm font-medium mb-2">
                    <span>Useful Life (years)</span>
                    <input type="number" v-model.number="usefulLife"
                      class="text-sm font-medium text-right border rounded px-2 py-1 w-20" />
                  </label>
                  <div class="slider-container">
                    <input type="range" v-model.number="usefulLife" min="1" max="10" step="1"
                      class="slider" />
                  </div>
                </div>

                <div>
                  <label class="flex justify-between text-sm font-medium mb-2">
                    <span>Residual Value (%)</span>
                    <input type="number" v-model.number="residualValuePct"
                      class="text-sm font-medium text-right border rounded px-2 py-1 w-20" />
                  </label>
                  <div class="slider-container">
                    <input type="range" v-model.number="residualValuePct" min="0" max="50" step="5"
                      class="slider" />
                  </div>
                </div>

                <div class="pt-3 border-t border-[#e5e7eb]">
                  <div class="flex justify-between text-sm font-medium">
                    <span>Total Power</span>
                    <span class="text-green-700">{{ formatDecimal(totalWatts / 1000, 1) }} kW</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Operating Costs -->
            <div class="rounded-xl border border-[#d8d8d8] bg-white p-6">
              <h2 class="text-2xl font-semibold mb-6">Operating Costs</h2>
              <div class="space-y-4">
                <div>
                  <label class="flex justify-between text-sm font-medium mb-2">
                    <span>Electric Rate ($/kW/month)</span>
                    <input type="number" v-model.number="electricRatePerKwMonth" step="1"
                      class="text-sm font-medium text-right border rounded px-2 py-1 w-24" />
                  </label>
                  <div class="slider-container">
                    <input type="range" v-model.number="electricRatePerKwMonth" min="0" max="500" step="5"
                      class="slider" />
                  </div>
                </div>

                <div>
                  <label class="flex justify-between text-sm font-medium mb-2">
                    <span>Fixed Costs ($/month)</span>
                    <input type="number" v-model.number="fixedCostPerMonth"
                      class="text-sm font-medium text-right border rounded px-2 py-1 w-24" />
                  </label>
                  <div class="slider-container">
                    <input type="range" v-model.number="fixedCostPerMonth" min="0" max="50000" step="500"
                      class="slider" />
                  </div>
                  <div class="text-xs text-color-[#575858] mt-1">Internet, rack space, etc.</div>
                </div>

                <div>
                  <label class="flex justify-between text-sm font-medium mb-2">
                    <span>Maintenance ($/GPU/h)</span>
                    <input type="number" v-model.number="maintenanceCostPerGpuHour" step="0.01"
                      class="text-sm font-medium text-right border rounded px-2 py-1 w-24" />
                  </label>
                  <div class="slider-container">
                    <input type="range" v-model.number="maintenanceCostPerGpuHour" min="0" max="2" step="0.05"
                      class="slider" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Financing Section -->
          <div class="rounded-xl border border-[#d8d8d8] bg-white p-6">
            <div class="flex items-center mb-4">
              <input type="checkbox" v-model="enableFinancing" id="enableFinancing" class="mr-3 w-5 h-5 cursor-pointer" />
              <label for="enableFinancing" class="text-2xl font-semibold cursor-pointer">Enable Financing</label>
            </div>

            <div v-if="enableFinancing" class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="flex justify-between text-sm font-medium mb-2">
                  <span>Down Payment (%)</span>
                  <input type="number" v-model.number="downPaymentPct"
                    class="text-sm font-medium text-right border rounded px-2 py-1 w-20" />
                </label>
                <div class="slider-container">
                  <input type="range" v-model.number="downPaymentPct" min="0" max="100" step="5"
                    class="slider" />
                </div>
              </div>

              <div>
                <label class="flex justify-between text-sm font-medium mb-2">
                  <span>Finance Period (years)</span>
                  <input type="number" v-model.number="financePeriod"
                    class="text-sm font-medium text-right border rounded px-2 py-1 w-20" />
                </label>
                <div class="slider-container">
                  <input type="range" v-model.number="financePeriod" min="1" max="7" step="1"
                    class="slider" />
                </div>
              </div>

              <div>
                <label class="flex justify-between text-sm font-medium mb-2">
                  <span>Interest Rate (%)</span>
                  <input type="number" v-model.number="debtInterestRate" step="0.1"
                    class="text-sm font-medium text-right border rounded px-2 py-1 w-20" />
                </label>
                <div class="slider-container">
                  <input type="range" v-model.number="debtInterestRate" min="0" max="20" step="0.5"
                    class="slider" />
                </div>
              </div>
            </div>
            <div v-else class="text-sm text-color-[#575858]">
              Assuming 100% down payment (no financing)
            </div>
          </div>

          <!-- Summary Metrics -->
          <div class="rounded-xl border border-[#d8d8d8] bg-color-[#f7f9fb] p-6">
            <h2 class="text-2xl font-semibold mb-4">Summary</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div class="text-sm text-color-[#575858] mb-1">Total CapEx</div>
                <div class="text-2xl font-bold text-gray-700">{{ formatCurrency(totalCapex) }}</div>
                <div class="text-xs text-color-[#575858] mt-1">Initial hardware investment</div>
              </div>
              <div>
                <div class="text-sm text-color-[#575858] mb-1">Annual OpEx</div>
                <div class="text-2xl font-bold text-gray-700">{{ formatCurrency(annualOpex) }}</div>
                <div class="text-xs text-color-[#575858] mt-1">Operating costs per year</div>
              </div>
              <div>
                <div class="text-sm text-color-[#575858] mb-1">TCO ({{ usefulLife }} years)</div>
                <div class="text-2xl font-bold text-gray-700">{{ formatCurrency(totalOwnershipCost) }}</div>
                <div class="text-xs text-color-[#575858] mt-1">Total cost of ownership</div>
              </div>
            </div>
          </div>

          <!-- Result: Effective Rent -->
          <div class="rounded-xl border-2 border-green-500 bg-green-50 p-6">
            <h2 class="text-2xl font-semibold mb-4 text-center">Effective Rent</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center p-4 bg-white rounded-lg">
                <div class="text-sm text-color-[#575858] mb-2">Equivalent Down Payment Ratio</div>
                <div class="text-3xl font-bold text-green-700">{{ formatDecimal(equivalentDownPaymentRatio, 1) }}%</div>
                <div class="text-xs text-color-[#575858] mt-2">{{ formatCurrency(downPayment) }} ÷ {{ formatCurrency(totalOwnershipCost) }}</div>
              </div>
              <div class="text-center p-4 bg-white rounded-lg">
                <div class="text-sm text-color-[#575858] mb-2">Per GPU Hour</div>
                <div class="text-3xl font-bold text-green-700">${{ formatDecimal(effectiveRentPerHour, 2) }}</div>
                <div class="text-xs text-color-[#575858] mt-2">Effective rental rate</div>
              </div>
              <div class="text-center p-4 bg-white rounded-lg">
                <div class="text-sm text-color-[#575858] mb-2">Per GPU Month</div>
                <div class="text-3xl font-bold text-green-700">{{ formatCurrency(effectiveRentPerHour * 730) }}</div>
                <div class="text-xs text-color-[#575858] mt-2">Assuming 730 hours/month</div>
              </div>
            </div>
          </div>

          <!-- Cash Flow Table - Compact with Expand -->
          <div class="rounded-xl border border-[#d8d8d8] bg-white p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-2xl font-semibold">Cash Flow by Year</h2>
              <button @click="expandedCashFlow = !expandedCashFlow"
                class="px-4 py-2 text-sm font-medium text-[#0b63f6] border border-[#0b63f6] rounded hover:bg-blue-50">
                {{ expandedCashFlow ? 'Collapse' : 'Expand Details' }}
              </button>
            </div>

            <!-- Compact View -->
            <div v-if="!expandedCashFlow" class="overflow-x-auto">
              <div class="flex gap-2 pb-2">
                <div class="flex-shrink-0 w-32 font-medium text-sm">Year</div>
                <div v-for="year in cashFlowTable" :key="year.year"
                  class="flex-shrink-0 w-24 text-center text-sm">
                  <div class="font-medium">{{ year.year === 0 ? 'Down' : year.year }}</div>
                </div>
                <div class="flex-shrink-0 w-24 text-center text-sm font-bold">Total</div>
              </div>
              <div class="flex gap-2 border-t pt-2 pb-1">
                <div class="flex-shrink-0 w-32 text-sm text-color-[#575858]">Cash Flow</div>
                <div v-for="year in cashFlowTable" :key="year.year"
                  class="flex-shrink-0 w-24 text-center text-sm font-medium">
                  {{ formatCurrency(year.total) }}
                </div>
                <div class="flex-shrink-0 w-24 text-center text-sm font-bold">
                  {{ formatCurrency(totalOwnershipCost) }}
                </div>
              </div>
              <div class="flex gap-2 pb-2">
                <div class="flex-shrink-0 w-32 text-xs text-color-[#575858]">$/GPU/h</div>
                <div v-for="year in cashFlowTable" :key="year.year"
                  class="flex-shrink-0 w-24 text-center text-xs text-color-[#575858]">
                  ${{ formatDecimal(year.total / (8760 * numCards), 2) }}
                </div>
                <div class="flex-shrink-0 w-24 text-center text-xs text-color-[#575858]">
                  ${{ formatDecimal(effectiveRentPerHour, 2) }}
                </div>
              </div>
            </div>

            <!-- Expanded View -->
            <div v-else class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-[#f4f6f8] text-[#222]">
                  <tr>
                    <th class="px-4 py-3 text-left">Year</th>
                    <th class="px-4 py-3 text-right">Financing</th>
                    <th class="px-4 py-3 text-right">Electric</th>
                    <th class="px-4 py-3 text-right">Fixed Costs</th>
                    <th class="px-4 py-3 text-right">Maintenance</th>
                    <th class="px-4 py-3 text-right">Residual</th>
                    <th class="px-4 py-3 text-right font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="year in cashFlowTable" :key="year.year" class="border-t border-[#ececec]">
                    <td class="px-4 py-3 font-medium">{{ year.year === 0 ? 'Year 0 (Down)' : `Year ${year.year}` }}</td>
                    <td class="px-4 py-3 text-right">{{ formatCurrency(year.financing) }}</td>
                    <td class="px-4 py-3 text-right">{{ formatCurrency(year.electric) }}</td>
                    <td class="px-4 py-3 text-right">{{ formatCurrency(year.fixed) }}</td>
                    <td class="px-4 py-3 text-right">{{ formatCurrency(year.maintenance) }}</td>
                    <td class="px-4 py-3 text-right" :class="year.residual < 0 ? 'text-green-600' : ''">{{ year.residual !== 0 ? formatCurrency(year.residual) : '-' }}</td>
                    <td class="px-4 py-3 text-right font-bold">{{ formatCurrency(year.total) }}</td>
                  </tr>
                  <tr class="border-t-2 border-black bg-[#f4f6f8]">
                    <td class="px-4 py-3 font-bold">Total</td>
                    <td class="px-4 py-3 text-right font-bold">{{ formatCurrency(totalFinancingCost) }}</td>
                    <td class="px-4 py-3 text-right font-bold">{{ formatCurrency(totalElectricCost) }}</td>
                    <td class="px-4 py-3 text-right font-bold">{{ formatCurrency(totalFixedCost) }}</td>
                    <td class="px-4 py-3 text-right font-bold">{{ formatCurrency(totalMaintenanceCost) }}</td>
                    <td class="px-4 py-3 text-right font-bold text-green-600">{{ formatCurrency(-residualValue) }}</td>
                    <td class="px-4 py-3 text-right font-bold">{{ formatCurrency(totalOwnershipCost) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- CTA Section -->
          <div class="mt-20 mb-8">
            <div class="w-full flex flex-col justify-between p-10 gap-6 rounded-xl bg-white/40 text-center">
              <div class="gap-5">
                <h2 class="text-3xl font-bold mb-3">Need Help Choosing the Right GPU Infrastructure?</h2>
                <p class="text-lg text-color-[#575858]">
                  Our team can help you design a solution that fits your workload and budget. Book a free consultation to discuss your requirements.
                </p>
              </div>
              <div>
                <a class="cta primary" href="https://calendly.com/velda-io/30min" target="_blank" rel="noopener">
                  Book a Consultation
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom spacing -->
        <div class="pb-12"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Node type presets - ordered by latest first with updated specs
const nodeTypes = {
  b300: { name: 'B300', price: 720000, watts: 15000 },
  b200: { name: 'B200', price: 550000, watts: 14300 },
  h200: { name: 'H200', price: 450000, watts: 10200 },
  h100: { name: 'H100 SXM', price: 350000, watts: 10200 },
};

// Generate valid GPU counts: powers of 2 and 36 * powers of 2
const validGpuCounts = computed(() => {
  const counts = new Set();
  // Powers of 2: 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192
  for (let i = 3; i <= 13; i++) {
    counts.add(Math.pow(2, i));
  }
  // 36 * powers of 2: 36, 72, 144, 288, 576, 1152, 2304, 4608
  for (let i = 0; i <= 7; i++) {
    const val = 36 * Math.pow(2, i);
    if (val <= 8192) counts.add(val);
  }
  return Array.from(counts).sort((a, b) => a - b);
});

// Input parameters
const selectedNodeType = ref('b300');
const unitPrice = ref(720000);
const gpuCountIndex = ref(4); // Default to 128 GPUs
const enableFinancing = ref(false);
const downPaymentPct = ref(50);
const financePeriod = ref(3);
const debtInterestRate = ref(10.0);
const usefulLife = ref(5);
const electricRatePerKwMonth = ref(300);
const wattsPerNode = ref(15000);
const fixedCostPerMonth = ref(5000);
const maintenanceCostPerGpuHour = ref(0.5);
const residualValuePct = ref(0.0);
const expandedCashFlow = ref(false);

const numCards = computed(() => validGpuCounts.value[gpuCountIndex.value] || 128);

const selectNodeType = (type) => {
  selectedNodeType.value = type;
  if (type !== 'custom' && nodeTypes[type]) {
    unitPrice.value = nodeTypes[type].price;
    wattsPerNode.value = nodeTypes[type].watts;
  }
};

// Derived calculations
const numNodes = computed(() => numCards.value / 8);
const totalCapex = computed(() => unitPrice.value * numNodes.value);
const totalWatts = computed(() => wattsPerNode.value * numNodes.value);
const downPayment = computed(() => {
  if (!enableFinancing.value) {
    return totalCapex.value;
  }
  return totalCapex.value * (downPaymentPct.value / 100);
});
const financedAmount = computed(() => totalCapex.value - downPayment.value);
const residualValue = computed(() => totalCapex.value * (residualValuePct.value / 100));

const monthlyPayment = computed(() => {
  if (!enableFinancing.value) return 0;
  if (financedAmount.value === 0) return 0;
  const r = debtInterestRate.value / 100 / 12;
  const n = financePeriod.value * 12;
  if (r === 0) return financedAmount.value / n;
  return financedAmount.value * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
});

const totalFinancingCost = computed(() => {
  if (!enableFinancing.value) {
    return downPayment.value;
  }
  return downPayment.value + (monthlyPayment.value * 12 * financePeriod.value);
});

// Annual operating costs
const annualElectricCost = computed(() => {
  return (wattsPerNode.value / 1000) * numNodes.value * electricRatePerKwMonth.value * 12;
});

const annualFixedCost = computed(() => {
  return fixedCostPerMonth.value * 12;
});

const annualMaintenanceCost = computed(() => {
  return maintenanceCostPerGpuHour.value * numCards.value * 8760;
});

const annualOpex = computed(() => {
  return annualElectricCost.value + annualFixedCost.value + annualMaintenanceCost.value;
});

// Totals
const totalElectricCost = computed(() => annualElectricCost.value * usefulLife.value);
const totalFixedCost = computed(() => annualFixedCost.value * usefulLife.value);
const totalMaintenanceCost = computed(() => annualMaintenanceCost.value * usefulLife.value);

// Total cost of ownership
const totalOwnershipCost = computed(() => {
  return totalFinancingCost.value + totalElectricCost.value + totalFixedCost.value + totalMaintenanceCost.value - residualValue.value;
});

// Effective cost per hour per GPU
const totalGpuHours = computed(() => 8760 * usefulLife.value * numCards.value);
const effectiveRentPerHour = computed(() => {
  return totalOwnershipCost.value / totalGpuHours.value;
});

// Equivalent down payment ratio
const equivalentDownPaymentRatio = computed(() => {
  return (downPayment.value / totalOwnershipCost.value) * 100;
});

// Cash flow table
const cashFlowTable = computed(() => {
  const table = [];

  table.push({
    year: 0,
    financing: downPayment.value,
    electric: 0,
    fixed: 0,
    maintenance: 0,
    residual: 0,
    total: downPayment.value,
  });

  for (let year = 1; year <= usefulLife.value; year++) {
    const financing = (enableFinancing.value && year <= financePeriod.value) ? monthlyPayment.value * 12 : 0;
    const electric = annualElectricCost.value;
    const fixed = annualFixedCost.value;
    const maintenance = annualMaintenanceCost.value;
    const residual = year === usefulLife.value ? -residualValue.value : 0;

    table.push({
      year,
      financing,
      electric,
      fixed,
      maintenance,
      residual,
      total: financing + electric + fixed + maintenance + residual,
    });
  }

  return table;
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDecimal = (value, decimals = 2) => {
  return value.toFixed(decimals);
};
</script>

<style scoped>
.price-estimator {
  position: relative;
}

.bg-gradient {
  pointer-events: none;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 100vw;
  height: 420px;
  background-image: url('/bg-blog.svg');
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  z-index: -10;
}

.node-type-box {
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.node-type-box:hover {
  border-color: #0b63f6;
  background: #f0f7ff;
}

.node-type-box.selected {
  border-color: #0b63f6;
  background: #e6f2ff;
  box-shadow: 0 0 0 3px rgba(11, 99, 246, 0.1);
}

.slider-container {
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.slider {
  width: 100%;
  height: 6px;
  background: linear-gradient(to right, #e5e7eb 0%, #e5e7eb 100%);
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: #0b63f6;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #0b63f6;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

input[type="number"],
select {
  outline: none;
  transition: border-color 0.2s;
}

input[type="number"]:focus,
select:focus {
  border-color: #0b63f6;
}

table {
  border-collapse: collapse;
}

.cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px 40px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  min-width: 160px;
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.cta.primary {
  background: #111111;
  color: white;
  box-shadow: 0 6px 18px rgba(17, 17, 17, 0.15);
}

.cta.primary:hover {
  opacity: 0.98;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .cta {
    width: 70%;
    min-width: unset;
  }
}
</style>
