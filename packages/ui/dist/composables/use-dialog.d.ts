import { VNode } from 'vue';
import { NButtonProps } from '../components/NButton.vue';
import { NCardProps } from '../components/NCard.vue';
import { NModalProps } from '../components/NModal.vue';
type NDialogAction = Omit<NButtonProps, 'onClick'> & {
    onClick?: (params: {
        hide: () => Promise<void>;
        executeCallbacks(eventName: string): void;
    }) => void;
};
export type NDialogOptions = Omit<NModalProps, 'tag' | 'content'> & Omit<NCardProps, 'tag' | 'clickable' | 'to' | 'href' | 'target'> & {
    modalTag?: NModalProps['tag'];
    class?: string | string[] | object;
    cardTag?: NCardProps['tag'];
    cardClass?: string | string[] | object;
    title?: string;
    content?: string | VNode;
    hideOnAction?: boolean;
    loadingName?: string;
    loadingClass?: string | string[] | object;
    actions?: NDialogAction[];
    closeButton?: boolean;
    role?: string;
    cardHeaderClass?: string | string[] | object;
    cardFooterClass?: string | string[] | object;
};
export declare function useDialog(): {
    create: (dialogOptions?: NDialogOptions) => Promise<{
        show: () => Promise<{
            hide: () => Promise<void>;
            onHide: (callback: (...params: any[]) => void) => void;
            onDismiss: (callback: (...params: any[]) => void) => void;
            onCancel: (callback: (...params: any[]) => void) => void;
            onOk: (callback: (...params: any[]) => void) => void;
        }>;
        onShow: (callback: (...params: any[]) => void) => void;
    }>;
    dialog: (options: NDialogOptions) => Promise<{
        hide: () => Promise<void>;
        onHide: (callback: (...params: any[]) => void) => void;
        onDismiss: (callback: (...params: any[]) => void) => void;
        onCancel: (callback: (...params: any[]) => void) => void;
        onOk: (callback: (...params: any[]) => void) => void;
    }>;
    alert: (title: string, message: string, options?: Omit<NDialogOptions, "title" | "content">) => Promise<void>;
    confirm: (title: string, message: string, options?: Omit<NDialogOptions, "title" | "content">) => Promise<"cancel" | "ok" | null>;
    prompt: (title: string, message: string, defaultValue?: string) => Promise<string | null>;
};
export {};
