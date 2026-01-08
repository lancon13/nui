import { App } from 'vue';
import { AsyncComponentLoader } from 'vue';
import { Component } from 'vue';
import { ComputedRef } from 'vue';
import { InjectionKey } from 'vue';
import { Ref } from 'vue';
import { UseAsyncStateOptions } from '@vueuse/core';
import { UseRefHistoryOptions } from '@vueuse/core';
import { UseRefHistoryRecord } from '@vueuse/core';
import * as z from 'zod';
import { ZodObject } from 'zod';
import { ZodType } from 'zod';

export declare function asyncLoadComponent(params: string | AsyncComponentLoader<any> | {
    component: string | AsyncComponentLoader<any>;
    delay?: number;
    timeout?: number;
    loadingComponent?: Component;
    errorComponent?: Component;
}): any;

export declare type CamelCase<T> = T extends object ? T extends Array<infer U> ? Array<CamelCase<U>> : {
    [K in keyof T as K extends string ? CamelCaseString<K> : K]: CamelCase<T[K]>;
} : T;

export declare type CamelCaseString<S extends string> = S extends `${infer T}_${infer U}` ? `${Lowercase<T>}${Capitalize<CamelCaseString<U>>}` : Lowercase<S>;

export declare const currencyOptions: {
    label: string;
    value: string;
    description: string;
    symbol: string;
}[];

/**
 * Debounces a function call.
 */
export declare function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T;

/**
 * Returns a promise that resolves after a specified delay.
 */
export declare function delay(ms?: number): Promise<unknown>;

export declare type EnumIndexes<T> = Array<EnumKeys<T>['length']>;

export declare type EnumKeys<T> = Array<keyof T>;

export declare type EnumObject<T> = {
    [I in keyof T]: T[I];
};

export declare type EnumValues<T> = Array<T[keyof T]>;

export declare function findEnumIndex<T extends object>(targetEnum: T, key: keyof T): number | null;

export declare function findEnumKey<T extends object>(targetEnum: T, index: number): keyof T | null;

export declare function fromData<T extends object | object[]>(data: T): SnakeCase<T>;

export declare function fromDataUrl(dataUrl: string, fileName: string): Promise<File>;

export declare function fromFileUrl(fileUrl: string, fileName?: string): Promise<File>;

/**
 * Generates a pseudo-random alphanumeric string.
 */
export declare function generatePseudoRandomKey(): string;

/**
 * Gets an array of the indexes (member indexes) from a TypeScript enum.
 *
 * @param targetEnum The enum object to get the keys from.
 * @returns An array of numbers containing the enum indexes.
 *
 * @example
 * const logLevelKeys = getEnumIndexes(LogLevel);
 * // Output: [0, 1, 2, 3]
 */
export declare function getEnumIndexes<T extends object>(targetEnum: T): EnumIndexes<T>;

/**
 * Gets an array of the keys (member names) from a TypeScript enum.
 *
 * @param targetEnum The enum object to get the keys from.
 * @returns An array of strings containing the enum keys.
 *
 * @example
 * const logLevelKeys = getEnumKeys(LogLevel);
 * // Output: ['DEBUG', 'INFO', 'WARN', 'ERROR']
 */
export declare function getEnumKeys<T extends object>(targetEnum: T): EnumKeys<T>;

/**
 * Gets an object that maps enum keys to their corresponding values.
 *
 * @param targetEnum The enum object to process.
 * @returns An object mapping enum keys to their values.
 *
 * @example
 * const logLevelObject = getEnumObject(LogLevel);
 * // Output:
 * // {
 * //   DEBUG: 0,
 * //   INFO: 1,
 * //   WARN: 2,
 * //   ERROR: 3
 * // }
 */
export declare function getEnumObject<T extends object>(targetEnum: T): EnumObject<T>;

/**
 * Gets an array of the values from a TypeScript enum.
 *
 * @param targetEnum The enum object to get the values from.
 * @returns An array of strings or numbers containing the enum values.
 *
 * @example
 * const logLevelValues = getEnumValues(LogLevel);
 * // Output: [0, 1, 2, 3]
 *
 * const httpMethodValues = getEnumValues(HttpMethod);
 * // Output: ['GET', 'POST', 'PUT', 'DELETE']
 */
export declare function getEnumValues<T extends object>(targetEnum: T): EnumValues<T>;

/**
 * Gets the MIME type of a file.  Uses the file's type property if available,
 * otherwise attempts to determine it from the file name extension.
 *
 * @param file The File object.
 * @returns The MIME type as a string (e.g., 'image/jpeg', 'application/pdf'),
 *          or 'application/octet-stream' if the type cannot be determined.
 */
export declare function getMime(file: File): string;

export declare function getSystemProvider(): App;

export declare function isUUID(str: string): boolean;

export declare const languageOptions: {
    label: string;
    value: string;
}[];

export declare function listChildComponentMethods<T, K extends keyof T>(keys: K[], componentRef: Ref<T>): Record<K, any>;

declare type Option_2<T = any> = {
    label: string;
    value: string;
    data?: T;
};
export { Option_2 as Option }

