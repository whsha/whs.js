/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import styled from "styled-components/native";
import { IDisplayableProps } from "./common";

/** The view for the icons */
export const ProblemsIconsView = styled.View({
    flexDirection: "row",
    paddingRight: 10
});

/** The button for the icons */
export const ProblemsButton = styled.TouchableOpacity<IDisplayableProps>(props => ({
    display: props.display ? "flex" : "none",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
}));

/** The text for the count of warnings */
export const WarningsCount = styled.Text({
    alignSelf: "center",
    color: "gold",
    paddingRight: 5
});

/** The text for the count of errors */
export const ErrorsCount = styled.Text({
    alignSelf: "center",
    color: "red",
    paddingRight: 5
});