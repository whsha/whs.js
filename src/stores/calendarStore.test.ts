/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import dayjsPluginUTC from "dayjs-plugin-utc";
import mockCalendar from "../../__mocks__/calendar.json";
import CalendarStore from "./calendarStore";

dayjs.extend(dayjsPluginUTC);

describe("Test the functionality of a normal CalendarStore", () => {
    let store = new CalendarStore();

    it("Instanciates correctly", () => {
        expect(store).toBeInstanceOf(CalendarStore);
    });
    it("Updates the calendar correctly", () => {

        store.updateCalendar(mockCalendar);

        expect(store).toMatchSnapshot();
    });
    it("Gets the school day on 2019-09-06T00:00:00Z", () => {
        expect(store.schoolDay(dayjs("2019-09-06T00:00:00Z"))).toMatchSnapshot();
    });

    it("Gets the school day on 2019-09-07T00:00:00Z (should be undefined)", () => {
        expect(store.schoolDay(dayjs("2019-09-07T00:00:00Z")).get()).toBeUndefined();
    });
});