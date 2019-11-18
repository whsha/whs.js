/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import deepEqual from "deep-equal";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import { useContext } from "react";
import { ClassesContext, TempClassesContext } from "../../../contexts";
import { BlockColor } from "../../blocks/blockColor";
import { SchoolDay } from "../../calendar/types";
import { IAdvisory } from "../../class/advisory";
import { irregularMeetCount, IrregularMeetDays, irregularMeetDays, irregularMeetJoin } from "../../class/primitives";
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
            const majorColors = new Set<BlockColor>();

            // Loop through all majors
            for (const major of tempClasses.majors.values()) {
                // Check if one with the same major already exists.
                if (majorColors.has(major.block)) {
                    // If it does, return an error
                    map.addError(major.uuid, ValidationError.MajorHasDuplicateBlockColor);
                } else {
                    // If not, add it to the list and keep on going
                    majorColors.add(major.block);
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

            const minorDays = new Map<BlockColor, IrregularMeetDays>();

            // Loop through all minors
            for (const minor of tempClasses.minors.values()) {
                if (irregularMeetCount(minor) === 0) {
                    map.addError(minor.uuid, ValidationError.MinorMissingMeetDay);
                } else if (irregularMeetCount(minor) >= 5 && minor.block !== BlockColor.None) {
                    map.addError(minor.uuid, ValidationError.MinorMeetsEveryDay);
                }

                if (majorColors.has(minor.block)) {
                    map.addError(minor.uuid, ValidationError.MinorConflictWithMajor);
                }

                let meetDays = minorDays.get(minor.block);
                if (meetDays === undefined) {
                    meetDays = {
                        [SchoolDay.One]: false,
                        [SchoolDay.Two]: false,
                        [SchoolDay.Three]: false,
                        [SchoolDay.Four]: false,
                        [SchoolDay.Five]: false,
                        [SchoolDay.Six]: false,
                        [SchoolDay.Seven]: false,
                    };
                }

                if (irregularMeetDays({ meets: meetDays }).some(x => irregularMeetDays(minor).includes(x))) {
                    map.addError(minor.uuid, ValidationError.MinorConflictWithMinor);
                }

                minorDays.set(minor.block, irregularMeetJoin(meetDays, minor.meets));

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
    MajorHasDuplicateBlockColor,
    MajorMissingBlockColor,
    MinorMissingMeetDay,
    MinorMeetsEveryDay,
    MinorConflictWithMajor,
    MinorConflictWithMinor
}

export const ValidationErrorMessage: { [K in ValidationError]: string } = {
    [ValidationError.MajorHasDuplicateBlockColor]: "There exist two major classes that shares this block color",
    [ValidationError.MajorMissingBlockColor]: "You must specify a block color for this major",
    [ValidationError.MinorMissingMeetDay]: "You must choose one or more day that this minor meets",
    [ValidationError.MinorMeetsEveryDay]: "A minor that meets every day that its color block meets should be replaced with a major",
    [ValidationError.MinorConflictWithMajor]: "A minor and a major cannot occupy the same color block",
    [ValidationError.MinorConflictWithMinor]: "A minor and another minor both occupy the same color and day blocks"
};

export enum ValidationWarning {
    MissingName,
    MissingRoom,
    MissingTeacher
}

export const ValidationWarningMessage: { [K in ValidationWarning]: string } = {
    [ValidationWarning.MissingName]: "You should specify a name for this class",
    [ValidationWarning.MissingRoom]: "You should specify a room for this class",
    [ValidationWarning.MissingTeacher]: "You should specify a teacher for this class"
};