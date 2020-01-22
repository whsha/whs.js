/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import deepEqual from "deep-equal";
import { toJS } from "mobx";
import { useState } from "react";
import useClasses from "./useClasses";

/** A hook to get the saved and a temp advisory */
export default function useAdvisory() {
    const classes = useClasses();
    const [tempAdvisory, setTempAdvisory] = useState(classes.temp.advisory);

    return {
        savedAdvisory: classes.temp.advisory,
        tempAdvisory,
        updated: !deepEqual(toJS(tempAdvisory), toJS(classes.temp.advisory)),
        save() {
            classes.updateAdvisory(tempAdvisory);
        },
        setTeacher(teacher: string) {
            setTempAdvisory(pre => ({room: pre.room, teacher}));
        },
        setRoom(room: string) {
            setTempAdvisory(pre => ({room, teacher: pre.teacher}));
        }
    };
}