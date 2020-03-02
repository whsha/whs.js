/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v2/block";
import { IClass } from "@whsha/classes/v2/class";
import { SchoolDay } from "@whsha/classes/v2/schoolDay";
import { Semester } from "@whsha/classes/v2/semester";
import dayjs from "dayjs";
import { default as useCustomFormat } from "dayjs/plugin/customParseFormat";
import React from "react";
import { render } from "react-native-testing-library";
import ThemeWrapper from "../test-helpers/ThemeWrapper";
import BlockComponent from "./BlockComponent";

dayjs.extend(useCustomFormat);

/** A dummy class to use for tests */
export const dummyClass: IClass = {
    block: BlockColor.Red,
    lab: false,
    lunches: {},
    meets: {
        [SchoolDay.One]: false,
        [SchoolDay.Two]: false,
        [SchoolDay.Three]: false,
        [SchoolDay.Four]: false,
        [SchoolDay.Five]: false,
        [SchoolDay.Six]: false,
        [SchoolDay.Seven]: false
    },
    name: "",
    room: "",
    semesters: {
        [Semester.First]: true,
        [Semester.Second]: true
    },
    teacher: "",
    uuid: ""
};

it("Renders BlockComponent with a class", () => {
    const comp = render(
        (
            <BlockComponent clazz={dummyClass} block={BlockColor.Red} start={dayjs("7:30 AM", "h:mm A")} end={dayjs("8:30 AM", "h:mm A")} />
        ),
        { wrapper: ThemeWrapper }
    );

    expect(comp.toJSON()).toMatchSnapshot();
});

it("Renders BlockComponent with a free", () => {
    const comp = render(
        (
            <BlockComponent block={BlockColor.None} start={dayjs("7:30 AM", "h:mm A")} end={dayjs("8:30 AM", "h:mm A")} />
        ),
        { wrapper: ThemeWrapper }
    );

    expect(comp.toJSON()).toMatchSnapshot();
});