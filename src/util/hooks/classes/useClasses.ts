/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import deepEqual from "deep-equal";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import { useContext } from "react";
import { ClassesContext, TempClassesContext } from "../../../contexts";
import { IAdvisory } from "../../class/advisory";
import { IDR, IMajor, IMinor } from "../../class/full";
import { validateDRs, validateMajors, validateMinors } from "../../class/validation";
import ProblemMap from "../../problemMap";

export function useClasses() {
    const savedClasses = useContext(ClassesContext);
    const tempClasses = useContext(TempClassesContext);

    return useObserver(() => ({
        saved: {
            advisory: savedClasses.advisory,
            drs: savedClasses.DRs,
            majors: savedClasses.majors,
            minors: savedClasses.minors
        },
        temp: {
            advisory: tempClasses.advisory,
            drs: tempClasses.DRs,
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
        updateDR(id: string, data: IDR) {
            tempClasses.DRs.set(id, data);
        },
        deleteMajor(id: string) {
            tempClasses.majors.delete(id);
        },
        deleteMinor(id: string) {
            tempClasses.minors.delete(id);
        },
        deleteDR(id: string) {
            tempClasses.DRs.delete(id);
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
            const problems = new ProblemMap<string, ValidationError, ValidationWarning>();

            // Store existing color blocks
            const majorColors = validateMajors(problems, tempClasses.majors.values());

            // Store existing minor blocks
            const minorColors = validateMinors(problems, majorColors, tempClasses.minors.values());

            // Store existing DR blocks
            /* const drColors =  */validateDRs(problems, majorColors, minorColors, tempClasses.DRs.values());

            return problems;
        }
    }));
}

export enum ValidationError {
    // Major only errors
    MajorHasDuplicateBlockColor,
    MajorMissingBlockColor,
    // Minor only errors
    MinorConflictWithMajor,
    MinorConflictWithMinor,
    // DR only errors
    DRConflictWithMajor,
    DRConflictWithMinor,
    DRConflictWithDR,
    // General errors
    MissingMeetDay,
    MeetsEveryDay,
}

export const ValidationErrorMessage: { [K in ValidationError]: string } = {
    // Major only errors
    [ValidationError.MajorHasDuplicateBlockColor]: "There exist two major classes that shares this block color",
    [ValidationError.MajorMissingBlockColor]: "You must specify a block color for this major",
    // Minor only errors
    [ValidationError.MinorConflictWithMajor]: "A minor and a major cannot occupy the same color block",
    [ValidationError.MinorConflictWithMinor]: "Two minors cannot occupy the same color and day blocks",
    // DR only errors
    [ValidationError.DRConflictWithMajor]: "A DR and a major cannot occupy the same color block",
    [ValidationError.DRConflictWithMinor]: "A DR and a minor cannot occupy the same color and day blocks",
    [ValidationError.DRConflictWithDR]: "Two DRs cannot occupy the same color and day blocks",
    // General errors
    [ValidationError.MissingMeetDay]: "You must choose one or more day that this class meets",
    [ValidationError.MeetsEveryDay]: "A class that meets every day in the cycle should be replaced with a major",
};

export enum ValidationWarning {
    // General warnings
    MissingName,
    MissingRoom,
    MissingTeacher
}

export const ValidationWarningMessage: { [K in ValidationWarning]: string } = {
    [ValidationWarning.MissingName]: "You should specify a name for this class",
    [ValidationWarning.MissingRoom]: "You should specify a room for this class",
    [ValidationWarning.MissingTeacher]: "You should specify a teacher for this class"
};