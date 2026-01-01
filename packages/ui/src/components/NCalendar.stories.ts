import type { Meta, StoryObj } from '@storybook/vue3-vite'
import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { computed, ref, watch } from 'vue'
import { getYearWeekFromMonth } from '../helpers'
import NButton from './NButton.vue'
import NCalendar from './NCalendar.vue'
import NCard from './NCard.vue'
import NCheckbox from './NCheckbox.vue'
import NIcon from './NIcon.vue'
import NInputSelect from './NInputSelect.vue'

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
    render: args => ({
        components: { NCalendar, NButton, NInputSelect, NCard },
        setup() {
            const calendarRef = ref<any>(null)
            const model = ref([])
            const viewingYear = ref(2025)
            const viewingWeek = ref(1)
            const activeMonth = ref<number | null | undefined>(0)

            const months = [
                { label: 'Jan', value: '0' },
                { label: 'Feb', value: '1' },
                { label: 'Mar', value: '2' },
                { label: 'Apr', value: '3' },
                { label: 'May', value: '4' },
                { label: 'Jun', value: '5' },
                { label: 'Jul', value: '6' },
                { label: 'Aug', value: '7' },
                { label: 'Sep', value: '8' },
                { label: 'Oct', value: '9' },
                { label: 'Nov', value: '10' },
                { label: 'Dec', value: '11' },
                { label: 'All Active (undefined)', value: 'undefined' },
                { label: 'None Active (null)', value: 'null' }
            ]
            const years = [2023, 2024, 2025, 2026]
            const yearOptions = computed(() => years.map(y => ({ label: String(y), value: String(y) })))

            const viewingYearStr = computed({
                get: () => String(viewingYear.value),
                set: val => (viewingYear.value = Number(val))
            })

            const activeMonthStr = computed({
                get: () => String(activeMonth.value),
                set: val => {
                    if (val === 'undefined') activeMonth.value = undefined
                    else if (val === 'null') activeMonth.value = null
                    else activeMonth.value = Number(val)
                }
            })

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

            const navigateMonth = (delta: number) => {
                const current = dayjs(`${viewingYear.value}-01-01`)
                    .isoWeek(viewingWeek.value)
                    .startOf('isoWeek')
                    .add(14, 'day')
                const target = current.add(delta, 'month')
                calendarRef.value?.setMonth(target.month(), target.year())
            }

            // Sync navigation when activeMonth changes (if it's a specific month)
            watch(activeMonth, newVal => {
                if (typeof newVal === 'number') {
                    calendarRef.value?.setMonth(newVal)
                }
            })

            return {
                args,
                dayjs,
                calendarRef,
                model,
                viewingYear,
                viewingWeek,
                activeMonth,
                months,
                yearOptions,
                viewingYearStr,
                activeMonthStr,
                nextWeek,
                prevWeek,
                navigateMonth
            }
        },
        template: `
            <NCard class="w-[450px]">
                <div class="n-card-body">
                    <div class="flex flex-col gap-4 mb-4">
                        <div class="flex items-center justify-between gap-2">
                            <NInputSelect v-model="activeMonthStr" :options="months" class="grow" />
                            <NInputSelect v-model="viewingYearStr" :options="yearOptions" class="w-24" />
                            
                            <div class="flex gap-1 shrink-0 items-center">
                                <NButton @click="navigateMonth(-1)" class="outlined px-2" size="sm" label="M-" />
                                <NButton @click="prevWeek" class="outlined px-2" size="sm" label="W-" />
                                <span class="text-xs self-center px-1 font-mono">W{{ viewingWeek }}</span>
                                <NButton @click="nextWeek" class="outlined px-2" size="sm" label="W+" />
                                <NButton @click="navigateMonth(1)" class="outlined px-2" size="sm" label="M+" />
                            </div>
                        </div>
                    </div>

                    <NCalendar 
                        ref="calendarRef"
                        v-bind="args" 
                        v-model="model" 
                        v-model:viewingWeek="viewingWeek"
                        v-model:viewingYear="viewingYear"
                        :activeMonth="activeMonth"
                    >
                        <template #calendar-header="{ startDate }">
                            <div class="font-bold mb-2">
                                {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                            </div>
                        </template>
                    </NCalendar>
                    
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
            </NCard>
        `
    })
}

