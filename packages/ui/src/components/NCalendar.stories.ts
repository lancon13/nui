import type { Meta, StoryObj } from '@storybook/vue3-vite'
import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { ref, watch } from 'vue'
import NCalendar from './NCalendar.vue'

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
        firstDayOfWeek: { control: { type: 'select', options: [0, 1, 2, 3, 4, 5, 6] } },
        rows: { control: 'number' },
        modelValue: { control: 'object' }
    }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: args => ({
        components: { NCalendar },
        setup() {
            const value = ref([])
            const viewingYear = ref(dayjs().year())
            const viewingWeek = ref(dayjs().week())
            const activeMonth = ref(dayjs().month())
            
            const months = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
            const years = [2023, 2024, 2025, 2026]
            const isSyncing = ref(false)

            // Logic: Navigation Synchronization
            
            // 1. When Month/Year changed via dropdown -> Jump to that week
            watch([viewingYear, activeMonth], ([newYear, newMonth]) => {
                if (isSyncing.value) return

                const targetDate = dayjs(`${newYear}-01-01`).month(newMonth).startOf('month')
                const targetWeek = targetDate.isoWeek()
                
                if (viewingWeek.value !== targetWeek) {
                    isSyncing.value = true
                    viewingWeek.value = targetWeek
                    // Reset flag after reactivity cycle
                    setTimeout(() => { isSyncing.value = false }, 0)
                }
            })

            // 2. When Week changed via buttons -> Update the active month
            watch(viewingWeek, (newWeek) => {
                if (isSyncing.value) return

                // Standard sync logic...
                const targetDate = dayjs(`${viewingYear.value}-01-01`).isoWeek(newWeek).startOf('isoWeek').add(3, 'day')
                const targetMonth = targetDate.month()
                const targetYear = targetDate.year()
                
                let changed = false
                if (activeMonth.value !== targetMonth) {
                    activeMonth.value = targetMonth
                    changed = true
                }
                
                // Note: The logic below handles implicit year drift from dayjs calc, 
                // but explicit wrapping handles the button clicks.
                if (viewingYear.value !== targetYear && years.includes(targetYear)) {
                    viewingYear.value = targetYear
                    changed = true
                }

                if (changed) {
                    isSyncing.value = true
                    setTimeout(() => { isSyncing.value = false }, 0)
                }
            })

            const nextWeek = () => {
                // Determine max weeks in current viewing year
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

            return { args, value, viewingYear, viewingWeek, activeMonth, months, years, nextWeek, prevWeek }
        },
        template: `
            <div class="w-[350px] border border-border p-4 rounded bg-background shadow-outer">
                <div class="flex flex-col gap-4 mb-4">
                    <div class="flex items-center justify-between gap-2">
                         <select v-model="activeMonth" class="text-xs p-1 border rounded bg-background grow">
                            <option v-for="(m, i) in months" :key="i" :value="i">{{ m }}</option>
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
                    v-model="value" 
                    v-model:viewingWeek="viewingWeek"
                    v-model:activeMonth="activeMonth"
                    :viewingYear="viewingYear" 
                />
                
                <div class="mt-4 flex flex-col gap-1 text-xs text-text-light border-t border-border pt-2">
                    <div class="flex justify-between">
                        <span>Active Month:</span>
                        <span class="font-bold">{{ months[activeMonth] }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Selected:</span>
                        <span class="font-bold">{{ value.length }} dates</span>
                    </div>
                </div>
            </div>
        `
    })
}

export const SpecificAnchor: Story = {
    args: {
        viewingYear: 2025,
        viewingWeek: 1,
        firstDayOfWeek: 1 // Monday
    },
    render: args => ({
        components: { NCalendar },
        setup() {
            const value = ref([])
            return { args, value }
        },
        template: `
            <div class="w-[350px] border border-border p-4 rounded bg-background shadow-outer">
                <h3 class="mb-2 font-bold">Week 1, 2025 (Start Mon)</h3>
                <p class="text-xs mb-4 text-text-light">Should start Dec 30 (Mon)</p>
                <NCalendar 
                    v-bind="args" 
                    v-model="value" 
                />
            </div>
        `
    })
}

export const SelectionDemo: Story = {
    args: {
        rows: 6
    },
    render: args => ({
        components: { NCalendar },
        setup() {
            const value = ref([])
            return { args, value }
        },
        template: `
            <div class="w-[350px] border border-border p-4 rounded bg-background shadow-outer">
                <h3 class="mb-2 font-bold">Interaction</h3>
                <ul class="text-xs list-disc pl-4 mb-4 text-text-light">
                    <li>Click: Single Select (Replace)</li>
                    <li>Ctrl/Cmd + Click: Toggle Selection</li>
                    <li>Shift + Click: Range Select</li>
                </ul>
                <NCalendar 
                    v-bind="args" 
                    v-model="value" 
                />
                <div class="mt-2 text-xs break-all text-text-light">
                    {{ value }}
                </div>
            </div>
        `
    })
}
