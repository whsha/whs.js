/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

/** A class which has a specific type to diferentiate it from others */
export interface IClassType<T extends ClassType> {
    /** A fixed value to differentiate this class from others */
    type: T;
}

/** The types of classes */
export enum ClassType {
    Major,
    Elective,
    DR
}

export function hasClassType<T extends ClassType>(clazz: unknown): clazz is IClassType<T> {
    let possibleClass = clazz as IClassType<T>;

    return possibleClass.type !== undefined;
}

/** Get the type of the class */
export function getClassType<C extends IClassType<T>, T extends ClassType>(clazz: C): T {
    return clazz.type;
}

/** Check if the class is a major */
export function isMajor(clazz: IClassType<ClassType>): clazz is IClassType<ClassType.Major> {
    return getClassType(clazz) === ClassType.Major;
}
/** Check if the class is an elective */
export function isElective(clazz: IClassType<ClassType>): clazz is IClassType<ClassType.Elective> {
    return getClassType(clazz) === ClassType.Elective;
}
/** Check if the class is a DR */
export function isDR(clazz: IClassType<ClassType>): clazz is IClassType<ClassType.DR> {
    return getClassType(clazz) === ClassType.DR;
}