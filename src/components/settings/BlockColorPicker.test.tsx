/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { render } from "react-native-testing-library";
import { BlockColor } from "../../util/blocks/blockColor";
import BlockColorPicker from "./BlockColorPicker";

// TODO: Test presses
const noll = () => void 0;

describe("Tests different variations of <BlockColorPicker>", () => {
    it("Renders BlockColorPicker", () => {
        let comp = render(<BlockColorPicker value={BlockColor.Green} onPick={noll}/>);

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it("Renders BlockColorPicker with none", () => {
        let comp = render(<BlockColorPicker value={BlockColor.Green} onPick={noll} hasNone={true}/>);

        expect(comp.toJSON()).toMatchSnapshot();
    });

    it("Renders BlockColorPicker without none, but with none as a value", () => {
        let comp = render(<BlockColorPicker value={BlockColor.None} onPick={noll} hasNone={true}/>);

        expect(comp.toJSON()).toMatchSnapshot();
    });
});