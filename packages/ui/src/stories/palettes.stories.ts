import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta = {
    title: 'Palettes',
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
                    <li><div class="bg-primary-dim px-4 py-2">Primary dim</div></li>
                    <li><div class="bg-primary px-4 py-2">Primary</div></li>
                    <li><div class="bg-primary-bright px-4 py-2">Primary bright </div></li>                
                </ul>

                <ul>
                    <li><div class="bg-neutral-dim px-4 py-2">Neutral dim</div></li>
                    <li><div class="bg-neutral px-4 py-2">Neutral</div></li>
                    <li><div class="bg-neutral-bright px-4 py-2">Neutral bright</div></li>                
                </ul>            
            </div>

            <div class="grid grid-cols-4 gap-4">
                <ul>
                    <li><div class="bg-success-dim px-4 py-2">Success dim</div></li>
                    <li><div class="bg-success px-4 py-2">Success</div></li>
                    <li><div class="bg-success-bright px-4 py-2">Success bright </div></li>                
                </ul>
                <ul>
                    <li><div class="bg-error-dim px-4 py-2">Error dim</div></li>
                    <li><div class="bg-error px-4 py-2">Error</div></li>
                    <li><div class="bg-error-bright px-4 py-2">Error bright</div></li>                
                </ul>
                <ul>
                    <li><div class="bg-warning-dim px-4 py-2">Warning dim</div></li>
                    <li><div class="bg-warning px-4 py-2">Warning</div></li>
                    <li><div class="bg-warning-bright px-4 py-2">Warning bright</div></li>                
                </ul>
                <ul>
                    <li><div class="bg-info-dim px-4 py-2">Info dim</div></li>
                    <li><div class="bg-info px-4 py-2">Info</div></li>
                    <li><div class="bg-info-bright px-4 py-2">Info bright</div></li>                
                </ul>            
            </div>

            <div class="bg-surface border-border border-1 flex flex-col justify-center items-center gap-4 p-4 rounded-container shadow-outer">
                <div class="text-center">
                    <div>This is a card</div>
                    <div class="text-text-subtle">This is a description</div>
                </div>
                <div class="bg-sub-surface border-border border-1 p-4 text-center rounded-container shadow-inner">
                    <div>This is a sub-card</div>
                    <div class="text-text-subtle">This is a description</div>
                </div>

                <div class="bg-sub-surface border-border border-1 p-4 text-center rounded-full shadow-inner ">
                    <div>Pilled</div>                    
                </div>

                <div class="bg-sub-surface border-border border-1 p-4 text-center rounded-square shadow-inner ">
                    <div>Squared</div>                    
                </div>
            </div>
            
        </div>
            
        `
    })
}
