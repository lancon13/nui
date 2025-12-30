import type { Meta, StoryObj } from '@storybook/vue3-vite'
import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { ref, watch } from 'vue'
import NCalendar from './NCalendar.vue'
import NIcon from './NIcon.vue'

dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)

const meta = {
    title: 'UI/NCalendar',
    component: NCalendar,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        viewingYear: { control: 'number' },
        viewingWeek: { control: 'number' },
        firstDayOfWeek: { 
            control: 'select', 
            options: [0, 1, 2, 3, 4, 5, 6],
            labels: {
                0: 'Sunday',
                1: 'Monday',
                2: 'Tuesday',
                3: 'Wednesday',
                4: 'Thursday',
                5: 'Friday',
                6: 'Saturday'
            }
        },
        rows: { control: 'number' },
        modelValue: { control: 'object' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        rows: 6,
        firstDayOfWeek: 1
    },
    render: (args) => ({
        components: { NCalendar },
        setup() {
            const model = ref([])
            const viewingYear = ref(2025)
            const viewingWeek = ref(1)
            const activeMonth = ref<number | null | undefined>(0)

            const months = [
                { label: 'Jan', value: 0 }, { label: 'Feb', value: 1 }, { label: 'Mar', value: 2 },
                { label: 'Apr', value: 3 }, { label: 'May', value: 4 }, { label: 'Jun', value: 5 },
                { label: 'Jul', value: 6 }, { label: 'Aug', value: 7 }, { label: 'Sep', value: 8 },
                { label: 'Oct', value: 9 }, { label: 'Nov', value: 10 }, { label: 'Dec', value: 11 },
                { label: 'All Active (undefined)', value: undefined },
                { label: 'None Active (null)', value: null }
            ]
            const years = [2023, 2024, 2025, 2026]

            const nextWeek = () => {
                const weeksInYear = dayjs(`${viewingYear.value}-01-01`).isoWeeksInYear()
                if (viewingWeek.value >= weeksInYear) {
                    viewingYear.value++
                    viewingWeek.value = 1
                } else {
                    viewingWeek.value++
                }
            }

            const prevWeek = () => {
                if (viewingWeek.value <= 1) {
                    viewingYear.value--
                    viewingWeek.value = dayjs(`${viewingYear.value}-01-01`).isoWeeksInYear()
                } else {
                    viewingWeek.value--
                }
            }

            return { args, model, viewingYear, viewingWeek, activeMonth, months, years, nextWeek, prevWeek }
        },
        template: `
            <div class="w-[350px] border border-border p-4 rounded bg-background shadow-outer">
                <div class="flex flex-col gap-4 mb-4">
                    <div class="flex items-center justify-between gap-2">
                        <select v-model="activeMonth" class="text-xs p-1 border rounded bg-background grow">
                            <option v-for="m in months" :key="String(m.value)" :value="m.value">{{ m.label }}</option>
                        </select>
                        <select v-model="viewingYear" class="text-xs p-1 border rounded bg-background">
                            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                        </select>
                        
                        <div class="flex gap-1 shrink-0">
                            <button @click="prevWeek" class="text-xs px-2 py-1 border border-border rounded hover:bg-surface-indent">W-</button>
                            <span class="text-xs self-center px-1 font-mono">W{{ viewingWeek }}</span>
                            <button @click="nextWeek" class="text-xs px-2 py-1 border border-border rounded hover:bg-surface-indent">W+</button>
                        </div>
                    </div>
                </div>

                <NCalendar 
                    v-bind="args" 
                    v-model="model" 
                    v-model:viewingWeek="viewingWeek"
                    v-model:viewingYear="viewingYear"
                    :activeMonth="activeMonth"
                />
                
                <div class="mt-4 flex flex-col gap-1 text-xs text-text-light border-t border-border pt-2">
                    <div class="flex justify-between">
                        <span>Active Month:</span>
                        <span class="font-bold">{{ activeMonth === null ? 'None' : (activeMonth === undefined ? 'All' : activeMonth) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Selected Items:</span>
                        <span class="font-bold">{{ Array.isArray(model) ? model.length : (model ? 1 : 0) }}</span>
                    </div>
                </div>
            </div>
        `
    })
}