export const SelectionModes: Story = {
    render: args => ({
        components: { NCalendar, NCard },
        setup() {
            const single = ref('2025-01-01')
            const multiple = ref(['2025-01-01', '2025-01-03'])
            const rangeModel = ref({ begin: '2025-01-05', end: '2025-01-10' })
            const multiRange = ref([
                { begin: '2025-01-15', end: '2025-01-18' },
                { begin: '2025-01-22', end: '2025-01-25' }
            ])

            const v1 = ref({ y: 2025, w: 1 })
            const v2 = ref({ y: 2025, w: 1 })
            const v3 = ref({ y: 2025, w: 1 })
            const v4 = ref({ y: 2025, w: 1 })

            return { args, dayjs, single, multiple, rangeModel, multiRange, v1, v2, v3, v4 }
        },
        template: `
            <div class="flex flex-wrap gap-8 p-4 justify-center bg-surface-indent rounded">
                <div class="w-80 flex flex-col gap-2">
                    <span class="text-sm font-bold">1. Single Toggle/Replace</span>
                    <p class="text-[10px] text-text-light">Click to select, click same to unselect, click other to replace.</p>
                    <NCard>
                        <div class="n-card-body">
                            <NCalendar v-model="single" v-model:viewingYear="v1.y" v-model:viewingWeek="v1.w">
                                <template #calendar-header="{ startDate }">
                                    <div class="font-bold mb-2 text-xs">
                                        {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                                    </div>
                                </template>
                            </NCalendar>
                        </div>
                    </NCard>
                    <code class="text-[10px] break-all">Value: {{ single || 'null' }}</code>
                </div>

                <div class="w-80 flex flex-col gap-2">
                    <span class="text-sm font-bold">2. Multiple Dates</span>
                    <p class="text-[10px] text-text-light">Click to add/remove multiple individual dates.</p>
                    <NCard>
                        <div class="n-card-body">
                            <NCalendar v-model="multiple" multiple v-model:viewingYear="v2.y" v-model:viewingWeek="v2.w">
                                <template #calendar-header="{ startDate }">
                                    <div class="font-bold mb-2 text-xs">
                                        {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                                    </div>
                                </template>
                            </NCalendar>
                        </div>
                    </NCard>
                    <code class="text-[10px] break-all">Value: {{ multiple }}</code>
                </div>

                <div class="w-80 flex flex-col gap-2">
                    <span class="text-sm font-bold">3. Single Range (2-Click)</span>
                    <p class="text-[10px] text-text-light">Click 1: Start, Click 2: End. Double-click same to unselect.</p>
                    <NCard>
                        <div class="n-card-body">
                            <NCalendar v-model="rangeModel" range v-model:viewingYear="v3.y" v-model:viewingWeek="v3.w">
                                <template #calendar-header="{ startDate }">
                                    <div class="font-bold mb-2 text-xs">
                                        {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                                    </div>
                                </template>
                            </NCalendar>
                        </div>
                    </NCard>
                    <code class="text-[10px] break-all">Value: {{ rangeModel || 'null' }}</code>
                </div>

                <div class="w-80 flex flex-col gap-2">
                    <span class="text-sm font-bold">4. Multiple Ranges</span>
                    <p class="text-[10px] text-text-light">Build multiple ranges by repeating the 2-click process.</p>
                    <NCard>
                        <div class="n-card-body">
                            <NCalendar v-model="multiRange" multiple range v-model:viewingYear="v4.y" v-model:viewingWeek="v4.w">
                                <template #calendar-header="{ startDate }">
                                    <div class="font-bold mb-2 text-xs">
                                        {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                                    </div>
                                </template>
                            </NCalendar>
                        </div>
                    </NCard>
                    <code class="text-[10px] break-all">Value: {{ multiRange }}</code>
                </div>
            </div>
        `
    })
}

