/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "../blocks/blockColor";
import { SchoolDay } from "../calendar/types";
import ProblemMap from "../problemMap";
import { getLabBlockColorForDay } from "../schoolDays";
import { IDR, IMajor, IMinor } from "./classes";
import { irregularMeetCount, IrregularMeetDays, irregularMeetDays, irregularMeetJoin } from "./primitives";

/** Function to validate a given list of majors against themselves */
export function validateMajors(problems: ProblemMap<string, ValidationError, ValidationWarning>, majors: Iterable<IMajor>): Map<BlockColor, boolean> {
    // Store existing color blocks
    const majorColors = new Map<BlockColor, boolean>();

    // Loop through all majors
    for (const major of majors) {
        // Check if one with the same major already exists.
        if (majorColors.has(major.block)) {
            // If it does, return an error
            problems.addError(major.uuid, ValidationError.MajorHasDuplicateBlockColor);
        } else {
            // If not, add it to the list and keep on going
            majorColors.set(major.block, major.lab);
        }

        // Make sure a block has been specified
        if (major.block === BlockColor.None) {
            problems.addError(major.uuid, ValidationError.MissingBlockColor);
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

/** A function to validate a list of minors against themselves aswell as the already verified majors */
export function validateMinors(problems: ProblemMap<string, ValidationError, ValidationWarning>, majorColors: Map<BlockColor, boolean>, minors: Iterable<IMinor>): Map<BlockColor, IrregularMeetDays> {
    // Store existing minor blocks
    const minorColors = new Map<BlockColor, IrregularMeetDays>();

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

        if (minor.block === BlockColor.None) {
            // Make sure the minor does not conflict with a major lab
            for (const day of irregularMeetDays(minor)) {
                // Check if lab block color is occupied by a major
                if (majorColors.get(getLabBlockColorForDay(day)) === true) {
                    problems.addError(minor.uuid, ValidationError.MinorConflictWithLab);
                }
            }
        }

        // Get the days that minors with the same color block meet
        let meetDays = minorColors.get(minor.block);
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
        minorColors.set(minor.block, irregularMeetJoin(meetDays, minor.meets));

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

    return minorColors;
}

/** A function to validate the DRs against themselves, the majors, and the minors */
export function validateDRs(problems: ProblemMap<string, ValidationError, ValidationWarning>, majorColors: Map<BlockColor, boolean>, minorColors: Map<BlockColor, IrregularMeetDays>, drs: Iterable<IDR>): Map<BlockColor, IrregularMeetDays> {
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

        // Make sure a block has been specified
        if (dr.block === BlockColor.None) {
            problems.addError(dr.uuid, ValidationError.MissingBlockColor);
        }

        // Make sure the minor does not conflict with a major
        if (majorColors.has(dr.block)) {
            problems.addError(dr.uuid, ValidationError.DRConflictWithMajor);
        }

        // Get the days that the minors with the same color block meet
        const minorMeetDays = minorColors.get(dr.block);

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

/** The errors that can occur in validation */
export enum ValidationError {
    // Major only errors
    MajorHasDuplicateBlockColor,
    // Minor only errors
    MinorConflictWithMajor,
    MinorConflictWithLab,
    MinorConflictWithMinor,
    // DR only errors
    DRConflictWithMajor,
    DRConflictWithMinor,
    DRConflictWithDR,
    // General errors
    MissingMeetDay,
    MeetsEveryDay,
    MissingBlockColor,
}

/** The messages to display to the user */
export const ValidationErrorMessage: { [K in ValidationError]: string } = {
    // Major only errors
    [ValidationError.MajorHasDuplicateBlockColor]: "There exist two major classes that shares this block color",
    // Minor only errors
    [ValidationError.MinorConflictWithMajor]: "A minor and a major cannot occupy the same color block",
    [ValidationError.MinorConflictWithLab]: "A minor and a major's lab block cannot occupy the same color block",
    [ValidationError.MinorConflictWithMinor]: "Two minors cannot occupy the same color and day blocks",
    // DR only errors
    [ValidationError.DRConflictWithMajor]: "A DR and a major cannot occupy the same color block",
    [ValidationError.DRConflictWithMinor]: "A DR and a minor cannot occupy the same color and day blocks",
    [ValidationError.DRConflictWithDR]: "Two DRs cannot occupy the same color and day blocks",
    // General errors
    [ValidationError.MissingMeetDay]: "You must choose one or more day that this class meets",
    [ValidationError.MeetsEveryDay]: "A class that meets every day in the cycle should be replaced with a major",
    [ValidationError.MissingBlockColor]: "You must specify a block color for this class",
};

/** The warnings that result from validation */
export enum ValidationWarning {
    // General warnings
    MissingName,
    MissingRoom,
    MissingTeacher
}

/** The messages to display to the user */
export const ValidationWarningMessage: { [K in ValidationWarning]: string } = {
    [ValidationWarning.MissingName]: "You should specify a name for this class",
    [ValidationWarning.MissingRoom]: "You should specify a room for this class",
    [ValidationWarning.MissingTeacher]: "You should specify a teacher for this class"
};