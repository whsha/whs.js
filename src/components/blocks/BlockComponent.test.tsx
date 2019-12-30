/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import dayjs from "dayjs";
import useCustomFormat from "dayjs/plugin/customParseFormat";
import React from "react";
import { render } from "react-native-testing-library";
import { dr, major, minor } from "../../__mocks__/classes";
import { BlockColor } from "../../util/blocks/blockColor";
import BlockComponent from "./BlockComponent";

dayjs.extend(useCustomFormat);

// TODO: Add test cases to cover frees and all that, also it for LunchBlockComponent
describe("Tests different variations of classes", () => {
    it("Renders BlockComponent with a major", () => {
        const comp = render(<BlockComponent clazz={major} block={BlockColor.Red} start={dayjs("7:30 AM", "h:mm A")} end={dayjs("8:30 AM", "h:mm A")} />);

        expect(comp.toJSON()).toMatchSnapshot();
    });
    it("Renders BlockComponent with a minor", () => {
        const comp = render(<BlockComponent clazz={minor} block={BlockColor.Orange} start={dayjs("12:14 PM", "h:mm A")} end={dayjs("1:24 PM", "h:mm A")} />);

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it("Renders BlockComponent with a dr", () => {
        const comp = render(<BlockComponent clazz={dr} block={BlockColor.Yellow} start={dayjs("12:14 PM", "h:mm A")} end={dayjs("1:24 PM", "h:mm A")} />);

        expect(comp.toJSON()).toMatchSnapshot();
    });
});

it("Renders a free", () => {
    const comp = render(<BlockComponent block={BlockColor.None} start={dayjs("7:30 AM", "h:mm A")} end={dayjs("8:30 AM", "h:mm A")} />);

    expect(comp.toJSON()).toMatchSnapshot();
});