export const DisabledDates: Story = {
    render: args => ({
        components: { NCalendar, NInputSelect, NCard },
        setup() {
            const calendarRef = ref<any>(null)
            const model = ref([])
            const viewingYear = ref(2025)
            const viewingWeek = ref(1)
            const activeMonth = ref(0)

            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const monthOptions = computed(() => months.map((m, i) => ({ label: m, value: String(i) })))

            const years = [2024, 2025, 2026]
            const yearOptions = computed(() => years.map(y => ({ label: String(y), value: String(y) })))

            const viewingYearStr = computed({
                get: () => String(viewingYear.value),
                set: val => (viewingYear.value = Number(val))
            })

            const activeMonthStr = computed({
                get: () => String(activeMonth.value),
                set: val => (activeMonth.value = Number(val))
            })

            const disabledList = [
                '2025-01-02',
                '2025-01-05',
                { begin: '2025-01-10', end: '2025-01-15' },
                { end: '2024-12-31' }
            ]

            watch([viewingYear, activeMonth], ([newYear, newMonth]) => {
                calendarRef.value?.setMonth(newMonth, newYear)
            })

            return {
                args,
                dayjs,
                calendarRef,
                model,
                disabledList,
                viewingYear,
                viewingWeek,
                activeMonth,
                monthOptions,
                yearOptions,
                viewingYearStr,
                activeMonthStr
            }
        },
        template: `
            <NCard class="w-[350px]">
                <div class="n-card-body">
                    <div class="flex gap-2 mb-4">
                        <NInputSelect v-model="activeMonthStr" :options="monthOptions" class="grow" />
                        <NInputSelect v-model="viewingYearStr" :options="yearOptions" class="w-24" />
                    </div>
                    <NCalendar 
                        ref="calendarRef"
                        v-model="model" 
                        :disabled="disabledList"
                        v-model:viewingWeek="viewingWeek"
                        :viewingYear="viewingYear"
                        :activeMonth="activeMonth"
                        multiple
                    >
                        <template #calendar-header="{ startDate }">
                            <div class="font-bold mb-2">
                                {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                            </div>
                        </template>
                    </NCalendar>
                    <div class="mt-4 text-[10px] break-all">
                        Selected: {{ model }}
                    </div>
                </div>
            </NCard>
        `
    })
}

export const RangeWithDisabled: Story = {
    render: args => ({
        components: { NCalendar, NInputSelect, NCard },
        setup() {
            const calendarRef = ref<any>(null)
            const model = ref(null)
            const viewingYear = ref(2025)
            const viewingWeek = ref(1)
            const activeMonth = ref(0)

            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const monthOptions = computed(() => months.map((m, i) => ({ label: m, value: String(i) })))

            const years = [2024, 2025, 2026]
            const yearOptions = computed(() => years.map(y => ({ label: String(y), value: String(y) })))

            const viewingYearStr = computed({
                get: () => String(viewingYear.value),
                set: val => (viewingYear.value = Number(val))
            })

            const activeMonthStr = computed({
                get: () => String(activeMonth.value),
                set: val => (activeMonth.value = Number(val))
            })

            const disabledList = [
                { begin: '2025-01-10', end: '2025-01-15' }, // Blocked range
                '2025-01-20' // Blocked single date
            ]

            watch([viewingYear, activeMonth], ([newYear, newMonth]) => {
                calendarRef.value?.setMonth(newMonth, newYear)
            })

            return {
                args,
                dayjs,
                calendarRef,
                model,
                disabledList,
                viewingYear,
                viewingWeek,
                activeMonth,
                monthOptions,
                yearOptions,
                viewingYearStr,
                activeMonthStr
            }
        },
        template: `
            <NCard class="w-[350px]">
                <div class="n-card-body">
                    <h3 class="mb-2 font-bold text-sm">Range + Disabled</h3>
                    <p class="text-[10px] text-text-light mb-4">
                        Disabled: Jan 10-15 and Jan 20.<br/>
                        <b>Rule:</b> You cannot complete a range if it contains any disabled dates.
                    </p>
                    <div class="flex gap-2 mb-4">
                        <NInputSelect v-model="activeMonthStr" :options="monthOptions" class="grow" />
                        <NInputSelect v-model="viewingYearStr" :options="yearOptions" class="w-24" />
                    </div>
                    <NCalendar 
                        ref="calendarRef"
                        v-model="model" 
                        :disabled="disabledList"
                        v-model:viewingWeek="viewingWeek"
                        :viewingYear="viewingYear"
                        :activeMonth="activeMonth"
                        range
                    >
                        <template #calendar-header="{ startDate }">
                            <div class="font-bold mb-2">
                                {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                            </div>
                        </template>
                    </NCalendar>
                    <div class="mt-4 text-[10px] break-all">
                        Selected: {{ model || 'null' }}
                    </div>
                </div>
            </NCard>
        `
    })
}

