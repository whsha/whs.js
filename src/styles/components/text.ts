/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import styled from "styled-components/native";
import { BlockColor, getDisplayColorForBlock } from "../../util/blocks/blockColor";

/** Text that is not the main color but a bit more dim */
export const DimText = styled.Text(({ theme }) => ({
    color: theme.colors.dimText
}));

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
            ?? props.theme.colors.titleColor,
        fontSize: 25,
        fontWeight: "bold",
    })
);