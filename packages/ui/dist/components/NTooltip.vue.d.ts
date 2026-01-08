import { type HTMLAttributes } from 'vue';
export type NTooltipDirection = 'top' | 'bottom' | 'left' | 'right';
export type NTooltipPosition = 'start' | '' | 'end';
export type NTooltipProps = Partial</* @vue-ignore */ HTMLAttributes> & {
    tag?: string;
    content?: string;
    showDelay?: number;
    hideDelay?: number;
    persistent?: boolean;
    hoverTriggerAnchor?: HTMLElement | string | null;
    focusTriggerAnchor?: HTMLElement | string | null;
    clickTriggerAnchor?: HTMLElement | string | null;
    attachParent?: HTMLElement | string | null;
    triggerByHover?: boolean;
    triggerByFocus?: boolean;
    triggerByInteraction?: boolean;
    allowClickToHide?: boolean;
    direction?: NTooltipDirection;
    position?: NTooltipPosition;
    margin?: number;
    offset?: [number, number];
    autoReposition?: boolean;
    stacked?: boolean;
    overlay?: boolean;
    fit?: boolean;
    role?: string;
};
type __VLS_Props = NTooltipProps;
type __VLS_ModelProps = {
    modelValue?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_13: {}, __VLS_32: {}, __VLS_41: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_13) => any;
} & {
    default?: (props: typeof __VLS_32) => any;
} & {
    default?: (props: typeof __VLS_41) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {
    show: () => void;
    hide: (skipReturnFocus?: boolean) => void;
    contentRef: Readonly<import("vue").ShallowRef<HTMLElement | null>>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
    role: string;
    tag: string;
    overlay: boolean;
    content: string;
    showDelay: number;
    hideDelay: number;
    persistent: boolean;
    triggerByHover: boolean;
    triggerByFocus: boolean;
    triggerByInteraction: boolean;
    allowClickToHide: boolean;
    direction: NTooltipDirection;
    position: NTooltipPosition;
    margin: number;
    offset: [number, number];
    autoReposition: boolean;
    stacked: boolean;
    fit: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
