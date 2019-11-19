/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "../blocks/blockColor";
import { SchoolDay } from "../calendar/types";
import { ValidationError, ValidationWarning } from "../hooks/classes/useClasses";
import ProblemMap from "../problemMap";
import { IDR, IMajor, IMinor } from "./full";
import { irregularMeetCount, IrregularMeetDays, irregularMeetDays, irregularMeetJoin } from "./primitives";

export function validateMajors(problems: ProblemMap<string, ValidationError, ValidationWarning>, majors: IterableIterator<IMajor>): Set<BlockColor> {
    // Store existing color blocks
    const majorColors = new Set<BlockColor>();

    // Loop through all majors
    for (const major of majors) {
        // Check if one with the same major already exists.
        if (majorColors.has(major.block)) {
            // If it does, return an error
            problems.addError(major.uuid, ValidationError.MajorHasDuplicateBlockColor);
        } else {
            // If not, add it to the list and keep on going
            majorColors.add(major.block);
        }

        // Make sure a block has been specified
        if (major.block === BlockColor.None) {
            problems.addError(major.uuid, ValidationError.MajorMissingBlockColor);
        }

        // Make sure a name has been specified
        if (major.name.length === 0) {
            problems.addWarn(major.uuid, ValidationWarning.MissingName);
        }

        // Make sure a room has been specified
        if (major.room.length === 0) {
            problems.addWarn(major.uuid, ValidationWarning.MissingRoom);
        }

        // Make sure a teacher has been specified
        if (major.teacher.length === 0) {
            problems.addWarn(major.uuid, ValidationWarning.MissingTeacher);
        }
    }

    return majorColors;
}

export function validateMinors(problems: ProblemMap<string, ValidationError, ValidationWarning>, majorColors: Set<BlockColor>, minors: IterableIterator<IMinor>): Map<BlockColor, IrregularMeetDays> {
    // Store existing minor blocks
    const minorDays = new Map<BlockColor, IrregularMeetDays>();

    // Loop through all minors
    for (const minor of minors) {
        // Make sure the class meets more than once
        if (irregularMeetCount(minor) === 0) {
            problems.addError(minor.uuid, ValidationError.MissingMeetDay);
        }
        // Make sure the class does not meet all blocks for a color (Not Irregular)
        else if (irregularMeetCount(minor) >= 5 && minor.block !== BlockColor.None) {
            problems.addError(minor.uuid, ValidationError.MeetsEveryDay);
        }

        // Make sure the minor does not conflict with a major
        if (majorColors.has(minor.block)) {
            problems.addError(minor.uuid, ValidationError.MinorConflictWithMajor);
        }

        // Get the days that minors with the same color block meet
        let meetDays = minorDays.get(minor.block);
        // If no days exist, set it to a default
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

        // Make sure the minor does not overlap any existing days for the color
        if (irregularMeetDays({ meets: meetDays }).some(x => irregularMeetDays(minor).includes(x))) {
            problems.addError(minor.uuid, ValidationError.MinorConflictWithMinor);
        }

        // Save the meeting days by joining them with the others for the same color
        minorDays.set(minor.block, irregularMeetJoin(meetDays, minor.meets));

        // Make sure a name has been specified
        if (minor.name.length === 0) {
            problems.addWarn(minor.uuid, ValidationWarning.MissingName);
        }

        // Make sure a room has been specified
        if (minor.room.length === 0) {
            problems.addWarn(minor.uuid, ValidationWarning.MissingRoom);
        }

        // Make sure a teacher has been specified
        if (minor.teacher.length === 0) {
            problems.addWarn(minor.uuid, ValidationWarning.MissingTeacher);
        }
    }

    return minorDays;
}

export function validateDRs(problems: ProblemMap<string, ValidationError, ValidationWarning>, majorColors: Set<BlockColor>, minorDays: Map<BlockColor, IrregularMeetDays>, drs: IterableIterator<IDR>): Map<BlockColor, IrregularMeetDays> {
    // Store existing DR blocks
    const drDays = new Map<BlockColor, IrregularMeetDays>();

    // Loop through all minors
    for (const dr of drs) {
        // Make sure the class meets more than once
        if (irregularMeetCount(dr) === 0) {
            problems.addError(dr.uuid, ValidationError.MissingMeetDay);
        }
        // Make sure the class does not meet all blocks for a color (Not Irregular)
        else if (irregularMeetCount(dr) >= 5 && dr.block !== BlockColor.None) {
            problems.addError(dr.uuid, ValidationError.MeetsEveryDay);
        }

        // Make sure the minor does not conflict with a major
        if (majorColors.has(dr.block)) {
            problems.addError(dr.uuid, ValidationError.DRConflictWithMajor);
        }

        // Get the days that the minors with the same color block meet
        const minorMeetDays = minorDays.get(dr.block);

        // Make sure the dr does not overlap any existing minors for the color
        if (minorMeetDays !== undefined && irregularMeetDays({ meets: minorMeetDays }).some(x => irregularMeetDays(dr).includes(x))) {
            problems.addError(dr.uuid, ValidationError.DRConflictWithMinor);
        }

        // Get the days that drs with the same color block meet
        let meetDays = drDays.get(dr.block);
        // If no days exist, set it to a default
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

        // Make sure the dr does not overlap any existing drs for the color
        if (irregularMeetDays({ meets: meetDays }).some(x => irregularMeetDays(dr).includes(x))) {
            problems.addError(dr.uuid, ValidationError.DRConflictWithDR);
        }

        // Save the meeting days by joining them with the others for the same color
        drDays.set(dr.block, irregularMeetJoin(meetDays, dr.meets));

        // Make sure a room has been specified
        if (dr.room.length === 0) {
            problems.addWarn(dr.uuid, ValidationWarning.MissingRoom);
        }

        // Make sure a teacher has been specified
        if (dr.teacher.length === 0) {
            problems.addWarn(dr.uuid, ValidationWarning.MissingTeacher);
        }
    }

    return drDays;
}
