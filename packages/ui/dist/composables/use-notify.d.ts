import { NBannerProps } from '../components/NBanner.vue';
import { NButtonProps } from '../components/NButton.vue';
import { NToastProps } from '../components/NToast.vue';
type NNotifyAction = Omit<NButtonProps, 'onClick'> & {
    onClick?: (params: {
        hide: () => Promise<void>;
        executeCallbacks(eventName: string): void;
    }) => void;
};
type NNotifyOptions = Omit<NToastProps, 'tag' | 'onClick'> & Omit<NBannerProps, 'tag' | 'onClick' | 'actions'> & {
    toastTag?: NToastProps['tag'];
    bannerTag?: NBannerProps['tag'];
    bannerClass?: string | string[] | object;
    hideOnAction?: boolean;
    actions?: NNotifyAction[];
    onTimerBegin?: () => void;
    onTimerEnd?: () => void;
    onTimerPause?: () => void;
    onTimerResume?: () => void;
};
export declare function useNotify(): {
    create: (options: NNotifyOptions) => Promise<{
        show: () => Promise<{
            hide: () => Promise<void>;
            onHide: (callback: (...params: any[]) => void) => void;
            onDismiss: (callback: (...params: any[]) => void) => void;
            onCancel: (callback: (...params: any[]) => void) => void;
            onOk: (callback: (...params: any[]) => void) => void;
        }>;
        onShow: (callback: (...params: any[]) => void) => void;
    }>;
    notify: (message: string, options?: NNotifyOptions) => Promise<{
        hide: () => Promise<void>;
        onHide: (callback: (...params: any[]) => void) => void;
        onDismiss: (callback: (...params: any[]) => void) => void;
        onCancel: (callback: (...params: any[]) => void) => void;
        onOk: (callback: (...params: any[]) => void) => void;
    }>;
    success: (message: string, options?: NNotifyOptions) => Promise<{
        hide: () => Promise<void>;
        onHide: (callback: (...params: any[]) => void) => void;
        onDismiss: (callback: (...params: any[]) => void) => void;
        onCancel: (callback: (...params: any[]) => void) => void;
        onOk: (callback: (...params: any[]) => void) => void;
    }>;
    error: (message: string, options?: NNotifyOptions) => Promise<{
        hide: () => Promise<void>;
        onHide: (callback: (...params: any[]) => void) => void;
        onDismiss: (callback: (...params: any[]) => void) => void;
        onCancel: (callback: (...params: any[]) => void) => void;
        onOk: (callback: (...params: any[]) => void) => void;
    }>;
    warning: (message: string, options?: NNotifyOptions) => Promise<{
        hide: () => Promise<void>;
        onHide: (callback: (...params: any[]) => void) => void;
        onDismiss: (callback: (...params: any[]) => void) => void;
        onCancel: (callback: (...params: any[]) => void) => void;
        onOk: (callback: (...params: any[]) => void) => void;
    }>;
    info: (message: string, options?: NNotifyOptions) => Promise<{
        hide: () => Promise<void>;
        onHide: (callback: (...params: any[]) => void) => void;
        onDismiss: (callback: (...params: any[]) => void) => void;
        onCancel: (callback: (...params: any[]) => void) => void;
        onOk: (callback: (...params: any[]) => void) => void;
    }>;
};
export {};