export const HiddenDates: Story = {
    render: args => ({
        components: { NCalendar, NCard },
        setup() {
            const model = ref([])
            const viewingYear = ref(2025)
            const viewingWeek = ref(1)

            const visibleList = [
                { begin: '2025-01-01', end: '2025-01-15' },
                { begin: '2025-01-21', end: '2025-01-31' },
                // Add some Feb dates too so navigation works nicely
                { begin: '2025-02-01', end: '2025-02-28' }
            ]

            return { args, dayjs, model, visibleList, viewingYear, viewingWeek }
        },
        template: `
            <NCard class="w-[350px]">
                <div class="n-card-body">
                    <h3 class="font-bold mb-2">Hidden Dates (Visibility)</h3>
                    <p class="text-xs text-text-light mb-4">
                        Only dates defined in the <code>visible</code> prop are rendered.
                        <br>
                        Here, Jan 16-20 are hidden (invisible).
                    </p>
                    <NCalendar 
                        v-model="model" 
                        :visible="visibleList"
                        v-model:viewingYear="viewingYear"
                        v-model:viewingWeek="viewingWeek"
                    >
                        <template #calendar-header="{ startDate }">
                            <div class="font-bold mb-2">
                                {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                            </div>
                        </template>
                    </NCalendar>
                    <div class="mt-4 text-[10px] break-all">
                        Selected: {{ model }}
                    </div>
                </div>
            </NCard>
        `
    })
}

