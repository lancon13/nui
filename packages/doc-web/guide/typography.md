# Typography

NUI provides a set of typography utilities and base styles to ensure consistent text hierarchy and readability across your application.

## Utility Classes

For situations where you cannot use standard tags (or need specific styling on a different element), helper classes are available.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <div>
        <div class="title-text">Title Text</div>
        <div class="text-sm text-gray-500">.title-text (text-5xl font-semibold)</div>
    </div>
    <div>
        <div class="sub-title-text">Sub-Title Text</div>
        <div class="text-sm text-gray-500">.sub-title-text (text-xl font-semibold)</div>
    </div>
    <div>
        <div class="label-text">Label Text</div>
        <div class="text-sm text-gray-500">.label-text (font-semibold)</div>
    </div>
    <div>
        <div class="body-text">Body Text</div>
        <div class="text-sm text-gray-500">.body-text (text-base)</div>
    </div>
    <div>
        <div class="caption-text">Caption Text</div>
        <div class="text-sm text-gray-500">.caption-text (text-xs font-bold)</div>
    </div>
</div>

```html
<p class="title-text">Large Title</p>
<span class="label-text">Form Label</span>
<span class="caption-text">Small metadata</span>
```

## Links

Links (`<a>` tags with an `href`) are automatically styled with cursor pointers and hover effects. You can also apply the `.link-text` class to non-anchor elements to mimic this behavior.

<div class="flex flex-col gap-4 my-4 vp-raw">
    <div>
        <a href="#" @click.prevent>Standard Link</a>
    </div>
    <div>
        <span class="link-text">Span acting as link</span>
    </div>
</div>

```html
<a href="#">I am a link</a> <span class="link-text" @click="go">I look like a link</span>
```
