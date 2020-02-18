/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import styled from "styled-components/native";

/** The container view for the no school view */
export const NoSchoolContainerView = styled.View(props => ({
    alignItems: "center",
    backgroundColor: props.theme.colors.background,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    width: "100%"
}));

/** The text to go to the next school day */
export const GoToNextSchoolDayText = styled.Text(props => ({
    color: props.theme.colors.button
}));

/** The button to go the next school day */
export const GoToNextSchoolDayButton = styled.TouchableOpacity(props => ({
    alignItems: "flex-end",
    backgroundColor: props.theme.colors.foreground,
    borderColor: props.theme.colors.border,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
}));