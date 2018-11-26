export interface ISchoolDay {
    dayNumber: ValidSchoolDayNumber;
    isHalf: boolean;
    meta?: string;
    date: Date;
}

export type ValidSchoolDayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;