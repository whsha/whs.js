/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import { SchoolDay } from "../calendar/types";

dayjs.extend(useCustomFormat);

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

// FIXME: Correct timings
/** The timings for the lunch sections */
export const LUNCH_TIMES = {
    A: {
        end: dayjs("11:22 AM", "h:mm A"),
        start: dayjs("10:55 AM", "h:mm A")
    },
    B: {
        end: dayjs("11:52 AM", "h:mm A"),
        start: dayjs("11:25 AM", "h:mm A")
    },
    C: {
        end: dayjs("12:22 PM", "h:mm A"),
        start: dayjs("11:55 AM", "h:mm A")
    }
};