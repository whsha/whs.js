/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { SchoolDay } from "../calendar/types";
import { IAdvisedClass, IIrregular, irregularMeetCount, irregularMeetDays, irregularMeetJoin, isAdvisedClass, isIrregular } from "./primitives";

/** A sample advised class */
const advisedClass: IAdvisedClass = {
    room: "100",
    teacher: "Mr. Teach",
};

/** A sample irregular */
const irregular: IIrregular = {
    meets: {
        [SchoolDay.One]: true,
        [SchoolDay.Two]: false,
        [SchoolDay.Three]: false,
        [SchoolDay.Four]: false,
        [SchoolDay.Five]: true,
        [SchoolDay.Six]: true,
        [SchoolDay.Seven]: true,
    }
};

/** A sample malformed irregular */
const malIrregular: IIrregular = {
    meets: {
        [SchoolDay.One]: false,
        [SchoolDay.Two]: true,
        [SchoolDay.Three]: true,
        [SchoolDay.Four]: false,
        [SchoolDay.Five]: true,
        [SchoolDay.Six]: true,
        [SchoolDay.Seven]: true,
    }
};

describe("Indentify an IAdvisedClass", () => {
    it("Does so when given an IAdvisedClass", () => {
        expect(isAdvisedClass(advisedClass)).toBeTruthy();
    });
    it("Does not throw false positives", () => {
        expect(isAdvisedClass(irregular)).toBeFalsy();
    });
});

describe("Indentify an IIreggular", () => {
    it("Does so when given an IIreggular", () => {
        expect(isIrregular(irregular)).toBeTruthy();
    });

    it("Identifies malformed irrgular IIreggular", () => {
        expect(isIrregular(malIrregular)).toBeFalsy();
    });

    it("Does not throw false positives", () => {
        expect(isIrregular(advisedClass)).toBeFalsy();
    });
});

describe("Retrieve information from IIreggular", () => {
    it("Correctly counts the days an irregular meets", () => {
        expect(irregularMeetCount(irregular)).toBe(4);
    });

    it("Correctly counts the days another irregular meets", () => {
        expect(irregularMeetCount(malIrregular)).toBe(5);
    });

    it("Correctly gets the days a irregular meets as an array", () => {
        expect(irregularMeetDays(irregular)).toStrictEqual([SchoolDay.One, SchoolDay.Five, SchoolDay.Six, SchoolDay.Seven]);
    });

    it("Correctly gets the days another irregular meets as an array", () => {
        expect(irregularMeetDays(malIrregular)).toStrictEqual([SchoolDay.Two, SchoolDay.Three, SchoolDay.Five, SchoolDay.Six, SchoolDay.Seven]);
    });

    it("Correctly joins the days with those of another irregular", () => {
        expect(irregularMeetJoin(irregular.meets, malIrregular.meets)).toStrictEqual({
            [SchoolDay.One]: true,
            [SchoolDay.Two]: true,
            [SchoolDay.Three]: true,
            [SchoolDay.Four]: false,
            [SchoolDay.Five]: true,
            [SchoolDay.Six]: true,
            [SchoolDay.Seven]: true,
        });
    });
});