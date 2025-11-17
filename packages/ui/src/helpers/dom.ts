export const getElement = (selector: HTMLElement | string | null, parent = document): HTMLElement | null => {
    if (typeof selector === 'string') {
        return parent.querySelector(selector)
    }
    return selector
}
