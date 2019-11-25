/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { ClassType, IClassType } from "../../class/type";

/** The class hook return type */
export default interface IUseClass<C extends IClassType<ClassType>> {
    /** The saved value */
    savedValue?: C;
    /** The temp value */
    tempValue: C;
    /** If the temp value has changed from the saved value */
    updated: boolean;
    /** Save the temp value into the saved value */
    save(): void;
    /** Update a part of the class using a callback or just a partial */
    update(data: Partial<Mutables<C>> | ((predata: C) => Partial<Mutables<C>>)): void;
    /** Delete the class */
    delete(): void;
}

/** Helper type to get the mutable values from a type */
export type Mutables<T> = Pick<T, WritableKeys<T>>;

/** Helper type for WritableKeys */
export type IfEquals<X, Y, A = X, B = never> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

/** Helper type for Mutables */
export type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T];