/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import parseCalendar from "./parse";

let calendarData = readFileSync(resolve(__dirname, "../../../__mocks__/calendar.ics")).toString();

describe("Tests parser with mock data", () => {
    let calendar = parseCalendar(calendarData);

    it("Parses schooldays and matches the snapshot", () => {
        expect(calendar.schoolDays).toMatchSnapshot();
    });

    it("Parses events and matches the snapshot", () => {
        expect(calendar.events).toMatchSnapshot();
    });

    it("Sets updated to a date", () => {
        expect(calendar.updated).toBeTruthy();
    });
});