/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import mockCalendar from "../../__mocks__/calendar.json";
import CalendarStore from "./calendarStore";

describe("Test the functionality of a normal CalendarStore", () => {
    let store = new CalendarStore();

    it("Instanciates correctly", () => {
        expect(store).toBeInstanceOf(CalendarStore);
    });
    it("Updates the calendar correctly", () => {

        store.updateCalendar(mockCalendar);

        expect(store).toMatchSnapshot();
    });

    it("Returns updated as a date", () => {
        expect(store.updated).toBeInstanceOf(Date);
    });

    it("Gets the school day on 2019-09-06T00:00:00Z", () => {
        expect(store.schoolDay(dayjs("2019-09-06T00:00:00Z"))).toMatchSnapshot();
    });

    it("Gets the school day on 2019-09-07T00:00:00Z (should be undefined)", () => {
        expect(store.schoolDay(dayjs("2019-09-07T00:00:00Z"))).toBeUndefined();
    });

    it("Gets the next school day after on 2019-09-07T00:00:00Z and uses cache for second", () => {
        expect(store.nextSchoolDayAfter(dayjs("2019-09-07 00:00:00")).format("YYYYMMDD")).toMatchSnapshot();
        expect(store.nextSchoolDayAfter(dayjs("2019-09-07 00:00:00")).format("YYYYMMDD")).toMatchSnapshot();
    });

    it("Gets the events on 2019-09-07T00:00:00Z", () => {
        expect(store.eventsOn(dayjs("2019-09-07T00:00:00Z"))).toMatchSnapshot();
    });

    it("Gets the events on 2019-09-16T00:00:00Z", () => {
        expect(store.eventsOn(dayjs("2019-09-16T00:00:00Z"))).toMatchSnapshot();
    });
});