/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs, { Dayjs } from "dayjs";
import { action, computed, IComputedValue, observable } from "mobx";
import { persist } from "mobx-persist";
import * as TimSort from "timsort";
import { ICalendarEvent, ICalendarSchoolDay, parseCalendar } from "../util/calendarUtil";

export default class CalendarStore {
    /** Get the current school day */
    public schoolDay(date: Dayjs): IComputedValue<ICalendarSchoolDay | undefined> {
        return computed(() => this.schoolDays.get(date.format("YYYY-MM-DD")));
    }

    @persist("map")
    public nextSchoolDayMap = new Map<string, string | undefined>();

    /** Get the next day which has a school day after the given date */
    public nextSchoolDayAfter(date: Dayjs): IComputedValue<Dayjs> {
        return computed(() => {
            let datestring = date.format("YYYY-MM-DD");

            // Load from cache if possible
            if (this.nextSchoolDayMap.has(datestring)) {
                return dayjs(this.nextSchoolDayMap.get(datestring));
            } else {
                let nextschoolday = Array.from(this.schoolDays.keys()).find(x => dayjs(x).isAfter(date));

                this.nextSchoolDayMap.set(datestring, nextschoolday);

                return dayjs(nextschoolday);
            }
        });
    }

    /** Get the events for a day */
    public eventsOn(date: Dayjs): IComputedValue<ICalendarEvent[]> {
        return computed(() => {
            let events = this.events.get(date.format("YYYY-MM-DD"));

            return events === undefined ? [] : events;
        });
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
    @persist @observable
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
            let day = dayjs(event.start).format("YYYY-MM-DD");

            let currentEvents = this.events.get(day);

            if (currentEvents === undefined) {
                currentEvents = [];
            }

            currentEvents.push(event);

            this.events.set(day, currentEvents);
        }
        this.schoolDays.clear();
        TimSort.sort(parsed.schoolDays, (a, b) => dayjs(a.date).diff(dayjs(b.date), "hour"));
        this.schoolDays = observable.map(
            parsed.schoolDays.map(x =>
                [x.date, x]
            )
        );
        this._updated = parsed.updated.getTime();
    }
}