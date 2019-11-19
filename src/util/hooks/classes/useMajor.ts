/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import deepEqual from "deep-equal";
import { useState } from "react";
import { BlockColor } from "../../blocks/blockColor";
import { IMajor } from "../../class/full";
import { ClassType } from "../../class/type";
import IUseClass from "./classHookType";
import { useClasses } from "./useClasses";

function newMajor(uuid: string): IMajor {
    return {
        block: BlockColor.None,
        lab: false,
        name: "",
        room: "",
        teacher: "",
        type: ClassType.Major,
        uuid,
    };
}

export function useMajor(id: string): IUseClass<IMajor> {
    const classes = useClasses();
    const savedValue = classes.temp.majors.get(id);
    const [tempValue, setTempValue] = useState<IMajor>(savedValue !== undefined ? savedValue : newMajor(id));

    return {
        savedValue,
        tempValue,
        updated: !deepEqual(tempValue, savedValue),
        save() {
            classes.updateMajor(id, tempValue);
        },
        update(data) {
            if (typeof data === "function") {
                setTempValue(pre => ({ ...pre, ...data(pre) }));
            } else {
                setTempValue(pre => ({ ...pre, ...data }));
            }
        },
        delete() {
            classes.deleteMajor(id);
        }
    };
}