export const HiddenDatesRangeSelection: Story = {
    render: args => ({
        components: { NCalendar, NCard },
        setup() {
            const model = ref(null)
            const viewingYear = ref(2025)
            const viewingWeek = ref(1)

            // Visible ranges: 1-15, 21-31 (Gap: 16-20)
            const visibleList = [
                { begin: '2025-01-01', end: '2025-01-15' },
                { begin: '2025-01-21', end: '2025-01-31' }
            ]

            return { args, dayjs, model, visibleList, viewingYear, viewingWeek }
        },
        template: `
            <NCard class="w-[350px]">
                <div class="n-card-body">
                    <h3 class="font-bold mb-2">Hidden Dates + Range</h3>
                    <p class="text-xs text-text-light mb-4">
                        Try to select a range bridging the gap (Jan 16-20).
                        <br>
                        <b>Rule:</b> Range selection fails if it crosses any hidden (invisible) dates.
                    </p>
                    <NCalendar 
                        v-model="model" 
                        range
                        :visible="visibleList"
                        v-model:viewingYear="viewingYear"
                        v-model:viewingWeek="viewingWeek"
                    >
                        <template #calendar-header="{ startDate }">
                            <div class="font-bold mb-2">
                                {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                            </div>
                        </template>
                    </NCalendar>
                    <div class="mt-4 text-[10px] break-all">
                        Selected: {{ model || 'null' }}
                    </div>
                </div>
            </NCard>
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
        components: { NCalendar, NIcon, NCard },
        setup() {
            const model = ref([])
            const weekLabelClass = [
                'text-error', // Sun
                'text-brand', // Mon
                '',
                '',
                '',
                '',
                'text-warning' // Sat
            ]
            return { args, dayjs, model, weekLabelClass }
        },
        template: `
            <NCard class="w-[400px]">
                <div class="n-card-body">
                    <NCalendar 
                        v-bind="args" 
                        v-model="model"
                        :weekLabelClass="weekLabelClass"
                    >
                        <template #calendar-header="{ startDate }">
                            <div class="font-bold mb-2">
                                {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                            </div>
                        </template>

                        <!-- Custom individual week label -->
                        <template #week-label-1="{ day }">
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
            </NCard>
        `
    })
}

export const DualCalendar: Story = {
    render: args => ({
        components: { NCalendar, NButton, NCard },
        setup() {
            const range = ref<any>(null)

            // Source of truth for navigation
            const currentYear = ref(2025)
            const currentMonth = ref(0) // 0 = Jan

            // Derived props for NCalendar
            const viewingYear = ref(2025)
            const viewingWeek = ref(1)

            // Sync calendar props whenever navigation state changes
            watch(
                [currentYear, currentMonth],
                ([y, m]) => {
                    const { year, week } = getYearWeekFromMonth(y, m)
                    viewingYear.value = year
                    viewingWeek.value = week
                },
                { immediate: true }
            )

            const prevMonth = () => {
                let m = currentMonth.value - 1
                let y = currentYear.value
                if (m < 0) {
                    m = 11
                    y--
                }
                currentMonth.value = m
                currentYear.value = y
            }

            const nextMonth = () => {
                let m = currentMonth.value + 1
                let y = currentYear.value
                if (m > 11) {
                    m = 0
                    y++
                }
                currentMonth.value = m
                currentYear.value = y
            }

            return { dayjs, range, viewingYear, viewingWeek, prevMonth, nextMonth }
        },
        template: `
            <NCard class="w-[45rem]">
                <div class="n-card-body">
                    <div class="flex justify-between items-center mb-2">
                        <NButton @click="prevMonth" class="outlined px-2" label="< Prev Month" size="sm" />
                        <span class="font-bold text-sm">
                            Dual Month View
                        </span>
                        <NButton @click="nextMonth" class="outlined px-2" label="Next Month >" size="sm" />
                    </div>
                    
                    <NCalendar 
                        v-model="range"
                        range
                        :numViews="2"
                        :viewingYear="viewingYear"
                        :viewingWeek="viewingWeek"
                        :rows="5"
                    >
                        <template #calendar-header="{ startDate }">
                            <div class="text-center font-bold text-sm py-2">
                                {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                            </div>
                        </template>
                        <template #cell="{day}">
                            <div class="flex flex-col items-center justify-end">
                                <div v-if="day.dayOfMonth === 1" class="text-text-light text-xs">{{day.date.format('MMM')}}</div>
                                <div>{{day.dayOfMonth}}</div>
                            </div>
                        </template>
                    </NCalendar>
                    
                    <div class="text-xs break-all p-2 bg-surface-indent rounded mt-4">
                        Selected Range: {{ range }}
                    </div>
                </div>
            </NCard>
        `
    })
}

export const MixedSelection: Story = {
    render: args => ({
        components: { NCalendar, NCard },
        setup() {
            const mixedModel = ref<any[]>(['2025-01-05', { begin: '2025-01-10', end: '2025-01-15' }, '2025-01-20'])
            const view = ref({ y: 2025, w: 1 })

            return { dayjs, mixedModel, view }
        },
        template: `
            <NCard class="w-[400px]">
                <div class="n-card-body">
                    <h3 class="font-bold mb-2">Mixed Selection (Multiple + Range)</h3>
                    <p class="text-xs text-text-light mb-4">
                        You can select single dates (click) AND ranges (click start, click end) in the same calendar.
                        <br>
                        Try clicking separate dates, then try creating a range between empty spots.
                    </p>
                    <NCalendar 
                        v-model="mixedModel" 
                        multiple 
                        range
                        v-model:viewingYear="view.y" 
                        v-model:viewingWeek="view.w"
                    >
                        <template #calendar-header="{ startDate }">
                            <div class="font-bold mb-2">
                                {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                            </div>
                        </template>
                    </NCalendar>
                    <div class="mt-4 text-[10px] p-2 bg-surface-indent rounded break-all">
                        Model: {{ mixedModel }}
                    </div>
                </div>
            </NCard>
        `
    })
}

export const FeatureToggles: Story = {
    render: args => ({
        components: { NCalendar, NCard, NCheckbox },
        setup() {
            const model = ref([])
            const isRange = ref(false)
            const isSelectable = ref(true)
            const isUnselectable = ref(true)
            const isMultiple = ref(false)
            const view = ref({ y: 2025, w: 1 })

            return { dayjs, model, isRange, isSelectable, isUnselectable, isMultiple, view }
        },
        template: `
            <NCard class="w-[400px]">
                <div class="n-card-body">
                    <h3 class="font-bold mb-4">Feature Toggles</h3>
                    
                    <div class="flex flex-wrap gap-4 mb-4 p-2 bg-surface-indent rounded border border-border">
                        <NCheckbox v-model="isSelectable" label="Selectable" />
                        <NCheckbox v-model="isUnselectable" label="Unselectable" />
                        <NCheckbox v-model="isMultiple" label="Multiple" />
                        <NCheckbox v-model="isRange" label="Range Mode" />
                    </div>

                    <NCalendar 
                        v-model="model"
                        :range="isRange"
                        :selectable="isSelectable"
                        :unselectable="isUnselectable"
                        :multiple="isMultiple"
                        v-model:viewingYear="view.y"
                        v-model:viewingWeek="view.w"
                    >
                        <template #calendar-header="{ startDate }">
                            <div class="font-bold mb-2">
                                {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                            </div>
                        </template>
                    </NCalendar>

                    <div class="mt-4 text-[10px] break-all p-2 bg-surface-indent rounded">
                        <strong>Value:</strong> {{ model }}
                    </div>
                </div>
            </NCard>
        `
    })
}

export const MultipleActiveMonths: Story = {
    render: args => ({
        components: { NCalendar, NCard, NButton, NInputSelect },
        setup() {
            const calendarRef = ref<any>(null)
            const activeMonths = ref([0, 2, 4]) // Jan, Mar, May
            const viewingYear = ref(2025)
            const viewingWeek = ref(1)

            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const monthOptions = computed(() => months.map((m, i) => ({ label: m, value: String(i) })))

            const years = [2024, 2025, 2026]
            const yearOptions = computed(() => years.map(y => ({ label: String(y), value: String(y) })))

            const viewingYearStr = computed({
                get: () => String(viewingYear.value),
                set: val => (viewingYear.value = Number(val))
            })

            const activeMonthsStr = computed({
                get: () => activeMonths.value.map(String),
                set: vals => (activeMonths.value = vals.map(Number))
            })

            const navigateMonth = (delta: number) => {
                const current = dayjs(`${viewingYear.value}-01-01`)
                    .isoWeek(viewingWeek.value)
                    .startOf('isoWeek')
                    .add(14, 'day')
                const target = current.add(delta, 'month')
                calendarRef.value?.setMonth(target.month(), target.year())
            }

            return {
                dayjs,
                calendarRef,
                activeMonths,
                viewingYear,
                viewingWeek,
                monthOptions,
                yearOptions,
                viewingYearStr,
                activeMonthsStr,
                navigateMonth
            }
        },
        template: `
            <NCard class="w-[450px]">
                <div class="n-card-body">
                    <h3 class="font-bold mb-2">Multiple Active Months</h3>
                    <p class="text-xs text-text-light mb-4">
                        Select multiple active months and change the viewing year.
                        Dates outside active months appear faded.
                    </p>
                    
                    <div class="flex gap-2 mb-4 items-end">
                        <NInputSelect v-model="activeMonthsStr" :options="monthOptions" multiple label="Active Months" class="grow" />
                        <NInputSelect v-model="viewingYearStr" :options="yearOptions" label="Year" class="w-24" />
                        
                        <div class="flex gap-1 shrink-0 items-center mb-1">
                            <NButton @click="navigateMonth(-1)" class="outlined px-2" size="sm" label="M-" />
                            <NButton @click="navigateMonth(1)" class="outlined px-2" size="sm" label="M+" />
                        </div>
                    </div>

                    <NCalendar 
                        ref="calendarRef"
                        :activeMonth="activeMonths"
                        v-model:viewingYear="viewingYear"
                        v-model:viewingWeek="viewingWeek"
                        :rows="6"
                    >
                        <template #calendar-header="{ startDate }">
                            <div class="font-bold mb-2">
                                {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                            </div>
                        </template>
                    </NCalendar>
                </div>
            </NCard>
        `
    })
}

export const IndependentDualViews: Story = {
    render: args => ({
        components: { NCalendar, NButton, NCard },
        setup() {
            const range = ref<any>(null)
            
            // Base year/month for the dual view
            const currentYear = ref(2025)
            const currentMonth = ref(0) // 0 = Jan

            // Helper to generate a visible list for a specific month only
            const getMonthVisible = (year: number, month: number) => {
                const start = dayjs(`${year}-${String(month + 1).padStart(2, '0')}-01`)
                return [{
                    begin: start.format('YYYY-MM-DD'),
                    end: start.endOf('month').format('YYYY-MM-DD')
                }]
            }

            // Create view configurations
            const views = computed(() => {
                const month1 = currentMonth.value
                const year1 = currentYear.value
                
                // Calculate next month
                let month2 = month1 + 1
                let year2 = year1
                if (month2 > 11) {
                    month2 = 0
                    year2++
                }

                const { year: y1, week: w1 } = getYearWeekFromMonth(year1, month1)
                const { year: y2, week: w2 } = getYearWeekFromMonth(year2, month2)

                return [
                    {
                        viewingYear: y1,
                        viewingWeek: w1,
                        visible: getMonthVisible(year1, month1)
                    },
                    {
                        viewingYear: y2,
                        viewingWeek: w2,
                        visible: getMonthVisible(year2, month2)
                    }
                ]
            })

            const prevMonth = () => {
                let m = currentMonth.value - 1
                let y = currentYear.value
                if (m < 0) {
                    m = 11
                    y--
                }
                currentMonth.value = m
                currentYear.value = y
            }

            const nextMonth = () => {
                let m = currentMonth.value + 1
                let y = currentYear.value
                if (m > 11) {
                    m = 0
                    y++
                }
                currentMonth.value = m
                currentYear.value = y
            }

            return { dayjs, range, views, prevMonth, nextMonth }
        },
        template: `
            <NCard class="w-[45rem]">
                <div class="n-card-body">
                    <div class="flex justify-between items-center mb-2">
                        <NButton @click="prevMonth" class="outlined px-2" label="< Prev Month" size="sm" />
                        <span class="font-bold text-sm">
                            Independent Dual Views (No Spillovers)
                        </span>
                        <NButton @click="nextMonth" class="outlined px-2" label="Next Month >" size="sm" />
                    </div>
                    
                    <NCalendar 
                        v-model="range"
                        range
                        :views="views"
                        :rows="6"
                    >
                        <template #calendar-header="{ startDate }">
                            <div class="text-center font-bold text-sm py-2">
                                {{ dayjs(startDate).add(14, 'day').format('MMMM YYYY') }}
                            </div>
                        </template>
                    </NCalendar>
                    
                    <div class="text-xs break-all p-2 bg-surface-indent rounded mt-4">
                        Selected Range: {{ range }}
                    </div>
                </div>
            </NCard>
        `
    })
}

export const TripleViewComparison: Story = {
    render: args => ({
        components: { NCalendar, NCard },
        setup() {
            const range1 = ref(null)
            const range2 = ref(null)
            
            // Standard viewing props
            const viewingYear = ref(2025)
            const viewingWeek = ref(1)

            // --- Independent Views Logic ---
            const views = computed(() => {
                const months = [0, 1, 2] // Jan, Feb, Mar
                return months.map(m => {
                    const y = viewingYear.value
                    const { year, week } = getYearWeekFromMonth(y, m)
                    
                    // Generate visibility for this month only
                    const start = dayjs(`${y}-${String(m + 1).padStart(2, '0')}-01`)
                    const visible = [{
                        begin: start.format('YYYY-MM-DD'),
                        end: start.endOf('month').format('YYYY-MM-DD')
                    }]

                    return {
                        viewingYear: year,
                        viewingWeek: week,
                        visible,
                        // Style middle view differently for demo
                        viewClass: m === 1 ? 'bg-surface-indent rounded' : ''
                    }
                })
            })

            return { dayjs, range1, range2, viewingYear, viewingWeek, views }
        },
        template: `
            <div class="flex flex-col gap-8 w-[60rem]">
                <NCard>
                    <div class="n-card-body">
                        <h3 class="font-bold mb-2">1. Standard Continuous (numViews=3)</h3>
                        <p class="text-xs text-text-light mb-4">
                            Shows 3 consecutive chunks of weeks. Note how Feb/Mar start dates depend on when Jan ended.
                        </p>
                        <NCalendar 
                            v-model="range1"
                            range
                            :numViews="3"
                            :viewingYear="viewingYear"
                            :viewingWeek="viewingWeek"
                            :rows="6"
                        >
                            <template #calendar-header="{ startDate }">
                                <div class="text-center text-xs font-bold py-2">
                                    {{ dayjs(startDate).add(14, 'day').format('MMM YYYY') }}
                                </div>
                            </template>
                        </NCalendar>
                    </div>
                </NCard>

                <NCard>
                    <div class="n-card-body">
                        <h3 class="font-bold mb-2">2. Independent Views (views=[...])</h3>
                        <p class="text-xs text-text-light mb-4">
                            3 views configured explicitly for Jan, Feb, Mar. 
                            Each view starts fresh. Outside dates hidden. Middle view styled.
                        </p>
                        <NCalendar 
                            v-model="range2"
                            range
                            :views="views"
                            :rows="6"
                        >
                            <template #calendar-header="{ startDate }">
                                <div class="text-center text-xs font-bold py-2">
                                    {{ dayjs(startDate).add(14, 'day').format('MMM YYYY') }}
                                </div>
                            </template>
                        </NCalendar>
                    </div>
                </NCard>
            </div>
        `
    })
}