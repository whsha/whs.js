/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import deepEqual from "deep-equal";
import { useState } from "react";
import uuid from "uuid";
import { BlockColor } from "../../blocks/blockColor";
import { IMajor } from "../../class/storage";
import { ClassType } from "../../class/type";
import IUseClass from "./classHookType";
import { useClasses } from "./useClasses";

export function newMajor(): IMajor {
    return {
        block: BlockColor.None,
        lab: false,
        name: "New Major",
        room: "0",
        teacher: "Major Teacher",
        type: ClassType.Major,
        uuid: uuid(),
    };
}

export function useMajor(id: string): IUseClass<IMajor> {
    let classes = useClasses();
    let savedValue = classes.saved.majors.get(id);
    let [tempValue, setTempValue] = useState<IMajor>(savedValue !== undefined ? savedValue : newMajor());

    return {
        savedValue,
        tempValue,
        updated: !deepEqual(tempValue, savedValue),
        save() {
            classes.updateMajor(id, tempValue);
        },
        update(data: Partial<IMajor>) {
            setTempValue(pre => ({ ...pre, ...data }));
        },
        delete() {
            classes.deleteMajor(id);
        }
    };
}
