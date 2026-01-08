import { type HTMLAttributes } from 'vue';
export type NFormProps = Partial</* @vue-ignore */ HTMLAttributes> & {
    tag?: string;
    title?: string;
    titleTag?: string;
    titleClass?: string | string[] | object;
    message?: string;
    status?: 'success' | 'error' | 'warning' | 'info';
};
declare var __VLS_7: {}, __VLS_14: {}, __VLS_20: {};
type __VLS_Slots = {} & {
    title?: (props: typeof __VLS_7) => any;
} & {
    message?: (props: typeof __VLS_14) => any;
} & {
    default?: (props: typeof __VLS_20) => any;
};
declare const __VLS_base: import("vue").DefineComponent<NFormProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<NFormProps> & Readonly<{}>, {
    tag: string;
    status: "success" | "error" | "warning" | "info";
    titleTag: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
