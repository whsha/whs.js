/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { IAdvisedClass, IIrregular, isAdvisedClass, isIrregular } from "./primitives";

const advisedClass: IAdvisedClass = {
    room: "100",
    teacher: "Mr. Teach",
};

const irregular: IIrregular = {
    meets: 0b010101
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
    it("Does not throw false positives", () => {
        expect(isIrregular(advisedClass)).toBeFalsy();
    });
});