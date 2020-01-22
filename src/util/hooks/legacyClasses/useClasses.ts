/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { SchoolDay } from "@whsha/classes/v1/calendar/types";
import { IAdvisory, IDR, IMajor,IMinor } from "@whsha/classes/v1/class/classes";
import { DayLunchMap, Lunch } from "@whsha/classes/v1/class/lunch";
import { validateDRs, validateMajors, validateMinors, ValidationError, ValidationWarning } from "@whsha/classes/v1/class/validation";
import ProblemMap from "@whsha/classes/v1/problemMap";
import deepEqual from "deep-equal";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import { useContext } from "react";
import { LegacyClassesContext, LegacyTempClassesContext } from "../../../contexts";

/** An interface of the different classes */
export interface IClasses {
    /** The advisory */
    advisory: IAdvisory;
    /** The advisory */
    lunches: DayLunchMap;
    /** A map of the drs mapped by their id */
    drs: Map<string, IDR>;
    /** A map of the majors mapped by their id */
    majors: Map<string, IMajor>;
    /** A map of the minors mapped by their id */
    minors: Map<string, IMinor>;
}

/** A hook to read and modify the classes */
export default function useClasses() {
    const savedClasses = useContext(LegacyClassesContext);
    const tempClasses = useContext(LegacyTempClassesContext);

    return useObserver(() => ({
        saved: {
            advisory: savedClasses.advisory,
            drs: savedClasses.DRs,
            lunches: savedClasses.lunches,
            majors: savedClasses.majors,
            minors: savedClasses.minors
        },
        temp: {
            advisory: tempClasses.advisory,
            drs: tempClasses.DRs,
            lunches: tempClasses.lunches,
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
        updateLunch(day: SchoolDay, lunch: Lunch) {
            tempClasses.lunches[day] = lunch;
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