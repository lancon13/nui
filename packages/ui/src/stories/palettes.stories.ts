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
                    <li><div class="bg-brand-dark px-4 py-2">Brand dark</div></li>
                    <li><div class="bg-brand px-4 py-2">Brand</div></li>
                    <li><div class="bg-brand-light px-4 py-2">Brand light </div></li>                
                </ul>

                <ul>
                    <li><div class="bg-neutral-dark px-4 py-2">Neutral dark</div></li>
                    <li><div class="bg-neutral px-4 py-2">Neutral</div></li>
                    <li><div class="bg-neutral-light px-4 py-2">Neutral light</div></li>                
                </ul>            
            </div>

            <div class="grid grid-cols-4 gap-4">
                <ul>
                    <li><div class="bg-success-dark px-4 py-2">Success dark</div></li>
                    <li><div class="bg-success px-4 py-2">Success</div></li>
                    <li><div class="bg-success-light px-4 py-2">Success light </div></li>                
                </ul>
                <ul>
                    <li><div class="bg-error-dark px-4 py-2">Error dark</div></li>
                    <li><div class="bg-error px-4 py-2">Error</div></li>
                    <li><div class="bg-error-light px-4 py-2">Error light</div></li>                
                </ul>
                <ul>
                    <li><div class="bg-warning-dark px-4 py-2">Warning dark</div></li>
                    <li><div class="bg-warning px-4 py-2">Warning</div></li>
                    <li><div class="bg-warning-light px-4 py-2">Warning light</div></li>                
                </ul>
                <ul>
                    <li><div class="bg-info-dark px-4 py-2">Info dark</div></li>
                    <li><div class="bg-info px-4 py-2">Info</div></li>
                    <li><div class="bg-info-light px-4 py-2">Info light</div></li>                
                </ul>            
            </div>

            <div class="bg-surface border-border border-1 flex flex-col justify-center items-center gap-4 p-4 rounded-container shadow-outer">
                <div class="text-center">
                    <div>This is a card</div>
                    <div class="text-text-dark">This is a description</div>
                </div>
                <div class="bg-sub-surface border-border border-1 p-4 text-center rounded-container shadow-outer">
                    <div>This is a sub-card</div>
                    <div class="text-text-dark">This is a description</div>
                </div>

                <div class="bg-sub-surface border-border border-1 p-4 text-center rounded-full">
                    <div>Pilled</div>                    
                </div>

                <div class="bg-sub-surface border-border border-1 p-4 text-center rounded-square">
                    <div>Squared</div>                    
                </div>
            </div>
            
        </div>
            
        `
    })
}
