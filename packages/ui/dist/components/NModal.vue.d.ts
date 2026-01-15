import { type HTMLAttributes } from 'vue';
export type NModalDirection = 'center' | 'top' | 'bottom' | 'left' | 'right';
export type NModalProps = Partial</* @vue-ignore */ HTMLAttributes> & {
    tag?: string;
    content?: string;
    overlay?: boolean;
    noOverlayHide?: boolean;
    noEscHide?: boolean;
    direction?: NModalDirection;
    persist?: boolean;
    focusOnShow?: boolean;
    role?: string;
};
type __VLS_Props = NModalProps;
type __VLS_ModelProps = {
    modelValue?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_27: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_27) => any;
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
    content: string;
    noOverlayHide: boolean;
    noEscHide: boolean;
    direction: NModalDirection;
    persist: boolean;
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
