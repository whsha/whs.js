/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import styled from "styled-components/native";
import { DimText } from "./common";

/** Title text for a header */
export const HeaderTitleText = styled.Text({
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
});

/** Title text for a subtitle */
export const HeaderSubtitleText = styled(DimText)({
    fontSize: 12,
    textAlign: "center"
});

/** Props for a styled component that can be disabled */
interface IDisabledProps {
    /** If the component is disabled */
    disabled?: boolean;
}

/** A header button */
export const HeaderButtonText = styled.Text<IDisabledProps>(props => ({
    color: props.disabled === true
        ? props.theme.colors.buttonColor
        : props.theme.colors.buttonColor,
    fontSize: 17
}));

/** A **done** header button */
export const HeaderDoneButtonText = styled(HeaderButtonText)({
    fontWeight: "bold"
});

/** A touchable for the arrow buttons on a header */
export const HeaderArrowButtonTouchable = styled.TouchableOpacity({
    alignItems: "center",
    flex: 1,
    height: 30,
    justifyContent: "center",
    width: 30
});