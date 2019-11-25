/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "../blocks/blockColor";
import { SchoolDay } from "../calendar/types";
import ProblemMap from "../problemMap";
import { IrregularMeetDays } from "./primitives";
import { ClassType } from "./type";
import { validateDRs, validateMajors, validateMinors, ValidationError, ValidationWarning } from "./validation";

/** Utility function to construct an irregular meet easy */
function meets(one: boolean, two: boolean, three: boolean, four: boolean, five: boolean, six: boolean, seven: boolean) {
    return {
        [SchoolDay.One]: one,
        [SchoolDay.Two]: two,
        [SchoolDay.Three]: three,
        [SchoolDay.Four]: four,
        [SchoolDay.Five]: five,
        [SchoolDay.Six]: six,
        [SchoolDay.Seven]: seven
    };
}

describe("Detects errors and warnings in majors", () => {
    it("Can detect valid class configuration", () => {
        const problems = new ProblemMap<string, ValidationError, ValidationWarning>();

        const majorColors = validateMajors(problems, [
            {
                block: BlockColor.Green,
                lab: false,
                name: "",
                room: "",
                teacher: "",
                type: ClassType.Major,
                uuid: "uuid1",
            },
            {
                block: BlockColor.Red,
                lab: false,
                name: "",
                room: "",
                teacher: "test",
                type: ClassType.Major,
                uuid: "uuid2"
            },
            {
                block: BlockColor.Yellow,
                lab: false,
                name: "test",
                room: "more",
                teacher: "",
                type: ClassType.Major,
                uuid: "uuid3",
            }
        ]);

        expect(majorColors.size).toBe(3);

        expect(problems.errorsSize).toBe(0);
        expect(problems.getErrors("uuid1")).toBeUndefined();
        expect(problems.getErrors("uuid2")).toBeUndefined();
        expect(problems.getErrors("uuid3")).toBeUndefined();

        expect(problems.warningsSize).toBe(3);

        expect(problems.getWarns("uuid1")).toStrictEqual([
            ValidationWarning.MissingName,
            ValidationWarning.MissingRoom,
            ValidationWarning.MissingTeacher
        ]);
        expect(problems.getWarns("uuid2")).toStrictEqual([
            ValidationWarning.MissingName,
            ValidationWarning.MissingRoom,
        ]);
        expect(problems.getWarns("uuid3")).toStrictEqual([
            ValidationWarning.MissingTeacher
        ]);
    });

    it("Can detect invalid class configuration", () => {
        const problems = new ProblemMap<string, ValidationError, ValidationWarning>();

        const majorColors = validateMajors(problems, [
            {
                block: BlockColor.Green,
                lab: false,
                name: "a",
                room: "b",
                teacher: "",
                type: ClassType.Major,
                uuid: "uuid1",
            },
            {
                block: BlockColor.Green,
                lab: false,
                name: "test",
                room: "",
                teacher: "",
                type: ClassType.Major,
                uuid: "uuid2"
            },
            {
                block: BlockColor.None,
                lab: false,
                name: "",
                room: "",
                teacher: "",
                type: ClassType.Major,
                uuid: "uuid3",
            }
        ]);

        expect(majorColors.size).toBe(2);
        expect(problems.errorsSize).toBe(2);

        expect(problems.getErrors("uuid1")).toBeUndefined();
        expect(problems.getErrors("uuid2")).toStrictEqual([
            ValidationError.MajorHasDuplicateBlockColor
        ]);
        expect(problems.getErrors("uuid3")).toStrictEqual([
            ValidationError.MissingBlockColor
        ]);

        expect(problems.warningsSize).toBe(3);

        expect(problems.getWarns("uuid1")).toStrictEqual([
            ValidationWarning.MissingTeacher
        ]);
        expect(problems.getWarns("uuid2")).toStrictEqual([
            ValidationWarning.MissingRoom,
            ValidationWarning.MissingTeacher
        ]);
        expect(problems.getWarns("uuid3")).toStrictEqual([
            ValidationWarning.MissingName,
            ValidationWarning.MissingRoom,
            ValidationWarning.MissingTeacher
        ]);
    });
});

