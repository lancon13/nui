import { MaybeRefOrGetter, ref, toValue, watch } from 'vue'
import { generatePseudoRandomKey } from '../helpers/tools'

const BASE_Z_INDEX = 1000
const Z_INDEX_STEP = 10
const stacks = ref(new Map<string, { stackId: symbol; itemId: symbol }[]>())

export function useComponentStack(stackName: MaybeRefOrGetter<string>) {
    const stackId = Symbol(`stack-id-${generatePseudoRandomKey()}`)
    watch(
        () => toValue(stackName),
        (newStackName, oldStackName) => {
            // Transfer any existing items to the new stack
            const oldStack = (oldStackName && stacks.value.get(oldStackName)) || []
            const newStack = stacks.value.get(newStackName) ?? []

            oldStack
                .filter(({ stackId: _stackId }) => _stackId === stackId)
                .forEach((item, index) => {
                    newStack.push(item)
                    oldStack.splice(index, 1)
                })
        },
        { immediate: true }
    )

    function getStack() {
        if (!stacks.value.has(toValue(stackName))) stacks.value.set(toValue(stackName), [])
        return stacks.value.get(toValue(stackName))!
    }

    // Add a modal to the stack
    const register = (itemId: symbol) => {
        const stack = getStack()
        if (!stack.find(({ itemId: _itemId }) => _itemId === itemId)) {
            stacks.value.set(toValue(stackName), [...stack, { stackId, itemId }])
        }
    }

    // Remove a modal from the stack
    const unregister = (itemId: symbol) => {
        stacks.value.set(
            toValue(stackName),
            getStack().filter(({ itemId: _itemId }) => _itemId === itemId)
        )
    }

    // Calculate Z-Index based on position in stack
    const getZIndex = (itemId: symbol) => {
        const stack = getStack()
        const index = stack.findIndex(({ itemId: _itemId }) => _itemId === itemId)
        if (index === -1) return BASE_Z_INDEX
        return BASE_Z_INDEX + index * Z_INDEX_STEP
    }

    // Return order index based on position in stack
    const getOrderIndex = (itemId: symbol) => {
        const stack = getStack()
        return stack.findIndex(({ itemId: _itemId }) => _itemId === itemId)
    }

    // Check if this modal is the one on top (for ESC key logic)
    const isTop = (itemId: symbol) => {
        const stack = getStack()
        return stack[stack.length - 1]?.itemId === itemId
    }

    return {
        register,
        unregister,
        getZIndex,
        getOrderIndex,
        isTop
    }
}
