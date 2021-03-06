import { Document } from 'mongoose';

type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
type Unextend<T, Q> = Pick<T, Exclude<keyof T, keyof Q>>;

export type Deserialize<T extends Document> = Partial<NonFunctionProperties<Unextend<T, Document>>>;
