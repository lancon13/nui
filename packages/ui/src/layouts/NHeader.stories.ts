import type { Meta, StoryObj } from '@storybook/vue3-vite'
// import { fn } from '@storybook/test'
import NHeader from './NHeader.vue'
import NButton from '../components/NButton.vue'
import NTabs from '../components/NTabs.vue'
import NTab from '../components/NTab.vue'
import NTooltip from '../components/NTooltip.vue'
import NMenu from '../components/NMenu.vue'
import NDrawer from '../components/NDrawer.vue'
import NCard from '../components/NCard.vue'
import NList from '../components/NList.vue'
import NListItem from '../components/NListItem.vue'
import NInputText from '../components/NInputText.vue'
import { ref } from 'vue'

const meta = {
    title: 'Layouts/NHeader',
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
        components: { NHeader, NDrawer, NInputText, NCard, NButton, NTabs, NTab, NTooltip, NList, NListItem, NMenu },
        setup() {
            const showDrawer = ref(false)

            return { args, showDrawer }
        },
        template: `
            <NHeader v-bind="args" :class="['bg-surface w-[64rem] p-4 relative', showDrawer ? 'shadowed' : '']">
                <NButton icon="menu" class="icon flat" @click="() => showDrawer = !showDrawer"/>
                <h1 class="text-lg font-bold">NUI System</h1>
                <NInputText icon="magnify" placeholder="Search..."></NInputText>
                <div class="n-space"></div>
                <NTabs class="texted" :model-value="null">
                    <NTab >About us</NTab>
                    <NTab >Our products</NTab>
                    <NTab >Contact Us</NTab>                    
                </NTabs>
                <div class="n-separator n-vertical" />
                <NButton label="Sign up" class="primary">
                    <NTooltip>Sign up a new account</NTooltip>
                </NButton>
                <NButton icon="account" class="icon pilled texted">                    
                    <NMenu>
                        <NListItem heading>Profile</NListItem>
                        <NListItem icon="mdi-view-dashboard" href="#">Dashboard</NListItem>
                        <NListItem icon="mdi-chart-bar" href="#">Analytics</NListItem>
                        <div class="n-separator"></div>
                        <NListItem icon="logout" class="text-error" href="#">Sign Out</NListItem>
                    </NMenu>
                </NButton>
            </NHeader>
        `
    })
}