export const SelectionModes: Story = {
    render: args => ({
        components: { NCalendar },
        setup() {
            const single = ref('2025-01-01')
            const multiple = ref(['2025-01-01', '2025-01-03'])
            const rangeModel = ref({ begin: '2025-01-05', end: '2025-01-10' })
            const multiRange = ref([
                { begin: '2025-01-15', end: '2025-01-18' },
                { begin: '2025-01-22', end: '2025-01-25' }
            ])
            
            return { args, single, multiple, rangeModel, multiRange }
        },
        template: `
            <div class="flex flex-wrap gap-8 p-4 justify-center bg-surface-indent rounded">
                <div class="w-80 flex flex-col gap-2">
                    <span class="text-sm font-bold">1. Single Toggle/Replace</span>
                    <p class="text-[10px] text-text-light">Click to select, click same to unselect, click other to replace.</p>
                    <div class="p-2 bg-background rounded border border-border shadow-outer">
                        <NCalendar v-model="single" :viewingYear="2025" :viewingWeek="1" />
                    </div>
                    <code class="text-[10px] break-all">Value: {{ single || 'null' }}</code>
                </div>

                <div class="w-80 flex flex-col gap-2">
                    <span class="text-sm font-bold">2. Multiple Dates</span>
                    <p class="text-[10px] text-text-light">Click to add/remove multiple individual dates.</p>
                    <div class="p-2 bg-background rounded border border-border shadow-outer">
                        <NCalendar v-model="multiple" multiple :viewingYear="2025" :viewingWeek="1" />
                    </div>
                    <code class="text-[10px] break-all">Value: {{ multiple }}</code>
                </div>

                <div class="w-80 flex flex-col gap-2">
                    <span class="text-sm font-bold">3. Single Range (2-Click)</span>
                    <p class="text-[10px] text-text-light">Click 1: Start, Click 2: End. Double-click same to unselect.</p>
                    <div class="p-2 bg-background rounded border border-border shadow-outer">
                        <NCalendar v-model="rangeModel" range :viewingYear="2025" :viewingWeek="1" />
                    </div>
                    <code class="text-[10px] break-all">Value: {{ rangeModel || 'null' }}</code>
                </div>

                <div class="w-80 flex flex-col gap-2">
                    <span class="text-sm font-bold">4. Multiple Ranges</span>
                    <p class="text-[10px] text-text-light">Build multiple ranges by repeating the 2-click process.</p>
                    <div class="p-2 bg-background rounded border border-border shadow-outer">
                        <NCalendar v-model="multiRange" multiple range :viewingYear="2025" :viewingWeek="1" />
                    </div>
                    <code class="text-[10px] break-all">Value: {{ multiRange }}</code>
                </div>
            </div>
        `
    })
}

export const DisabledDates: Story = {
    render: args => ({
        components: { NCalendar },
        setup() {
            const model = ref([])
            const viewingYear = ref(2025)
            const viewingWeek = ref(1)
            const activeMonth = ref(0)
            
            const months = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
            const years = [2024, 2025, 2026]

            const disabledList = [
                '2025-01-02', 
                '2025-01-05',
                { begin: '2025-01-10', end: '2025-01-15' },
                { end: '2024-12-31' }
            ]

            watch([viewingYear, activeMonth], ([newYear, newMonth]) => {
                const targetDate = dayjs(`${newYear}-01-01`).month(newMonth).startOf('month')
                viewingWeek.value = targetDate.isoWeek()
            })
            
            return { args, model, disabledList, viewingYear, viewingWeek, activeMonth, months, years }
        },
        template: `
            <div class="w-[350px] border border-border p-4 rounded bg-background shadow-outer">
                <div class="flex gap-2 mb-4">
                    <select v-model="activeMonth" class="text-xs p-1 border rounded bg-background grow">
                        <option v-for="(m, i) in months" :key="i" :value="i">{{ m }}</option>
                    </select>
                    <select v-model="viewingYear" class="text-xs p-1 border rounded bg-background">
                        <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                    </select>
                </div>
                <NCalendar 
                    v-model="model" 
                    :disabled="disabledList"
                    v-model:viewingWeek="viewingWeek"
                    :viewingYear="viewingYear"
                    :activeMonth="activeMonth"
                    multiple
                />
                <div class="mt-4 text-[10px] break-all">
                    Selected: {{ model }}
                </div>
            </div>
        `
    })
}

