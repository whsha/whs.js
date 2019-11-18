/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

/** The information about a calendar */
export interface ICalendarInformation {
    /** The school days */
    schoolDays: ICalendarSchoolDay[];
    /** When the calendar was updated */
    updated: number;
}

/** A School Day */
export interface ICalendarSchoolDay {
    /** The day number */
    dayNumber: SchoolDay;
    /** If the school day is a half day */
    isHalf: boolean;
    /** Any meta information regarding the day */
    meta?: string;
    /** The date the day is on formatted as YYYY-MM-DD */
    date: string;
}

/** A numeric value denoting the school day in the 7 day cycle */
export enum SchoolDay {
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7
}

export const allSchoolDays: SchoolDay[] = [
    SchoolDay.One,
    SchoolDay.Two,
    SchoolDay.Three,
    SchoolDay.Four,
    SchoolDay.Five,
    SchoolDay.Six,
    SchoolDay.Seven
];