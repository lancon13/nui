/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NuiAvatar from './NuiAvatar.vue'
import NuiChip from './NuiChip.vue'
import NuiIcon from './NuiIcon.vue'
import NuiListItem from './NuiListItem.vue'
import type { NuiSelectOption } from './NuiSelect.vue'
import NuiSelect from './NuiSelect.vue'

const options: NuiSelectOption[] = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'A very long option label to test text overflow', value: '4' }
]

const meta = {
    title: 'UI/NuiSelect',
    component: NuiSelect,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'select',
            options: ['primary', 'success', 'error', 'warning', 'info', 'current']
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large']
        },
        options: {
            control: 'object'
        }
    }
} satisfies Meta<typeof NuiSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        color: 'current',
        size: 'medium',
        disabled: false,
        label: 'Select an option',
        placeholder: 'Placeholder',
        helperText: 'This is a helper text',
        pilled: false,
        loading: false,
        multiple: false,
        options: options
    },
    render: args => ({
        components: { NuiSelect },
        setup() {
            const model = ref()
            return { args, model }
        },
        template: `
            <NuiSelect v-bind="args" v-model="model" class="w-64" />
        `
    })
}

export const Multiple: Story = {
    args: {
        ...Default.args,
        multiple: true,
        label: 'Select multiple options'
    },
    render: args => ({
        components: { NuiSelect },
        setup() {
            const model = ref(['1'])
            return { args, model }
        },
        template: `
            <NuiSelect v-bind="args" v-model="model" />
        `
    })
}

export const Pilled: Story = {
    args: {
        ...Default.args,
        pilled: true
    },
    render: args => ({
        components: { NuiSelect },
        setup() {
            const model = ref()
            return { args, model }
        },
        template: `
            <NuiSelect v-bind="args" v-model="model" />
        `
    })
}

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true
    },
    render: args => ({
        components: { NuiSelect },
        setup() {
            const model = ref('1')
            return { args, model }
        },
        template: `
            <NuiSelect v-bind="args" v-model="model" />
        `
    })
}

export const Loading: Story = {
    args: {
        ...Default.args,
        loading: true
    },
    render: args => ({
        components: { NuiSelect },
        setup() {
            const model = ref('1')
            return { args, model }
        },
        template: `
            <NuiSelect v-bind="args" v-model="model" />
        `
    })
}

export const Colors: Story = {
    render: args => ({
        components: { NuiSelect },
        setup() {
            const model = ref()
            return { args, model }
        },
        template: `
            <div class="grid grid-cols-3 gap-4">
                <NuiSelect v-bind="args" v-model="model" color="primary" label="Primary" />
                <NuiSelect v-bind="args" v-model="model" color="success" label="Success" />
                <NuiSelect v-bind="args" v-model="model" color="error" label="Error" />
                <NuiSelect v-bind="args" v-model="model" color="warning" label="Warning" />
                <NuiSelect v-bind="args" v-model="model" color="info" label="Info" />
                <NuiSelect v-bind="args" v-model="model" color="current" label="Current" />
            </div>
        `
    }),
    args: {
        ...Default.args,
        helperText: undefined,
        label: undefined
    }
}

export const Sizes: Story = {
    render: args => ({
        components: { NuiSelect },
        setup() {
            const model = ref()
            return { args, model }
        },
        template: `
            <div class="flex flex-col gap-4 items-start">
                <NuiSelect v-bind="args" v-model="model" size="small" label="Small" />
                <NuiSelect v-bind="args" v-model="model" size="medium" label="Medium" />
                <NuiSelect v-bind="args" v-model="model" size="large" label="Large" />
            </div>
        `
    }),
    args: {
        ...Default.args,
        helperText: undefined,
        label: undefined
    }
}

