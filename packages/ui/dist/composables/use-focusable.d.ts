import { type Ref } from 'vue';
export declare function useFocusable(model: Ref<boolean>, contentRef: Ref<HTMLElement | null>, overlay: Ref<boolean>, focusOnShow: Ref<boolean>, delays?: {
    show?: number;
    hide?: number;
}): {
    isFocusTrapped: import("vue").ShallowRef<boolean>;
    pause: () => void;
    unpause: () => void;
    focusContent: () => void;
};
