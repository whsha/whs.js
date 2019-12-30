/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "../util/blocks/blockColor";
import { SchoolDay } from "../util/calendar/types";
import { IDR, IMajor, IMinor } from "../util/class/classes";
import { IAdvisedClass } from "../util/class/primitives";
import { ClassType } from "../util/class/type";

/** A sample major */
export const major: IMajor = {
    block: BlockColor.Red,
    lab: false,
    name: "Test Major",
    room: "Fitness center",
    teacher: "Mr. Test",
    type: ClassType.Major,
    uuid: ""
};

/** A sample minor */
export const minor: IMinor = {
    block: BlockColor.Yellow,
    meets: {
        [SchoolDay.One]: false,
        [SchoolDay.Two]: true,
        [SchoolDay.Three]: false,
        [SchoolDay.Four]: true,
        [SchoolDay.Five]: true,
        [SchoolDay.Six]: true,
        [SchoolDay.Seven]: true,
    },
    name: "Test minor",
    room: "334",
    teacher: "Mrs. Test",
    type: ClassType.Minor,
    uuid: ""
};

/** A sample DR */
export const dr: IDR = {
    block: BlockColor.Green,
    meets: {
        [SchoolDay.One]: true,
        [SchoolDay.Two]: false,
        [SchoolDay.Three]: false,
        [SchoolDay.Four]: false,
        [SchoolDay.Five]: true,
        [SchoolDay.Six]: true,
        [SchoolDay.Seven]: true,
    },
    room: "102",
    teacher: "Dr. Test",
    type: ClassType.DR,
    uuid: ""
};

/** A sample non class */
export const notclass: IAdvisedClass = {
    room: "Fitness center",
    teacher: "Mr. Test",
};