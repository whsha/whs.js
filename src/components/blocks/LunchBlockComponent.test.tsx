/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v2/block";
import { Lunch } from "@whsha/classes/v2/lunch";
import dayjs from "dayjs";
import { default as useCustomFormat } from "dayjs/plugin/customParseFormat";
import React from "react";
import { render } from "react-native-testing-library";
import ThemeWrapper from "../test-helpers/ThemeWrapper";
import { dummyClass } from "./BlockComponent.test";
import LunchBlockComponent from "./LunchBlockComponent";

dayjs.extend(useCustomFormat);

describe("Tests different variations of classes", () => {
    it("Renders LunchBlockComponent with a class", () => {
        const comp = render(
            (
                <LunchBlockComponent
                    clazz={dummyClass}
                    block={BlockColor.Red}
                    lunch={Lunch.First}
                />
            ),
            { wrapper: ThemeWrapper }
        );

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
