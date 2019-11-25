/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "../blocks/blockColor";
import { SchoolDay } from "../calendar/types";
import { IDR, IMajor, IMinor } from "./classes";
import { IAdvisedClass } from "./primitives";
import { ClassType, getClassType, hasClassType, isDR, isMajor, isMinor } from "./type";

/** A sample major */
const major: IMajor = {
    block: BlockColor.Red,
    lab: false,
    name: "Test Major",
    room: "Fitness center",
    teacher: "Mr. Test",
    type: ClassType.Major,
    uuid: ""
};

/** A sample minor */
const minor: IMinor = {
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
const dr: IDR = {
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
const notclass: IAdvisedClass = {
    room: "Fitness center",
    teacher: "Mr. Test",
};

describe("Get classtype from ClassType<T>", () => {
    it("hasClassType", () => {
        expect(hasClassType(major)).toBeTruthy();
        expect(hasClassType(minor)).toBeTruthy();
        expect(hasClassType(dr)).toBeTruthy();
        expect(hasClassType(notclass)).toBeFalsy();
    });
    it("Gets the classtype from a Major", () => {
        expect(getClassType(major)).toBe(ClassType.Major);
    });
    it("Gets the classtype from a Minor", () => {
        expect(getClassType(minor)).toBe(ClassType.Minor);
    });
    it("Gets the classtype from a DR", () => {
        expect(getClassType(dr)).toBe(ClassType.DR);
    });

    it("Correctly identifies a Major", () => {
        expect(isMajor(major)).toBeTruthy();
        expect(isMajor(minor)).toBeFalsy();
        expect(isMajor(dr)).toBeFalsy();
    });
    it("Correctly identifies a Minor", () => {
        expect(isMinor(minor)).toBeTruthy();
        expect(isMinor(major)).toBeFalsy();
        expect(isMinor(dr)).toBeFalsy();
    });
    it("Correctly identifies a DR", () => {
        expect(isDR(dr)).toBeTruthy();
        expect(isDR(major)).toBeFalsy();
        expect(isDR(minor)).toBeFalsy();
    });
});