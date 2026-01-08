import { type HTMLAttributes } from 'vue';
import { type NInputFieldProps } from './NInputField.vue';
export type NInputTextProps = Partial</* @vue-ignore */ HTMLAttributes> & NInputFieldProps & {
    type?: string;
    inputClass?: string | string[] | object;
    debounce?: number;
    size?: 'small' | 'medium' | 'large';
    helperText?: string;
};
type __VLS_Props = NInputTextProps;
type __VLS_ModelProps = {
    modelValue?: string | number;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_8: string | number, __VLS_9: any;
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_8>]?: (props: typeof __VLS_9) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | number) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
}>, {
    type: string;
    size: "small" | "medium" | "large";
    debounce: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
