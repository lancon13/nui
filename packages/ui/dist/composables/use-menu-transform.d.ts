import { type Slots, type VNodeChild } from 'vue';
export declare function useMenuTransform(slots: Slots, submenuProps?: {
    direction: string;
    position: string;
    stacked: boolean;
}): {
    transformedNodes: import("vue").ComputedRef<VNodeChild[]>;
};
