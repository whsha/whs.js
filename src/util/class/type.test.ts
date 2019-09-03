/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import { IMajor } from "./blocks";
import { BlockColor } from "../blocks/blockColor";
import { ClassType, getClassType } from "./type";

let major: IMajor = {
    block: BlockColor.Red,
    lab: false,
    name: "Test Major",
    room: "Fitness center",
    teacher: "Mr. Test",
    type: ClassType.Major
};

describe("Get classtype from ClassType<T>", () => {
    it("Gets the classtype from a Major", () => {
        expect(getClassType(major)).toBe(ClassType.Major);
    });
});