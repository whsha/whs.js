/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Dayjs } from "dayjs";

/** Information that is displayed to the user but never stored locally */
export interface ITimes {
    /** The start time */
    start: Dayjs;
    /** The end time */
    end: Dayjs;
}