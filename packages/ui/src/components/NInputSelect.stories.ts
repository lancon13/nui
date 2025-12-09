import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import { ref } from 'vue'
import NInputSelect from './NInputSelect.vue'

const meta = {
    title: 'UI/NInputSelect',
    component: NInputSelect,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {}
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref('Test me')
            const options1 = [
                { label: 'Test 1', value: 'test1' },
                { label: 'Test 2', value: 'test2' },
                { label: 'Test 3', value: 'test3' }
            ]
            const options2 = [
                {
                    label: 'Options Group 1',
                    options: [
                        { label: 'Test 1', value: 'test1' },
                        { label: 'Test 2', value: 'test2' },
                        { label: 'Test 3', value: 'test3' }
                    ]
                },
                {
                    label: 'Options Group 2',
                    options: [
                        { label: 'Test 4', value: 'test4' },
                        { label: 'Test 5', value: 'test5' },
                        { label: 'Test 6', value: 'test6' }
                    ]
                }
            ]
            return { args, value, options1, options2 }
        },
        template: `
            <div class="flex flex-col gap-2 w-64">
                <div>{{value}}</div>                
                <NInputSelect v-bind="args" v-model="value" :options="options1" label="Value" name="demo" />
                <NInputSelect v-bind="args" v-model="value" :options="options2" label="Value" name="demo" />
            </div>
        `
    })
}

export const SlotForOptions: Story = {
    args: {},
    render: args => ({
        components: { NInputSelect },
        setup() {
            const value = ref('option1')
            return { args, value }
        },
        template: `
            <div class="flex flex-col gap-2 w-64">
                <div>{{value}}</div>
                <NInputSelect v-bind="args" v-model="value" label="Value" name="demo" class="w-full" >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>                    
                </NInputSelect>

                <NInputSelect v-bind="args" v-model="value" label="Value" name="demo" class="w-full" >
                    <optgroup label="Options">
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </optgroup>
                    <optgroup label="Swedish Cars">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                    </optgroup>
                    <optgroup label="German Cars">
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </optgroup>
                </NInputSelect>
            </div>
        `
    })
}
