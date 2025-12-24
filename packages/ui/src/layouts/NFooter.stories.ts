import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NFooter from './NFooter.vue'
import NList from '../components/NList.vue'
import NListItem from '../components/NListItem.vue'

const meta = {
    title: 'Layouts/NFooter',
    component: NFooter,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        // Props
    },
    args: {}
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
    render: args => ({
        components: { NFooter, NList, NListItem },
        setup() {
            return { args }
        },
        template: `
            <NFooter v-bind="args" class="bg-surface w-[64rem] pb-8">
                <div class="flex flex-row gap-4">
                    <div class="p-4 flex-1 pt-8">
                        <h1 class="text-lg font-bold">NUI System</h1>
                    </div>
                    <div class="p-4">
                        <NList>
                            <NListItem heading>Heading</NListItem>
                            <NListItem>Item 1</NListItem>
                            <NListItem>Item 1</NListItem>
                            <NListItem>Item 1</NListItem>                        
                        </NList>
                    </div>
                    <div class="p-4">
                        <NList>
                            <NListItem heading>Heading</NListItem>
                            <NListItem>Item 1</NListItem>
                            <NListItem>Item 1</NListItem>
                            <NListItem>Item 1</NListItem>                        
                        </NList>
                    </div>
                    <div class="p-4">
                        <NList>
                            <NListItem heading>Heading</NListItem>
                            <NListItem>Item 1</NListItem>
                            <NListItem>Item 1</NListItem>
                            <NListItem>Item 1</NListItem>                        
                        </NList>
                    </div>
                </div>
                <ul class="flex flex-row divide-x text-sm">
                    <li class="px-4">
                        <span class="font-bold">&copy; 2025 NUI System</span>
                    </li>
                    <li class="px-4">
                        <a href="#">Privacy</a>
                    </li>
                    <li class="px-4">
                        <a href="#">Terms and conditions</a>
                    </li>
                </ul>
            </NFooter>
        `
    })
}
