import { type HTMLAttributes } from 'vue';
export type NListItemProps = Partial</* @vue-ignore */ HTMLAttributes> & {
    tag?: string;
    to?: string | object;
    href?: string;
    target?: string;
    icon?: string;
    iconClass?: string | object | string[];
    prependIcon?: string;
    prependIconClass?: string | object | string[];
    appendIcon?: string;
    appendIconClass?: string | object | string[];
    disabled?: boolean;
    expandable?: boolean;
    heading?: boolean;
    contentField?: string;
};
type __VLS_Props = NListItemProps;
type __VLS_ModelProps = {
    modelValue?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_11: {}, __VLS_26: {}, __VLS_28: {}, __VLS_43: {};
type __VLS_Slots = {} & {
    prepend?: (props: typeof __VLS_11) => any;
} & {
    append?: (props: typeof __VLS_26) => any;
} & {
    prepend?: (props: typeof __VLS_28) => any;
} & {
    append?: (props: typeof __VLS_43) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {
    expand: () => void;
    collapse: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
} & {
    click: (event: MouseEvent | KeyboardEvent) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onClick?: ((event: MouseEvent | KeyboardEvent) => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
    tag: string;
    contentField: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
