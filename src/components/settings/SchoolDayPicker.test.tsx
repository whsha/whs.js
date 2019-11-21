/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { render } from "react-native-testing-library";
import { BlockColor } from "../../util/blocks/blockColor";
import { SchoolDay } from "../../util/calendar/types";
import SchoolDayPicker from "./SchoolDayPicker";

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

describe("Tests different variations of <SchoolDayPicker>", () => {
    it("Renders SchoolDayPicker", () => {
        const callback = jest.fn();
        const comp = render(<SchoolDayPicker value={meets(true, true, false, false, false, true, true)} onToggle={callback} blockColorRestraint={BlockColor.None} />);

        expect(comp.toJSON()).toMatchSnapshot();
        expect(callback).toHaveBeenCalledTimes(0);
    });

    it("Renders SchoolDayPicker with a restaint and corrects value", () => {
        const callback = jest.fn();
        const comp = render(<SchoolDayPicker value={meets(true, true, false, true, true, true, true)} onToggle={callback} blockColorRestraint={BlockColor.Green} />);

        expect(comp.toJSON()).toMatchSnapshot();
        expect(callback).toHaveBeenCalledTimes(2);
    });
});