export type SnakeCaseString<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${SnakeCaseString<U>}`
  : S;

export type SnakeCase<T> = T extends object
  ? T extends Array<infer U>
    ? Array<SnakeCase<U>>
    : { [K in keyof T as K extends string ? SnakeCaseString<K> : K]: SnakeCase<T[K]> }
  : T;

export type CamelCaseString<S extends string> = S extends `${infer T}_${infer U}`
  ? `${Lowercase<T>}${Capitalize<CamelCaseString<U>>}`
  : Lowercase<S>;

export type CamelCase<T> = T extends object
  ? T extends Array<infer U>
    ? Array<CamelCase<U>>
    : { [K in keyof T as K extends string ? CamelCaseString<K> : K]: CamelCase<T[K]> }
  : T;
