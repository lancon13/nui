import { HTMLAttributes } from 'vue';
export type NButtonProps = Partial</* @vue-ignore */ HTMLAttributes> & {
    icon?: string;
    iconClass?: string | object | string[];
    prependIcon?: string;
    prependIconClass?: string | object | string[];
    appendIcon?: string;
    appendIconClass?: string | object | string[];
    label?: string;
    tag?: string;
    type?: string;
    loading?: boolean;
    loadingName?: string;
    loadingClass?: string | string[] | object;
    to?: string | object;
    href?: string;
    target?: string;
};
declare var __VLS_7: {}, __VLS_18: {}, __VLS_33: {};
type __VLS_Slots = {} & {
    loading?: (props: typeof __VLS_7) => any;
} & {
    prepend?: (props: typeof __VLS_18) => any;
} & {
    append?: (props: typeof __VLS_33) => any;
};
declare const __VLS_base: import("vue").DefineComponent<NButtonProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<NButtonProps> & Readonly<{}>, {
    tag: string;
    type: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
