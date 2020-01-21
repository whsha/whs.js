/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v1/blocks/blockColor";
import { SchoolDay } from "@whsha/classes/v1/calendar/types";
import { IDR } from "@whsha/classes/v1/class/classes";
import { ClassType } from "@whsha/classes/v1/class/type";
import deepEqual from "deep-equal";
import { useState } from "react";
import IUseClass from "./classHookType";
import useClasses from "./useClasses";

/** Create a new DR */
function newDR(uuid: string): IDR {
    return {
        block: BlockColor.None,
        meets: {
            [SchoolDay.One]: false,
            [SchoolDay.Two]: false,
            [SchoolDay.Three]: false,
            [SchoolDay.Four]: false,
            [SchoolDay.Five]: false,
            [SchoolDay.Six]: false,
            [SchoolDay.Seven]: false,
        },
        room: "",
        teacher: "",
        type: ClassType.DR,
        uuid,
    };
}

/** Hook to use a DR */
export function useDR(id: string): IUseClass<IDR> {
    const classes = useClasses();
    const savedValue = classes.temp.drs.get(id);
    const [tempValue, setTempValue] = useState<IDR>(savedValue !== undefined ? savedValue : newDR(id));

    return {
        savedValue,
        tempValue,
        updated: !deepEqual(tempValue, savedValue),
        save() {
            classes.updateDR(id, tempValue);
        },
        update(data) {
            if (typeof data === "function") {
                setTempValue(pre => ({ ...pre, ...data(pre) }));
            } else {
                setTempValue(pre => ({ ...pre, ...data }));
            }
        },
        delete() {
            classes.deleteDR(id);
        }
    };
}