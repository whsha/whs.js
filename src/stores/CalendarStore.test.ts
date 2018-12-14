/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import fetchMock from "fetch-mock";
import { readFileSync } from "fs";
import { resolve } from "path";
import CalendarStore from "./CalendarStore";

fetchMock.mock("http://goo.gl/FR0zjg", () => readFileSync(resolve("mock/calendar.ics")).toString());

describe("Test the CalendarStore", () => {
    it("Updates the calendar", async () => {
        let store = new CalendarStore();

        let storespy = jest.spyOn(store, "updateCalendar");
        await store.updateCalendar();

        expect(storespy).toHaveBeenCalled();
        expect(store.updated.getTime()).toBeGreaterThan(0);
    });
    it("Gets the current school day", async () => {
        let store = new CalendarStore();
        await store.updateCalendar();

        let storespy = jest.spyOn(store, "currentSchoolDay", "get");

        let schoolday = store.currentSchoolDay;

        expect(storespy).toHaveBeenCalled();
    });
    it("Gets the next school day", async () => {
        let store = new CalendarStore();

        await store.updateCalendar();

        let storespy = jest.spyOn(store, "nextSchoolDay", "get");

        let schoolday = store.nextSchoolDay;

        expect(storespy).toHaveBeenCalled();
        expect(schoolday).toBeTruthy();
    });
    it("Gets the current events", async () => {
        let store = new CalendarStore();

        await store.updateCalendar();

        let storespy = jest.spyOn(store, "currentEvents", "get");

        let events = store.currentEvents;

        expect(storespy).toHaveBeenCalled();
        expect(events).toBeDefined();
    });
});