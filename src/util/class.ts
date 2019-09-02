/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { Dayjs } from "dayjs";
import { BlockColor } from "./blocks/blockColor";

/** The most basic information needed to identify a class */
export interface IClass {
    /** The teacher for the class */
    teacher: string;
    /** The room number the class takes place in */
    room: number;
    /** The name of the class */
    name: string;
    /** The block color which the class meets */
    block: BlockColor;
}

/**
 * Metadata that is needed to understand where the class will
 * be placed in the schedule for each day but not needed to display the class
 */
export interface IClassMeta {
    /** The bitmap of when the class meets */
    meets: number;
    // /** The class UUID for identifying it */
    uuid: string;
}

/** Information that is displayed to the user but never stored locally */
export interface ITimes {
    /** The start time */
    start: Dayjs;
    /** The end time */
    end: Dayjs;
}

/** A class with all of the information needed to process it */
export type StorageClass = IClass & IClassMeta;
export type DisplayClass = IClass & ITimes;