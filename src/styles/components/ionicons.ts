/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

/** An ion icon with the button color */
export const IonIconButton = styled(Ionicons)(props => ({
    color: props.theme.colors.button
}));