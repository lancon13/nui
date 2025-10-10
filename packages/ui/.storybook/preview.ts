import { setup } from '@storybook/vue3-vite'
import './main.css'

setup(() => {
    // app.use(MyPlugin)
    // app.component('my-component', MyComponent)
    // app.mixin({
    //     My mixin
    // })
})

export const parameters = {
    a11y: {
        // 'todo' - show a11y violations in the test UI only
        // 'error' - fail CI on a11y violations
        // 'off' - skip a11y checks entirely
        // test: 'todo'
    }
}
