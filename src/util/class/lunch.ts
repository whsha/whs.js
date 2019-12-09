/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { SchoolDay } from "../calendar/types";

/** The lunches for a day */
export enum Lunch {
    First,
    Second,
    Third
}

/** The lunches mapped by the school day. */
export type DayLunchMap = {
    [D in SchoolDay]: Lunch;
};