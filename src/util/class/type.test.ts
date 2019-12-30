/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { dr, major, minor, notclass } from "../../__mocks__/classes";
import { ClassType, getClassType, hasClassType, isDR, isMajor, isMinor } from "./type";

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