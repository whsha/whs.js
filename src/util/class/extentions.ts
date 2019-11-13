/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Dayjs } from "dayjs";

/**
 * Metadata that is needed to understand where the class will
 * be placed in the schedule for each day but not needed to display the class
 *
 * (Internal Use)
 */
export interface IClassMeta {
    /** The class UUID for identifying the class */
    uuid: Readonly<string>;
}

/** Information that is displayed to the user but never stored locally */
export interface ITimes {
    /** The start time */
    start: Dayjs;
    /** The end time */
    end: Dayjs;
}