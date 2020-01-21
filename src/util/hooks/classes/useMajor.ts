/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v1/blocks/blockColor";
import { IMajor } from "@whsha/classes/v1/class/classes";
import { ClassType } from "@whsha/classes/v1/class/type";
import deepEqual from "deep-equal";
import { useState } from "react";
import IUseClass from "./classHookType";
import useClasses from "./useClasses";

/** Create the default major with the given uuid */
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

/** Hook to use and modify a major given its id */
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