/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { SchoolDay } from "@whsha/classes/v1/calendar/types";
import { IAdvisory } from "@whsha/classes/v2/class";
import deepEqual from "deep-equal";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import useClasses from "./useClasses";

/** A hook to access and edit a users advisory */
export default function useAdvisory(uuid: string) {
    const classes = useClasses();

    return useObserver(() => {
        const saved = classes.saved.advisories.get(uuid);
        const temp = classes.temp.advisories.get(uuid) as Readonly<IAdvisory | undefined>;

        if (temp === undefined) {
            return undefined;
        } else {
            return {
                delete() {
                    classes.temp.advisories.delete(uuid);
                },
                saved,
                temp,
                updated: !deepEqual(toJS(saved), toJS(temp), { strict: true }),
                updateAdvisor(advisor: string) {
                    classes.temp.advisories.set(uuid, { ...temp, advisor });
                },
                updateRoom(room: string) {
                    classes.temp.advisories.set(uuid, { ...temp, room });
                },
                toggleDay(day: SchoolDay) {
                    classes.temp.advisories.set(uuid, {
                        ...temp, meets: {
                            ...temp.meets,
                            [day]: !temp.meets[day]
                        }
                    });
                }
            };
        }
    });
}