/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import deepEqual from "deep-equal";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import { useContext } from "react";
import { ClassesContext, TempClassesContext } from "../../../contexts";
import { BlockColor } from "../../blocks/blockColor";
import { IAdvisory } from "../../class/advisory";
import { irregularMeetCount } from "../../class/primitives";
import { IMajor, IMinor } from "../../class/storage";
import ProblemMap from "../../problemMap";

export function useClasses() {
    const savedClasses = useContext(ClassesContext);
    const tempClasses = useContext(TempClassesContext);

    return useObserver(() => ({
        saved: {
            advisory: savedClasses.advisory,
            // drs: classes.DRs,
            majors: savedClasses.majors,
            minors: savedClasses.minors
        },
        temp: {
            advisory: tempClasses.advisory,
            // drs: tempClasses.DRs,
            majors: tempClasses.majors,
            minors: tempClasses.minors
        },
        updated: !deepEqual(toJS(savedClasses), toJS(tempClasses)),
        /** Save the temp values into the permanant values (**VALIDATE THEM FIRST**) */
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
        updateMinor(id: string, data: IMinor) {
            tempClasses.minors.set(id, data);
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
        deleteMajor(id: string) {
            tempClasses.majors.delete(id);
        },
        deleteMinor(id: string) {
            tempClasses.minors.delete(id);
        },
        /**
         * Validate the temporary classes, before saving them
         *
         * - Check for overlap
         * - Check for missing fields
         * - etc
         *
         * @returns Map of UUID to error
         */
        validate(): ProblemMap<string, ValidationError, ValidationWarning> {
            const map = new ProblemMap<string, ValidationError, ValidationWarning>();

            // Store existing color blocks
            const existingColors = new Set<BlockColor>();

            // Loop through all majors
            for (const major of tempClasses.majors.values()) {
                // Check if one with the same major already exists.
                if (existingColors.has(major.block)) {
                    // If it does, return an error
                    map.addError(major.uuid, ValidationError.MajorHasDuplicateBlockColor);
                } else {
                    // If not, add it to the list and keep on going
                    existingColors.add(major.block);
                }

                if (major.block === BlockColor.None) {
                    map.addError(major.uuid, ValidationError.MajorMissingBlockColor);
                }
                if (major.name.length === 0) {
                    map.addWarn(major.uuid, ValidationWarning.MissingName);
                }
                if (major.room.length === 0) {
                    map.addWarn(major.uuid, ValidationWarning.MissingRoom);
                }
                if (major.teacher.length === 0) {
                    map.addWarn(major.uuid, ValidationWarning.MissingTeacher);
                }
            }

            // Loop through all majors
            for (const minor of tempClasses.minors.values()) {
                if (irregularMeetCount(minor) === 0) {
                    map.addError(minor.uuid, ValidationError.MinorMissingMeetDay);
                } else if (irregularMeetCount(minor) >= 5 && minor.block !== BlockColor.None) {
                    map.addError(minor.uuid, ValidationError.MinorMeetsEveryDay);
                }

                if (minor.name.length === 0) {
                    map.addWarn(minor.uuid, ValidationWarning.MissingName);
                }
                if (minor.room.length === 0) {
                    map.addWarn(minor.uuid, ValidationWarning.MissingRoom);
                }
                if (minor.teacher.length === 0) {
                    map.addWarn(minor.uuid, ValidationWarning.MissingTeacher);
                }
            }

            return map;
        }
    }));
}

export enum ValidationError {
    MajorHasDuplicateBlockColor = "There exist two major classes that shares this block color",
    MajorMissingBlockColor = "You must specify a block color for this major",
    MinorMissingMeetDay = "You must choose one or more day that this minor meets",
    MinorMeetsEveryDay = "A minor that meets every day that its color block meets should be replaced with a major"
}

export enum ValidationWarning {
    MissingName = "You should specify a name for this class",
    MissingRoom = "You should specify a room for this class",
    MissingTeacher = "You should specify a teacher for this class"
}