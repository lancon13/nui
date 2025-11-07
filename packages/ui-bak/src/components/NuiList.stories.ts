import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

import NuiList from './NuiList.vue'
import NuiListItem from './NuiListItem.vue'
import NuiButton from './NuiButton.vue'

const meta = {
    title: 'UI/NuiList',
    component: NuiList,
    tags: ['autodocs'],
    argTypes: {
        shadow: { control: 'boolean' },
        bordered: { control: 'boolean' },
        divider: { control: 'boolean' },
        virtual: { control: 'boolean' }
    }
} satisfies Meta<typeof NuiList>

export default meta
type Story = StoryObj<typeof meta>

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

export const Default: Story = {
    args: {
        items: items
    }
}

export const Bordered: Story = {
    args: {
        items: items,
        bordered: true
    }
}

export const Shadow: Story = {
    args: {
        items: items,
        shadow: true
    }
}

export const BorderedAndShadow: Story = {
    args: {
        items: items,
        bordered: true,
        shadow: true
    }
}

export const WithDivider: Story = {
    args: {
        items: items,
        divider: true,
        bordered: true
    }
}

export const VirtualScroll: Story = {
    render: args => ({
        components: { NuiList, NuiButton },
        setup() {
            const listRef = ref<typeof NuiList | null>(null)
            const handleScroll = () => {
                listRef.value?.scrollTo?.(500)
            }
            return { args, listRef, handleScroll }
        },
        template: `
      <div>
        <NuiButton @click="handleScroll()" class="mb-sm">Scroll to index 500</NuiButton>
        <NuiList ref="listRef" v-bind="args">
          <template #item="{ item, index }">
            <div class="flex items-center gap-sm text-sm">
              <span class="text-text-subtle">{{ index + 1 }}.</span>
              <span>{{ item }}</span>
            </div>
          </template>
        </NuiList>
      </div>
    `
    }),
    args: {
        items: Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`),
        virtual: true,
        bordered: true
    }
}

export const Slots: Story = {
    render: args => ({
        components: { NuiList, NuiListItem },
        setup() {
            return { args }
        },
        template: `
      <NuiList v-bind="args">
        <template #before>
          <div class="p-4 bg-gray-100">This is the before slot</div>
        </template>
        <NuiListItem>Custom item 1</NuiListItem>
        <NuiListItem>Custom item 2</NuiListItem>
        <template #after>
          <div class="p-4 bg-gray-100">This is the after slot</div>
        </template>
      </NuiList>
    `
    }),
    args: {
        bordered: true
    }
}

export const HoverableItems: Story = {
    render: args => ({
        components: { NuiList, NuiListItem },
        setup() {
            return { args }
        },
        template: `
      <NuiList v-bind="args">
        <NuiListItem hoverable>Hoverable Item 1</NuiListItem>
        <NuiListItem hoverable>Hoverable Item 2</NuiListItem>
        <NuiListItem hoverable>Hoverable Item 3</NuiListItem>
      </NuiList>
    `
    }),
    args: {
        bordered: true
    }
}

export const FocusableItems: Story = {
    render: args => ({
        components: { NuiList, NuiListItem },
        setup() {
            return { args }
        },
        template: `
      <NuiList v-bind="args">
        <NuiListItem focusable>Focusable Item 1 (try tabbing)</NuiListItem>
        <NuiListItem focusable>Focusable Item 2 (try tabbing)</NuiListItem>
        <NuiListItem focusable>Focusable Item 3 (try tabbing)</NuiListItem>
      </NuiList>
    `
    }),
    args: {
        bordered: true
    }
}

export const ClickableItems: Story = {
    render: args => ({
        components: { NuiList, NuiListItem },
        setup() {
            const handleClick = (item: string) => {
                console.log(`${item} clicked`)
            }
            return { args, handleClick }
        },
        template: `
      <NuiList v-bind="args">
        <NuiListItem clickable @click="handleClick('Item 1')">Clickable Item 1</NuiListItem>
        <NuiListItem clickable @click="handleClick('Item 2')">Clickable Item 2</NuiListItem>
        <NuiListItem clickable @click="handleClick('Item 3')">Clickable Item 3</NuiListItem>
      </NuiList>
    `
    }),
    args: {
        bordered: true
    }
}

export const InteractiveItems: Story = {
    render: args => ({
        components: { NuiList, NuiListItem },
        setup() {
            const handleClick = (item: string) => {
                console.log(`${item} clicked`)
            }
            return { args, handleClick }
        },
        template: `
      <NuiList v-bind="args">
        <NuiListItem hoverable focusable clickable @click="handleClick('Item 1')">Interactive Item 1</NuiListItem>
        <NuiListItem hoverable focusable clickable @click="handleClick('Item 2')">Interactive Item 2</NuiListItem>
        <NuiListItem hoverable focusable clickable @click="handleClick('Item 3')">Interactive Item 3</NuiListItem>
      </NuiList>
    `
    }),
    args: {
        bordered: true
    }
}
