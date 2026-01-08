import { MaybeRefOrGetter } from 'vue';
export declare function useComponentStack(stackName: MaybeRefOrGetter<string>): {
    register: (itemId: symbol) => void;
    unregister: (itemId: symbol) => void;
    getZIndex: (itemId: symbol) => number;
    getOrderIndex: (itemId: symbol) => number;
    isTop: (itemId: symbol) => boolean;
};
