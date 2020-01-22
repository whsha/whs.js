/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import { default as useCustomFormat } from "dayjs/plugin/customParseFormat";
import mockCalendar from "../__mocks__/calendar.json";
import CalendarStore from "./calendarStore";

dayjs.extend(useCustomFormat);

describe("Test the functionality of a normal CalendarStore", () => {
    const store = new CalendarStore();

    it("Instanciates correctly", () => {
        expect(store).toBeInstanceOf(CalendarStore);
    });
    it("Updates the calendar correctly", async (done) => {

        await store.updateCalendar(mockCalendar);

        expect(store).toMatchSnapshot();

        done();
    });

    it("Returns updated as a date", () => {
        expect(store.updated).toBeInstanceOf(Date);
    });

    it("Gets the school day on 2019-09-06", () => {
        expect(store.schoolDay(dayjs("2019-09-06", "YYYY-MM-DD"))).toMatchSnapshot();
    });

    it("Gets the school day on 2019-09-07 (should be undefined)", () => {
        expect(store.schoolDay(dayjs("2019-09-07", "YYYY-MM-DD"))).toBeUndefined();
    });

    it("Gets the next school day after on 2019-09-07 and uses cache for second", () => {
        expect(store.nextSchoolDayAfter(dayjs("2019-09-07 00:00:00")).format("YYYYMMDD")).toMatchSnapshot();
        expect(store.nextSchoolDayAfter(dayjs("2019-09-07 00:00:00")).format("YYYYMMDD")).toMatchSnapshot();
    });
});