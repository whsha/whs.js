/*!
 * Copyright (C) 2018  Zachary Kohnen (DusterTheFirst)
 */

import { computed, observable } from "mobx";
import { persist } from "mobx-persist";
import { ICalendarInformation } from "../util/CalendarUtil";

export default class CalendarClassStore {
    /** The classes of a user */
    // @persist @observable
    // public classes = [];

    /** The school calendar */
    @persist @observable
    public calendar: ICalendarInformation = {
        events: [],
        schoolDays: [],
        updated: new Date(0)
    };

    @computed
    get currentSchoolDay() {
        return undefined;
    }
}