import { LunchBlock } from "./Block";

export interface ISchoolDay {
    dayNumber: ValidSchoolDayNumber;
    lunch?: LunchBlock;
    isHalf: boolean;
    meta?: string;
    date: Date;
}

export type ValidSchoolDayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;