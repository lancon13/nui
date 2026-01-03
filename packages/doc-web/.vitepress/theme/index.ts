import DefaultTheme from 'vitepress/theme-without-fonts'
import './style.css'
import * as components from '@nui/ui/components'

if (typeof window !== 'undefined') {
    const killAggressiveA11y = () => {
        // Look through all stylesheets loaded in the document
        for (const sheet of document.styleSheets) {
            try {
                const rules = sheet.cssRules || sheet.rules
                for (let i = 0; i < rules.length; i++) {
                    const rule = rules[i]

                    // Check if it's a Media Rule for prefers-reduced-motion
                    if (rule instanceof CSSMediaRule && rule.conditionText.includes('prefers-reduced-motion')) {
                        // Check if it contains the aggressive !important resets
                        // Usually VitePress targets '*' or '*, ::before, ::after'
                        if (rule.cssRules[0]?.cssText.includes('!important')) {
                            sheet.deleteRule(i)
                            console.log('Successfully removed VitePress aggressive motion resets.')
                            return // Exit once found and removed
                        }
                    }
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e) {
                // Accessing cross-origin stylesheets might throw an error, so we skip them
                continue
            }
        }
    }

    // Run it immediately
    killAggressiveA11y()
}

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        for (const [name, component] of Object.entries(components)) {
            app.component(name, component)
        }
    }
}