export declare const questionTypeOptions: {
    label: string;
    value: string;
    questionPlaceholder: string;
    questionCorrectAnswerPlaceholder: string;
    questionHintsPlaceholder: string;
    questionExplanationsPlaceholder: string;
}[];

export declare type SnakeCase<T> = T extends object ? T extends Array<infer U> ? Array<SnakeCase<U>> : {
    [K in keyof T as K extends string ? SnakeCaseString<K> : K]: SnakeCase<T[K]>;
} : T;

export declare type SnakeCaseString<S extends string> = S extends `${infer T}${infer U}` ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${SnakeCaseString<U>}` : S;

export declare const subjectOptions: {
    label: string;
    value: string;
}[];

export declare const systemProviderKey: InjectionKey<App>;

/**
 * Throttles a function call.
 */
export declare function throttle<T extends (...args: any[]) => any>(fn: T, limit: number): T;

export declare function toCamelCase(str: string): string;

export declare function toCapitalCase(str: string): string;

/**
 * Converts various Vue-style class bindings to a single string of space-separated class names.
 */
export declare function toClassName(classBinding: any): string;

export declare function toCurrency(amount: number, currency?: string): string;

export declare function toData<T extends object | object[]>(data: T): CamelCase<T>;

export declare function toDataURL(file: File): Promise<string>;

export declare function toDateInput(date: Date | string | null, format?: string): string;

export declare function toDateString(date: Date | string | null, format?: string): string;

export declare function toInitial(str: string, limit?: number): string;

export declare function toNumber(number: number): string;

export declare function toOptions<T extends object>(options: T | T[], label?: keyof T, value?: keyof T): Option_2[];

export declare function toRawDeep(data: any): any;

export declare function toSnakeCase(str: string): string;

export declare function toTimeString(date: Date | string | null, format?: string): string;

/**
 * Wraps a promise in a try/catch block and returns a [error, result] tuple.
 */
export declare function tryCall<P extends any[], R>(func: (...args: P) => Promise<R>, ...args: P): Promise<[Error | null, R | undefined]>;

export declare type UseCall<P extends any[] = any[], R = unknown> = {
    result: Ref<R>;
    error: Ref<Error | null>;
    isExecuting: Ref<boolean>;
    isLoading: Ref<boolean>;
    isReady: Ref<boolean>;
    call: (...args: P) => Promise<R>;
    immediate: (flag: boolean) => UseCall<P, R>;
    cache: (flag: boolean) => UseCall<P, R>;
    shallow: (flag: boolean) => UseCall<P, R>;
    refresh: () => Promise<R>;
};

export declare function useCall<P extends any[] = any[], R = unknown>(func: (...params: P) => Promise<R>, options?: UseCallOptions<P, R>): UseCall<P, R>;

export declare type UseCallOptions<P, R> = {
    initialParams?: P | Ref<P>;
    initialResult?: R | Ref<R>;
    useCache?: boolean;
    paramsChangedRefresh?: boolean;
    debounce?: number;
    throttle?: number;
    cacheDuration?: number;
    onBefore?: (params: P) => void;
    onAfter?: (params: P, result: R) => void;
    onData?: (params: P, result: R) => void;
} & UseAsyncStateOptions<true, R>;

export declare type UseForm<T extends Record<string, any>> = {
    data: Ref<T>;
    schemas: Ref<ZodObject<any>>;
    errors: ComputedRef<Record<string, z.ZodIssue[]>>;
    changes: ComputedRef<Record<string, any>>;
    modifies: ComputedRef<Record<string, any>>;
    isValid: ComputedRef<boolean>;
    isInvalid: ComputedRef<boolean>;
    isClean: ComputedRef<boolean>;
    isDirty: ComputedRef<boolean>;
    isUnchanged: ComputedRef<boolean>;
    isChanged: ComputedRef<boolean>;
    errorMessages: ComputedRef<Record<string, string>>;
    results: ComputedRef<Record<string, UseFormFieldState>>;
    history: Ref<UseRefHistoryRecord<T>[]>;
    undo: () => void;
    redo: () => void;
    clearHistory: () => void;
    validate: () => void;
    reset: (newData?: T) => Promise<void>;
    clearErrors: () => void;
    clearChanges: () => void;
    clearModifies: () => void;
    getRawData: () => T;
};

export declare function useForm<T extends Record<string, any>>(initialData: T, options?: UseFormOptions): UseForm<T>;

export declare type UseFormFieldState = {
    value: any;
    schema: ZodType<any, any, any>;
    errors: z.ZodIssue[];
    errorMessage: string | null;
    dirtyErrorMessage: string | null;
    changeErrorMessage: string | null;
    isValid: boolean;
    isInvalid: boolean;
    isClean: boolean;
    isDirty: boolean;
    isUnchanged: boolean;
    isChanged: boolean;
};

export declare type UseFormOptions = {
    initialSchemas?: ZodObject<any>;
    immediateValidate?: boolean;
} & UseRefHistoryOptions<any, any>;

export declare const yearLevelOptions: {
    label: string;
    value: string;
}[];

export { }
