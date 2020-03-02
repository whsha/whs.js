/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v2/block";
import { SchoolDay } from "@whsha/classes/v2/schoolDay";
import React from "react";
import { render } from "react-native-testing-library";
import ThemeWrapper from "../test-helpers/ThemeWrapper";
import SchoolDayPicker from "./SchoolDayPicker";

/** A helper function to construct an irregular map */
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
        const comp = render(
            (
                <SchoolDayPicker
                    value={meets(true, true, false, false, false, true, true)}
                    onToggle={callback}
                    blockColorRestraint={BlockColor.None}
                />
            ),
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
        expect(callback).toHaveBeenCalledTimes(0);
    });

    it("Renders SchoolDayPicker with a restaint and corrects value", () => {
        const callback = jest.fn();
        const comp = render(
            (
                <SchoolDayPicker
                    value={meets(true, true, false, true, true, true, true)}
                    onToggle={callback}
                    blockColorRestraint={BlockColor.Green}
                />
            ),
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
        expect(callback).toHaveBeenCalledTimes(2);
    });
});