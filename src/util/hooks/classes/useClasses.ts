/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import deepEqual from "deep-equal";
import { toJS } from "mobx";
import { useObserver} from "mobx-react-lite";
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

    return useObserver(() => ({
        saved: {
            advisory: savedClasses.advisory,
            // drs: classes.DRs,
            // minors: classes.minors,
            majors: savedClasses.majors
        },
        temp: {
            advisory: tempClasses.advisory,
            // drs: tempClasses.DRs,
            // minors: tempClasses.minors,
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
        updateMajor(id: string, data: IMajor) {
            tempClasses.majors.set(id, data);
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
                block: BlockColor.Blue,
                lab: false,
                name: "New Major",
                room: 101,
                teacher: "",
                type: ClassType.Major,
                uuid: uuid(),
            };

            tempClasses.majors.set(newmajor.uuid, newmajor);

            return newmajor.uuid;
        }
    }));
}
