/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { fetchCalendar, parseCalendar } from "./CalendarUtil";

import fetchMock from "fetch-mock";
import {readFileSync} from "fs";
import { resolve } from "path";

fetchMock.mock("http://goo.gl/FR0zjg", () => readFileSync(resolve("mock/calendar.ics")));

describe("Loads the school calendar", () => {
    let calendar: string;
    it("Fetches the calendar", async () => {
        calendar = await fetchCalendar();
        expect(calendar).toBeTruthy();
    });
    it("Parses the calendar", () => {
        parseCalendar(calendar);
    });
});