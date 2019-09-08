/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import deepEqual from "deep-equal";
import { toJS } from "mobx";
import { useContext } from "react";
import uuid from "uuid";
import { ClassesContext, TempClassesContext } from "../../../contexts";
import { BlockColor } from "../../blocks/blockColor";
import { IAdvisory } from "../../class/advisory";
import { IMajor } from "../../class/storage";
import { ClassType } from "../../class/type";

export function useClasses() {
    let savedClasses = useContext(ClassesContext);
    let tempClasses = useContext(TempClassesContext);

    return {
        saved: {
            advisory: savedClasses.advisory,
            // drs: classes.DRs,
            // electives: classes.electives,
            majors: savedClasses.majors
        },
        temp: {
            advisory: tempClasses.advisory,
            // drs: tempDrs,
            // electives: tempElectives,
            majors: tempClasses.majors
        },
        updated: !deepEqual(toJS(savedClasses), toJS(tempClasses)),
        /** Save the temp values into the permanant values */
        save() {
            savedClasses.hydrateFrom(tempClasses);
        },
        /** Reset the temp values to be the saved ones */
        reset() {
            tempClasses.hydrateFrom(savedClasses);
        },
        // updateDr(id: string, data: IDR) {
        //     setTempDrs(pre => pre.set(id, data));
        // },
        // updateElective(id: string, data: IElective) {
        //     setTempElectives(pre => pre.set(id, data));
        // },
        updateMajor(id: string, data: IMajor) {
            tempClasses.majors.set(id, data);

            console.error("UPDATEMAJOR", new Error().stack);
        },
        updateAdvisory(data: IAdvisory) {
            tempClasses.advisory = data;
        },
        // addDr(): string {
        //     let newdr: IDR = {
        //         block: BlockColor.None,
        //         meets: 0b00000,
        //         room: 0,
        //         teacher: "",
        //         type: ClassType.DR,
        //         uuid: uuid()
        //     };

        //     setTempDrs(pre => pre.set(newdr.uuid, newdr));

        //     return newdr.uuid;
        // }
        addMajor() {
            let newmajor: IMajor = {
                block: BlockColor.None,
                lab: false,
                name: "",
                room: 0,
                teacher: "",
                type: ClassType.Major,
                uuid: uuid(),
            };

            tempClasses.majors.set(newmajor.uuid, newmajor);

            console.error("ADDMAJOR", new Error().stack);

            return newmajor.uuid;
        }
    };
}
