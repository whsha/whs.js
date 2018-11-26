export interface ISchoolDay {
    dayNumber: ValidSchoolDayNumber;
    isHalf: boolean;
    meta?: string;
    date: Date;
}

export const defaultSchoolDay: ISchoolDay = {
    date: new Date(0),
    dayNumber: 0,
    isHalf: false
};

export type ValidSchoolDayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;