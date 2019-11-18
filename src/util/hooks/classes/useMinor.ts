/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import deepEqual from "deep-equal";
import { useState } from "react";
import { BlockColor } from "../../blocks/blockColor";
import { SchoolDay } from "../../calendar/types";
import { IMinor } from "../../class/storage";
import { ClassType } from "../../class/type";
import IUseClass from "./classHookType";
import { useClasses } from "./useClasses";

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