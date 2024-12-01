type TupleToUnion<T extends any[]> = T[number];
export type XOR<A, B> = ({ [ P in keyof A ]?: P extends keyof B ? A[P] : never } & B) | ({ [ P in keyof B ]?: P extends keyof A ? B[P] : never } & A);
export type OmitMultiple<T, K extends (keyof T)[]> = Omit<T, TupleToUnion<K>>;
