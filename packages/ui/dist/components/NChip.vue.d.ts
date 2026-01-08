import { HTMLAttributes } from 'vue';
export type NChipProps = Partial</* @vue-ignore */ HTMLAttributes> & {
    icon?: string;
    prependIcon?: string;
    appendIcon?: string;
    tag?: string;
    label?: string;
    removable?: boolean;
    removableClass?: string | string[] | object;
    clickable?: boolean;
    to?: string | object;
    href?: string;
    target?: string;
    disabled?: boolean;
};
declare var __VLS_11: {}, __VLS_17: {}, __VLS_23: {}, __VLS_25: {};
type __VLS_Slots = {} & {
    prepend?: (props: typeof __VLS_11) => any;
} & {
    default?: (props: typeof __VLS_17) => any;
} & {
    append?: (props: typeof __VLS_23) => any;
} & {
    removable?: (props: typeof __VLS_25) => any;
};
declare const __VLS_base: import("vue").DefineComponent<NChipProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (e: MouseEvent | KeyboardEvent) => any;
    remove: () => any;
}, string, import("vue").PublicProps, Readonly<NChipProps> & Readonly<{
    onClick?: ((e: MouseEvent | KeyboardEvent) => any) | undefined;
    onRemove?: (() => any) | undefined;
}>, {
    tag: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
