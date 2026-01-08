import { type Placement } from '@floating-ui/vue';
import { type MaybeRefOrGetter, type Ref, type WritableComputedRef } from 'vue';
export interface UseFloatingProps {
    showDelay?: number;
    hideDelay?: number;
    persistent?: boolean;
    allowClickToHide?: boolean;
    triggerByHover?: boolean;
    triggerByFocus?: boolean;
    triggerByInteraction?: boolean;
    hoverTriggerAnchor?: HTMLElement | string | null;
    focusTriggerAnchor?: HTMLElement | string | null;
    clickTriggerAnchor?: HTMLElement | string | null;
    autoReposition?: boolean;
    margin?: number;
    offset?: [number, number];
}
export declare function useFloating(propsOrRef: MaybeRefOrGetter<UseFloatingProps>, options: {
    model: WritableComputedRef<boolean>;
    contentRef: Ref<HTMLElement | null>;
    attachParentEl: Ref<HTMLElement | null>;
    placement: Ref<Placement>;
}): {
    show: () => void;
    hide: (skipReturnFocus?: boolean) => void;
    handleContentHoverFocusIn: () => void;
    handleContentHoverFocusOut: () => void;
    compStyles: import("vue").ComputedRef<{
        position: import("@floating-ui/vue").Strategy;
        top: string;
        left: string;
    }>;
    placement: Readonly<Ref<Placement, Placement>>;
    parentWidth: import("vue").ShallowRef<number, number>;
    parentHeight: import("vue").ShallowRef<number, number>;
};
