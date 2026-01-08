import dayjs from 'dayjs';
export type DateRange = {
    begin?: string | Date;
    end?: string | Date;
};
export type CalendarValue = string | Date | DateRange;
/**
 * Combines a list of dates and date ranges into a minimal set of non-overlapping ranges/dates.
 * - overlapping or adjacent ranges are merged.
 * - Single day ranges are converted to 'YYYY-MM-DD' strings.
 * - Multi-day ranges are returned as DateRange objects with 'YYYY-MM-DD' strings.
 */
export declare function normalizeDateRanges(values: CalendarValue[]): CalendarValue[];
/**
 * Checks if a given date exists in a list of dates/ranges.
 * Handles string dates, Date objects, and DateRange objects.
 */
export declare function checkDateInList(date: dayjs.Dayjs, list?: CalendarValue[] | null): boolean;
/**
 * Returns the ISO week and year for the start of a given month.
 * Useful for initializing calendar views.
 * @param year Calendar year
 * @param month Month index (0-11)
 */
export declare function getYearWeekFromMonth(year: number, month: number, weekOffset?: number): {
    year: number;
    week: number;
};
/**
 * Returns the approximate Month index (0-11) and Year for a given ISO week.
 * @param year ISO Week Year
 * @param week ISO Week number
 */
export declare function getMonthFromYearWeek(year: number, week: number): {
    year: number;
    month: number;
};
/**
 * Splits a requested date range into multiple visible segments based on a visibility list.
 * If visibleList is null or empty, the entire range is considered visible and returned as a single segment.
 */
export declare function getVisibleSegments(start: dayjs.Dayjs, end: dayjs.Dayjs, visibleList: CalendarValue[] | null): DateRange[];
export interface CalendarDay {
    date: dayjs.Dayjs;
    dateString: string;
    dayOfMonth: number;
    ariaLabel: string;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isDisabled: boolean;
    isVisible: boolean;
    isInvalid: boolean;
    isSelecting: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
    isInRange: boolean;
}
export interface CalendarGenerationConfig extends RangeValidationConfig {
    start: dayjs.Dayjs;
    daysCount: number;
    activeMonth?: number | number[] | null;
    selected: CalendarValue[];
    isRange: boolean;
    pendingStart?: dayjs.Dayjs | null;
    pendingEnd?: dayjs.Dayjs | null;
    pendingInvalid?: boolean;
    hoveredDate?: dayjs.Dayjs | null;
    visible?: CalendarValue[] | null;
}
export interface RangeValidationConfig {
    minRange?: number;
    maxRange?: number;
    disabled?: CalendarValue[];
}
/**
 * Validates if a range is allowed based on min/max length and disabled dates.
 * Note: Visibility is not checked here; ranges crossing hidden dates are considered valid
 * (they will just be split by getVisibleSegments later).
 */
export declare function validateRange(start: dayjs.Dayjs, end: dayjs.Dayjs, config: RangeValidationConfig): boolean;
export declare function generateCalendarDays(config: CalendarGenerationConfig): CalendarDay[];
/**
 * Removes a specific range from a list of calendar values if it exists.
 * Returns a new array with the range removed, or the original array if not found.
 * Does not modify the input array.
 */
export declare function removeMatchingRange(list: CalendarValue[], targetRange: DateRange): CalendarValue[];
