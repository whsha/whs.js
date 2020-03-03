/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { BlockColor } from "@whsha/classes/v2/block";
import styled from "styled-components/native";
import { getDisplayColorForBlock } from "../blockColor";
import { DimText } from "./common";

/** Text to be placed on the left of the class display */
export const LeftClassText = styled(DimText)({
    flex: 1,
    textAlign: "left",
});

/** Text to be placed on the right of the class display */
export const RightClassText = styled(DimText)({
    flex: 1,
    textAlign: "right",
});

/** Text to be placed for display as times */
export const TimesText = styled(DimText)({
    paddingLeft: 5,
    textAlign: "right"
});

/** Properties for a styled component with a class color prop */
interface IClassColoredComponentProps {
    /** The class color to show */
    classColor?: BlockColor;
}

/** The text to show the colorblind labels with */
export const ColorblindLabelText = styled.Text<IClassColoredComponentProps>(
    (props) => ({
        color:
            getDisplayColorForBlock(props.classColor)
            ?? props.theme.colors.dimText,
        fontWeight: "bold",
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: "center"
    })
);

/** The text to show the title of a class */
export const ClassTitleText = styled(LeftClassText)<IClassColoredComponentProps>(
    (props) => ({
        color:
            getDisplayColorForBlock(props.classColor)
            ?? props.theme.colors.title,
        fontSize: 25,
        fontWeight: "bold",
    })
);

/** A view for placing an item in the center of a class view */
export const MiddleClassView = styled.View({
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    maxWidth: "75px"
});

/** A class view row */
export const ClassViewRow = styled.View({
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between"
});

/** The info row for the class view */
export const ClassViewInfoRow = styled(ClassViewRow)({
    marginTop: 5
});

/** Props for a styled component that can have a dynamic flex state */
interface IFlexableProps {
    /** The flex state */
    doFlex: boolean;
}

/** The view to surround the times part of the class */
export const TimesView = styled.View<IFlexableProps>(props => ({
    alignItems: "center",
    flex: props.doFlex ? 1 : undefined,
    flexDirection: "row",
    justifyContent: "flex-end"
}));

/** The view for containing a class */
export const ClassContainerView = styled.View(props => ({
    alignItems: "center",
    backgroundColor: props.theme.colors.classBackground,
    justifyContent: "center",
    padding: 10,
    width: "100%"
}));