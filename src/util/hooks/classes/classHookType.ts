/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { ClassType, IClassType } from "../../class/type";

export default interface IUseClass<C extends IClassType<ClassType>, VR> {
    savedValue?: C;
    tempValue: C;
    updated: boolean;
    save(): void;
    update(data: Partial<Mutables<C>> | ((predata: C) => Partial<Mutables<C>>)): void;
    validate(): VR;
    delete(): void;
}

export type Mutables<T> = Pick<T, WritableKeys<T>>;

export type IfEquals<X, Y, A = X, B = never> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

export type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T];