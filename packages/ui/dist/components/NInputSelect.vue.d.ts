import { type HTMLAttributes } from 'vue';
import { type NInputFieldProps } from './NInputField.vue';
export type NInputSelectOption = Record<string, any> & {
    label: string;
    value: string;
};
export type NInputSelectOptionGroup = Record<string, any> & {
    label: string;
    options?: NInputSelectOption[];
};
export type NInputSelectProps = Partial</* @vue-ignore */ HTMLAttributes> & NInputFieldProps & {
    inputClass?: string | string[] | object;
    multiple?: boolean;
    dropdownIcon?: string;
    dropdownIconClass?: string | object | string[];
    options?: NInputSelectOption[] | NInputSelectOptionGroup[];
    formatOption?: (value: string) => string;
    formatOptGroup?: (value: string) => string;
    showCheckmark?: boolean;
};
type __VLS_Props = NInputSelectProps;
type __VLS_ModelProps = {
    modelValue?: string | string[];
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_8: string | number, __VLS_9: any, __VLS_22: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_8>]?: (props: typeof __VLS_9) => any;
} & {
    append?: (props: typeof __VLS_22) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | string[] | undefined) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | string[] | undefined) => any) | undefined;
}>, {
    multiple: boolean;
    dropdownIcon: string;
    dropdownIconClass: string | object | string[];
    showCheckmark: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
