/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { fetchCalendar, ICalendarInformation, parseCalendar, SchoolDay } from "./CalendarUtil";

import fetchMock from "fetch-mock";
import {readFileSync} from "fs";
import { resolve } from "path";

fetchMock.mock("http://goo.gl/FR0zjg", () => readFileSync(resolve("mock/calendar.ics")).toString());

it("Fetches the calendar", async () => {
    // Get the raw calendar
    let rawCalendar = await fetchCalendar();

    // Make sure it did return a value
    expect(rawCalendar).toBeTruthy();
});

describe("Loads the school calendar", () => {
    it("Parses the calendar", async () => {
        // Get the raw calendar
        let rawCalendar = await fetchCalendar();

        // Parse the calendar
        expect(parseCalendar.bind(undefined, rawCalendar)).not.toThrowError();
    });
    describe("Validates the calendar", () => {
        let calendar: ICalendarInformation;

        beforeAll(async () => {
            // Get the raw calendar
            let rawCalendar = await fetchCalendar();

            // Parse the calendar
            calendar = parseCalendar(rawCalendar);
        });

        it("Has properties", () => {
            // Make sure the properties exist
            expect(calendar).toHaveProperty("events");
            expect(calendar).toHaveProperty("schoolDays");
        });

        it("Has a valid date", () => {
            // Make sure the date is correct
            expect(calendar.updated.getTime()).toBeLessThanOrEqual(Date.now());
        });

        it("Has filled arrays", () => {
            // Make sure it did parse events and school days
            expect(calendar.events.length).not.toBe(0);
            expect(calendar.schoolDays.length).not.toBe(0);
        });

        it("Has at least one half day", () => {
            // Make sure some school days are half
            expect(calendar.schoolDays.some(x => x.isHalf)).toBeTruthy();
        });

        it("Has only valid school day numbers", () => {
            // Make sure all school days have valid school day numbers
            expect(calendar.schoolDays.every(x => x.dayNumber <= SchoolDay.Seven && x.dayNumber >= SchoolDay.One)).toBeTruthy();
        });
    });
});