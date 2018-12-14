/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import ICal from "ical.js";
import moment from "moment";

/** The information about a calendar */
export interface ICalendarInformation {
    /** The school days */
    schoolDays: ICalendarSchoolDay[];
    /** Events that take place */
    events: ICalendarEvent[];
    /** When the calendar was updated */
    updated: Date;
}

/** An event */
export interface ICalendarEvent {
    /** The start time of the event */
    start: Date;
    /** The end time of the event */
    end?: Date;
    /** The timestamp of the event */
    stamp?: Date;
    /** The name of the event */
    name: string;
    /** The description of the event */
    description?: string;
    /** The location of the event */
    location?: string;
    /** If the event is all day */
    isAllDay: boolean;
}

/** A School Day */
export interface ICalendarSchoolDay {
    /** The day number */
    dayNumber: SchoolDay;
    /** If the school day is a half day */
    isHalf: boolean;
    /** Any meta information regarding the day */
    meta?: string;
    /** The date the day is on formatted as YYYY-MM-DD */
    date: string;
}

/** A numeric value denoting the school day in the 7 day cycle */
export enum SchoolDay {
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7
}

/** The regex used to match school days */
export const schoolDayRegex = /^(HALF )?DAY ([1-7])(?: - )?(.*)$/i;

/** The values in the array of the school day match */
enum SchoolDayRegexMatch {
    /** All of the summary matched against */
    All,
    /** If the school day is a half day */
    IsHalf,
    /** The shchool day */
    SchoolDay,
    /** Any metadata about the school day */
    Meta
}

/** Parse an ICal */
export function parseCalendar(rawical: string): ICalendarInformation {
    // Parse the ICal into a JCal
    let cal = ICal.parse(rawical);
    // Get the top level component
    let calendarComponent = new ICal.Component(cal);

    // The array of school days
    let schoolDays: ICalendarSchoolDay[] = [];
    let events: ICalendarEvent[] = [];

    // Loop through all events in a given calendar
    for (let event of calendarComponent.getAllSubcomponents("vevent")) {
        /** The start date of the event */
        let date = event.getFirstPropertyValue<ICal.Time>("dtstart");
        /** The summary of the event (title) */
        let summary = event.getFirstPropertyValue("summary");

        // The event needs a summary and start date in order to be processed
        if (date === null || summary === null) {
            // Skip the event if it cannot be processed
            console.error("No 'date' or 'summary'");
            continue;
        }

        // Check the summary against the school day regex
        /** The match of the events summary */
        let match = schoolDayRegex.exec(summary);

        // Check if the sumamry was a match
        if (match !== null) {
            // If the summary matched, Add the school day to the array of school days
            schoolDays.push({
                // The date that the school day is on, parsed from the event date
                date: moment(date.toJSDate()).format("YYYY-MM-DD"),
                // The day number from the regex match, parsed as an intager
                dayNumber: parseInt(match[SchoolDayRegexMatch.SchoolDay], 10) as SchoolDay,
                // If the day is a half day
                isHalf: (match[SchoolDayRegexMatch.IsHalf] as any) !== undefined,
                // Any metadata about the school day
                meta: match[SchoolDayRegexMatch.Meta]
            });
        } else {
            /** The description of the event */
            let description = event.getFirstPropertyValue("description");
            /** The location of the event */
            let location = event.getFirstPropertyValue("location");
            /** The end date of the event */
            let end = event.getFirstPropertyValue<ICal.Time>("dtend");
            /** The timestamp of the event */
            let stamp = event.getFirstPropertyValue<ICal.Time>("dtstamp");

            // Add the event to the list of events
            events.push({
                // The description of the event
                description: description === null ? undefined : description,
                // The end date of the event, if any
                end: end === null ? undefined : end.toJSDate(),
                // If there is no end date or the event lasts 24 hours, that makes the event all day
                isAllDay: end === null || moment(end.toJSDate()).diff(date.toJSDate(), "days") === 1,
                // The location of the event
                location: location === null ? undefined : location,
                // The summary (title) of the event
                name: summary,
                // The timestamp of the events
                stamp: stamp === null ? undefined : stamp.toJSDate(),
                // The start date of the event
                start: date.toJSDate()
            });
        }
    }

    // Return the information about the calendar
    return {
        events,
        schoolDays,
        updated: new Date()
    };
}

/** Simply fetch the calendar from the url */
export async function fetchCalendar() {
    // Get the calendar
    let response = await fetch("http://goo.gl/FR0zjg");

    // Get the full text body
    return response.text();
}