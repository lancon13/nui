import { HTMLAttributes } from 'vue';
import { NButtonProps } from './NButton.vue';
export type NBannerProps = Partial</* @vue-ignore */ HTMLAttributes> & {
    tag?: string;
    label?: string;
    icon?: string;
    iconClass?: string | object | string[];
    labelClass?: string | object | string[];
    actionsClass?: string | object | string[];
    inlineActions?: boolean;
    duration?: number;
    showProgress?: boolean;
    actions?: NButtonProps[];
};
type __VLS_Props = NBannerProps;
type __VLS_ModelProps = {
    modelValue?: boolean;
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_13: {}, __VLS_24: {}, __VLS_30: {};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_13) => any;
} & {
    actions?: (props: typeof __VLS_24) => any;
} & {
    progress?: (props: typeof __VLS_30) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: boolean) => any;
} & {
    "timer-begin": () => any;
    "timer-end": () => any;
    "timer-pause": () => any;
    "timer-resume": () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    "onTimer-begin"?: (() => any) | undefined;
    "onTimer-end"?: (() => any) | undefined;
    "onTimer-pause"?: (() => any) | undefined;
    "onTimer-resume"?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}>, {
    tag: string;
    duration: number;
    inlineActions: boolean;
    showProgress: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