describe("Detects errors and warnings in minors", () => {
    const majorColors = new Map<BlockColor, boolean>([
        [BlockColor.Red, true],
        [BlockColor.Green, false],
        [BlockColor.Blue, true]
    ]);

    it("Can detect valid class configuration", () => {
        const problems = new ProblemMap<string, ValidationError, ValidationWarning>();

        const minorColors = validateMinors(problems, majorColors, [
            {
                block: BlockColor.Purple,
                meets: meets(false, true, false, false, false, false, false),
                name: "a",
                room: "b",
                teacher: "c",
                type: ClassType.Minor,
                uuid: "uuid1",
            },
            {
                block: BlockColor.Purple,
                meets: meets(true, false, false, true, true, false, false),
                name: "a",
                room: "b",
                teacher: "c",
                type: ClassType.Minor,
                uuid: "uuid2"
            },
            {
                block: BlockColor.Tan,
                meets: meets(false, true, false, true, true, false, false),
                name: "a",
                room: "b",
                teacher: "c",
                type: ClassType.Minor,
                uuid: "uuid3",
            }
        ]);

        expect(minorColors.size).toBe(2);
        expect(problems.errorsSize).toBe(0);
        expect(problems.getErrors("uuid1")).toBeUndefined();
        expect(problems.getErrors("uuid2")).toBeUndefined();
        expect(problems.getErrors("uuid3")).toBeUndefined();

        expect(problems.warningsSize).toBe(0);
        expect(problems.getWarns("uuid1")).toBeUndefined();
        expect(problems.getWarns("uuid2")).toBeUndefined();
        expect(problems.getWarns("uuid3")).toBeUndefined();
    });

    it("Can detect invalid class configuration", () => {
        const problems = new ProblemMap<string, ValidationError, ValidationWarning>();

        const minorColors = validateMinors(problems, majorColors, [
            {
                block: BlockColor.Green,
                meets: meets(false, true, false, true, true, false, false),
                name: "1",
                room: "",
                teacher: "",
                type: ClassType.Minor,
                uuid: "uuid1",
            },
            {
                block: BlockColor.Green,
                meets: meets(false, true, true, false, false, false, false),
                name: "",
                room: "3",
                teacher: "",
                type: ClassType.Minor,
                uuid: "uuid2"
            },
            {
                block: BlockColor.Yellow,
                meets: meets(true, true, false, true, true, true, false),
                name: "4",
                room: "3",
                teacher: "5",
                type: ClassType.Minor,
                uuid: "uuid3",
            },
            {
                block: BlockColor.Purple,
                meets: meets(false, false, false, false, false, false, false),
                name: "3",
                room: "2",
                teacher: "1",
                type: ClassType.Minor,
                uuid: "uuid4",
            }
        ]);

        expect(minorColors.size).toBe(3);
        expect(problems.errorsSize).toBe(4);
        expect(problems.getErrors("uuid1")).toStrictEqual([
            ValidationError.MinorConflictWithMajor
        ]);
        expect(problems.getErrors("uuid2")).toStrictEqual([
            ValidationError.MinorConflictWithMajor,
            ValidationError.MinorConflictWithMinor
        ]);
        expect(problems.getErrors("uuid3")).toStrictEqual([
            ValidationError.MeetsEveryDay
        ]);
        expect(problems.getErrors("uuid4")).toStrictEqual([
            ValidationError.MissingMeetDay
        ]);

        expect(problems.warningsSize).toBe(2);

        expect(problems.getWarns("uuid1")).toStrictEqual([
            ValidationWarning.MissingRoom,
            ValidationWarning.MissingTeacher
        ]);
        expect(problems.getWarns("uuid2")).toStrictEqual([
            ValidationWarning.MissingName,
            ValidationWarning.MissingTeacher
        ]);
        expect(problems.getWarns("uuid3")).toBeUndefined();
        expect(problems.getWarns("uuid4")).toBeUndefined();
    });
});

