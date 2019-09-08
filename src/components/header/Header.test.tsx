/*!
 * Copyright (C) 2018-2019  Zachary Kohnen (DusterTheFirst)
 */

import React from "react";
import { fireEvent, render } from "react-native-testing-library";
import { MultilineHeader, SinglelineHeader } from "./Header";
import { HeaderCancelButton, HeaderLeftArrow, HeaderRightArrow, HeaderSaveButton } from "./HeaderButtons";

// TODO: Test touches and fn calls

describe("Tests different variations of <SinglelineHeader>", () => {
    it("Renders <SinglelineHeader title=\"test title\"/>", () => {
        let comp = render(<SinglelineHeader title="test title"/>);

        expect(comp.toJSON()).toMatchSnapshot();
    });
    it("Renders <SinglelineHeader title=\"test title\"/> with left and right arrows", () => {
        let leftfn = jest.fn();
        let rightfn = jest.fn();
        let comp = render(<SinglelineHeader title="test title" leftButton={<HeaderLeftArrow onPress={leftfn}/>} rightButton={<HeaderRightArrow onPress={rightfn}/>}/>);

        expect(comp.toJSON()).toMatchSnapshot();

        fireEvent.press(comp.getByA11yLabel("LeftArrow"));
        fireEvent.press(comp.getByA11yLabel("RightArrow"));

        expect(leftfn).toHaveBeenCalledTimes(1);
        expect(rightfn).toHaveBeenCalledTimes(1);
    });

    it("Renders <SinglelineHeader title=\"test title\"/> with save and cancel buttons", () => {
        let cancelfn = jest.fn();
        let savefn = jest.fn();
        let comp = render(<SinglelineHeader title="test title" leftButton={<HeaderCancelButton onPress={cancelfn}/>} rightButton={<HeaderSaveButton onPress={savefn} disabled={true}/>}/>);

        expect(comp.toJSON()).toMatchSnapshot();

        fireEvent.press(comp.getByText("Cancel"));
        fireEvent.press(comp.getByText("Save"));

        expect(cancelfn).toHaveBeenCalledTimes(1);
        expect(savefn).toHaveBeenCalledTimes(1);
    });
});

describe("Tests different variations of <MultilineHeader>", () => {
    it("Renders <MultilineHeader title=\"test title\" subtitle=\"e\"/>", () => {
        let comp = render(<MultilineHeader title="test title" subtitle="e"/>);

        expect(comp.toJSON()).toMatchSnapshot();
    });
    it("Renders <MultilineHeader title=\"test title\" subtitle=\"e\"/> with left and right arrows", () => {
        let leftfn = jest.fn();
        let rightfn = jest.fn();
        let comp = render(<MultilineHeader title="test title" subtitle="e" leftButton={<HeaderLeftArrow onPress={leftfn}/>} rightButton={<HeaderRightArrow onPress={rightfn}/>}/>);

        expect(comp.toJSON()).toMatchSnapshot();

        fireEvent.press(comp.getByA11yLabel("LeftArrow"));
        fireEvent.press(comp.getByA11yLabel("RightArrow"));

        expect(leftfn).toHaveBeenCalledTimes(1);
        expect(rightfn).toHaveBeenCalledTimes(1);
    });

    it("Renders <MultilineHeader title=\"test title\" subtitle=\"e\"/> with save and cancel buttons", () => {
        let cancelfn = jest.fn();
        let savefn = jest.fn();
        let comp = render(<MultilineHeader title="test title" subtitle="e" leftButton={<HeaderCancelButton onPress={cancelfn}/>} rightButton={<HeaderSaveButton onPress={savefn}/>}/>);

        expect(comp.toJSON()).toMatchSnapshot();

        fireEvent.press(comp.getByText("Cancel"));
        fireEvent.press(comp.getByText("Save"));

        expect(cancelfn).toHaveBeenCalledTimes(1);
        expect(savefn).toHaveBeenCalledTimes(1);
    });
});