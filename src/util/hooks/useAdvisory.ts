/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import deepEqual from "deep-equal";
import { toJS } from "mobx";
import { useObserver } from "mobx-react-lite";
import useClasses from "./useClasses";

/** A hook to access and edit a users advisory */
export default function useAdvisory() {
    const { saved, temp } = useClasses();

    return {
        saved: saved.advisory,
        temp: temp.advisory,
        updateAdvisor: (room: string) => {
            temp.advisory.advisor = room;
        },
        updateRoom: (room: string) => {
            temp.advisory.room = room;
        },
        updated: useObserver(() => !deepEqual(toJS(saved.advisory), toJS(temp.advisory), { strict: true }))
    };
}