describe("Detects errors and warnings in drs", () => {
    const majorColors = new Map<BlockColor, boolean>([
        [BlockColor.Red, true],
        [BlockColor.Green, false],
        [BlockColor.Blue, true]
    ]);

    const minorColors = new Map<BlockColor, IrregularMeetDays>([
        [BlockColor.Yellow, meets(true, false, true, true, true, false, false)],
        [BlockColor.Tan, meets(true, true, true, true, true, true, true)],
        [BlockColor.Purple, meets(true, false, false, true, false, true, false)]
    ]);

    it("Can detect valid class configuration", () => {
        const problems = new ProblemMap<string, ValidationError, ValidationWarning>();

        const drColors = validateDRs(problems, majorColors, minorColors, [
            {
                block: BlockColor.Orange,
                meets: meets(false, true, false, false, false, false, false),
                room: "b",
                teacher: "c",
                type: ClassType.DR,
                uuid: "uuid1",
            },
            {
                block: BlockColor.Orange,
                meets: meets(true, false, false, true, true, false, false),
                room: "b",
                teacher: "c",
                type: ClassType.DR,
                uuid: "uuid2"
            },
            {
                block: BlockColor.Purple,
                meets: meets(false, true, false, false, true, false, true),
                room: "b",
                teacher: "c",
                type: ClassType.DR,
                uuid: "uuid3",
            }
        ]);

        expect(drColors.size).toBe(2);
        expect(problems.errorsSize).toBe(0);
        expect(problems.getErrors("uuid1")).toBeUndefined();
        expect(problems.getErrors("uuid2")).toBeUndefined();
        expect(problems.getErrors("uuid3")).toBeUndefined();

        expect(problems.warningsSize).toBe(0);
        expect(problems.getWarns("uuid1")).toBeUndefined();
        expect(problems.getWarns("uuid2")).toBeUndefined();
        expect(problems.getWarns("uuid3")).toBeUndefined();
    });

    it("Can detect invalid class configuration", () => {
        const problems = new ProblemMap<string, ValidationError, ValidationWarning>();

        const drColors = validateDRs(problems, majorColors, minorColors, [
            {
                block: BlockColor.Red,
                meets: meets(false, true, false, true, true, false, false),
                room: "",
                teacher: "",
                type: ClassType.DR,
                uuid: "uuid1",
            },
            {
                block: BlockColor.Purple,
                meets: meets(false, true, true, false, false, false, false),
                room: "3",
                teacher: "",
                type: ClassType.DR,
                uuid: "uuid2"
            },
            {
                block: BlockColor.Yellow,
                meets: meets(true, true, false, true, true, true, false),
                room: "3",
                teacher: "5",
                type: ClassType.DR,
                uuid: "uuid3",
            },
            {
                block: BlockColor.Purple,
                meets: meets(false, false, false, false, false, false, false),
                room: "2",
                teacher: "1",
                type: ClassType.DR,
                uuid: "uuid4",
            }
            ,
            {
                block: BlockColor.Purple,
                meets: meets(false, true, false, false, false, false, false),
                room: "2",
                teacher: "1",
                type: ClassType.DR,
                uuid: "uuid5",
            }
        ]);

        expect(drColors.size).toBe(3);
        expect(problems.errorsSize).toBe(4);
        expect(problems.getErrors("uuid1")).toStrictEqual([
            ValidationError.DRConflictWithMajor
        ]);
        expect(problems.getErrors("uuid2")).toBeUndefined();
        expect(problems.getErrors("uuid3")).toStrictEqual([
            ValidationError.MeetsEveryDay,
            ValidationError.DRConflictWithMinor
        ]);
        expect(problems.getErrors("uuid4")).toStrictEqual([
            ValidationError.MissingMeetDay
        ]);
        expect(problems.getErrors("uuid5")).toStrictEqual([
            ValidationError.DRConflictWithDR
        ]);

        expect(problems.warningsSize).toBe(2);
        expect(problems.getWarns("uuid1")).toStrictEqual([
            ValidationWarning.MissingRoom,
            ValidationWarning.MissingTeacher
        ]);
        expect(problems.getWarns("uuid2")).toStrictEqual([
            ValidationWarning.MissingTeacher
        ]);
        expect(problems.getWarns("uuid3")).toBeUndefined();
        expect(problems.getWarns("uuid4")).toBeUndefined();
        expect(problems.getWarns("uuid5")).toBeUndefined();
    });
});