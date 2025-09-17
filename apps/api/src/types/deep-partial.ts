export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends string | number | boolean | Date | undefined
    ? T[P]
    : T[P] extends Array<any>
      ? DeepPartial<T[P][0]>
      : DeepPartial<T[P]>;
};
