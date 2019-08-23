/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { useContext, useState } from "react";
import { ClassesContext } from "../../contexts";

export default function useAdvisory() {
    let classes = useContext(ClassesContext);
    let [tempAdvisory, setTempAdvisory] = useState(classes.advisory);

    return {
        savedAdvisory: classes.advisory,
        tempAdvisory,
        save() {
            classes.updateAdvisory(tempAdvisory);
        },
        setTeacher(teacher: string) {
            setTempAdvisory(pre => ({room: pre.room, teacher}));
        },
        setRoom(room: number) {
            setTempAdvisory(pre => ({room, teacher: pre.teacher}));
        }
    };
}