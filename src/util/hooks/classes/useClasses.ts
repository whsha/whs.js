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
import { IMajor } from "../../class/storage";
import { newMajor } from "./useMajor";

export function useClasses() {
    const savedClasses = useContext(ClassesContext);
    const tempClasses = useContext(TempClassesContext);

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
            const newmajor = newMajor();

            tempClasses.majors.set(newmajor.uuid, newmajor);

            return newmajor.uuid;
        },
        deleteMajor(id: string) {
            tempClasses.majors.delete(id);
        },
        /**
         * Validate the temporary classes, before saving them
         *
         * - Check for overlap
         * - Check for missing fields
         * - etc
         */
        validate(): ValidationResult {
            // Check for majors with overlapping color blocks
            {
                // Store existing color blocks
                const existingColors = new Set<BlockColor>();

                // Loop through all majors
                for (const major of tempClasses.majors.values()) {
                    // Check if one with the same major already exists.
                    if (existingColors.has(major.block)) {
                        // If it does, return an error
                        return ValidationResult.MajorHasDuplicateBlockColor;
                    } else if (major.block === BlockColor.None) {
                        // If the color is none, return an error
                        return ValidationResult.MajorIsMissingBlockColor;
                    } else {
                        // If not, add it to the list and keep on going
                        existingColors.add(major.block);
                    }
                }
            }

            return ValidationResult.Valid;
        }
    }));
}

export enum ValidationResult {
    Valid,
    MajorHasDuplicateBlockColor,
    MajorIsMissingBlockColor
}

export type ValidationError = Omit<typeof ValidationResult, "Valid">;