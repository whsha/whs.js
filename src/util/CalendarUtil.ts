import ICal from "ical.js";
import { AsyncStorage } from "react-native";
import { SetSchoolDay } from "../redux/actions/SchoolDay";
import Store from "../redux/Store";
import AsyncStorageKey from "../types/AsyncStorageKeys";
import { ICalendarInformation, IEvent } from "../types/Calendar";
import { ISchoolDay, ValidSchoolDayNumber } from "../types/SchoolDay";

/** The regex used to match school days */
export const schoolDayRegex = /^(HALF )?DAY ([1-7])(?: - )?(.*)$/i;

/** Get the schools calendar */
export async function getHighSchoolICal(force = false): Promise<ICalendarInformation> {
    // Try to load the calendar from the cache
    let rawCalendarInfo: string = await AsyncStorage.getItem(AsyncStorageKey.Calendar);

    // The parsed cal info
    let calendarInfo: ICalendarInformation;

    // Fetch cal if not in cache or if being forced
    if (rawCalendarInfo === null || force) {
        console.log("Fetching");

        // Get the calendar
        let response = await fetch("http://goo.gl/FR0zjg");

        // Get the full text body
        let responsetext = await response.text();

        // Get the parsed info
        calendarInfo = parseICal(responsetext);

        // Save it in the cache for later use
        await AsyncStorage.setItem(AsyncStorageKey.Calendar, JSON.stringify(calendarInfo));
    } else {
        // Load the info right from the cache
        calendarInfo = JSON.parse(rawCalendarInfo, (key, value) => {
            // Parse dates
            let dateKeys = ["date", "start", "end", "stamp"];
            if (dateKeys.indexOf(key) !== -1) {
                return new Date(value);
            }
            return value;
        }) as ICalendarInformation;
    }

    return calendarInfo;
}

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
        events
    };
}

/** Strip the time information from a date object */
export function stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

/** Load the calendar into the global Redux store */
export function fetchAndStoreSchoolDay() {
    getHighSchoolICal().then((value) => {
        let schoolDay = value.schoolDays.find(x =>
            x.date.getTime() === new Date().setHours(0, 0, 0, 0)
        );

        if (!schoolDay) {
            schoolDay = {
                date: new Date(new Date().setHours(0, 0, 0, 0)),
                dayNumber: 0,
                isHalf: false
            };
        }
        Store.dispatch(SetSchoolDay(schoolDay));
    });
}