import { ISchoolDay } from "./SchoolDay";

export interface ICalendarInformation {
    /** The school days */
    schoolDays: ISchoolDay[];
    /** Events that take place */
    events: IEvent[];
}

/** An event */
export interface IEvent {
    /** The start time of the event */
    start: Date;
    /** The end time of the event */
    end: Date;
    /** The timestamp of the event */
    stamp: Date;
    /** The name of the event */
    name: string;
    /** The description of the event */
    description?: string;
    /** The location of the event */
    location?: string;
    /** If the event is all day */
    isAllDay: boolean;
}