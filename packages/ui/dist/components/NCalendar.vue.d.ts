import dayjs from 'dayjs';
import { type CalendarValue } from '../helpers';
export interface CalendarViewProps {
    viewingYear?: number;
    viewingWeek?: number;
    firstDayOfWeek?: number;
    rows?: number;
    weekLabelNames?: string[];
    weekLabelClass?: string[];
    activeMonth?: number | number[] | null;
    disabled?: CalendarValue[];
    visible?: CalendarValue[];
    viewClass?: string | string[] | object;
    weekLabelContainerClass?: string | string[] | object;
    gridClass?: string | string[] | object;
    gridCellClass?: string | string[] | object;
}
export interface NCalendarProps extends CalendarViewProps {
    modelValue?: CalendarValue[] | CalendarValue | null;
    multiple?: boolean;
    selectable?: boolean;
    unselectable?: boolean;
    range?: boolean;
    numViews?: number;
    maxRange?: number;
    minRange?: number;
    views?: CalendarViewProps[];
    containerClass?: string | string[] | object;
}
declare function setMonth(month: number, year?: number | string): void;
declare var __VLS_2: `calendar-header-${number}`, __VLS_3: {
    index: number;
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
}, __VLS_5: {
    index: number;
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
}, __VLS_7: {
    calendarIndex: number;
}, __VLS_10: `week-label-${number}`, __VLS_11: {
    day: string;
    index: number;
    calendarIndex: number;
}, __VLS_13: {
    day: import("../helpers").CalendarDay;
    calendarIndex: number;
}, __VLS_15: {
    index: number;
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_2>]?: (props: typeof __VLS_3) => any;
} & {
    [K in NonNullable<typeof __VLS_10>]?: (props: typeof __VLS_11) => any;
} & {
    'calendar-header'?: (props: typeof __VLS_5) => any;
} & {
    'week-label-container'?: (props: typeof __VLS_7) => any;
} & {
    cell?: (props: typeof __VLS_13) => any;
} & {
    'calendar-footer'?: (props: typeof __VLS_15) => any;
};
declare const __VLS_base: import("vue").DefineComponent<NCalendarProps, {
    setMonth: typeof setMonth;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: CalendarValue | CalendarValue[] | null) => any;
    "update:viewingWeek": (value: number) => any;
    "update:viewingYear": (value: number) => any;
}, string, import("vue").PublicProps, Readonly<NCalendarProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: CalendarValue | CalendarValue[] | null) => any) | undefined;
    "onUpdate:viewingWeek"?: ((value: number) => any) | undefined;
    "onUpdate:viewingYear"?: ((value: number) => any) | undefined;
}>, {
    unselectable: boolean;
    disabled: CalendarValue[];
    modelValue: CalendarValue[] | CalendarValue | null;
    activeMonth: number | number[] | null;
    visible: CalendarValue[];
    multiple: boolean;
    selectable: boolean;
    range: boolean;
    numViews: number;
    maxRange: number;
    minRange: number;
    views: CalendarViewProps[];
    containerClass: string | string[] | object;
    viewingYear: number;
    viewingWeek: number;
    firstDayOfWeek: number;
    rows: number;
    weekLabelNames: string[];
    weekLabelClass: string[];
    viewClass: string | string[] | object;
    weekLabelContainerClass: string | string[] | object;
    gridClass: string | string[] | object;
    gridCellClass: string | string[] | object;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