export const Slots: Story = {
    render: args => ({
        components: { NuiSelect, NuiIcon },
        setup() {
            const model = ref('1')
            return { args, model }
        },
        template: `
            <NuiSelect v-bind="args" v-model="model">
                <template #before>
                    <NuiIcon name="search" class="text-primary" />
                </template>
                <template #prepend>
                    <NuiIcon name="user" />
                </template>
                <template #append>
                    <NuiIcon name="arrow-right" />
                </template>
                <template #after>
                    <NuiIcon name="settings" class="text-primary" />
                </template>
            </NuiSelect>
        `
    }),
    args: {
        ...Default.args,
        label: 'With slots',
        helperText: 'This select has custom before, after, prepend, and append content.'
    }
}

const avatarOptions = [
    { label: 'Tony Stark', value: '1', avatar: 'https://i.pravatar.cc/40?u=1' },
    { label: 'Steve Rogers', value: '2', avatar: 'https://i.pravatar.cc/40?u=2' },
    { label: 'Bruce Banner', value: '3', avatar: 'https://i.pravatar.cc/40?u=3' }
]

export const CustomSelection: Story = {
    render: args => ({
        components: { NuiSelect, NuiChip, NuiAvatar },
        setup() {
            const singleModel = ref('1')
            const multipleModel = ref(['1', '2'])
            const getOption = (val: any) => (args.options as any[]).find(o => o.value === val)
            return { args, singleModel, multipleModel, getOption }
        },
        template: `
            <div class="flex flex-col gap-8">
                <p>Single selection with custom display</p>
                <NuiSelect v-bind="args" v-model="singleModel">
                    <template #selection="{ selected }">
                        <div v-if="selected.length" class="flex items-center gap-2">
                            <NuiAvatar :src="selected[0].avatar" size="small" />
                            <span>{{ selected[0].label }}</span>
                        </div>
                    </template>
                </NuiSelect>

                <p>Multiple selections with custom display (NuiChip)</p>
                <NuiSelect v-bind="args" v-model="multipleModel" multiple>
                    <template #selection="{ selected, model }">
                         <div v-if="model.value?.length" class="flex flex-wrap gap-1">
                            <NuiChip
                                v-for="value in model.value"
                                :key="value"
                                size="small"
                                color="primary"
                                closable
                                @close="() => { multipleModel = multipleModel.filter(v => v !== value) }"
                            >
                                {{ getOption(value)?.label }}
                            </NuiChip>
                        </div>
                        <span v-else class="nui-select-placeholder">
                            {{ args.placeholder }}
                        </span>
                    </template>
                </NuiSelect>
            </div>
        `
    }),
    args: {
        ...Default.args,
        options: avatarOptions,
        label: 'Custom selection display'
    }
}

const richOptions = [
    {
        label: 'Tony Stark',
        value: '1',
        desc: 'Genius, billionaire, playboy',
        avatar: 'https://i.pravatar.cc/40?u=1'
    },
    {
        label: 'Steve Rogers',
        value: '2',
        desc: 'Super-soldier',
        avatar: 'https://i.pravatar.cc/40?u=2'
    },
    { label: 'Bruce Banner', value: '3', desc: 'Hulks out', avatar: 'https://i.pravatar.cc/40?u=3' }
]

export const CustomItem: Story = {
    render: args => ({
        components: { NuiSelect, NuiListItem, NuiAvatar },
        setup() {
            const model = ref('1')
            return { args, model }
        },
        template: `
            <NuiSelect v-bind="args" v-model="model">
                <template #item="{ option, selected }">
                    <div class="flex items-center gap-2">
                        <NuiAvatar :src="option.avatar" size="small" />
                        <div>
                            <p :class="selected ? 'text-primary' : 'text-text'">{{ option.label }}</p>
                            <p class="text-xs text-text/70">{{ option.desc }}</p>
                        </div>
                    </div>
                </template>
            </NuiSelect>
        `
    }),
    args: {
        ...Default.args,
        options: richOptions,
        label: 'Custom item display'
    }
}
