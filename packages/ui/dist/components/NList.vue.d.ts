import { type HTMLAttributes } from 'vue';
import { type NListItemProps } from './NListItem.vue';
export type NListItemData = Record<string, any> & Partial<NListItemProps>;
export type NListProps = Partial</* @vue-ignore */ HTMLAttributes> & {
    tag?: string;
    items?: NListItemData[];
    valueField?: string;
    childrenField?: string;
    contentField?: string;
};
declare const __VLS_export: import("vue").DefineComponent<NListProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<NListProps> & Readonly<{}>, {
    tag: string;
    contentField: string;
    valueField: string;
    childrenField: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
