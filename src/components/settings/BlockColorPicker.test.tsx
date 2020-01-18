/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { render } from "react-native-testing-library";
import { BlockColor } from "../../util/blocks/blockColor";
import ThemeWrapper from "../test-helpers/ThemeWrapper";
import BlockColorPicker from "./BlockColorPicker";

// TODO: Test presses
/** Null function */
const noll = () => void 0;

describe("Tests different variations of <BlockColorPicker>", () => {
    it("Renders BlockColorPicker", () => {
        const comp = render(
            <BlockColorPicker value={BlockColor.Green} onPick={noll} />,
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it("Renders BlockColorPicker with none", () => {
        const comp = render(
            <BlockColorPicker value={BlockColor.Green} onPick={noll} hasNone={true} />,
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it("Renders BlockColorPicker without none, but with none as a value", () => {
        const comp = render(
            <BlockColorPicker value={BlockColor.None} onPick={noll} hasNone={false} />,
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });
});