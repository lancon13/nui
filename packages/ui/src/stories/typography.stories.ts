import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
    title: 'Typography',
    tags: ['autodocs'],

    parameters: {
        layout: 'centered'
    }
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => ({
        setup() {
            return {}
        },
        template: `
        
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
                <ul>                
                    <li><h1>Heading 1</h1></li>
                    <li><h2>Heading 2</h2></li>
                    <li><h3>Heading 3</h3></li>
                    <li><h4>Heading 4</h4></li>
                    <li><h5>Heading 5</h5></li>
                    <li><h6>Heading 6</h6></li>                
                </ul>

                <ul>                
                    <li><h1 class="title-text mb-2">Title text</h1></li>
                    <li><h2 class="sub-title-text mb-2">Sub-Title text</h1></li>
                    <li><label class="label-text mb-2">Label text</label></li>
                    <li><p class="body-text mb-2">Body text</p></li>
                    <li><div class="caption-text mb-2">Caption text</p></li>
                </ul>
            </div>
            
        </div>
            
        `
    })
}
