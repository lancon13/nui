import { VNode } from 'vue';
import { NModalProps } from '../components/NModal.vue';
export type NModalOptions = Omit<NModalProps, 'tag' | 'content'> & {
    content?: string | VNode | VNode[];
};
export type NModalLoadingOptions = NModalOptions & {
    titleClass?: string | string[] | object;
    loadingClass?: string | string[] | object;
};
export declare function useModal(): {
    create: (options: NModalOptions) => Promise<{
        show: () => Promise<{
            hide: () => Promise<void>;
            onHide: (callback: (...params: any[]) => void) => void;
        }>;
        onShow: (callback: (...params: any[]) => void) => void;
    }>;
    loading: (name: string, message: string, options?: NModalLoadingOptions) => Promise<{
        hide: () => Promise<void>;
        onHide: (callback: (...params: any[]) => void) => void;
    }>;
};
