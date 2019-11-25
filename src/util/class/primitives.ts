/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "../blocks/blockColor";
import { SchoolDay } from "../calendar/types";

/** Information used to internally identify the class */
export interface IIdentifiable {
    /** The class UUID for identifying the class */
    readonly uuid: string;
}

/** Check if the class is named */
export function isIdentifiable(clazz: unknown): clazz is IIdentifiable {
    const possibleClass = clazz as Partial<IIdentifiable>;

    // Make sure fields exist
    return possibleClass.uuid !== undefined;
}

/** A block that has a color to go along with it */
export interface IColored {
    /** The block color which the class meets */
    block: BlockColor;
}

/** Check if the class is colored */
export function isColored(clazz: unknown): clazz is IColored {
    const possibleClass = clazz as Partial<IColored>;

    // Make sure fields exist
    return possibleClass.block !== undefined;
}

/** A block that has a name attached to it */
export interface INamed {
    /** The name of the class */
    name: string;
}

/** Check if the class is named */
export function isNamed(clazz: unknown): clazz is INamed {
    const possibleClass = clazz as Partial<INamed>;

    // Make sure fields exist
    return possibleClass.name !== undefined;
}

/** A block that has a teacher that either teaches or advises it */
export interface IAdvisedClass {
    /** The teacher for the class */
    teacher: string;
    /** The room number or name the class takes place in */
    room: string;
}

/** Check if the class is advised */
export function isAdvisedClass(clazz: unknown): clazz is IAdvisedClass {
    const possibleClass = clazz as Partial<IAdvisedClass>;

    // Make sure fields exist
    return possibleClass.teacher !== undefined && possibleClass.room !== undefined;
}

/** A block that does not meet every day of the cycle */
export interface IIrregular {
    /** The school days when the class meets */
    meets: IrregularMeetDays;
}

/** A map of the days that an irregular meet */
export type IrregularMeetDays = { [K in SchoolDay]: boolean };

/** Check if the class is irregular */
export function isIrregular(clazz: unknown): clazz is IIrregular {
    const possibleClass = clazz as Partial<IIrregular>;

    // Make sure field exists and it does not meet every day
    return possibleClass.meets !== undefined && irregularMeetCount(possibleClass as IIrregular) < 5;
}

/** Get the count of times the irregular meets */
export function irregularMeetCount({ meets }: IIrregular): number {
    return (
        (meets[SchoolDay.One] ? 1 : 0) +
        (meets[SchoolDay.Two] ? 1 : 0) +
        (meets[SchoolDay.Three] ? 1 : 0) +
        (meets[SchoolDay.Four] ? 1 : 0) +
        (meets[SchoolDay.Five] ? 1 : 0) +
        (meets[SchoolDay.Six] ? 1 : 0) +
        (meets[SchoolDay.Seven] ? 1 : 0)
    );
}

/** Get the school days an irregular meets */
export function irregularMeetDays({ meets }: IIrregular): SchoolDay[] {
    return Object.keys(meets)
        .filter(x => meets[(x as unknown) as keyof IrregularMeetDays])
        .map(x => parseInt(x, 10)) as unknown[] as SchoolDay[];
}

/** Join two meet day maps to form one */
export function irregularMeetJoin(left: IrregularMeetDays, right: IrregularMeetDays): IrregularMeetDays {
    return {
        [SchoolDay.One]: left[SchoolDay.One] || right[SchoolDay.One],
        [SchoolDay.Two]: left[SchoolDay.Two] || right[SchoolDay.Two],
        [SchoolDay.Three]: left[SchoolDay.Three] || right[SchoolDay.Three],
        [SchoolDay.Four]: left[SchoolDay.Four] || right[SchoolDay.Four],
        [SchoolDay.Five]: left[SchoolDay.Five] || right[SchoolDay.Five],
        [SchoolDay.Six]: left[SchoolDay.Six] || right[SchoolDay.Six],
        [SchoolDay.Seven]: left[SchoolDay.Seven] || right[SchoolDay.Seven],
    };
}