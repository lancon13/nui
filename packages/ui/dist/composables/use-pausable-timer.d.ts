import { type MaybeRefOrGetter } from 'vue';
export interface UsePausableTimerOptions {
    immediate?: boolean;
}
export declare function usePausableTimer(cb: () => void, interval: MaybeRefOrGetter<number>, options?: UsePausableTimerOptions): {
    start: () => void;
    stop: () => void;
    pause: () => void;
    resume: () => void;
    isPending: import("vue").Ref<boolean, boolean>;
    isPaused: import("vue").Ref<boolean, boolean>;
};
