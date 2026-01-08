import { type HTMLAttributes } from 'vue';
import { type NInputFieldProps } from './NInputField.vue';
import { type NListItemData } from './NList.vue';
export type NInputComboProps = Partial</* @vue-ignore */ HTMLAttributes> & NInputFieldProps & {
    multiple?: boolean;
    closeDropdownOnSelected?: boolean;
    items?: NListItemData[];
    dropdownIcon?: string;
    dropdownIconClass?: string | string[] | object;
    inputClass?: string | string[] | object;
    popoverClass?: string | string[] | object;
    listClass?: string | string[] | object;
    labelField?: string;
    childrenField?: string;
    valueField?: string;
    useInput?: boolean;
    clearable?: boolean;
    fillInput?: boolean | 'label' | 'value';
    blurOnSelected?: boolean;
    chipProps?: Record<string, any>;
    menuProps?: Record<string, any>;
    disabled?: boolean;
    valueClass?: string | string[] | object;
    debounce?: number;
};
type __VLS_Props = NInputComboProps;
declare const __VLS_defaultModels: {
    inputValue: string;
    dropdown: boolean;
};
type __VLS_ModelProps = {
    modelValue?: string | string[] | number | number[];
    'inputValue'?: string;
    'dropdown'?: typeof __VLS_defaultModels['dropdown'];
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_8: string | number, __VLS_9: any, __VLS_12: {
    item: any;
    index: number;
    remove: () => void;
}, __VLS_32: {
    item: any;
}, __VLS_35: {
    item: any;
}, __VLS_49: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_8>]?: (props: typeof __VLS_9) => any;
} & {
    chip?: (props: typeof __VLS_12) => any;
} & {
    item?: (props: typeof __VLS_32) => any;
} & {
    'item-content'?: (props: typeof __VLS_35) => any;
} & {
    append?: (props: typeof __VLS_49) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: string | number | string[] | number[] | undefined) => any;
    "update:inputValue": (value: string) => any;
    "update:dropdown": (value: boolean) => any;
} & {
    filter: (value: string) => any;
    clear: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onFilter?: ((value: string) => any) | undefined;
    onClear?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | number | string[] | number[] | undefined) => any) | undefined;
    "onUpdate:inputValue"?: ((value: string) => any) | undefined;
    "onUpdate:dropdown"?: ((value: boolean) => any) | undefined;
}>, {
    disabled: boolean;
    loadingName: string;
    multiple: boolean;
    listClass: string | string[] | object;
    items: NListItemData[];
    valueField: string;
    childrenField: string;
    debounce: number;
    dropdownIcon: string;
    dropdownIconClass: string | string[] | object;
    closeDropdownOnSelected: boolean;
    labelField: string;
    useInput: boolean;
    clearable: boolean;
    fillInput: boolean | "label" | "value";
    blurOnSelected: boolean;
    chipProps: Record<string, any>;
    valueClass: string | string[] | object;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
