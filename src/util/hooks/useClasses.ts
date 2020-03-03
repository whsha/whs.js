/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v2/block";
import { IClass } from "@whsha/classes/v2/class";
import { SchoolDay } from "@whsha/classes/v2/schoolDay";
import { Semester } from "@whsha/classes/v2/semester";
import { ClassesStorev2, PreparedClassesStorev2 } from "@whsha/classes/v2/store";
import deepEqual from "deep-equal";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import { useContext } from "react";
import { DeepReadonly } from "ts-essentials";
import uuid from "uuid";
import { PreparedClassesContext, TempClassesContext } from "../../contexts";

/** A hook to access and manipulate the users classes */
export default function useClasses() {
    const savedClasses = useContext(PreparedClassesContext);
    const tempClasses = useContext(TempClassesContext);

    return useObserver(() => ({
        saved: savedClasses as DeepReadonly<PreparedClassesStorev2>,
        temp: tempClasses as Readonly<ClassesStorev2>,
        save() {
            savedClasses.prepare(tempClasses);
        },
        revert() {
            tempClasses.hydrateFrom(savedClasses);
        },
        updated:
            !deepEqual(toJS(savedClasses.advisory), toJS(tempClasses.advisory), { strict: true }) &&
            !deepEqual(toJS(savedClasses.classes), toJS(tempClasses.classes), { strict: true }),
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