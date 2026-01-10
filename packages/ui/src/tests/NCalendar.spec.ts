/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import NCalendar from '../components/NCalendar.vue'

describe('NCalendar', () => {
    it('renders correctly', () => {
        const wrapper = mount(NCalendar)
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.find('.n-calendar-view-grid').exists()).toBe(true)
    })

    it('emits update:modelValue on day click', async () => {
        const wrapper = mount(NCalendar)
        const day = wrapper.find('.n-calendar-view-grid-cell:not(.n-calendar-view-grid-cell--disabled)')
        await day.trigger('click')
        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    })

    it('handles multiple selection', async () => {
        const wrapper = mount(NCalendar, {
            props: { multiple: true, modelValue: [] }
        })
        const days = wrapper.findAll('.n-calendar-view-grid-cell:not(.n-calendar-view-grid-cell--disabled)')

        await days[0].trigger('click')
        const firstEmit = wrapper.emitted('update:modelValue')![0][0] as string[]
        await wrapper.setProps({ modelValue: firstEmit })

        await days[5].trigger('click')

        const secondEmit = wrapper.emitted('update:modelValue')![1][0] as string[]
        expect(secondEmit).toHaveLength(2)
    })

    it('handles range selection', async () => {
        const wrapper = mount(NCalendar, {
            props: { range: true }
        })
        // Find today to ensure it's valid
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const today = wrapper.find('.n-calendar-view-grid-cell--today')

        const days = wrapper.findAll('.n-calendar-view-grid-cell:not(.n-calendar-view-grid-cell--disabled)')
        const start = days[10]
        const end = days[12]

        await start.trigger('click')
        await end.trigger('click')

        expect(wrapper.emitted('update:modelValue')).toBeTruthy()
        const emits = wrapper.emitted('update:modelValue')
        expect(emits).toHaveLength(1)
        expect(emits![0][0]).toHaveProperty('begin')
        expect(emits![0][0]).toHaveProperty('end')
    })
})
