/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { SchoolDay } from "@whsha/classes/v2/schoolDay";

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
    /** If the day is an mcas day */
    isMCAS: boolean;
}