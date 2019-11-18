/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { SchoolDay } from "../calendar/types";

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

export type IrregularMeetDays = { [K in SchoolDay]: boolean };

/** Check if the class is irregular */
export function isIrregular(clazz: unknown): clazz is IIrregular {
    const possibleClass = clazz as Partial<IIrregular>;

    // Make sure field exists and it does not meet every day
    return possibleClass.meets !== undefined && irregularMeetCount(possibleClass as IIrregular) < 5;
}

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

export function irregularMeetDays({ meets }: IIrregular): SchoolDay[] {
    return Object.keys(meets)
        .filter(x => meets[(x as unknown) as keyof IrregularMeetDays]) as unknown[] as SchoolDay[];
}