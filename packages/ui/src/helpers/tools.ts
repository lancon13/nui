export function generatePseudoRandomKey() {
    return Math.random().toString(36).substring(2, 15)
}

export function toClassName(classBinding: string | string[] | object): string {
    if (typeof classBinding === 'string') {
        return classBinding
    } else if (Array.isArray(classBinding)) {
        return classBinding
            .filter(item => item) // Remove null, undefined, or empty strings
            .map(item => toClassName(item)) // Recursively handle nested arrays/objects
            .join(' ')
    } else if (typeof classBinding === 'object' && classBinding !== null) {
        return Object.entries(classBinding)
            .filter(([, value]) => value) // Keep only truthy values
            .map(([key]) => key)
            .join(' ')
    }
    return ''
}
