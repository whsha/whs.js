/*!
 * Copyright (C) 2018-2020  Zachary Kohnen (DusterTheFirst)
 */

import styled from "styled-components/native";
import { CellWithStyleMappedToTitleStyle } from "./Helpers";

/** A red/warning cell */
export const RedCell = styled(CellWithStyleMappedToTitleStyle)(props => ({
    color: props.theme.colors.error
}));

/** A red/warning cell */
export const ButtonCell = styled(CellWithStyleMappedToTitleStyle)(props => ({
    color: props.theme.colors.button
}));