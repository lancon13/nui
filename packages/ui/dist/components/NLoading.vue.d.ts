import { type HTMLAttributes } from 'vue';
export type NLoadingProps = Partial</* @vue-ignore */ HTMLAttributes> & {
    name?: string;
    class?: string | string[] | object;
    overlay?: boolean;
};
declare const __VLS_export: import("vue").DefineComponent<NLoadingProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<NLoadingProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
