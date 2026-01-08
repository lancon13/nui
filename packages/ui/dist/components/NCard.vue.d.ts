import { HTMLAttributes } from 'vue';
export type NCardProps = Partial</* @vue-ignore */ HTMLAttributes> & {
    tag?: string;
    loading?: boolean;
    loadingName?: string;
    loadingClass?: string | string[] | object;
    to?: string | object;
    href?: string;
    target?: string;
    disabled?: boolean;
    onClick?: (e: MouseEvent | KeyboardEvent) => void;
};
declare var __VLS_11: {}, __VLS_13: {}, __VLS_15: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_11) => any;
} & {
    default?: (props: typeof __VLS_13) => any;
} & {
    loading?: (props: typeof __VLS_15) => any;
};
declare const __VLS_base: import("vue").DefineComponent<NCardProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<NCardProps> & Readonly<{}>, {
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
