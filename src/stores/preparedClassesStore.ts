/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { action, observable, toJS } from "mobx";
import { persist } from "mobx-persist";
import { Block } from "../util/blocks/block";
import { SchoolDay } from "../util/calendar/types";
import { IAdvisory, IDR, IMajor, IMinor } from "../util/class/classes";
import { irregularMeetDays } from "../util/class/primitives";
import { IClasses } from "../util/hooks/classes/useClasses";
import { getBlockForColorOnDay, getSchoolDaysThatHaveColor } from "../util/schoolDays";

/** A way of storing classes that is easy to use for a today view */
export type PreparedClasses = {
    [K in SchoolDay]: {
        [B in Block]?: IMajor | IMinor | IDR
    }
};

/** Store containig the users classes prepared in a way for viewing */
export default class PreparedClassesStore {
    /** The classes prepared into a format that can easily be searched through for a today view */
    @persist("object") @observable
    public prepared: PreparedClasses = {
        [SchoolDay.One]: {},
        [SchoolDay.Two]: {},
        [SchoolDay.Three]: {},
        [SchoolDay.Four]: {},
        [SchoolDay.Five]: {},
        [SchoolDay.Six]: {},
        [SchoolDay.Seven]: {}
    };

    /** The advisory */
    @persist("object") @observable
    public advisory: IAdvisory = {room: "", teacher: ""};

    /** Prepare classes from a classes store */
    // tslint:disable-next-line: no-unbound-method
    @action.bound
    public prepare(classes: IClasses) {
        // Clone store as to not link to it
        const unlinkedClasses = toJS(classes, { recurseEverything: true, exportMapsAsObjects: false });

        const prepared: PreparedClasses = {
            [SchoolDay.One]: {},
            [SchoolDay.Two]: {},
            [SchoolDay.Three]: {},
            [SchoolDay.Four]: {},
            [SchoolDay.Five]: {},
            [SchoolDay.Six]: {},
            [SchoolDay.Seven]: {}
        };

        for (const major of unlinkedClasses.majors.values()) {
            const schoolDays = getSchoolDaysThatHaveColor(major.block);

            for (const schoolDay of schoolDays) {
                const block = getBlockForColorOnDay(major.block, schoolDay);

                console.log(major, schoolDay, block);

                prepared[schoolDay][block] = major;

                // If this is a lab, add it to block A
                if (block === Block.B && major.lab) {
                    prepared[schoolDay][Block.A] = major;
                }
            }
        }

        for (const minor of unlinkedClasses.minors.values()) {
            for (const schoolDay of irregularMeetDays(minor)) {
                const block = getBlockForColorOnDay(minor.block, schoolDay);

                prepared[schoolDay][block] = minor;
            }
        }

        for (const dr of unlinkedClasses.drs.values()) {
            for (const schoolDay of irregularMeetDays(dr)) {
                const block = getBlockForColorOnDay(dr.block, schoolDay);

                prepared[schoolDay][block] = dr;
            }
        }

        this.advisory = unlinkedClasses.advisory;
        this.prepared = prepared;
    }

    /** Clear the classes store */
    // tslint:disable-next-line: no-unbound-method
    @action.bound
    public clear() {
        this.prepared = {
            [SchoolDay.One]: {},
            [SchoolDay.Two]: {},
            [SchoolDay.Three]: {},
            [SchoolDay.Four]: {},
            [SchoolDay.Five]: {},
            [SchoolDay.Six]: {},
            [SchoolDay.Seven]: {}
        };
    }
}