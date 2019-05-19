/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { action, computed, observable } from "mobx";
import { persist } from "mobx-persist";
import moment from "moment";
import { ICalendarEvent, ICalendarSchoolDay, parseCalendar } from "../util/calendarUtil";

export default class CalendarStore {
    /** Get the current school day */
    @computed
    public get currentSchoolDay(): ICalendarSchoolDay | undefined {
        let currentDate = moment().format("YYYY-MM-DD");

        return this.schoolDays.get(currentDate);
    }

    // /** Get the next school day in the schedule */
    // @computed
    // public get nextSchoolDay(): ICalendarSchoolDay {
    //     let currentDate = moment().format("YYYY-MM-DD");

    //     let nextschoolday = this.schoolDays.slice().sort(
    //         (a, b) => moment(a.date).diff(moment(b.date))
    //     ).find(x => moment(x.date).isAfter(currentDate));

    //     return nextschoolday === undefined ? {
    //         date: currentDate,
    //         dayNumber: SchoolDay.One,
    //         isHalf: false
    //     } : nextschoolday;
    // }

     /** Get the current events */
    @computed
    public get currentEvents(): ICalendarEvent[] {
        let currentDate = moment().format("YYYY-MM-DD");

        let events = this.events.get(currentDate);

        return events === undefined ? [] : events;
    }

    /** The date this store was last updated */
    @computed
    public get updated() {
        return new Date(this._updated);
    }

    /** School calendar events mapped by the day */
    @persist("map") @observable
    private readonly events = observable.map<string, ICalendarEvent[]>();
    /** School calendar days mapped by the day */
    @persist("map") @observable
    private schoolDays = observable.map<string, ICalendarSchoolDay>();
    /** The last data this store was updated */
    @persist("object") @observable
    private _updated = 0;

    /** Update the stored calendar to match the live version */
    // tslint:disable-next-line: no-unbound-method
    @action.bound
    public async updateCalendar(rawcalendar: string) {
        // Parse the calendar
        let parsed = parseCalendar(rawcalendar);

        // Update the cal
        this.events.clear();
        for (let event of parsed.events) {
            // Get day of the event
            let day = moment(event.start).format("YYYY-MM-DD");

            let currentEvents = this.events.get(day);

            if (currentEvents === undefined) {
                currentEvents = [];
            }

            currentEvents.push(event);

            this.events.set(day, currentEvents);
        }
        this.schoolDays.clear();
        this.schoolDays = observable.map(parsed.schoolDays.map(x => [x.date, x]));
        this._updated = parsed.updated.getTime();
    }
}