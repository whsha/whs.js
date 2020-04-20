/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { dr, major, minor } from "@whsha/classes/v1/__mocks__/classes";
import { BlockColor } from "@whsha/classes/v1/blocks/blockColor";
import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { render } from "react-native-testing-library";
import ThemeWrapper from "../test-helpers/ThemeWrapper";
import BlockComponent from "./BlockComponent";

dayjs.extend(useCustomFormat);

// TODO: Add test cases to cover frees and all that, also it for LunchBlockComponent
describe("Tests different variations of classes", () => {
    it("Renders BlockComponent with a major", () => {
        const comp = render(
            (
                <BlockComponent morning={{ start: dayjs("9:00 AM", "h:mm A"), end: dayjs("9:50 AM", "h:mm A") }} afternoon={{ start: dayjs("12:30 PM", "h:mm A"), end: dayjs("1:20 PM", "h:mm A") }} clazz={major} block={BlockColor.Red} />
            ),
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });
    it("Renders BlockComponent with a minor", () => {
        const comp = render(
            (
                <BlockComponent morning={{ start: dayjs("9:00 AM", "h:mm A"), end: dayjs("9:50 AM", "h:mm A") }} afternoon={{ start: dayjs("12:30 PM", "h:mm A"), end: dayjs("1:20 PM", "h:mm A") }} clazz={minor} block={BlockColor.Orange} />
            ),
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it("Renders BlockComponent with a dr", () => {
        const comp = render(
            (
                <BlockComponent morning={{ start: dayjs("9:00 AM", "h:mm A"), end: dayjs("9:50 AM", "h:mm A") }} afternoon={{ start: dayjs("12:30 PM", "h:mm A"), end: dayjs("1:20 PM", "h:mm A") }} clazz={dr} block={BlockColor.Yellow} />
            ),
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });
});

it("Renders a free", () => {
    const comp = render(
        (
            <BlockComponent morning={{ start: dayjs("9:00 AM", "h:mm A"), end: dayjs("9:50 AM", "h:mm A") }} afternoon={{ start: dayjs("12:30 PM", "h:mm A"), end: dayjs("1:20 PM", "h:mm A") }} block={BlockColor.None} />
        ),
        { wrapper: ThemeWrapper }
    );

    expect(comp.toJSON()).toMatchSnapshot();
});