/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { action, computed, observable } from "mobx";
import { persist } from "mobx-persist";
import moment from "moment";
import { fetchCalendar, ICalendarEvent, ICalendarSchoolDay, parseCalendar } from "../util/CalendarUtil";

export default class CalendarStore {
    /** The school calendar */
    @persist("list") @observable
    private events: ICalendarEvent[] = [];
    @persist("list") @observable
    private schoolDays: ICalendarSchoolDay[] = [];
    @persist @observable
    private updated: Date = new Date(0);

    /** Get the current school day */
    @computed
    get currentSchoolDay() {
        let currentDate = moment().format("YYYY-MM-DD");

        return this.schoolDays.find(x => x.date === currentDate);
    }

    /** Get the next school day in the schedule */
    @computed
    get nextSchoolDay() {
        let currentDate = moment().format("YYYY-MM-DD");

        let dates = this.schoolDays.slice().sort((a, b) => moment(a.date).diff(moment(b.date))).find(x => moment(x.date).isAfter(currentDate));

        console.log(currentDate, dates.date);

        return undefined;
    }

    /** Update the stored calendar to match the live version */
    @action.bound
    public async updateCalendar() {
        // Fetch the calendar off of the interweb
        let rawcalendar = await fetchCalendar();

        // Parse the calendar
        let parsed = parseCalendar(rawcalendar);

        // Update the cal
        (
            {
                events: this.events,
                schoolDays: this.schoolDays,
                updated: this.updated
            } = parsed
        );
    }

}