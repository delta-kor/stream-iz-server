import { Document } from 'mongoose';

type DateToNumber<T> = {
  [K in keyof T]: T[K] extends Date ? number : T[K];
};
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
type Unextend<T, Q> = Pick<T, Exclude<keyof T, keyof Q>>;

export type Deserialize<T extends Document> = Partial<
  DateToNumber<NonFunctionProperties<Unextend<T, Document>>>
>;
