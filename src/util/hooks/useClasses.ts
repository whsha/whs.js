/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { SchoolDay } from "@whsha/classes/v1/calendar/types";
import { BlockColor } from "@whsha/classes/v2/block";
import { IClass } from "@whsha/classes/v2/class";
import { Semester } from "@whsha/classes/v2/semester";
import deepEqual from "deep-equal";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import { useContext } from "react";
import { DeepReadonly } from "ts-essentials";
import uuid from "uuid";
import { ClassesContext, TempClassesContext } from "../../contexts";
import ClassesStore from "../../stores/classesStore";

/** A hook to access and manipulate the users classes */
export default function useClasses() {
    const savedClasses = useContext(ClassesContext);
    const tempClasses = useContext(TempClassesContext);

    return useObserver(() => ({
        saved: savedClasses as DeepReadonly<ClassesStore>,
        temp: tempClasses as Readonly<ClassesStore>,
        save() {
            savedClasses.hydrateFrom(tempClasses);
        },
        revert() {
            tempClasses.hydrateFrom(savedClasses);
        },
        updated: !deepEqual(toJS(savedClasses), toJS(tempClasses), { strict: true }),
        addClass() {
            const clazz: IClass = {
                // ID
                uuid: uuid(),

                // Informational
                name: "",
                room: "",
                teacher: "",

                // Positional
                block: BlockColor.None,
                lab: false,
                lunches: {},
                meets: {
                    [SchoolDay.One]: false,
                    [SchoolDay.Two]: false,
                    [SchoolDay.Three]: false,
                    [SchoolDay.Four]: false,
                    [SchoolDay.Five]: false,
                    [SchoolDay.Six]: false,
                    [SchoolDay.Seven]: false,
                },
                semesters: {
                    [Semester.First]: false,
                    [Semester.Second]: false
                },
            };

            tempClasses.classes.set(clazz.uuid, clazz);

            return clazz;
        }
    }));
}