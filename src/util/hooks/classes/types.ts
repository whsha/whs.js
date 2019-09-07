/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { ClassType, IClassType } from "../../class/type";

export interface IUseClass<C extends IClassType<ClassType>> {
    savedValue?: C;
    tempValue: C;
    updated: boolean;
    save(): void;
    update(data: Partial<C>): void;
}