export const RangeWithDisabled: Story = {
    render: args => ({
        components: { NCalendar },
        setup() {
            const model = ref(null)
            const viewingYear = ref(2025)
            const viewingWeek = ref(1)
            const activeMonth = ref(0)
            
            const months = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
            const years = [2024, 2025, 2026]

            const disabledList = [
                { begin: '2025-01-10', end: '2025-01-15' }, // Blocked range
                '2025-01-20' // Blocked single date
            ]

            watch([viewingYear, activeMonth], ([newYear, newMonth]) => {
                const targetDate = dayjs(`${newYear}-01-01`).month(newMonth).startOf('month')
                viewingWeek.value = targetDate.isoWeek()
            })
            
            return { args, model, disabledList, viewingYear, viewingWeek, activeMonth, months, years }
        },
        template: `
            <div class="w-[350px] border border-border p-4 rounded bg-background shadow-outer">
                <h3 class="mb-2 font-bold text-sm">Range + Disabled</h3>
                <p class="text-[10px] text-text-light mb-4">
                    Disabled: Jan 10-15 and Jan 20.<br/>
                    <b>Rule:</b> You cannot complete a range if it contains any disabled dates.
                </p>
                <div class="flex gap-2 mb-4">
                    <select v-model="activeMonth" class="text-xs p-1 border rounded bg-background grow">
                        <option v-for="(m, i) in months" :key="i" :value="i">{{ m }}</option>
                    </select>
                    <select v-model="viewingYear" class="text-xs p-1 border rounded bg-background">
                        <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
                    </select>
                </div>
                <NCalendar 
                    v-model="model" 
                    :disabled="disabledList"
                    v-model:viewingWeek="viewingWeek"
                    :viewingYear="viewingYear"
                    :activeMonth="activeMonth"
                    range
                />
                <div class="mt-4 text-[10px] break-all">
                    Selected: {{ model || 'null' }}
                </div>
            </div>
        `
    })
}

export const CustomSlots: Story = {
    args: {
        viewingYear: 2025,
        viewingWeek: 1,
        firstDayOfWeek: 1
    },
    render: args => ({
        components: { NCalendar, NIcon },
        setup() {
            const model = ref([])
            const weekDayClass = [
                'text-error', // Sun
                'text-brand', // Mon
                '',
                '',
                '',
                '',
                'text-warning' // Sat
            ]
            return { args, model, weekDayClass }
        },
        template: `
            <div class="w-[400px] border border-border p-4 rounded bg-background shadow-outer">
                <NCalendar 
                    v-bind="args" 
                    v-model="model"
                    :weekDayClass="weekDayClass"
                >
                    <!-- Custom individual header -->
                    <template #header-1="{ day }">
                        <div class="flex flex-col items-center">
                            <span class="text-[10px] opacity-50">START</span>
                            <span>{{ day }}</span>
                        </div>
                    </template>

                    <!-- Custom cell content -->
                    <template #cell="{ day }">
                        <div class="flex flex-col items-center justify-center w-full h-full relative">
                            <span :class="{ 'font-black underline': day.isToday }">{{ day.dayOfMonth }}</span>
                            <div v-if="day.dayOfMonth === 15" class="absolute top-0 right-0">
                                <NIcon name="mdi-star" class="text-warning text-[10px]" />
                            </div>
                            <div v-if="day.isSelected" class="absolute bottom-0 text-[8px] leading-none">SEL</div>
                        </div>
                    </template>
                </NCalendar>
            </div>
        `
    })
}