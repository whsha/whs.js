/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { action, computed, observable } from "mobx";
import { persist } from "mobx-persist";
import moment from "moment";
import { fetchCalendar, ICalendarEvent, ICalendarSchoolDay, parseCalendar, SchoolDay } from "../util/CalendarUtil";

export default class CalendarStore {

    /** Get the current school day */
    @computed
    public get currentSchoolDay(): ICalendarSchoolDay | undefined {
        let currentDate = moment().format("YYYY-MM-DD");

        return this.schoolDays.find(x => x.date === currentDate);
    }

    /** Get the next school day in the schedule */
    @computed
    public get nextSchoolDay(): ICalendarSchoolDay {
        let currentDate = moment().format("YYYY-MM-DD");

        let nextschoolday = this.schoolDays.slice().sort(
            (a, b) => moment(a.date).diff(moment(b.date))
        ).find(x => moment(x.date).isAfter(currentDate));

        return nextschoolday === undefined ? {
            date: currentDate,
            dayNumber: SchoolDay.One,
            isHalf: false
        } : nextschoolday;
    }

     /** Get the current events */
    @computed
    public get currentEvents(): ICalendarEvent[] {
        let currentDate = moment().format("YYYY-MM-DD");

        return this.events
            .filter(x => moment(x.start).diff(moment(currentDate), "days") === 0)
            .sort((a, b) => moment(a.start).diff(b.start));
    }

    @computed
    public get updated() {
        return new Date(this._updated);
    }

    /** The school calendar */
    @persist("list") @observable
    private events: ICalendarEvent[] = [];
    @persist("list") @observable
    private schoolDays: ICalendarSchoolDay[] = [];
    @persist("object") @observable
    private _updated: number = 0;

    /** Update the stored calendar to match the live version */
    @action.bound
    public async updateCalendar() {
        // Fetch the calendar off of the interweb
        let rawcalendar = await fetchCalendar();

        // Parse the calendar
        let parsed = parseCalendar(rawcalendar);

        // Update the cal
        this.events = parsed.events;
        this.schoolDays = parsed.schoolDays;
        this._updated = parsed.updated.getTime();
    }

}