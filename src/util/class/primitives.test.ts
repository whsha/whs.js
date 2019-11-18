/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { SchoolDay } from "../calendar/types";
import { IAdvisedClass, IIrregular, isAdvisedClass, isIrregular } from "./primitives";

const advisedClass: IAdvisedClass = {
    room: "100",
    teacher: "Mr. Teach",
};

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

const malIrregular: IIrregular = {
    meets: {
        [SchoolDay.One]: true,
        [SchoolDay.Two]: true,
        [SchoolDay.Three]: false,
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

describe("Indentify an IIReggular", () => {
    it("Does so when given an IIReggular", () => {
        expect(isIrregular(irregular)).toBeTruthy();
    });

    it("Identifies malformed irrgular IIReggular", () => {
        expect(isIrregular(malIrregular)).toBeFalsy();
    });

    it("Does not throw false positives", () => {
        expect(isIrregular(advisedClass)).toBeFalsy();
    });
});