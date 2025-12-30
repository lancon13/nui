import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NHeader from './NHeader.vue'
import NFooter from './NFooter.vue'
import NButton from '../components/NButton.vue'
import NTabs from '../components/NTabs.vue'
import NTab from '../components/NTab.vue'
import NTooltip from '../components/NTooltip.vue'
import NMenu from '../components/NMenu.vue'
import NDrawer from '../components/NDrawer.vue'
import NCard from '../components/NCard.vue'
import NList from '../components/NList.vue'
import NListItem from '../components/NListItem.vue'
import NForm from '../components/NForm.vue'

import NInputText from '../components/NInputText.vue'
import NInputCombo from '../components/NInputCombo.vue'
import { ref } from 'vue'

const meta = {
    title: 'Layouts/NPage',
    component: NHeader,
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
        components: {
            NHeader,
            NFooter,
            NDrawer,
            NForm,
            NCard,
            NButton,
            NTabs,
            NTab,
            NTooltip,
            NList,
            NListItem,
            NMenu,
            NInputText,
            NInputCombo
        },
        setup() {
            const showDrawer = ref(false)

            return { args, showDrawer }
        },
        template: `
            <div class="w-[64rem] bg-white relative overflow-hidden">
                <NHeader v-bind="args" :class="['p-4 w-full relative border-border border-b', showDrawer ? 'shadowed' : '']">
                    <NButton icon="menu" class="icon" @click="() => showDrawer = !showDrawer"/>
                    <h1 class="text-lg font-bold">NUI System</h1>
                    <div class="n-space"></div>
                    <NTabs class="texted ">
                        <NTab name="about">About us</NTab>
                        <NTab name="products">Our products</NTab>
                        <NTab name="contact">Contact Us</NTab>
                    </NTabs>
                    <NButton icon="account" class="icon pilled ">
                        
                        <NMenu>
                            <NListItem heading>Profile</NListItem>
                            <NListItem icon="mdi-view-dashboard" href="#">Dashboard</NListItem>
                            <NListItem icon="mdi-chart-bar" href="#">Analytics</NListItem>
                            <div class="n-separator"></div>
                            <NListItem icon="logout" href="#">Sign Out</NListItem>
                        </NMenu>
                    </NButton>
                </NHeader>

                <div class="relative h-[32rem]">
                    <section class="p-4">
                        <h1 class="text-xl font-bold n-placeholder">Method 1: Using divide-x Utilities (Recommended)</h1>
                        <p class="my-4 n-placeholder">The divide-x utilities add a border between the horizontal children of an element. This approach is clean as it automatically handles the correct placement, omitting the border from the last item. </p>
                        <img src="" class="bg-gray-500 h-32 w-1/2 n-placeholder" />
                    </section>
                    <section class="p-4">
                        <NCard>
                            <NForm class="w-1/2">
                                <NInputText label="Your name" />
                                <NInputCombo label="Find a value"/>
                                <div class="content-row justify-end">
                                    <NButton label="Cancel" class="texted" />
                                    <NButton label="Submit" >
                                        <NTooltip>Submit the form</NTooltip>
                                    </NButton>
                                </div>
                            </NForm>
                        </NCard>
                    </section>
                    <NDrawer v-model="showDrawer" overlay>
                        <NCard class="h-full squared shadowed w-[16rem]">Content</NCard>
                    </NDrawer>
                </div>

                <NFooter v-bind="args" class="border-border border-t w-[64rem] pb-8">
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
            </div>
        `
    })
}
