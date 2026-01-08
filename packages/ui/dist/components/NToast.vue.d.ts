import { type HTMLAttributes } from 'vue';
export type NToastProps = Partial</* @vue-ignore */ HTMLAttributes> & {
    tag?: string;
    content?: string;
    overlay?: boolean;
    noOverlayHide?: boolean;
    noEscHide?: boolean;
    position?: string;
    focusOnShow?: boolean;
    duration?: number;
    role?: string;
};
type __VLS_Props = NToastProps;
type __VLS_ModelProps = {
    modelValue?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_29: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_29) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {
    show: () => void;
    hide: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
    role: string;
    tag: string;
    overlay: boolean;
    duration: number;
    content: string;
    position: string;
    noOverlayHide: boolean;
    noEscHide: boolean;
    focusOnShow: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
