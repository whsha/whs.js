/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs, { Dayjs } from "dayjs";
import dayjsPluginUTC from "dayjs/plugin/utc";
import { action, computed, observable } from "mobx";
import { persist } from "mobx-persist";
import * as TimSort from "timsort";
import { ICalendarInformation, ICalendarSchoolDay } from "../util/calendar/types";

dayjs.extend(dayjsPluginUTC);

/** The store that contains the parsed calendar */
export default class CalendarStore {
    /** Get the current school day */
    public schoolDay(date: Dayjs): ICalendarSchoolDay | undefined {
        return this.schoolDays.get(date.format("YYYY-MM-DD"));
    }

    /** A map that caches the next school day after a given date */
    @persist("map")
    private readonly nextSchoolDayMap = new Map<string, string | undefined>();

    /** Get the next day which has a school day after the given date */
    public nextSchoolDayAfter(date: Dayjs): Dayjs {
        const datestring = date.utc().format("YYYY-MM-DD");

        // Load from cache if possible
        if (this.nextSchoolDayMap.has(datestring)) {
            return dayjs(this.nextSchoolDayMap.get(datestring));
        } else {
            const nextschoolday = Array.from(this.schoolDays.keys()).find(x => dayjs(x).isAfter(date));

            this.nextSchoolDayMap.set(datestring, nextschoolday);

            return dayjs(nextschoolday);
        }
    }

    /** The date this store was last updated */
    @computed
    public get updated() {
        return new Date(this._updated);
    }

    /** School calendar days mapped by the day */
    @persist("map") @observable
    private schoolDays = observable.map<string, ICalendarSchoolDay>();

    /** The last data this store was updated */
    @persist @observable
    private _updated = 0;

    /** Update the stored calendar to match the live version */
    // tslint:disable-next-line: no-unbound-method
    @action.bound
    public async updateCalendar(parsed: ICalendarInformation) {
        // Clear the current stored school days
        this.schoolDays.clear();
        // Clear the cached next school days
        this.nextSchoolDayMap.clear();
        // Sort the parsed school days for ease of searching
        TimSort.sort(parsed.schoolDays, (a, b) => dayjs(a.date).diff(dayjs(b.date), "hour"));
        // Map them by date and store them in the school days
        this.schoolDays = observable.map(
            parsed.schoolDays.map(x =>
                [x.date, x]
            )
        );

        // Update the time of update
        this._updated = parsed.updated;
    }
}
