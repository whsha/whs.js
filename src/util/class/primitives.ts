/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

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
    /** The bitfield of when the class meets */
    meets: number;
}
/** Check if the class is irregular */
export function isIrregular(clazz: unknown): clazz is IIrregular {
    const possibleClass = clazz as Partial<IIrregular>;

    // Make sure field exists and it does not meet every day
    return possibleClass.meets !== undefined && possibleClass.meets !== 0b11111;
}