import { ref } from 'vue'

const stacks = ref(new Map<string, symbol[]>())
export function useComponentStack(stackName: string) {
    const BASE_Z_INDEX = 1000
    const Z_INDEX_STEP = 10

    function getStack() {
        if (!stacks.value.has(stackName)) stacks.value.set(stackName, [])
        return stacks.value.get(stackName)!
    }

    // Add a modal to the stack
    const register = (id: symbol) => {
        const stack = getStack()
        if (!stack.includes(id)) {
            stacks.value.set(stackName, [...stack, id])
        }
    }

    // Remove a modal from the stack
    const unregister = (id: symbol) => {
        stacks.value.set(
            stackName,
            getStack().filter(itemId => itemId !== id)
        )
    }

    // Calculate Z-Index based on position in stack
    const getZIndex = (id: symbol) => {
        const stack = getStack()
        const index = stack.indexOf(id)
        if (index === -1) return BASE_Z_INDEX
        return BASE_Z_INDEX + index * Z_INDEX_STEP
    }

    // Check if this modal is the one on top (for ESC key logic)
    const isTop = (id: symbol) => {
        const stack = getStack()
        return stack[stack.length - 1] === id
    }

    return {
        register,
        unregister,
        getZIndex,
        isTop
    }
}
