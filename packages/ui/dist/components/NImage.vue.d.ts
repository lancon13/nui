import { type HTMLAttributes } from 'vue';
export type NImageProps = Partial</* @vue-ignore */ HTMLAttributes> & {
    src: string;
    alt?: string;
    srcset?: string;
    sizes?: string;
    lazy?: boolean;
    aspectRatio?: string;
    fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    width?: string | number;
    height?: string | number;
    containerClass?: string | string[] | object;
    placeholderClass?: string | string[] | object;
    errorClass?: string | string[] | object;
    threshold?: number;
    loading?: boolean;
    loadingName?: string;
    loadingClass?: string | string[] | object;
};
declare var __VLS_6: {}, __VLS_12: {};
type __VLS_Slots = {} & {
    placeholder?: (props: typeof __VLS_6) => any;
} & {
    error?: (props: typeof __VLS_12) => any;
};
declare const __VLS_base: import("vue").DefineComponent<NImageProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    error: (event: Event) => any;
    load: (event: Event) => any;
}, string, import("vue").PublicProps, Readonly<NImageProps> & Readonly<{
    onError?: ((event: Event) => any) | undefined;
    onLoad?: ((event: Event) => any) | undefined;
}>, {
    alt: string;
    fit: "cover" | "contain" | "fill" | "none" | "scale-down";
    lazy: boolean;
    threshold: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
