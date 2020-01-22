/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { SchoolDay } from "@whsha/classes/v1/calendar/types";
import { IAdvisory, IDR, IMajor, IMinor } from "@whsha/classes/v1/class/classes";
import { DayLunchMap, Lunch } from "@whsha/classes/v1/class/lunch";
import { action, observable, toJS } from "mobx";
import { persist } from "mobx-persist";

/** Store containig the users classes */
export default class LegacyClassesStore {
    /** The users advisory */
    @persist("object") @observable
    public advisory: IAdvisory = { room: "", teacher: "" };

    /** The lunches for a user */
    @persist("object") @observable
    public lunches: DayLunchMap = {
        [SchoolDay.One]: Lunch.None,
        [SchoolDay.Two]: Lunch.None,
        [SchoolDay.Three]: Lunch.None,
        [SchoolDay.Four]: Lunch.None,
        [SchoolDay.Five]: Lunch.None,
        [SchoolDay.Six]: Lunch.None,
        [SchoolDay.Seven]: Lunch.None
    };

    /** A map of the users Majors by their uuid */
    @persist("map") @observable
    public majors: Map<string, IMajor> = observable.map();
    /** A map of the users Minors by their uuid */
    @persist("map") @observable
    public minors: Map<string, IMinor> = observable.map();
    /** A map of the users DRs by their uuid */
    @persist("map") @observable
    public DRs: Map<string, IDR> = observable.map();

    /** Load the data from another classes store into this classes store without linking the two */
    // tslint:disable-next-line: no-unbound-method
    @action.bound
    public hydrateFrom(linkedstore: LegacyClassesStore) {
        // Clone store as to not link to it
        const store = toJS(linkedstore, { exportMapsAsObjects: false, recurseEverything: true });

        this.majors = store.majors;
        this.minors = store.minors;
        this.DRs = store.DRs;
        this.advisory = store.advisory;
        this.lunches = store.lunches;
    }

    /** Clear the classes store */
    // tslint:disable-next-line: no-unbound-method
    @action.bound
    public clear() {
        this.advisory = { room: "", teacher: "" };
        this.lunches = {
            [SchoolDay.One]: Lunch.None,
            [SchoolDay.Two]: Lunch.None,
            [SchoolDay.Three]: Lunch.None,
            [SchoolDay.Four]: Lunch.None,
            [SchoolDay.Five]: Lunch.None,
            [SchoolDay.Six]: Lunch.None,
            [SchoolDay.Seven]: Lunch.None
        };
        this.majors = observable.map();
        this.minors = observable.map();
        this.DRs = observable.map();
    }

}