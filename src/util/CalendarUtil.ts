/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import ICal from "ical.js";

/** Parse an ICal */
export function parseICal(rawical: string): ICalendarInformation {
    // Parse the ICal into a JCal
    let cal = ICal.parse(rawical);
    // Get the top level component
    let calendarComponent = new ICal.Component(cal);

    // let events
    let schoolDays: ISchoolDay[] = [];
    let events: IEvent[] = [];

    for (let event of calendarComponent.getAllSubcomponents("vevent")) {
        let date = event.getFirstPropertyValue<ICal.Time>("dtstart").toJSDate();

        let end = event.getFirstPropertyValue<ICal.Time>("dtend");

        let match = schoolDayRegex.exec(event.getFirstPropertyValue("summary"));

        if (match !== null) {
            schoolDays.push({
                dayNumber: parseInt(match[2], 10) as ValidSchoolDayNumber,
                isHalf: match[1] !== undefined,
                meta: match[3],
                date: stripTime(date)
            });
        } else {
            events.push({
                name: event.getFirstPropertyValue("summary"),
                description: event.getFirstPropertyValue("description"),
                location: event.getFirstPropertyValue("location"),
                end: end === null ? undefined : end.toJSDate(),
                start: event.getFirstPropertyValue<ICal.Time>("dtstart").toJSDate(),
                stamp: event.getFirstPropertyValue<ICal.Time>("dtstamp").toJSDate(),
                isAllDay: end === null
            });
        }
    }

    return {
        schoolDays,
        events,
        updated: new Date()
    };
}