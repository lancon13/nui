# Popover

Popovers are small overlays that display additional information or actions.

## Basic Usage

<div class="my-4 p-8 flex items-center justify-center border border-border rounded vp-raw">
    <NButton class="brand">
        Click or Hover Me
        <NPopover>
            <div class="p-4 bg-surface text-text shadowed rounded-element border border-border">
                <h3 class="font-bold">Popover Content</h3>
                <p class="text-sm mt-2">You can put anything here!</p>
            </div>
        </NPopover>
    </NButton>
</div>

```vue
<NButton>
  Open Popover
  <NPopover>
    <div class="p-4 bg-surface">...</div>
  </NPopover>
</NButton>
```

## Persistent Popover

Persistent popovers don't close when you hover out.

<div class="my-4 p-8 flex items-center justify-center border border-border rounded vp-raw">
    <NButton class="outlined brand">
        Sticky Popover
        <NPopover :triggerByHover="false" :persistent="true" :allowClickToHide="true">
            <div class="p-4 bg-surface text-text shadowed rounded-element border border-border">
                <p>I stay open until you click the button again!</p>
            </div>
        </NPopover>
    </NButton>
</div>

```vue
<NPopover :triggerByHover="false" persistent allowClickToHide />
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `string` | `'bottom'` | placement: `top`, `bottom`, `left`, `right`. |
| `position` | `string` | `''` | alignment: `start`, `end`, or empty for center. |
| `persistent` | `boolean` | `false` | Whether to keep open until explicit close. |
| `triggerByHover` | `boolean` | `true` | Show on hover. |
| `triggerByFocus` | `boolean` | `true` | Show on focus. |
| `triggerByInteraction` | `boolean` | `true` | Show on click/tap. |
| `allowClickToHide` | `boolean` | `false` | Close when clicking the trigger again. |
| `overlay` | `boolean` | `false` | Whether to show an overlay. |
