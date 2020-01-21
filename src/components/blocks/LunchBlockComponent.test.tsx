/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { dr, major, minor } from "@whsha/classes/v1/__mocks__/classes";
import { BlockColor } from "@whsha/classes/v1/blocks/blockColor";
import { Lunch } from "@whsha/classes/v1/class/lunch";
import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { render } from "react-native-testing-library";
import ThemeWrapper from "../test-helpers/ThemeWrapper";
import LunchBlockComponent from "./LunchBlockComponent";

dayjs.extend(useCustomFormat);

describe("Tests different variations of classes", () => {
    it("Renders LunchBlockComponent with a major", () => {
        const comp = render(
            (
                <LunchBlockComponent
                    clazz={major}
                    block={BlockColor.Red}
                    lunch={Lunch.First}
                />
            ),
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });
    it("Renders LunchBlockComponent with a minor", () => {
        const comp = render(
            (
                <LunchBlockComponent
                    clazz={minor}
                    block={BlockColor.Orange}
                    lunch={Lunch.Third}
                />
            ),
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it("Renders LunchBlockComponent with a dr", () => {
        const comp = render(
            (
                <LunchBlockComponent
                    clazz={dr}
                    block={BlockColor.Green}
                    lunch={Lunch.Second}
                />
            ),
            { wrapper: ThemeWrapper });

        expect(comp.toJSON()).toMatchSnapshot();
    });
    it("Renders LunchBlockComponent with a free", () => {
        const comp = render(
            (
                <LunchBlockComponent
                    block={BlockColor.Purple}
                    lunch={Lunch.Second}
                />
            ),
            { wrapper: ThemeWrapper });

        expect(comp.toJSON()).toMatchSnapshot();
    });
});
