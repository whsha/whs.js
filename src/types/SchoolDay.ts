export interface SchoolDay {
    dayNumber: ValidSchoolDayNumber;
    isHalf: boolean;
}

export type ValidSchoolDayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;