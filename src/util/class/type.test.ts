/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "../blocks/blockColor";
import { IAdvisedClass } from "./primitives";
import { IDR, IMajor, IMinor } from "./storage";
import { ClassType, getClassType, hasClassType, isDR, isMajor, isMinor } from "./type";

let major: IMajor = {
    block: BlockColor.Red,
    lab: false,
    name: "Test Major",
    room: "Fitness center",
    teacher: "Mr. Test",
    type: ClassType.Major,
    uuid: ""
};

let minor: IMinor = {
    block: BlockColor.Yellow,
    meets: 0b01101,
    name: "Test minor",
    room: "334",
    teacher: "Mrs. Test",
    type: ClassType.Minor,
    uuid: ""
};

let dr: IDR = {
    block: BlockColor.Green,
    meets: 0b11111,
    room: "102",
    teacher: "Dr. Test",
    type: ClassType.DR,
    uuid: ""
};

let notclass: IAdvisedClass = {
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