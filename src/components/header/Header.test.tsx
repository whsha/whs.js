/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { fireEvent, render } from "react-native-testing-library";
import ThemeWrapper from "../test-helpers/ThemeWrapper";
import { HeaderCancelButton, HeaderLeftArrow, HeaderRightArrow, HeaderSaveButton } from "./HeaderButtons";
import MultilineHeaderTitle from "./MultilineHeaderTitle";

describe("Tests different header buttons", () => {
    it("Renders <HeaderLeftArrow/>", () => {
        const mock = jest.fn();

        const comp = render(
            <HeaderLeftArrow onPress={mock} />,
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();

        fireEvent.press(comp.getByA11yLabel("LeftArrow"));
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("Renders <HeaderRightArrow/>", () => {
        const mock = jest.fn();

        const comp = render(
            <HeaderRightArrow onPress={mock} />,
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();

        fireEvent.press(comp.getByA11yLabel("RightArrow"));
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("Renders <HeaderCancelButton/>", () => {
        const mock = jest.fn();

        const comp = render(
            <HeaderCancelButton onPress={mock} />,
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();

        fireEvent.press(comp.getByText("Cancel"));
        expect(mock).toHaveBeenCalledTimes(1);
    });

    it("Renders <HeaderSaveButton/>", () => {
        const mock = jest.fn();

        const comp = render(
            <HeaderSaveButton onPress={mock} />,
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();

        fireEvent.press(comp.getByText("Save"));
        expect(mock).toHaveBeenCalledTimes(1);
    });
});

describe("Tests different variations of <MultilineHeader>", () => {
    it("Renders <MultilineHeaderTitle title=\"test title\" subtitle=\"e\"/>", () => {
        const comp = render(
            <MultilineHeaderTitle title="test title" subtitle="e" />,
            { wrapper: ThemeWrapper }
        );

        expect(comp.toJSON()).toMatchSnapshot();
    });
});