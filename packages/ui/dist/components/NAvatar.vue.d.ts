import { HTMLAttributes } from 'vue';
export type NAvatarProps = Partial</* @vue-ignore */ HTMLAttributes> & {
    src?: string;
    alt?: string;
    icon?: string;
    label?: string;
    tag?: string;
    to?: string | object;
    href?: string;
    target?: string;
    disabled?: boolean;
};
declare var __VLS_15: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_15) => any;
};
declare const __VLS_base: import("vue").DefineComponent<NAvatarProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    click: (e: MouseEvent | KeyboardEvent) => any;
}, string, import("vue").PublicProps, Readonly<NAvatarProps> & Readonly<{
    onClick?: ((e: MouseEvent | KeyboardEvent) => any) | undefined;
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
