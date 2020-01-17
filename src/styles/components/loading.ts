/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import styled from "styled-components/native";
import { IDisplayableProps } from "./common";

/** The image to display on the loading view */
export const LoadingImage = styled.Image({
    backgroundColor: "#000000",
    height: "100%",
    width: "100%"
});

/** The view for the loading overlay */
export const LoadingOverlayView = styled.View<IDisplayableProps>(props => ({
    alignItems: "center",
    display: props.display ? "flex" : "none",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    top: 0,
    width: "100%"
}));

/** The text that shows the current task */
export const TaskText = styled.Text({
    color: "#ffffff",
    fontSize: 20
});