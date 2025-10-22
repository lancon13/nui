import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NuiMenu, { type NuiMenuItem } from './NuiMenu.vue'
import NuiButton from './NuiButton.vue'

const meta = {
    title: 'UI/NuiMenu',
    component: NuiMenu,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        items: { control: 'object' }
    }
} satisfies Meta<typeof NuiMenu>

export default meta
type Story = StoryObj<typeof meta>

const baseMenuItems: NuiMenuItem[] = [
    {
        label: 'Profile',
        value: 'profile',
        onClick: () => console.log('Profile clicked')
    },
    {
        label: 'Settings',
        value: 'settings',
        children: [
            {
                label: 'Account',
                value: 'account',
                onClick: () => console.log('Account clicked')
            },
            {
                label: 'Appearance',
                value: 'appearance',
                children: [
                    {
                        label: 'Theme',
                        value: 'theme',
                        onClick: () => console.log('Theme clicked')
                    }
                ]
            }
        ]
    },
    {
        label: 'Logout',
        value: 'logout',
        onClick: () => console.log('Logout clicked')
    }
]

const eventMenuItems: NuiMenuItem[] = [
    {
        label: 'Click me',
        value: 'click',
        onClick: e => console.log('Clicked!', e)
    },
    {
        label: 'Focus me',
        value: 'focus',
        onFocus: e => console.log('Focused!', e)
    },
    {
        label: 'Blur me',
        value: 'blur',
        onBlur: e => console.log('Blurred!', e)
    },
    {
        label: 'MouseOver me',
        value: 'mouseover',
        onMouseOver: e => console.log('MouseOver!', e)
    },
    {
        label: 'MouseOut me',
        value: 'mouseout',
        onMouseOut: e => console.log('MouseOut!', e)
    }
]

const deeplyNestedMenuItems: NuiMenuItem[] = [
    {
        label: 'Level 1',
        value: '1',
        children: [
            {
                label: 'Level 2',
                value: '1-1',
                children: [
                    {
                        label: 'Level 3',
                        value: '1-1-1',
                        children: [
                            {
                                label: 'Level 4',
                                value: '1-1-1-1',
                                onClick: () => console.log('Deeply nested item clicked')
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

export const Default: Story = {
    render: args => ({
        components: { NuiMenu, NuiButton },
        setup() {
            return { args }
        },
        template: `
      <NuiButton>
        Open Menu
        <NuiMenu :items="args.items" />
      </NuiButton>
    `
    }),
    args: {
        items: baseMenuItems
    }
}

export const WithCustomContent: Story = {
    render: () => ({
        components: { NuiMenu, NuiButton },
        template: `
      <NuiButton>
        Open Menu
        <NuiMenu>
          <div class="p-lg">
            <p>Custom content for the menu</p>
          </div>
        </NuiMenu>
      </NuiButton>
    `
    })
}

export const Events: Story = {
    render: args => ({
        components: { NuiMenu, NuiButton },
        setup() {
            return { args }
        },
        template: `
      <NuiButton>
        Open Menu
        <NuiMenu :items="args.items" />
      </NuiButton>
    `
    }),
    args: {
        items: eventMenuItems
    }
}

export const DeeplyNested: Story = {
    render: args => ({
        components: { NuiMenu, NuiButton },
        setup() {
            return { args }
        },
        template: `
      <NuiButton>
        Open Menu
        <NuiMenu :items="args.items" />
      </NuiButton>
    `
    }),
    args: {
        items: deeplyNestedMenuItems
    }
}

export const Empty: Story = {
    render: args => ({
        components: { NuiMenu, NuiButton },
        setup() {
            return { args }
        },
        template: `
      <NuiButton>
        Open Menu
        <NuiMenu :items="args.items" />
      </NuiButton>
    `
    }),
    args: {
        items: []
    }
}

export const CustomTrigger: Story = {
    render: args => ({
        components: { NuiMenu },
        setup() {
            return { args }
        },
        template: `
      <div class="inline-flex items-center border border-dashed p-md cursor-pointer">
        Custom Trigger
        <NuiMenu :items="args.items" />
      </div>
    `
    }),
    args: {
        items: baseMenuItems
    }
}

export const ClickToClose: Story = {
    render: args => ({
        components: { NuiMenu, NuiButton },
        setup() {
            const handleClick = (itemLabel: string) => {
                console.log(`Action for "${itemLabel}" executed. Menu should close.`)
            }
            const itemsWithCloseAction: NuiMenuItem[] = [
                {
                    label: 'Action 1',
                    value: 'action1',
                    onClick: () => handleClick('Action 1')
                },
                {
                    label: 'Submenu',
                    value: 'submenu',
                    children: [
                        {
                            label: 'Sub Action 1',
                            value: 'subaction1',
                            onClick: () => handleClick('Sub Action 1')
                        },
                        {
                            label: 'Sub Action 2',
                            value: 'subaction2',
                            onClick: () => handleClick('Sub Action 2')
                        }
                    ]
                }
            ]
            return { args, itemsWithCloseAction }
        },
        template: `
      <NuiButton>
        Open Menu
        <NuiMenu :items="itemsWithCloseAction" />
      </NuiButton>
    `
    }),
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates that clicking a final menu item executes its action and closes the entire menu tree. Open the menu, navigate to a sub-item, and click it to see the action logged and the menu close.'
            }
        }
    }
}
