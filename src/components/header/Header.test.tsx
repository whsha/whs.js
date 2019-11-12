/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { fireEvent, render } from "react-native-testing-library";
import { HeaderCancelButton, HeaderLeftArrow, HeaderRightArrow, HeaderSaveButton } from "./HeaderButtons";
import MultilineHeaderTitle from "./MultilineHeaderTitle";

describe("Tests different header buttons", () => {
    it("Renders <HeaderLeftArrow/>", () => {
        let mock = jest.fn();

        let comp = render(<HeaderLeftArrow onPress={mock}/>);

        expect(comp.toJSON()).toMatchSnapshot();

        fireEvent.press(comp.getByA11yLabel("LeftArrow"));
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("Renders <HeaderRightArrow/>", () => {
        let mock = jest.fn();

        let comp = render(<HeaderRightArrow onPress={mock}/>);

        expect(comp.toJSON()).toMatchSnapshot();

        fireEvent.press(comp.getByA11yLabel("RightArrow"));
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("Renders <HeaderCancelButton/>", () => {
        let mock = jest.fn();

        let comp = render(<HeaderCancelButton onPress={mock}/>);

        expect(comp.toJSON()).toMatchSnapshot();

        fireEvent.press(comp.getByText("Cancel"));
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("Renders <HeaderSaveButton/>", () => {
        let mock = jest.fn();

        let comp = render(<HeaderSaveButton onPress={mock}/>);

        expect(comp.toJSON()).toMatchSnapshot();

        fireEvent.press(comp.getByText("Save"));
        expect(mock).toHaveBeenCalledTimes(1);
    });
});

describe("Tests different variations of <MultilineHeader>", () => {
    it("Renders <MultilineHeaderTitle title=\"test title\" subtitle=\"e\"/>", () => {
        let comp = render(<MultilineHeaderTitle title="test title" subtitle="e"/>);

        expect(comp.toJSON()).toMatchSnapshot();
    });
});