/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

/** A class which has a specific type to diferentiate it from others */
export interface IClassType<T extends ClassType> {
    /** A fixed value to differentiate this class from others */
    readonly type: T;
}

/** The types of classes */
export enum ClassType {
    Major,
    Minor,
    DR
}

export function hasClassType<T extends ClassType>(clazz: unknown): clazz is IClassType<T> {
    const possibleClass = clazz as Partial<IClassType<T>>;

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
/** Check if the class is a minor */
export function isMinor(clazz: IClassType<ClassType>): clazz is IClassType<ClassType.Minor> {
    return getClassType(clazz) === ClassType.Minor;
}
/** Check if the class is a DR */
export function isDR(clazz: IClassType<ClassType>): clazz is IClassType<ClassType.DR> {
    return getClassType(clazz) === ClassType.DR;
}