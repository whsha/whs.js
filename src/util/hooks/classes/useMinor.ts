/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v1/blocks/blockColor";
import { SchoolDay } from "@whsha/classes/v1/calendar/types";
import { IMinor } from "@whsha/classes/v1/class/classes";
import { ClassType } from "@whsha/classes/v1/class/type";
import deepEqual from "deep-equal";
import { useState } from "react";
import IUseClass from "./classHookType";
import useClasses from "./useClasses";

/** Create a minor with the given uuid */
function newMinor(uuid: string): IMinor {
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
        name: "",
        room: "",
        teacher: "",
        type: ClassType.Minor,
        uuid,
    };
}

/** A hook to use and modify a minor given its uuid */
export function useMinor(id: string): IUseClass<IMinor> {
    const classes = useClasses();
    const savedValue = classes.temp.minors.get(id);
    const [tempValue, setTempValue] = useState<IMinor>(savedValue !== undefined ? savedValue : newMinor(id));

    return {
        savedValue,
        tempValue,
        updated: !deepEqual(tempValue, savedValue),
        save() {
            classes.updateMinor(id, tempValue);
        },
        update(data) {
            if (typeof data === "function") {
                setTempValue(pre => ({ ...pre, ...data(pre) }));
            } else {
                setTempValue(pre => ({ ...pre, ...data }));
            }
        },
        delete() {
            classes.deleteMinor(id);
        }
    };
}